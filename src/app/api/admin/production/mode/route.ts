import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/auth";
import { updateOperatingMode } from "@/lib/db/repository";
import type { OperatingMode } from "@/types/admin";

const MODE_ORDER: OperatingMode[] = [
  "TEST",
  "PILOT",
  "CONTROLLED_PRODUCTION",
  "SCALED_PRODUCTION",
  "FULL_AUTOPILOT",
];

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  let body: { new_mode?: OperatingMode; current_mode?: OperatingMode; reason?: string; confirmed_by?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { new_mode, current_mode, reason, confirmed_by } = body;
  if (!new_mode || !current_mode || !confirmed_by) {
    return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
  }

  if (new_mode === "FULL_AUTOPILOT") {
    return NextResponse.json({
      error: "FULL_AUTOPILOT is locked by policy and cannot be activated via API.",
      blocked: true,
    }, { status: 403 });
  }

  const fromIdx = MODE_ORDER.indexOf(current_mode);
  const toIdx = MODE_ORDER.indexOf(new_mode);
  if (toIdx > fromIdx + 1) {
    return NextResponse.json({
      error: `Cannot jump from ${current_mode} to ${new_mode}. Progressive rollout requires single-step transitions.`,
    }, { status: 400 });
  }

  await updateOperatingMode(new_mode, confirmed_by, reason);
  return NextResponse.json({ success: true, mode: new_mode });
}
