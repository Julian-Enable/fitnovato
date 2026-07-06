import { query } from "./db.js";

let schemaPromise = null;

export function ensureSchema() {
  // Si la promesa anterior falló, permitimos reintentar creando una nueva.
  // Solo se cachea si realmente se resolvió con éxito.
  if (!schemaPromise || isRejectedPromise(schemaPromise)) {
    schemaPromise = createSchema().catch(error => {
      // Marcamos la promesa como fallida y la guardamos para que `isRejectedPromise`
      // pueda detectarla; lanzamos para que el caller la vea.
      schemaPromise = makeRejectedMarker(error);
      throw error;
    });
  }
  return schemaPromise;
}

// Helpers para detectar promesas rechazadas sin await (que dispararía un
// UnhandledPromiseRejection en algunos runtimes).
const REJECTED_TAG = Symbol("rejected");
function makeRejectedMarker(error) {
  const p = Promise.reject(error);
  p[REJECTED_TAG] = true;
  // Evitamos UnhandledPromiseRejectionWarning en Node.
  p.catch(() => {});
  return p;
}
function isRejectedPromise(p) {
  return Boolean(p && p[REJECTED_TAG]);
}

async function createSchema() {
  await query(`
    create extension if not exists pgcrypto;
  `);

  await query(`
    create table if not exists users (
      id uuid primary key default gen_random_uuid(),
      name text not null,
      email text not null unique,
      password_hash text not null,
      created_at timestamptz not null default now()
    );
  `);

  await query(`
    create table if not exists user_states (
      user_id uuid primary key references users(id) on delete cascade,
      data jsonb not null default '{}'::jsonb,
      updated_at timestamptz not null default now()
    );
  `);
}
