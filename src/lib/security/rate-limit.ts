/**
 * AVORRIA — RATE LIMITING
 * In-memory sliding window rate limiter for public forms, proposals, and API endpoints.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const cache = new Map<string, RateLimitEntry>();

export function checkRateLimit(
  key: string,
  options: { maxRequests: number; windowSeconds: number }
): { allowed: boolean; remaining: number; resetInSeconds: number } {
  const now = Date.now();
  const entry = cache.get(key);

  if (!entry || now > entry.resetAt) {
    cache.set(key, { count: 1, resetAt: now + options.windowSeconds * 1000 });
    return { allowed: true, remaining: options.maxRequests - 1, resetInSeconds: options.windowSeconds };
  }

  if (entry.count >= options.maxRequests) {
    const resetInSeconds = Math.ceil((entry.resetAt - now) / 1000);
    return { allowed: false, remaining: 0, resetInSeconds };
  }

  entry.count++;
  const resetInSeconds = Math.ceil((entry.resetAt - now) / 1000);
  return { allowed: true, remaining: options.maxRequests - entry.count, resetInSeconds };
}
