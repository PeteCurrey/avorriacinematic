/**
 * AVORRIA — MOCKUP PIPELINE
 *
 * Turns a qualified prospect into a hosted website concept they can look at.
 *
 *   brief -> design tokens -> strategy -> site configuration -> QA -> preview link
 *
 * Every stage already existed in `creative-director.ts`; nothing chained them,
 * so there was no path from a prospect to a preview URL.
 *
 * HUMAN GATE
 * This pipeline never sends anything. It produces a preview link and leaves
 * the project in `preview_ready` (QA passed) or `needs_review` (QA failed or
 * did not run). Delivering the link to a prospect goes through the outreach
 * engine, which owns the suppression, cap and duplicate-send gates. Keeping
 * generation and delivery separate means a QA failure can never be one
 * mis-set flag away from mailing a bad mockup to a real business.
 *
 * COST
 * Each run makes several model calls. `maxAiCost` caps the run and is checked
 * between stages, so a runaway generation stops at a known boundary rather
 * than after the fact.
 */

import {
  generateCreativeBrief,
  generateSiteStrategy,
  generateSiteConfiguration,
  deriveDesignTokens,
  runDesignReview,
  type CreativeBriefInput,
} from "@/lib/factory/creative-director";
import {
  createSiteProject,
  updateSiteProject,
  saveSiteVersion,
  saveCreativeBrief,
  saveDesignReview,
  createPreviewLink,
} from "@/lib/db/repository";
import type { SiteProject, SiteVersion } from "@/types/admin";

export interface MockupRequest {
  prospect_id: string;
  business_id: string;
  company_name: string;
  sector: string;
  location: string;
  google_rating?: number | null;
  google_review_count?: number | null;
  website_assessment?: Record<string, unknown>;
  research?: Record<string, unknown>;
  existing_brand_colours?: string[];
  screenshot_available?: boolean;
  /** Hard ceiling on model spend for this run, in the router's cost units. */
  maxAiCost?: number;
  /** How long the prospect's preview link stays live. */
  previewExpiresInDays?: number;
}

export interface MockupResult {
  ok: boolean;
  /** "preview_ready" only when QA passed. */
  status: SiteProject["status"];
  siteProjectId?: string;
  previewToken?: string;
  previewUrl?: string;
  qaPassed: boolean;
  qaScore?: number;
  aiSlopScore?: number;
  aiCost: number;
  /** True when generation stopped because it hit maxAiCost. */
  costCapped: boolean;
  warnings: string[];
  errors: string[];
}

const DEFAULT_MAX_AI_COST = 2.0;
const DEFAULT_PREVIEW_DAYS = 30;

function slugify(name: string): string {
  return (
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 50) || "concept"
  );
}

