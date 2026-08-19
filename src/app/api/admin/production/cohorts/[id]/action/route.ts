import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/auth";
import { updateCohortStatus } from "@/lib/db/repository";
import type { CohortStatus } from "@/types/admin";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const { id } = await params;
  let body: { action?: string; reason?: string; confirmed_by?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { action, reason, confirmed_by } = body;
  if (!action || !confirmed_by) {
    return NextResponse.json({ error: "action and confirmed_by are required" }, { status: 400 });
  }

  let newStatus: CohortStatus = "running";
  if (action === "PAUSE") newStatus = "paused";
  if (action === "STOP") newStatus = "cancelled";
  if (action === "START") newStatus = "running";

  await updateCohortStatus(id, newStatus, confirmed_by, reason);
  return NextResponse.json({ success: true, cohort_id: id, status: newStatus });
}
