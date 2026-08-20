import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * AVORRIA — SUPABASE CLIENT
 *
 * Server-side only. Every table in the admin schema has RLS enabled with an
 * admin-only policy, so all persistence here runs under the service role.
 *
 * SAFETY CONTRACT
 * - The service role key bypasses RLS entirely. It must never be imported into
 *   a client component or exposed to the browser. The `server-only` guard
 *   below turns a mistaken client import into a build error rather than a
 *   silent key leak.
 * - When Supabase is not configured, `getSupabase()` returns null rather than
 *   throwing. Callers fall back to the in-process store, so local development
 *   and preview deployments keep working without credentials.
 */

import "server-only";

let cached: SupabaseClient | null = null;
let warned = false;

export function isSupabaseConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export function getSupabase(): SupabaseClient | null {
  if (cached) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    if (!warned) {
      warned = true;
      console.info(
        "[supabase] not configured — persistence is falling back to the in-process store. " +
          "State will not survive a restart and is not shared between instances. " +
          "Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to enable it."
      );
    }
    return null;
  }

  cached = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { "x-avorria-source": "admin-server" } },
  });
  return cached;
}

/**
 * Describes where a read or write actually landed, so callers and the audit
 * trail can distinguish durable state from in-process state.
 */
export type StorageBackend = "supabase" | "memory";

export function activeBackend(): StorageBackend {
  return isSupabaseConfigured() ? "supabase" : "memory";
}