export async function generateMockup(request: MockupRequest): Promise<MockupResult> {
  const maxCost = request.maxAiCost ?? DEFAULT_MAX_AI_COST;
  const result: MockupResult = {
    ok: false,
    status: "generating",
    qaPassed: false,
    aiCost: 0,
    costCapped: false,
    warnings: [],
    errors: [],
  };

  const overBudget = () => result.aiCost >= maxCost;

  // ── 1. CREATIVE BRIEF ──────────────────────────────────────────────────
  const briefInput: CreativeBriefInput = {
    prospect_id: request.prospect_id,
    business_id: request.business_id,
    company_name: request.company_name,
    sector: request.sector,
    location: request.location,
    google_rating: request.google_rating,
    google_review_count: request.google_review_count,
    website_assessment: request.website_assessment,
    research: request.research,
    existing_brand_colours: request.existing_brand_colours,
    screenshot_available: request.screenshot_available,
  };

  const briefOutput = await generateCreativeBrief(briefInput);
  result.aiCost += briefOutput.ai_cost;

  if (!briefOutput.success || !briefOutput.brief) {
    result.status = "needs_review";
    result.errors.push(`Creative brief failed: ${briefOutput.error || "no brief returned"}`);
    return result;
  }
  const brief = briefOutput.brief;

  // The brief is the most reusable artefact — persist before anything that
  // could fail downstream, so a later error does not discard paid-for work.
  try {
    await saveCreativeBrief(brief);
  } catch (err) {
    result.warnings.push(
      `Brief generated but not persisted: ${err instanceof Error ? err.message : "unknown"}`
    );
  }

  if (overBudget()) {
    result.status = "needs_review";
    result.costCapped = true;
    result.errors.push(`AI spend cap reached after brief (${result.aiCost.toFixed(4)}/${maxCost}).`);
    return result;
  }

  // ── 2. PROJECT SHELL ───────────────────────────────────────────────────
  let project: SiteProject;
  try {
    project = await createSiteProject({
      prospect_id: request.prospect_id,
      business_id: request.business_id,
      creative_brief_id: brief.id ?? null,
      site_strategy_id: null,
      status: "generating",
      slug: `${slugify(request.company_name)}-${Date.now().toString(36)}`,
      title: `${request.company_name} — Website Concept`,
      current_version_id: null,
      preview_status: "generating",
      ai_cost_total: result.aiCost,
      auto_revision_count: 0,
      max_auto_revisions: 2,
    });
    result.siteProjectId = project.id;
  } catch (err) {
    result.status = "needs_review";
    result.errors.push(
      `Could not create site project: ${err instanceof Error ? err.message : "unknown"}`
    );
    return result;
  }

  // ── 3. STRATEGY & TOKENS ───────────────────────────────────────────────
  const designTokens = deriveDesignTokens(brief);

  let strategy: Record<string, unknown> | undefined;
  const strategyOutput = await generateSiteStrategy(brief, request.research ?? {});
  result.aiCost += strategyOutput.ai_cost;
  if (strategyOutput.success && strategyOutput.strategy) {
    strategy = strategyOutput.strategy as Record<string, unknown>;
  } else {
    // A missing strategy is recoverable — generation falls back to the brief.
    result.warnings.push(`Strategy step skipped: ${strategyOutput.error || "no strategy returned"}`);
  }

  if (overBudget()) {
    result.costCapped = true;
    result.errors.push(`AI spend cap reached after strategy (${result.aiCost.toFixed(4)}/${maxCost}).`);
    await finalise(project.id, "needs_review", "error", result.aiCost);
    result.status = "needs_review";
    return result;
  }

  // ── 4. SITE CONFIGURATION ──────────────────────────────────────────────
  const generation = await generateSiteConfiguration({
    site_project_id: project.id,
    brief,
    strategy,
    research: request.research,
    design_tokens: designTokens,
  });
  result.aiCost += generation.ai_cost;
  result.warnings.push(...generation.warnings);

  if (!generation.success || !generation.version) {
    result.errors.push(...generation.errors, "Site generation produced no version");
    await finalise(project.id, "needs_review", "error", result.aiCost);
    result.status = "needs_review";
    return result;
  }

  const version: SiteVersion = {
    ...(generation.version as SiteVersion),
    id: generation.version.id ?? crypto.randomUUID(),
    site_project_id: project.id,
    version: generation.version.version ?? 1,
    created_at: generation.version.created_at ?? new Date().toISOString(),
  };

  try {
    await saveSiteVersion(version);
    await updateSiteProject(project.id, {
      current_version_id: version.id,
      status: "ready_for_qa",
    });
  } catch (err) {
    result.errors.push(
      `Could not save site version: ${err instanceof Error ? err.message : "unknown"}`
    );
    await finalise(project.id, "needs_review", "error", result.aiCost);
    result.status = "needs_review";
    return result;
  }

  // ── 5. QA ──────────────────────────────────────────────────────────────
  // A concept that fails QA still gets a preview link — an operator needs to
  // look at it to decide. What it does NOT get is `preview_ready`, which is
  // the status the delivery path keys off.
  const review = await runDesignReview(
    (version.configuration ?? {}) as Record<string, unknown>,
    designTokens,
    brief.positioning ?? brief.strategy_summary ?? undefined,
    request.screenshot_available
  );
  result.aiCost += review.ai_cost;
  result.qaPassed = review.passed;
  result.qaScore = review.overall_score;
  result.aiSlopScore = review.ai_slop_score;

  if (review.success && review.review) {
    try {
      await saveDesignReview({
        id: crypto.randomUUID(),
        site_project_id: project.id,
        site_version_id: version.id,
        ...(review.review as Record<string, unknown>),
        created_at: new Date().toISOString(),
      } as never);
    } catch (err) {
      result.warnings.push(
        `Design review not persisted: ${err instanceof Error ? err.message : "unknown"}`
      );
    }
  } else if (!review.success) {
    result.warnings.push(`QA did not run: ${review.error || "unknown"}`);
  }

  // ── 6. PREVIEW LINK ────────────────────────────────────────────────────
  try {
    const link = await createPreviewLink(project.id, {
      expiresInDays: request.previewExpiresInDays ?? DEFAULT_PREVIEW_DAYS,
      presentationMode: true,
    });
    result.previewToken = link.token;

    const origin =
      process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_SITE_URL || "";
    result.previewUrl = origin ? `${origin}/preview/${link.token}` : `/preview/${link.token}`;
  } catch (err) {
    result.errors.push(
      `Could not create preview link: ${err instanceof Error ? err.message : "unknown"}`
    );
    await finalise(project.id, "needs_review", "error", result.aiCost);
    result.status = "needs_review";
    return result;
  }

  // Only a concept that actually passed QA reaches preview_ready.
  const finalStatus: SiteProject["status"] = review.passed ? "preview_ready" : "needs_review";
  await finalise(project.id, finalStatus, "live", result.aiCost);

  result.status = finalStatus;
  result.ok = true;
  return result;
}

async function finalise(
  projectId: string,
  status: SiteProject["status"],
  previewStatus: SiteProject["preview_status"],
  aiCost: number
): Promise<void> {
  try {
    await updateSiteProject(projectId, {
      status,
      preview_status: previewStatus,
      ai_cost_total: aiCost,
    });
  } catch {
    // The caller already has the outcome in its result; a bookkeeping failure
    // here must not mask it.
  }
}
