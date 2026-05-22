/**
 * Prioritas: SUPABASE_DATABASE_URL (aman dari auto-inject Railway Postgres).
 * Fallback: DATABASE_URL jika bukan host railway.app.
 */
export function resolveDatabaseUrl() {
  const supabase = process.env.SUPABASE_DATABASE_URL?.trim();
  if (supabase) {
    return { url: supabase, source: "SUPABASE_DATABASE_URL" };
  }

  const database = process.env.DATABASE_URL?.trim() ?? "";
  if (!database) {
    return { url: null, source: null };
  }

  if (database.includes("railway.app") && !database.includes("supabase")) {
    return { url: null, source: "DATABASE_URL (Railway Postgres — salah)" };
  }

  return { url: database, source: "DATABASE_URL" };
}

export function applyDatabaseUrl() {
  const { url, source } = resolveDatabaseUrl();
  if (!url) return { ok: false, source };

  process.env.DATABASE_URL = url;
  return { ok: true, source };
}

export function maskDatabaseUrl(url) {
  return url.replace(/:([^:@]+)@/, ":****@");
}
