import "dotenv/config";
import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { query } from "./db.js";

const app = express();
const port = process.env.PORT || 3000;
const jwtSecret = process.env.JWT_SECRET || "dev-secret-change-me";
const frontendOrigin = process.env.FRONTEND_ORIGIN || "*";

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
  res.json({ ok: true, name: "FitNovato API" });
});

app.post("/auth/register", async (req, res) => {
  const name = String(req.body.name || "").trim();
  const email = String(req.body.email || "").trim().toLowerCase();
  const password = String(req.body.password || "");
  const initialState = req.body.state || {};

  if (!name || !email || password.length < 6) {
    return res.status(400).json({ error: "Nombre, correo y contraseña de mínimo 6 caracteres son obligatorios" });
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

app.post("/auth/login", async (req, res) => {
  const email = String(req.body.email || "").trim().toLowerCase();
  const password = String(req.body.password || "");
  const result = await query("select id, name, email, password_hash, created_at from users where email = $1", [email]);
  const user = result.rows[0];

  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    return res.status(401).json({ error: "Correo o contraseña incorrectos" });
  }

  const stateResult = await query("select data from user_states where user_id = $1", [user.id]);
  res.json({ token: signUser(user), user: publicUser(user), state: stateResult.rows[0]?.data || {} });
});

app.get("/me/state", requireAuth, async (req, res) => {
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
  const data = req.body.state || {};
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
