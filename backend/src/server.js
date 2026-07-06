import "dotenv/config";
import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { randomBytes } from "node:crypto";
import { query } from "./db.js";
import { ensureSchema } from "./schema.js";

const app = express();
const port = process.env.PORT || 3000;

// Seguridad: si estamos en producción, JWT_SECRET es obligatorio.
// Si no se setea, el servidor arranca pero firma con un secreto aleatorio
// que se pierde al reiniciar (invalidando todas las sesiones existentes).
const isProd = process.env.NODE_ENV === "production";
let jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  if (isProd) {
    console.error("FATAL: JWT_SECRET no está definido en producción. Las sesiones se perderán al reiniciar.");
  }
  // Generamos uno efímero en dev para no usar un secreto hardcodeado conocido.
  jwtSecret = randomBytes(32).toString("hex");
  console.warn("ADVERTENCIA: JWT_SECRET no definido. Usando secreto efímero (las sesiones se pierden al reiniciar).");
}
const frontendOrigin = process.env.FRONTEND_ORIGIN || "*";
let dbReady = false;
let dbError = null;

// Rate limiting simple en memoria para /auth/* (anti-fuerza bruta).
// Para producción detrás de múltiples instancias conviene mover a Redis.
const authAttempts = new Map();
const AUTH_WINDOW_MS = 15 * 60 * 1000;
const AUTH_MAX_ATTEMPTS = 20;
function rateLimitAuth(req, res, next) {
  const ip = req.ip || req.socket.remoteAddress || "unknown";
  const now = Date.now();
  const entry = authAttempts.get(ip) || { count: 0, firstAt: now };
  if (now - entry.firstAt > AUTH_WINDOW_MS) {
    entry.count = 0;
    entry.firstAt = now;
  }
  entry.count += 1;
  authAttempts.set(ip, entry);
  if (entry.count > AUTH_MAX_ATTEMPTS) {
    return res.status(429).json({ error: "Demasiados intentos. Intenta de nuevo en 15 minutos." });
  }
  next();
}
// Limpieza periódica del mapa para evitar fuga de memoria.
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of authAttempts.entries()) {
    if (now - entry.firstAt > AUTH_WINDOW_MS) authAttempts.delete(ip);
  }
}, 60 * 1000).unref?.();

function isValidEmail(email) {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

app.use(cors({
  origin: frontendOrigin === "*" ? true : frontendOrigin.split(",").map(origin => origin.trim()),
  credentials: false
}));
app.use(express.json({ limit: "1mb" }));

function signUser(user) {
  return jwt.sign({ sub: user.id, email: user.email }, jwtSecret, { expiresIn: "30d" });
}

function publicUser(user) {
  return { id: user.id, name: user.name, email: user.email, createdAt: user.created_at };
}

function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token) return res.status(401).json({ error: "No autorizado" });

  try {
    req.auth = jwt.verify(token, jwtSecret);
    next();
  } catch {
    res.status(401).json({ error: "Sesión inválida o vencida" });
  }
}

app.get("/health", (req, res) => {
  res.json({ ok: true, name: "FitNovato API", dbReady, dbError: dbError?.message || null });
});

app.post("/auth/register", rateLimitAuth, async (req, res) => {
  await requireDatabase(res);
  if (res.headersSent) return;

  const name = String(req.body.name || "").trim();
  const email = String(req.body.email || "").trim().toLowerCase();
  const password = String(req.body.password || "");
  const initialState = req.body.state || {};

  if (!name || !email || password.length < 6) {
    return res.status(400).json({ error: "Nombre, correo y contraseña de mínimo 6 caracteres son obligatorios" });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Correo electrónico inválido" });
  }

  const passwordHash = await bcrypt.hash(password, 12);

  try {
    const created = await query(
      "insert into users (name, email, password_hash) values ($1, $2, $3) returning id, name, email, created_at",
      [name, email, passwordHash]
    );
    const user = created.rows[0];
    await query(
      "insert into user_states (user_id, data) values ($1, $2)",
      [user.id, JSON.stringify(initialState)]
    );
    res.status(201).json({ token: signUser(user), user: publicUser(user), state: initialState });
  } catch (error) {
    if (error.code === "23505") return res.status(409).json({ error: "Ese correo ya está registrado" });
    console.error(error);
    res.status(500).json({ error: "No se pudo crear la cuenta" });
  }
});

app.post("/auth/login", rateLimitAuth, async (req, res) => {
  await requireDatabase(res);
  if (res.headersSent) return;

  const email = String(req.body.email || "").trim().toLowerCase();
  const password = String(req.body.password || "");
  if (!email || !password) {
    return res.status(400).json({ error: "Correo y contraseña son obligatorios" });
  }
  const result = await query("select id, name, email, password_hash, created_at from users where email = $1", [email]);
  const user = result.rows[0];

  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    return res.status(401).json({ error: "Correo o contraseña incorrectos" });
  }

  const stateResult = await query("select data from user_states where user_id = $1", [user.id]);
  res.json({ token: signUser(user), user: publicUser(user), state: stateResult.rows[0]?.data || {} });
});

app.get("/me/state", requireAuth, async (req, res) => {
  await requireDatabase(res);
  if (res.headersSent) return;

  const result = await query(
    `select u.id, u.name, u.email, u.created_at, coalesce(s.data, '{}'::jsonb) as data
     from users u
     left join user_states s on s.user_id = u.id
     where u.id = $1`,
    [req.auth.sub]
  );
  const row = result.rows[0];
  if (!row) return res.status(404).json({ error: "Usuario no encontrado" });
  res.json({ user: publicUser(row), state: row.data });
});

app.put("/me/state", requireAuth, async (req, res) => {
  await requireDatabase(res);
  if (res.headersSent) return;

  const data = req.body?.state;
  // Validamos que sea un objeto plano (no array, no null, no primitivo).
  if (data === null || typeof data !== "object" || Array.isArray(data)) {
    return res.status(400).json({ error: "El estado debe ser un objeto" });
  }
  await query(
    `insert into user_states (user_id, data, updated_at)
     values ($1, $2, now())
     on conflict (user_id)
     do update set data = excluded.data, updated_at = now()`,
    [req.auth.sub, JSON.stringify(data)]
  );
  res.json({ ok: true });
});

app.listen(port, () => {
  console.log(`FitNovato API listening on ${port}`);
});

ensureSchema()
  .then(() => {
    dbReady = true;
    console.log("Database schema ready");
  })
  .catch(error => {
    dbError = error;
    console.error("Database schema failed", error);
  });

async function requireDatabase(res) {
  try {
    await ensureSchema();
    dbReady = true;
  } catch (error) {
    dbError = error;
    console.error(error);
    res.status(503).json({
      error: "Base de datos no disponible. Revisa DATABASE_URL y el servicio PostgreSQL en Railway."
    });
  }
}
