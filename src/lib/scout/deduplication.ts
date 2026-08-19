/**
 * AVORRIA — BUSINESS DEDUPLICATION
 *
 * Deterministic matching before AI is involved.
 * AI is used only for ambiguous duplicate resolution.
 */

// ============================================================================
// DOMAIN NORMALISATION
// ============================================================================

export function normalizeDomain(input: string): string {
  if (!input) return "";
  let url = input.trim().toLowerCase();

  // Add protocol if missing so URL parser works
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }

  try {
    const parsed = new URL(url);
    let hostname = parsed.hostname;
    // Strip leading www.
    if (hostname.startsWith("www.")) hostname = hostname.slice(4);
    return hostname;
  } catch {
    // Fall back to regex stripping
    return url
      .replace(/^https?:\/\//, "")
      .replace(/^www\./, "")
      .replace(/\/.*$/, "")
      .trim();
  }
}

// ============================================================================
// PHONE NORMALISATION
// ============================================================================

export function normalizePhone(phone: string): string {
  if (!phone) return "";
  // Strip all non-numeric characters except leading +
  let normalized = phone.trim().replace(/[^\d+]/g, "");
  // Convert UK 07... to +447...
  if (normalized.startsWith("07") && normalized.length === 11) {
    normalized = "+44" + normalized.slice(1);
  }
  // Convert UK 01/02 to +441/+442
  if ((normalized.startsWith("01") || normalized.startsWith("02")) && normalized.length === 11) {
    normalized = "+44" + normalized.slice(1);
  }
  return normalized;
}

// ============================================================================
// DUPLICATE DETECTION
// ============================================================================

export interface DuplicateCheckResult {
  isDuplicate: boolean;
  matchedId?: string;
  matchReason?: string;
}

export interface ExistingBusinessRecord {
  id: string;
  domain?: string | null;
  phone?: string | null;
  company_name: string;
  city?: string | null;
}

export function isDuplicate(
  candidate: { domain?: string; phone?: string; companyName: string; city?: string },
  existing: ExistingBusinessRecord[]
): DuplicateCheckResult {
  const candidateDomain = candidate.domain ? normalizeDomain(candidate.domain) : "";
  const candidatePhone  = candidate.phone  ? normalizePhone(candidate.phone)   : "";
  const candidateName   = candidate.companyName.toLowerCase().trim();

  for (const biz of existing) {
    // 1. Exact domain match (strongest signal)
    if (candidateDomain && biz.domain) {
      const existingDomain = normalizeDomain(biz.domain);
      if (candidateDomain === existingDomain) {
        return { isDuplicate: true, matchedId: biz.id, matchReason: `Domain match: ${candidateDomain}` };
      }
    }

    // 2. Exact phone match
    if (candidatePhone && biz.phone) {
      const existingPhone = normalizePhone(biz.phone);
      if (candidatePhone.length >= 10 && candidatePhone === existingPhone) {
        return { isDuplicate: true, matchedId: biz.id, matchReason: `Phone match: ${candidatePhone}` };
      }
    }

    // 3. Very close name + same city (fuzzy name match)
    const existingName = biz.company_name.toLowerCase().trim();
    if (
      candidate.city &&
      biz.city &&
      candidate.city.toLowerCase() === biz.city.toLowerCase() &&
      nameSimilarity(candidateName, existingName) >= 0.85
    ) {
      return {
        isDuplicate: true,
        matchedId: biz.id,
        matchReason: `Name similarity (${Math.round(nameSimilarity(candidateName, existingName) * 100)}%) + same city`,
      };
    }
  }

  return { isDuplicate: false };
}

/** Simple character-overlap similarity score between 0 and 1. */
function nameSimilarity(a: string, b: string): number {
  if (a === b) return 1;
  if (!a || !b) return 0;
  const longer  = a.length > b.length ? a : b;
  const shorter = a.length > b.length ? b : a;
  const longerLen = longer.length;
  if (longerLen === 0) return 1;
  return (longerLen - editDistance(longer, shorter)) / longerLen;
}

function editDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

// ============================================================================
// SUPPRESSION CHECK
// ============================================================================

export interface SuppressionRecord {
  domain?: string | null;
  company_name_pattern?: string | null;
}

export function checkSuppression(
  domain: string,
  companyName: string,
  suppressions: SuppressionRecord[]
): boolean {
  const normalizedDomain = normalizeDomain(domain);
  const lowerName = companyName.toLowerCase();

  for (const s of suppressions) {
    if (s.domain && normalizedDomain && normalizeDomain(s.domain) === normalizedDomain) {
      return true;
    }
    if (s.company_name_pattern) {
      try {
        const pattern = new RegExp(s.company_name_pattern, "i");
        if (pattern.test(lowerName)) return true;
      } catch {
        // Invalid regex — fall back to simple string match
        if (lowerName.includes(s.company_name_pattern.toLowerCase())) return true;
      }
    }
  }
  return false;
}
