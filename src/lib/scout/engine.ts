/**
 * AVORRIA — AI SCOUT ENGINE
 *
 * Orchestrates the full Scout pipeline:
 * DISCOVER → DEDUPLICATE → VERIFY → INSPECT → SCREENSHOT → SCORE → QUALIFY → QUEUE
 *
 * Scout may: discover, research, analyse, score, qualify, queue.
 * Scout may NOT: approve prospects, generate sites, send outreach.
 */

import { runAITask } from "@/lib/ai/router";
import { inspectWebsite } from "@/lib/scout/website-inspector";
import { captureScreenshot } from "@/lib/scout/screenshot-provider";
import { isDuplicate, checkSuppression, normalizeDomain } from "@/lib/scout/deduplication";
import { calculateOpportunityScore } from "@/lib/ai-auto/scoring";
import {
  getKnownBusinesses,
  getSuppressions,
  persistQualifiedProspect,
  recordScoutRun,
} from "@/lib/db/scout-store";
import { verifyBusiness } from "@/lib/scout/verification";
import {
  validateDiscoveryResult,
  validateWebsiteAssessment,
  validateQualificationResult,
} from "@/lib/ai/types";
import type { TargetingProfile } from "@/types/admin";

// ============================================================================
// TYPES
// ============================================================================

export interface ScoutEngineOptions {
  testMode?: boolean;
  maxBusinesses?: number;
  triggeredBy?: string;
}

export interface ScoutRunResult {
  scoutRunId: string;
  businessesFound: number;
  businessesNew: number;
  businessesDuplicate: number;
  businessesVerified: number;
  websitesAnalysed: number;
  prospectsQualified: number;
  prospectsRejected: number;
  aiCostEstimate: number;
  errorCount: number;
  errors: string[];
  /** Qualified prospects that were successfully written to durable storage. */
  prospectsPersisted: number;
  /** Where the run's writes actually landed. */
  storageBackend: "supabase" | "memory";
}

// ============================================================================
// MAIN SCOUT RUN
// ============================================================================

