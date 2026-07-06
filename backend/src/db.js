import pg from "pg";

const { Pool } = pg;

// Railway/Render/Heroku inyectan `DATABASE_URL` con host `*.railway.internal`
// o `*.up.railway.app`, que SIEMPRE requieren SSL. Pero a menudo no setean
// `NODE_ENV=production`, así que la validación anterior rompía la conexión.
// Decidimos SSL por la presencia de DATABASE_URL o por flag explícito.
function buildSslConfig() {
  const databaseUrl = process.env.DATABASE_URL || "";
  const isRemote = databaseUrl.startsWith("postgres://") || databaseUrl.startsWith("postgresql://");
  const envFlag = (process.env.PGSSL || "").toLowerCase();
  if (envFlag === "0" || envFlag === "false") return false;
  if (envFlag === "1" || envFlag === "true") return { rejectUnauthorized: false };
  // Por defecto: si hay DATABASE_URL remota, activamos SSL.
  return isRemote ? { rejectUnauthorized: false } : false;
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: buildSslConfig()
});

export async function query(text, params) {
  const result = await pool.query(text, params);
  return result;
}
