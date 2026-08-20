import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/auth";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { generateMockup } from "@/lib/factory/mockup-pipeline";

/**
 * POST /api/admin/mockups/generate
 *
 * Generates a website concept for a prospect and returns a preview link.
 *
 * Admin-only (also covered by the edge guard on /api/admin/*). This route
 * spends real model budget per call, so it is rate limited per operator on
 * top of the pipeline's own per-run cost cap.
 *
 * It never contacts the prospect. Delivering the preview goes through the
 * outreach engine, which owns the suppression, cap and duplicate-send gates.
 */

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  let session;
  try {
    session = await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const limit = checkRateLimit(`mockup_generate:${session.user.id}`, {
    maxRequests: 10,
    windowSeconds: 3600,
  });
  if (!limit.allowed) {
    return NextResponse.json(
      {
        error: "Generation limit reached for this hour.",
        retryInSeconds: limit.resetInSeconds,
      },
      { status: 429, headers: { "Retry-After": String(limit.resetInSeconds) } }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const prospectId = typeof body.prospect_id === "string" ? body.prospect_id.trim() : "";
  const businessId = typeof body.business_id === "string" ? body.business_id.trim() : "";
  const companyName = typeof body.company_name === "string" ? body.company_name.trim() : "";

  if (!prospectId || !businessId || !companyName) {
    return NextResponse.json(
      { error: "prospect_id, business_id and company_name are required" },
      { status: 400 }
    );
  }

  const result = await generateMockup({
    prospect_id: prospectId,
    business_id: businessId,
    company_name: companyName,
    sector: typeof body.sector === "string" ? body.sector : "Unknown",
    location: typeof body.location === "string" ? body.location : "Unknown",
    google_rating: typeof body.google_rating === "number" ? body.google_rating : null,
    google_review_count:
      typeof body.google_review_count === "number" ? body.google_review_count : null,
    website_assessment: body.website_assessment as Record<string, unknown> | undefined,
    research: body.research as Record<string, unknown> | undefined,
    existing_brand_colours: Array.isArray(body.existing_brand_colours)
      ? (body.existing_brand_colours as string[])
      : undefined,
    screenshot_available: body.screenshot_available === true,
    maxAiCost: typeof body.max_ai_cost === "number" ? body.max_ai_cost : undefined,
  });

  // A failed generation is a 200 with ok:false — the caller needs the partial
  // result (cost spent, project id, warnings) to decide what to do next, and
  // an HTTP error would discard it.
  return NextResponse.json({
    ok: result.ok,
    status: result.status,
    siteProjectId: result.siteProjectId,
    previewUrl: result.previewUrl,
    qa: {
      passed: result.qaPassed,
      score: result.qaScore,
      aiSlopScore: result.aiSlopScore,
    },
    aiCost: result.aiCost,
    costCapped: result.costCapped,
    warnings: result.warnings,
    errors: result.errors,
    // Explicit so an operator is never left guessing whether this reached
    // the prospect. It never does from here.
    delivered: false,
  });
}
