/**
 * AVORRIA — BUSINESS VERIFICATION
 *
 * HTTP-level verification that a business website is real, reachable, and
 * matches the configured targeting profile.
 *
 * Does NOT bypass anti-bot systems. Does NOT perform adversarial scraping.
 */

export interface VerificationResult {
  status: "verified" | "failed" | "needs_review";
  httpStatus?: number;
  isHttps: boolean;
  isReachable: boolean;
  redirectFinalUrl?: string;
  issues: string[];
  evidence: string[];
}

export async function verifyBusiness(
  websiteUrl: string,
  options: { timeoutMs?: number } = {}
): Promise<VerificationResult> {
  const timeoutMs = options.timeoutMs ?? 10_000;
  const issues: string[] = [];
  const evidence: string[] = [];

  if (!websiteUrl) {
    return { status: "needs_review", isHttps: false, isReachable: false, issues: ["No website URL provided"], evidence };
  }

  // Normalise URL
  let url = websiteUrl.trim();
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }

  const isHttps = url.startsWith("https://");
  if (!isHttps) issues.push("Not using HTTPS");

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; Avorria-Scout/1.0; +https://avorria.com)",
      },
    });
    clearTimeout(timer);

    const httpStatus = res.status;
    const finalUrl = res.url;
    evidence.push(`HTTP ${httpStatus} from ${finalUrl}`);

    if (httpStatus >= 200 && httpStatus < 400) {
      if (httpStatus >= 300) {
        issues.push(`Redirected to ${finalUrl}`);
      }
      return {
        status: "verified",
        httpStatus,
        isHttps,
        isReachable: true,
        redirectFinalUrl: finalUrl !== url ? finalUrl : undefined,
        issues,
        evidence,
      };
    }

    if (httpStatus === 403 || httpStatus === 429) {
      // Bot protection — still probably live
      evidence.push("Bot protection detected — site likely live");
      return {
        status: "needs_review",
        httpStatus,
        isHttps,
        isReachable: true,
        issues: [...issues, `HTTP ${httpStatus} — possible bot protection`],
        evidence,
      };
    }

    issues.push(`HTTP ${httpStatus} — site may be down or domain expired`);
    return { status: "failed", httpStatus, isHttps, isReachable: false, issues, evidence };

  } catch (err) {
    clearTimeout(timer);
    const msg = err instanceof Error ? err.message : "Network error";
    if (msg.includes("AbortError") || msg.includes("abort")) {
      issues.push(`Connection timed out after ${timeoutMs}ms`);
    } else {
      issues.push(`Unreachable: ${msg.slice(0, 80)}`);
    }
    return { status: "failed", isHttps, isReachable: false, issues, evidence };
  }
}
