/**
 * AVORRIA — SSRF DEFENCE
 * Prevents requests to localhost, private RFC1918 ranges, cloud metadata endpoints,
 * loopbacks, link-local addresses, and non-http(s) protocols.
 */

const BLOCKED_HOSTNAMES = new Set([
  "localhost",
  "127.0.0.1",
  "0.0.0.0",
  "::1",
  "169.254.169.254", // AWS/GCP/Azure instance metadata
  "metadata.google.internal",
  "instance-data",
]);

export function isSafeUrl(rawUrl: string): { safe: boolean; reason?: string; url?: URL } {
  try {
    const parsed = new URL(rawUrl);

    // Protocol check
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return { safe: false, reason: `Disallowed protocol: ${parsed.protocol}` };
    }

    const host = parsed.hostname.toLowerCase();

    // Blocked hostnames
    if (BLOCKED_HOSTNAMES.has(host)) {
      return { safe: false, reason: `Access to ${host} is restricted` };
    }

    // IP address checks
    if (isPrivateIPv4(host)) {
      return { safe: false, reason: `Private IPv4 address blocked: ${host}` };
    }

    return { safe: true, url: parsed };
  } catch (err) {
    return { safe: false, reason: "Malformed URL" };
  }
}

function isPrivateIPv4(ip: string): boolean {
  const parts = ip.split(".").map(Number);
  if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) {
    return false; // Not a valid IPv4 string, domain name check will handle
  }

  // 127.0.0.0/8 (Loopback)
  if (parts[0] === 127) return true;
  // 10.0.0.0/8 (Private)
  if (parts[0] === 10) return true;
  // 172.16.0.0/12 (Private)
  if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return true;
  // 192.168.0.0/16 (Private)
  if (parts[0] === 192 && parts[1] === 168) return true;
  // 169.254.0.0/16 (Link-local)
  if (parts[0] === 169 && parts[1] === 254) return true;
  // 0.0.0.0/8
  if (parts[0] === 0) return true;

  return false;
}
