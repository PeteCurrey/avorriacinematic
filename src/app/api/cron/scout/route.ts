/**
 * AVORRIA — SCOUT CRON ENDPOINT
 * Vercel Cron: runs on schedule to trigger AI Scout.
 * Secured with CRON_SECRET.
 */

import { NextRequest, NextResponse } from "next/server";
import { getTargetingProfiles, createScoutRun, updateScoutRun } from "@/lib/db/repository";
import { runScout } from "@/lib/scout/engine";
import { isOpenAIConfigured } from "@/lib/ai/providers/openai";

export const runtime = "nodejs";
export const maxDuration = 300;

export async function GET(request: NextRequest): Promise<NextResponse> {
  // Verify cron secret
  const secret = process.env.CRON_SECRET;
  const auth = request.headers.get("authorization");

  if (secret && auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isOpenAIConfigured()) {
    return NextResponse.json({ error: "OPENAI_API_KEY not configured — Scout cannot run" }, { status: 503 });
  }

  const profiles = await getTargetingProfiles();
  const enabled = profiles.filter(p => p.enabled);

  if (enabled.length === 0) {
    return NextResponse.json({ message: "No active targeting profiles" });
  }

  const results = [];

  for (const profile of enabled) {
    const run = await createScoutRun({
      targeting_profile_id: profile.id,
      status: "running",
      test_mode: false,
      businesses_found: 0,
      businesses_new: 0,
      businesses_duplicate: 0,
      businesses_verified: 0,
      websites_analysed: 0,
      prospects_qualified: 0,
      prospects_rejected: 0,
      ai_cost_estimate: 0,
      error_count: 0,
      error_log: [],
      triggered_by: "cron",
    });

    try {
      const result = await runScout(profile, { testMode: false, triggeredBy: "cron" });
      await updateScoutRun(run.id, {
        status: result.errorCount > 0 ? "completed_with_errors" : "completed",
        started_at: run.created_at,
        completed_at: new Date().toISOString(),
        businesses_found: result.businessesFound,
        businesses_new: result.businessesNew,
        businesses_duplicate: result.businessesDuplicate,
        businesses_verified: result.businessesVerified,
        websites_analysed: result.websitesAnalysed,
        prospects_qualified: result.prospectsQualified,
        prospects_rejected: result.prospectsRejected,
        ai_cost_estimate: result.aiCostEstimate,
        error_count: result.errorCount,
        error_log: result.errors,
      });
      results.push({ profile: profile.name, status: "completed", qualified: result.prospectsQualified });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      await updateScoutRun(run.id, { status: "failed", error_log: [msg], completed_at: new Date().toISOString() });
      results.push({ profile: profile.name, status: "failed", error: msg });
    }
  }

  return NextResponse.json({ results });
}
