/**
 * AVORRIA — SCOUT PERSISTENCE
 *
 * The durable memory the Scout pipeline reasons against.
 *
 * WHY THIS EXISTS
 * The engine previously called `checkSuppression(url, name, [])` and
 * `isDuplicate(candidate, [])` — always with empty arrays — and never wrote a
 * qualified prospect anywhere. So every run rediscovered the same businesses,
 * re-spent AI budget on them, and could re-contact a company that had already
 * asked never to be contacted again. Deduplication and suppression are only
 * meaningful against state that survives the run.
 *
 * BACKEND
 * Supabase when configured, the in-process store otherwise, chosen per call.
 * Every function is async and returns plain domain shapes, so callers do not
 * need to know which backend answered.
 *
 * A Supabase error is never swallowed into a silent empty result: an empty
 * suppression list reads as "nobody has opted out", which is exactly the
 * failure that gets a sending domain blacklisted. Reads that back the
 * suppression decision throw; the engine treats that as a fatal run error.
 */

import { getSupabase, activeBackend, type StorageBackend } from "./supabase-client";
import { normalizeDomain, normalizePhone } from "@/lib/scout/deduplication";

// ============================================================================
// DOMAIN SHAPES
// ============================================================================

export interface KnownBusiness {
  id: string;
  company_name: string;
  domain: string;
  phone?: string;
  city?: string;
}

/**
 * Shape matches the `business_suppressions` columns AND the `SuppressionRecord`
 * that `checkSuppression` consumes. The name field is `company_name_pattern`
 * (a regex, per the schema) — populating a plain `company_name` instead would
 * type-check, because the field is optional, while silently never matching.
 */
export interface SuppressionEntry {
  id: string;
  domain?: string | null;
  company_name_pattern?: string | null;
  reason: string;
  created_at: string;
}

export interface QualifiedProspectInput {
  business: {
    company_name: string;
    website_url?: string;
    domain?: string;
    phone?: string;
    primary_email?: string;
    city?: string;
    sector: string;
    source: string;
  };
  assessment: {
    opportunity_score: number;
    opportunity_band: string;
    website_quality_score: number;
    reasoning?: string;
  };
  scout_run_id: string;
}

export interface PersistResult {
  ok: boolean;
  backend: StorageBackend;
  businessId?: string;
  prospectId?: string;
  error?: string;
}

// ============================================================================
// IN-PROCESS FALLBACK
// ============================================================================

interface MemoryState {
  businesses: KnownBusiness[];
  suppressions: SuppressionEntry[];
  prospects: Array<{ id: string; business_id: string; score: number; band: string; created_at: string }>;
}

const memory: MemoryState = { businesses: [], suppressions: [], prospects: [] };

/** Test/dev helper. Not used by production paths. */
export function __resetMemory(): void {
  memory.businesses = [];
  memory.suppressions = [];
  memory.prospects = [];
}

// ============================================================================
// READS
// ============================================================================

/**
 * Every business already known to the system, for duplicate detection.
 *
 * Throws on a backend error rather than returning an empty list — an empty
 * list means "nothing has been seen before", which would re-process and
 * re-contact the entire corpus.
 */
export async function getKnownBusinesses(limit = 5000): Promise<KnownBusiness[]> {
  const supabase = getSupabase();
  if (!supabase) return memory.businesses;

  const { data, error } = await supabase
    .from("businesses")
    .select("id, company_name, domain, phone, city")
    .limit(limit);

  if (error) {
    throw new Error(
      `Could not load known businesses for deduplication: ${error.message}. ` +
        `Refusing to proceed — an empty list would re-process every business.`
    );
  }

  return (data || []).map((r) => ({
    id: r.id as string,
    company_name: (r.company_name as string) || "",
    domain: (r.domain as string) || "",
    phone: (r.phone as string) || undefined,
    city: (r.city as string) || undefined,
  }));
}

/**
 * The do-not-contact list. Throws on a backend error for the same reason:
 * treating a failed read as "nobody opted out" is how you email someone who
 * explicitly asked you not to.
 */
export async function getSuppressions(limit = 5000): Promise<SuppressionEntry[]> {
  const supabase = getSupabase();
  if (!supabase) return memory.suppressions;

  const { data, error } = await supabase
    .from("business_suppressions")
    .select("id, domain, company_name_pattern, reason, created_at")
    .limit(limit);

  if (error) {
    throw new Error(
      `Could not load the suppression list: ${error.message}. ` +
        `Refusing to proceed — treating this as an empty list risks contacting a suppressed business.`
    );
  }

  return (data || []).map((r) => ({
    id: r.id as string,
    domain: (r.domain as string) || null,
    company_name_pattern: (r.company_name_pattern as string) || null,
    reason: (r.reason as string) || "unspecified",
    created_at: (r.created_at as string) || new Date().toISOString(),
  }));
}

// ============================================================================
// WRITES
// ============================================================================

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

