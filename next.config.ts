import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// CSP — compatible with GSAP (inline styles), Next.js runtime, Google Fonts
// Using report-only in dev, enforcement in production
const cspDirectives = [
  "default-src 'self'",
  // Next.js uses inline scripts for hydration — unsafe-inline required unless nonces are implemented
  "script-src 'self' 'unsafe-inline'",
  // GSAP writes inline styles; Tailwind generates inline style attributes
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob:",
  "media-src 'self' blob:",
  "connect-src 'self'",
  "worker-src blob:",
  "frame-src 'none'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  // Content Security Policy (report-only during initial deployment, switch to enforcement)
  {
    key: isDev ? "Content-Security-Policy-Report-Only" : "Content-Security-Policy",
    value: cspDirectives,
  },
  // Prevent MIME type sniffing
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // Prevent clickjacking (belt-and-suspenders with CSP frame-ancestors)
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  // Control referrer information sent with requests
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // Restrict browser feature access — allow microphone only on self (Lab voice experiment)
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(self), geolocation=(), payment=()",
  },
  // HSTS — only effective over HTTPS; hosting platform (Vercel) typically handles this
  // Included for completeness; preload NOT enabled without explicit opt-in understanding
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Allows a second Next process (e.g. a dev server used for visual QA) to run
  // against its own build output without clobbering the .next directory that a
  // running `next start` is serving from. Unset in normal use.
  ...(process.env.NEXT_DIST_DIR ? { distDir: process.env.NEXT_DIST_DIR } : {}),
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: []
  },
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/capabilities",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/capabilities/build",
        destination: "/services/websites",
        permanent: true,
      },
      {
        source: "/capabilities/search",
        destination: "/services/seo",
        permanent: true,
      },
      {
        source: "/capabilities/systems",
        destination: "/services/ai-automation",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;


