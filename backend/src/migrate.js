import "dotenv/config";
import { query, pool } from "./db.js";

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

await pool.end();
console.log("Database migrated");
