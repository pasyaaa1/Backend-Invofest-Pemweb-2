import "dotenv/config";
import { execSync } from "node:child_process";

if (!process.env.DATABASE_URL) {
  console.error(`
[ERROR] DATABASE_URL tidak ditemukan.

Railway → service Backend → tab Variables → Add:
  DATABASE_URL = (copy dari file .env lokal / Supabase Connect → Prisma)
  PORT           = 3000

Lalu Redeploy.
`);
  process.exit(1);
}

console.log("[start] prisma migrate deploy...");
execSync("npx prisma migrate deploy", { stdio: "inherit" });

console.log("[start] node dist/index.js");
execSync("node dist/index.js", { stdio: "inherit" });