export async function runScout(
  profile: TargetingProfile,
  options: ScoutEngineOptions = {}
): Promise<ScoutRunResult> {
  const { testMode = false, maxBusinesses = testMode ? 3 : profile.max_prospects_per_run, triggeredBy = "manual" } = options;

  const errors: string[] = [];
  let totalCost = 0;

  const result: ScoutRunResult = {
    scoutRunId: crypto.randomUUID(),
    businessesFound: 0,
    businessesNew: 0,
    businessesDuplicate: 0,
    businessesVerified: 0,
    websitesAnalysed: 0,
    prospectsQualified: 0,
    prospectsRejected: 0,
    aiCostEstimate: 0,
    errorCount: 0,
    errors: [],
    prospectsPersisted: 0,
    storageBackend: "memory",
  };

  try {
    // ── STEP 0: LOAD DURABLE STATE ────────────────────────────────────────
    // Deduplication and suppression are only meaningful against what previous
    // runs recorded. These reads throw on backend failure rather than yielding
    // an empty list — an empty suppression list reads as "nobody opted out",
    // which is how a sending domain gets blacklisted.
    const knownBusinesses = await getKnownBusinesses();
    const suppressions = await getSuppressions();

    // ── STEP 1: DISCOVER ──────────────────────────────────────────────────
    const discoveryOutput = await runAITask({
      task: "business_discovery",
      payload: {
        sectors: profile.sectors,
        cities: profile.cities,
        countries: profile.countries,
        radius_km: profile.radius_km,
        notes: profile.notes,
      },
      entityType: "scout_run",
      entityId: result.scoutRunId,
    });

    if (!discoveryOutput.success || !discoveryOutput.result) {
      errors.push(`Discovery failed: ${discoveryOutput.error || "Unknown error"}`);
      result.errorCount++;
      result.errors = errors;
      result.aiCostEstimate = totalCost;
      return result;
    }

    totalCost += discoveryOutput.usage.estimatedCost;
    const discovery = validateDiscoveryResult(discoveryOutput.result);
    const candidates = discovery.businesses.slice(0, maxBusinesses);
    result.businessesFound = candidates.length;

    if (candidates.length === 0) {
      result.errors = errors;
      result.aiCostEstimate = totalCost;
      return result;
    }

    // ── STEP 2–6: PROCESS EACH CANDIDATE ──────────────────────────────────
    for (const candidate of candidates) {
      try {
        // ── 2. SUPPRESSION CHECK ──────────────────────────────────────────
        if (candidate.website && checkSuppression(candidate.website, candidate.company_name, suppressions)) {
          result.businessesDuplicate++;
          continue;
        }

        // ── 3. DEDUPLICATION ─────────────────────────────────────────────
        const domain = candidate.website ? normalizeDomain(candidate.website) : "";
        const dupCheck = isDuplicate(
          { domain, phone: candidate.phone, companyName: candidate.company_name, city: candidate.city },
          knownBusinesses
        );
        if (dupCheck.isDuplicate) {
          result.businessesDuplicate++;
          continue;
        }
        result.businessesNew++;

        // ── 4. WEBSITE VERIFICATION ───────────────────────────────────────
        let verified = false;
        if (candidate.website) {
          const verification = await verifyBusiness(candidate.website, { timeoutMs: 10000 });
          if (verification.status === "verified" || verification.status === "needs_review") {
            verified = true;
            result.businessesVerified++;
          }
        }

        // ── 5. WEBSITE INSPECTION ─────────────────────────────────────────
        let websiteSignals = null;
        let screenshotBase64: string | undefined;

        if (candidate.website && verified) {
          websiteSignals = await inspectWebsite(candidate.website, { timeoutMs: 15000 });
          result.websitesAnalysed++;

          // Screenshot (optional — won't fail the pipeline)
          const screenshot = await captureScreenshot(candidate.website, "desktop");
          if (screenshot.status === "captured" && screenshot.imageBase64) {
            screenshotBase64 = screenshot.imageBase64;
          }
        }

        // ── 6. AI WEBSITE ANALYSIS ───────────────────────────────────────
        let websiteScore = 50; // Default if no website
        if (websiteSignals) {
          const analysisOutput = await runAITask({
            task: "website_analysis",
            payload: {
              signals: websiteSignals,
              companyName: candidate.company_name,
              screenshotBase64,
            },
            entityType: "business",
          });

          totalCost += analysisOutput.usage.estimatedCost;

          if (analysisOutput.success && analysisOutput.result) {
            const assessment = validateWebsiteAssessment(analysisOutput.result);
            websiteScore = assessment.website_quality_score;
          }
        }

        // ── 7. QUALIFICATION ─────────────────────────────────────────────
        if (websiteScore <= profile.max_website_quality_score) {
          const qualOutput = await runAITask({
            task: "prospect_qualification",
            payload: {
              business: {
                company_name: candidate.company_name,
                sector: candidate.sector,
                city: candidate.city,
                country: candidate.country,
                google_rating: candidate.google_rating,
                google_review_count: candidate.google_review_count,
              },
              assessment: {
                website_quality_score: websiteScore,
                visual_quality_score: websiteScore,
                mobile_score: websiteScore,
                conversion_score: websiteScore,
                summary: `Website quality score: ${websiteScore}/100`,
                major_issues: [],
                estimated_age: "Unknown",
                confidence: 0.6,
              },
            },
            entityType: "business",
          });

          totalCost += qualOutput.usage.estimatedCost;

          if (qualOutput.success && qualOutput.result) {
            const qual = validateQualificationResult(qualOutput.result);
            if (qual.qualifies) {
              result.prospectsQualified++;

              // Every input here comes from the inspector's real signals. A
              // candidate with no reachable website scores as a maximal gap
              // rather than a neutral default — no site IS the opportunity.
              const currentYear = new Date().getFullYear();
              const scoring = calculateOpportunityScore({
                websiteQualityScore: websiteScore,
                // A viewport meta tag is the mobile-readiness signal available
                // from HTML inspection alone; a real mobile score needs a
                // rendered capture, which the screenshot provider supplies
                // when configured.
                mobileScore: websiteSignals?.hasViewportMeta ? 75 : 25,
                hasOnlineBooking: Boolean(websiteSignals?.hasOnlineBooking),
                hasContactForm: Boolean(websiteSignals?.hasContactForm),
                hasClearCta: Boolean(websiteSignals?.hasClearCta),
                hasLiveChat: Boolean(websiteSignals?.hasLiveChat),
                hasSsl: Boolean(websiteSignals?.hasSSL),
                hasStructuredData: Boolean(websiteSignals?.hasStructuredData),
                hasRecentContent:
                  typeof websiteSignals?.copyrightYear === "number"
                    ? websiteSignals.copyrightYear >= currentYear - 2
                    : false,
                googleRating: candidate.google_rating,
                googleReviewCount: candidate.google_review_count,
                sector: candidate.sector || "Unknown",
              });

              const persisted = await persistQualifiedProspect({
                business: {
                  company_name: candidate.company_name,
                  website_url: candidate.website,
                  domain,
                  phone: candidate.phone,
                  city: candidate.city,
                  sector: candidate.sector || "Unknown",
                  source: "ai_scout",
                },
                assessment: {
                  // The qualification task returns a recommendation and a
                  // confidence, not a number — the opportunity score comes from
                  // the deterministic scoring engine so it stays comparable
                  // across runs and reproducible from stored signals.
                  opportunity_score: scoring.opportunityScore,
                  opportunity_band: scoring.opportunityBand,
                  website_quality_score: websiteScore,
                  reasoning: qual.reasoning,
                },
                scout_run_id: result.scoutRunId,
              });

              result.storageBackend = persisted.backend;

              if (persisted.ok) {
                result.prospectsPersisted++;
                // Keep in-run state current so a later candidate in the same
                // batch is deduplicated against this one.
                knownBusinesses.push({
                  id: persisted.businessId || "",
                  company_name: candidate.company_name,
                  domain,
                  phone: candidate.phone,
                  city: candidate.city,
                });
              } else {
                // Losing one prospect must not abort a run that has already
                // spent budget on the rest of the batch.
                errors.push(
                  `Qualified but not persisted: ${candidate.company_name} — ${persisted.error}`
                );
                result.errorCount++;
              }
            } else {
              result.prospectsRejected++;
            }
          } else {
            result.prospectsRejected++;
          }
        } else {
          result.prospectsRejected++;
        }

        // Spend guard
        if (totalCost >= profile.max_ai_spend_per_run) {
          errors.push(`AI spend limit reached: £${totalCost.toFixed(4)} >= £${profile.max_ai_spend_per_run}`);
          break;
        }

      } catch (candidateErr) {
        const msg = candidateErr instanceof Error ? candidateErr.message : "Unknown error";
        errors.push(`Error processing ${candidate.company_name}: ${msg.slice(0, 100)}`);
        result.errorCount++;
      }
    }

  } catch (fatalErr) {
    const msg = fatalErr instanceof Error ? fatalErr.message : "Unknown fatal error";
    errors.push(`Fatal Scout error: ${msg}`);
    result.errorCount++;
  }

  result.aiCostEstimate = totalCost;
  result.errors = errors;

  // Attribute cost and yield to the run. A failure here is logged, not thrown —
  // the run's own results are already computed and must still be returned.
  const runRecord = await recordScoutRun({
    id: result.scoutRunId,
    triggered_by: triggeredBy,
    businesses_found: result.businessesFound,
    businesses_new: result.businessesNew,
    prospects_qualified: result.prospectsQualified,
    ai_cost_estimate: result.aiCostEstimate,
    error_count: result.errorCount,
  });
  if (!runRecord.ok) {
    result.errors.push(`Scout run summary not recorded: ${runRecord.error}`);
  }
  result.storageBackend = runRecord.backend;

  return result;
}
