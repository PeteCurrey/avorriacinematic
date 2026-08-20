/**
 * ADMIN SESSION CONSTANTS
 *
 * Shared by the Node server guards (lib/admin/auth.ts) and the Edge guard
 * (middleware.ts). Deliberately dependency-free — no node:crypto, no
 * next/headers — so it is safe to import from the Edge runtime.
 *
 * Both guards MUST resolve the same secret. When they disagree, a genuine
 * session signed by one is rejected by the other and the admin login lands in
 * a redirect loop.
 */

export const ADMIN_COOKIE_NAME = "avorria_admin_session";

/**
 * Local-development fallback only. It is in the source tree and therefore
 * public, so it must never be used to sign a real session — see
 * resolveSessionSecret.
 */
export const DEV_ONLY_SESSION_SECRET = "avorria-dev-only-insecure-session-secret";

/**
 * Returns the signing secret, or null when running in production without one
 * configured.
 *
 * Callers must treat null as "reject everything". Falling back to a published
 * default in production would let anyone who can read this repository forge an
 * admin session.
 */
export function resolveSessionSecret(): string | null {
  const configured = process.env.ADMIN_SESSION_SECRET;
  if (configured) return configured;
  if (process.env.NODE_ENV === "production") return null;
  return DEV_ONLY_SESSION_SECRET;
}