/**
 * Persist a qualified prospect and the business behind it.
 *
 * A write failure is reported, never thrown: losing one prospect must not
 * abort a run that has already spent budget on the rest of the batch. The
 * engine counts these and surfaces them in the run summary.
 */
export async function persistQualifiedProspect(
  input: QualifiedProspectInput
): Promise<PersistResult> {
  const backend = activeBackend();
  const supabase = getSupabase();
  const domain = input.business.domain || normalizeDomain(input.business.website_url || "");

  if (!supabase) {
    const businessId = `biz_mem_${crypto.randomUUID()}`;
    const prospectId = `pros_mem_${crypto.randomUUID()}`;
    memory.businesses.push({
      id: businessId,
      company_name: input.business.company_name,
      domain,
      phone: input.business.phone ? normalizePhone(input.business.phone) : undefined,
      city: input.business.city,
    });
    memory.prospects.push({
      id: prospectId,
      business_id: businessId,
      score: input.assessment.opportunity_score,
      band: input.assessment.opportunity_band,
      created_at: new Date().toISOString(),
    });
    return { ok: true, backend, businessId, prospectId };
  }

  try {
    // Business first — the prospect and assessment both reference it.
    const { data: bizRow, error: bizErr } = await supabase
      .from("businesses")
      .insert({
        company_name: input.business.company_name,
        slug: `${slugify(input.business.company_name)}-${Date.now().toString(36)}`,
        website_url: input.business.website_url || null,
        domain: domain || null,
        phone: input.business.phone || null,
        primary_email: input.business.primary_email || null,
        city: input.business.city || null,
        sector: input.business.sector,
        source: input.business.source,
      })
      .select("id")
      .single();

    if (bizErr || !bizRow) {
      return { ok: false, backend, error: `business insert failed: ${bizErr?.message}` };
    }
    const businessId = bizRow.id as string;

    const { data: assessRow, error: assessErr } = await supabase
      .from("prospect_assessments")
      .insert({
        business_id: businessId,
        opportunity_score: input.assessment.opportunity_score,
        opportunity_band: input.assessment.opportunity_band,
        website_quality_score: input.assessment.website_quality_score,
        visual_quality_score: input.assessment.website_quality_score,
        mobile_score: input.assessment.website_quality_score,
        seo_score: input.assessment.website_quality_score,
        conversion_score: input.assessment.website_quality_score,
        trust_score: input.assessment.website_quality_score,
        business_quality_score: input.assessment.website_quality_score,
        commercial_value_score: input.assessment.opportunity_score,
      })
      .select("id")
      .single();

    if (assessErr) {
      return { ok: false, backend, businessId, error: `assessment insert failed: ${assessErr.message}` };
    }

    const { data: prospectRow, error: prospectErr } = await supabase
      .from("prospects")
      .insert({
        business_id: businessId,
        assessment_id: assessRow?.id ?? null,
        status: "pending_review",
        scout_run_id: input.scout_run_id,
      })
      .select("id")
      .single();

    if (prospectErr) {
      return { ok: false, backend, businessId, error: `prospect insert failed: ${prospectErr.message}` };
    }

    return { ok: true, backend, businessId, prospectId: prospectRow?.id as string };
  } catch (err) {
    return {
      ok: false,
      backend,
      error: err instanceof Error ? err.message : "unknown persistence error",
    };
  }
}

/** Add a business to the do-not-contact list. */
export async function addSuppressionEntry(
  entry: { domain?: string; company_name_pattern?: string; reason: string }
): Promise<PersistResult> {
  const backend = activeBackend();
  const supabase = getSupabase();

  if (!supabase) {
    memory.suppressions.push({
      id: `sup_mem_${crypto.randomUUID()}`,
      domain: entry.domain ? normalizeDomain(entry.domain) : null,
      company_name_pattern: entry.company_name_pattern ?? null,
      reason: entry.reason,
      created_at: new Date().toISOString(),
    });
    return { ok: true, backend };
  }

  const { error } = await supabase.from("business_suppressions").insert({
    domain: entry.domain ? normalizeDomain(entry.domain) : null,
    company_name_pattern: entry.company_name_pattern || null,
    reason: entry.reason,
  });

  return error ? { ok: false, backend, error: error.message } : { ok: true, backend };
}

/** Record the run itself so cost and yield are attributable. */
export async function recordScoutRun(run: {
  id: string;
  triggered_by: string;
  businesses_found: number;
  businesses_new: number;
  prospects_qualified: number;
  ai_cost_estimate: number;
  error_count: number;
}): Promise<PersistResult> {
  const backend = activeBackend();
  const supabase = getSupabase();
  if (!supabase) return { ok: true, backend };

  const { error } = await supabase.from("scout_runs").insert({
    id: run.id,
    triggered_by: run.triggered_by,
    businesses_found: run.businesses_found,
    businesses_new: run.businesses_new,
    prospects_qualified: run.prospects_qualified,
    ai_cost_estimate: run.ai_cost_estimate,
    error_count: run.error_count,
  });

  return error ? { ok: false, backend, error: error.message } : { ok: true, backend };
}
