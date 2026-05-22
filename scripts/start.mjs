import "dotenv/config";
import { execSync } from "node:child_process";
import {
  applyDatabaseUrl,
  maskDatabaseUrl,
  resolveDatabaseUrl,
} from "./resolve-database-url.mjs";

const railwayDb = process.env.DATABASE_URL?.trim() ?? "";
const hasRailwayInject =
  railwayDb.includes("railway.app") && !railwayDb.includes("supabase");

const applied = applyDatabaseUrl();

if (!applied.ok) {
  if (hasRailwayInject) {
    console.error(`
[ERROR] DATABASE_URL di Railway masih dari Postgres Railway:
  ${maskDatabaseUrl(railwayDb)}

Database project ini di Supabase. Perbaikan di Railway → Variables:

  1. Hapus variable DATABASE_URL yang reference Postgres Railway
     (atau unlink service Postgres dari backend)
  2. Tambah variable baru:
       SUPABASE_DATABASE_URL = copy dari .env lokal (host *.supabase.com)
     (nama ini tidak bentrok dengan auto-inject Railway)
  3. PORT = 3000
  4. Redeploy
`);
  } else {
    console.error(`
[ERROR] Tidak ada URL database Supabase.

Railway → Variables → Add:
  SUPABASE_DATABASE_URL = copy dari .env lokal (host harus *.supabase.com)
  PORT = 3000

Opsional di .env lokal: bisa pakai DATABASE_URL atau SUPABASE_DATABASE_URL.
`);
  }
  process.exit(1);
}

console.log(`[start] DB dari ${applied.source}`);

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
