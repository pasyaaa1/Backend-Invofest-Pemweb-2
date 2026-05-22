/**
 * Build Railway/Vercel: prisma generate butuh DATABASE_URL di schema.
 * Placeholder hanya untuk tahap build — runtime tetap wajib DATABASE_URL asli.
 */
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL =
    "postgresql://build:build@127.0.0.1:5432/build?schema=public";
  console.log(
    "[build] DATABASE_URL kosong — pakai placeholder untuk prisma generate"
  );
}

import { execSync } from "node:child_process";

execSync("npx prisma generate", { stdio: "inherit" });
