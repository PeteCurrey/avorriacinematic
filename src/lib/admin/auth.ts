import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminRole, AdminUser } from "@/types/admin";
import crypto from "crypto";

export const ADMIN_COOKIE_NAME = "avorria_admin_session";
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || "avorria-admin-session-secret-2026-superkey-secure";
export const DEFAULT_SUPERADMIN_EMAIL = process.env.ADMIN_SUPERADMIN_EMAIL || "pete@avorria.com";
export const DEFAULT_SUPERADMIN_PASS = process.env.ADMIN_SUPERADMIN_PASSWORD || "avorria2026!";

export interface AdminSession {
  user: AdminUser;
  expiresAt: number;
}

export function signPayload(payloadStr: string): string {
  const hmac = crypto.createHmac("sha256", SESSION_SECRET);
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
    
    // Constant-time comparison to prevent timing attacks
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig))) {
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
