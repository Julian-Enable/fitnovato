import "dotenv/config";
import { pool } from "./db.js";
import { ensureSchema } from "./schema.js";

await ensureSchema();
await pool.end();
console.log("Database migrated");
