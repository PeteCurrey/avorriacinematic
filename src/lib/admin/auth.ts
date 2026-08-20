import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminRole, AdminUser } from "@/types/admin";
import { ADMIN_COOKIE_NAME, resolveSessionSecret } from "./session-constants";
import crypto from "crypto";

export { ADMIN_COOKIE_NAME };

const IS_PRODUCTION = process.env.NODE_ENV === "production";

/**
 * Session signing secret, shared with the Edge guard in middleware.ts so both
 * accept exactly the same tokens.
 */
function getSessionSecret(): string {
  const secret = resolveSessionSecret();
  if (!secret) {
    throw new Error(
      "ADMIN_SESSION_SECRET is not set. Refusing to sign admin sessions with a " +
        "default secret in production — anyone with access to the source could " +
        "forge an admin session."
    );
  }
  return secret;
}

export const DEFAULT_SUPERADMIN_EMAIL = process.env.ADMIN_SUPERADMIN_EMAIL || "pete@avorria.com";

/**
 * Development-only credentials. In production the password MUST come from the
 * environment; there is no fallback, because a password committed to source
 * is not a password.
 */
export function getSuperadminPassword(): string | null {
  const configured = process.env.ADMIN_SUPERADMIN_PASSWORD;
  if (configured) return configured;
  // Unchanged local-development convenience. Production has no fallback.
  return IS_PRODUCTION ? null : "avorria2026!";
}

/** @deprecated Use getSuperadminPassword() — this has no production fallback. */
export const DEFAULT_SUPERADMIN_PASS = getSuperadminPassword() || "";

export interface AdminSession {
  user: AdminUser;
  expiresAt: number;
}

export function signPayload(payloadStr: string): string {
  const hmac = crypto.createHmac("sha256", getSessionSecret());
  hmac.update(payloadStr);
  return hmac.digest("hex");
}

export function createSessionToken(user: AdminUser, durationSeconds: number = 60 * 60 * 24 * 7): string {
  const expiresAt = Math.floor(Date.now() / 1000) + durationSeconds;
  const payload = JSON.stringify({ user, expiresAt });
  const signature = signPayload(payload);
  const token = Buffer.from(JSON.stringify({ payload, signature })).toString("base64url");
  return token;
}

export function verifySessionToken(token: string): AdminSession | null {
  try {
    const raw = Buffer.from(token, "base64url").toString("utf-8");
    const { payload, signature } = JSON.parse(raw);
    const expectedSig = signPayload(payload);
    
    // Constant-time comparison to prevent timing attacks. Lengths must match
    // first: timingSafeEqual throws on differing lengths.
    const sigBuf = Buffer.from(String(signature), "utf8");
    const expBuf = Buffer.from(expectedSig, "utf8");
    if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
      return null;
    }

    const data = JSON.parse(payload);
    const now = Math.floor(Date.now() / 1000);
    if (data.expiresAt < now) {
      return null;
    }

    return data as AdminSession;
  } catch {
    return null;
  }
}

/**
 * Returns current admin session if authenticated, or null if unauthenticated.
 */
export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

/**
 * Server-side guard: Requires admin authentication.
 * Redirects to /admin/login if not authenticated.
 */
export async function requireAdmin(): Promise<AdminSession> {
  const session = await getAdminSession();
  if (!session || !session.user) {
    redirect("/admin/login");
  }
  return session;
}

/**
 * Server-side guard: Requires specific admin role(s).
 */
export async function requireRole(allowedRoles: AdminRole[]): Promise<AdminSession> {
  const session = await requireAdmin();
  if (!allowedRoles.includes(session.user.role)) {
    throw new Error(`Forbidden: Role '${session.user.role}' lacks permission for this action.`);
  }
  return session;
}
