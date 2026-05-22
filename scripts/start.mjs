import "dotenv/config";
import { execSync } from "node:child_process";

const dbUrl = process.env.DATABASE_URL ?? "";

if (!dbUrl) {
  console.error(`
[ERROR] DATABASE_URL tidak ditemukan.

Railway → Variables → Add:
  DATABASE_URL = copy dari .env lokal (host harus *.supabase.com)
  PORT           = 3000

JANGAN pakai Postgres Railway (*.railway.app) — database project ini di Supabase.
`);
  process.exit(1);
}

if (dbUrl.includes("railway.app") && !dbUrl.includes("supabase")) {
  console.error(`
[ERROR] DATABASE_URL salah — mengarah ke Railway Postgres:
  ${dbUrl.replace(/:[^:@]+@/, ":****@")}

Database kamu ada di Supabase. Di Railway Variables:
  1. Hapus variable DATABASE_URL yang reference Postgres Railway
  2. Paste DATABASE_URL dari file .env lokal (host: ...supabase.com...)
  3. Redeploy
`);
  process.exit(1);
}

// Migration sudah di Supabase via lokal; skip di start agar deploy tidak crash.
// Jalankan manual: RUN_DB_MIGRATE=true npm start
if (process.env.RUN_DB_MIGRATE === "true") {
  console.log("[start] prisma migrate deploy...");
  execSync("npx prisma migrate deploy", { stdio: "inherit" });
} else {
  console.log(
    "[start] skip migrate deploy (DB Supabase). Paksa: RUN_DB_MIGRATE=true"
  );
}

console.log("[start] node dist/index.js");
execSync("node dist/index.js", { stdio: "inherit" });
