import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { 
  getRolloutCohort, 
  getCohortFunnelMetrics, 
  getCohortGatePolicies, 
  getCohortEvents,
  getProductionDefects 
} from "@/lib/db/repository";
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  StopCircle, 
  ShieldCheck, 
  Sliders, 
  Clock, 
  Layers, 
  CheckCircle2, 
  AlertTriangle,
  Zap
} from "lucide-react";

export default async function CohortDashboardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const cohort = await getRolloutCohort(id);
  if (!cohort) notFound();

  const metrics = await getCohortFunnelMetrics(id);
  const gates = await getCohortGatePolicies(id);
  const events = await getCohortEvents(id);
  const defects = await getProductionDefects(id);

  const funnelSteps = [
    { label: "Discovered", count: metrics.discovered },
    { label: "Verified", count: metrics.verified },
    { label: "Qualified", count: metrics.qualified },
    { label: "Reviewed", count: metrics.reviewed },
    { label: "Approved", count: metrics.approved },
    { label: "Researched", count: metrics.researched },
    { label: "Designed", count: metrics.designed },
    { label: "Generated", count: metrics.generated },
    { label: "QA Passed", count: metrics.qa_passed },
    { label: "Outreach Approved", count: metrics.outreach_approved },
    { label: "Sent", count: metrics.sent },
    { label: "Viewed", count: metrics.preview_viewed },
    { label: "Replied", count: metrics.replied },
    { label: "Opportunity", count: metrics.opportunity },
    { label: "Client", count: metrics.client },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 text-white text-xs">
      {/* HEADER & CONTROLS */}
      <div className="flex justify-between items-start border-b border-white/10 pb-6">
        <div>
          <Link href="/admin/ai-auto/production/cohorts" className="text-white/50 hover:text-white flex items-center gap-1 mb-2">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Rollout Cohorts
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight">{cohort.name}</h1>
            <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
              {cohort.status}
            </span>
            <span className="bg-white/10 text-white/70 px-2 py-0.5 rounded text-[10px] font-bold">
              {cohort.environment}
            </span>
          </div>
          <p className="text-white/50 mt-1">{cohort.notes}</p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/admin/ai-auto/production/cohorts/${id}/review`}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded font-bold uppercase tracking-wider"
          >
            Post-Mortem Review
          </Link>
        </div>
      </div>

      {/* 15-STAGE FUNNEL VISUALISATION */}
      <div className="bg-[#111] border border-white/10 rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-white">Controlled Acquisition Funnel</h2>
        <div className="grid grid-cols-5 md:grid-cols-8 lg:grid-cols-15 gap-1.5 text-center overflow-x-auto pb-2">
          {funnelSteps.map((step, idx) => (
            <div key={step.label} className="p-2.5 bg-white/5 rounded border border-white/10 min-w-[72px] space-y-1">
              <span className="text-[9px] text-white/40 block uppercase truncate">{step.label}</span>
              <span className="text-base font-black text-white block">{step.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* UNIT ECONOMICS & METRICS */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-[#111] border border-white/10 rounded-xl p-5 space-y-1">
          <span className="text-white/40 uppercase font-semibold text-[10px] block">AI Cost / Qualified</span>
          <div className="text-2xl font-black text-white">{metrics.cost_per_qualified ? `£${metrics.cost_per_qualified.toFixed(2)}` : "—"}</div>
          <span className="text-white/40 text-[10px]">Scout + evaluation</span>
        </div>
        <div className="bg-[#111] border border-white/10 rounded-xl p-5 space-y-1">
          <span className="text-white/40 uppercase font-semibold text-[10px] block">AI Cost / Site</span>
          <div className="text-2xl font-black text-white">{metrics.cost_per_site ? `£${metrics.cost_per_site.toFixed(2)}` : "—"}</div>
          <span className="text-white/40 text-[10px]">Claude Factory generation</span>
        </div>
        <div className="bg-[#111] border border-white/10 rounded-xl p-5 space-y-1">
          <span className="text-white/40 uppercase font-semibold text-[10px] block">First-Pass Sendable %</span>
          <div className="text-2xl font-black text-emerald-400">{metrics.first_pass_sendable_pct ? `${metrics.first_pass_sendable_pct}%` : "—"}</div>
          <span className="text-white/40 text-[10px]">No revision required</span>
        </div>
        <div className="bg-[#111] border border-white/10 rounded-xl p-5 space-y-1">
          <span className="text-white/40 uppercase font-semibold text-[10px] block">Total AI Spend</span>
          <div className="text-2xl font-black text-emerald-400">£{metrics.ai_cost_total.toFixed(2)}</div>
          <span className="text-white/40 text-[10px]">Limit: £{cohort.total_ai_budget_limit.toFixed(2)}</span>
        </div>
      </div>

      {/* GATE POLICIES */}
      <div className="bg-[#111] border border-white/10 rounded-xl p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white">Cohort Autonomy Gates (11)</h2>
          <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
            ALL GATES LOCKED TO MANUAL
          </span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {gates.map((g) => (
            <div key={g.gate_key} className="p-3 bg-white/5 border border-white/10 rounded flex justify-between items-center">
              <div>
                <span className="font-bold text-white block text-[11px]">{g.gate_key}</span>
                <span className="text-[9px] text-white/40 font-mono">v{g.version} by {g.changed_by}</span>
              </div>
              <span className="bg-emerald-500/20 text-emerald-400 text-[9px] font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                {g.mode}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* TIMELINE & DEFECTS */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-[#111] border border-white/10 rounded-xl p-6 space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white">Events Timeline</h2>
          <div className="space-y-2">
            {events.map((e) => (
              <div key={e.id} className="p-3 bg-white/5 border border-white/5 rounded space-y-1">
                <div className="flex justify-between text-[10px] text-white/40">
                  <span className="font-mono">{e.event_type}</span>
                  <span>{new Date(e.occurred_at).toLocaleTimeString()}</span>
                </div>
                <p className="text-white/80 font-medium">{e.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#111] border border-white/10 rounded-xl p-6 space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white">Defect Log</h2>
          {defects.length === 0 ? (
            <div className="p-8 text-center text-white/40 border border-dashed border-white/10 rounded">
              No production defects recorded for this cohort.
            </div>
          ) : (
            <div className="space-y-2">
              {defects.map((d) => (
                <div key={d.id} className="p-3 bg-red-500/10 border border-red-500/20 rounded text-red-400">
                  <span className="font-bold block">{d.defect_type}</span>
                  <span className="text-xs text-white/70">{d.description}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
