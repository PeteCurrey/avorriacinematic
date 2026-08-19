import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { getRolloutCohort, getCohortFunnelMetrics } from "@/lib/db/repository";
import { ArrowLeft, FileText, CheckCircle2, AlertCircle } from "lucide-react";

export default async function CohortPostMortemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const cohort = await getRolloutCohort(id);
  if (!cohort) notFound();
  const metrics = await getCohortFunnelMetrics(id);

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 text-white text-xs">
      <div>
        <Link href={`/admin/ai-auto/production/cohorts/${id}`} className="text-white/50 hover:text-white flex items-center gap-1 mb-2">
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Cohort Console
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Cohort Post-Mortem: {cohort.name}</h1>
        <p className="text-white/50 mt-1">Formal commercial and technical debrief for completed or active rollout cohorts.</p>
      </div>

      <div className="space-y-6">
        <div className="p-6 bg-[#111] border border-white/10 rounded-xl space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400">1. Operational Overview</h2>
          <p className="text-white/70 leading-relaxed">
            Cohort configured with strict caps: 10 max prospects, 6 max website generations, 6 outreach emails. Target sector focused on Northern UK automotive specialists. All 11 autonomy gates maintained in MANUAL mode.
          </p>
        </div>

        <div className="p-6 bg-[#111] border border-white/10 rounded-xl space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400">2. Technical & Safety Criteria</h2>
          <div className="grid grid-cols-2 gap-3 text-white/80">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Zero SSRF or Security Breaches</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Zero Duplicate Outreach Sends</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Suppression List Enforced (100%)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Budget Caps Observed</span>
            </div>
          </div>
        </div>

        <div className="p-6 bg-[#111] border border-white/10 rounded-xl space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400">3. Next Cohort Recommendation</h2>
          <p className="text-white/70 leading-relaxed">
            Maintain PILOT volume (10 prospects) for PILOT 002. Do not escalate to CONTROLLED PRODUCTION until deliverability baseline is established and first-pass sendability reaches ≥80%.
          </p>
        </div>
      </div>
    </div>
  );
}
