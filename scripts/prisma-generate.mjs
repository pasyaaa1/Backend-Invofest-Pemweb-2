/**
 * Build Railway: prisma generate butuh DATABASE_URL di schema.
 * Placeholder hanya untuk tahap build — runtime pakai Supabase URL asli.
 */
import { applyDatabaseUrl } from "./resolve-database-url.mjs";

if (!applyDatabaseUrl().ok) {
  process.env.DATABASE_URL =
    "postgresql://build:build@127.0.0.1:5432/build?schema=public";
  console.log(
    "[build] DB URL kosong — pakai placeholder untuk prisma generate"
  );
} else {
  console.log("[build] prisma generate dengan DATABASE_URL dari env");
}

import { execSync } from "node:child_process";

execSync("npx prisma generate", { stdio: "inherit" });
