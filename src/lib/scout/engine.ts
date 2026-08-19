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
  };

  try {
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
        if (candidate.website && checkSuppression(candidate.website, candidate.company_name, [])) {
          result.businessesDuplicate++;
          continue;
        }

        // ── 3. DEDUPLICATION ─────────────────────────────────────────────
        const domain = candidate.website ? normalizeDomain(candidate.website) : "";
        const dupCheck = isDuplicate({ domain, phone: candidate.phone, companyName: candidate.company_name, city: candidate.city }, []);
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
              // In production: call repository.createProspect()
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
  return result;
}
