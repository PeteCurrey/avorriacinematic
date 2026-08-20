import { NextRequest, NextResponse } from "next/server";

/**
 * ADMIN EDGE GUARD
 *
 * Single chokepoint protecting every /admin and /api/admin route.
 *
 * Per-page `requireAdmin()` calls are not sufficient on their own: 35 admin
 * pages had no guard at all, and the admin layout renders children "bare"
 * when there is no session rather than redirecting — so finance, executive,
 * pipeline, leads and team pages were readable unauthenticated. A guard that
 * has to be remembered on every new page will eventually be forgotten; this
 * one cannot be.
 *
 * Middleware runs on the Edge runtime, so verification uses Web Crypto rather
 * than node:crypto. It mirrors `signPayload` in lib/admin/auth.ts
 * (HMAC-SHA256, hex). Page-level `requireAdmin()` still runs and remains the
 * authority for role checks and for handing the session to the page.
 */

import { ADMIN_COOKIE_NAME, resolveSessionSecret } from "@/lib/admin/session-constants";

/** Paths under /admin that must stay reachable without a session. */
const PUBLIC_ADMIN_PATHS = ["/admin/login"];

function timingSafeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

async function hmacHex(secret: string, message: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function hasValidSession(token: string | undefined): Promise<boolean> {
  if (!token) return false;

  // Same resolver the Node guard signs with, so both accept the same tokens.
  // Null means production without a configured secret — fail closed.
  const secret = resolveSessionSecret();
  if (!secret) return false;

  try {
    const raw = atob(token.replace(/-/g, "+").replace(/_/g, "/"));
    const { payload, signature } = JSON.parse(raw);
    if (typeof payload !== "string" || typeof signature !== "string") return false;

    const expected = await hmacHex(secret, payload);
    if (!timingSafeEqualHex(signature, expected)) return false;

    const data = JSON.parse(payload);
    return typeof data?.expiresAt === "number" && data.expiresAt > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Internal QA tooling. Present in the production bundle but must not be
  // reachable on the public domain — robots.txt only asks crawlers not to
  // look, it does not stop anyone with the URL.
  if (pathname === "/dev" || pathname.startsWith("/dev/")) {
    if (process.env.NODE_ENV === "production" && process.env.AVORRIA_ENABLE_DEV_TOOLS !== "true") {
      return new NextResponse(null, { status: 404 });
    }
    return NextResponse.next();
  }

  if (PUBLIC_ADMIN_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return NextResponse.next();
  }

  const authed = await hasValidSession(request.cookies.get(ADMIN_COOKIE_NAME)?.value);
  if (authed) return NextResponse.next();

  // API routes get a status, not a redirect to an HTML page.
  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const loginUrl = new URL("/admin/login", request.url);
  // Only ever round-trip an internal path.
  loginUrl.searchParams.set("next", pathname);
  const res = NextResponse.redirect(loginUrl);
  res.headers.set("Cache-Control", "no-store");
  return res;
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*", "/dev", "/dev/:path*"],
};
