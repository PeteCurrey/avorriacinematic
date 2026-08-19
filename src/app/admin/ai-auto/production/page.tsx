import React from "react";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { 
  getOperatingConfig, 
  getRolloutCohorts, 
  getMailboxConfigs,
  getProductionReadinessSections 
} from "@/lib/db/repository";
import { 
  ShieldCheck, 
  AlertTriangle, 
  Lock, 
  CheckCircle2, 
  Activity, 
  Sliders, 
  Users, 
  ArrowRight, 
  Zap, 
  Layers, 
  Clock, 
  Inbox, 
  RotateCcw 
} from "lucide-react";

export default async function ProductionControlCenterPage() {
  await requireAdmin();
  const config = await getOperatingConfig();
  const cohorts = await getRolloutCohorts();
  const mailboxes = await getMailboxConfigs();
  const readiness = await getProductionReadinessSections();
  const hasBlockers = readiness.some(s => s.status === "BLOCKED");

  const modes = [
    { key: "TEST", label: "TEST", desc: "Internal allowlist only. No genuine prospect communication.", locked: false },
    { key: "PILOT", label: "PILOT", desc: "Small genuine cohort (10 max). Every gate requires Pete sign-off.", locked: false },
    { key: "CONTROLLED_PRODUCTION", label: "CONTROLLED PROD", desc: "Proven cohort rules. Selected gates may be assisted.", locked: false },
    { key: "SCALED_PRODUCTION", label: "SCALED PROD", desc: "High-volume operation with hard safety thresholds.", locked: false },
    { key: "FULL_AUTOPILOT", label: "FULL AUTOPILOT", desc: "Locked — Requires certified human agreement & deliverability baseline.", locked: true },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 text-white">
      {/* 1. HEADER & ENVIRONMENT BANNER */}
      <div className="flex justify-between items-start border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-1">
            <ShieldCheck className="w-4 h-4" /> Production Operations Command
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">AI Auto Production Control Centre</h1>
          <p className="text-sm text-white/50 mt-1">
            Progressive rollout orchestration, operating modes, safety gates, and live cohort controls.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/ai-auto/production/readiness"
            className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-2 border ${
              hasBlockers
                ? "bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20"
                : "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20"
            }`}
          >
            {hasBlockers ? <AlertTriangle className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
            <span>{hasBlockers ? "PILOT BLOCKED (READINESS)" : "READY FOR PILOT"}</span>
          </Link>
        </div>
      </div>

      {/* 2. OPERATING MODES SEGMENTED CONTROL */}
      <div className="bg-[#111] border border-white/10 rounded-xl p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">Operating Mode Progression</h2>
            <p className="text-xs text-white/50">Current Active Mode: <span className="font-bold text-emerald-400">{config.current_mode}</span></p>
          </div>
          <span className="text-[10px] font-mono text-white/40">Step-by-step progressive activation only</span>
        </div>

        <div className="grid grid-cols-5 gap-3">
          {modes.map((m) => {
            const isActive = config.current_mode === m.key;
            return (
              <div
                key={m.key}
                className={`p-4 rounded-lg border transition-all flex flex-col justify-between space-y-2 ${
                  isActive
                    ? "bg-emerald-500/10 border-emerald-500/40 text-white shadow-lg shadow-emerald-500/5"
                    : m.locked
                    ? "bg-black/40 border-white/5 text-white/30 cursor-not-allowed opacity-60"
                    : "bg-white/[0.02] border-white/10 text-white/70 hover:border-white/20"
                }`}
              >
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className={`text-xs font-black tracking-wider ${isActive ? "text-emerald-400" : ""}`}>
                      {m.label}
                    </span>
                    {m.locked && <Lock className="w-3 h-3 text-white/40" />}
                    {isActive && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />}
                  </div>
                  <p className="text-[10px] leading-relaxed text-white/50">{m.desc}</p>
                </div>
                {isActive && (
                  <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded text-center">
                    CURRENT MODE
                  </span>
                )}
                {m.locked && (
                  <span className="text-[9px] font-mono text-white/30 bg-white/5 px-2 py-0.5 rounded text-center">
                    LOCKED
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. GLOBAL PRODUCTION LIMITS GRID */}
      <div className="grid grid-cols-4 gap-4 text-xs">
        <div className="bg-[#111] border border-white/10 rounded-xl p-5 space-y-1">
          <span className="text-white/40 uppercase font-semibold text-[10px] block">Max Scout / Day</span>
          <div className="text-2xl font-black text-white">{config.max_scout_per_day}</div>
          <span className="text-white/40 text-[10px]">Candidates scanned</span>
        </div>
        <div className="bg-[#111] border border-white/10 rounded-xl p-5 space-y-1">
          <span className="text-white/40 uppercase font-semibold text-[10px] block">Max Qualified / Day</span>
          <div className="text-2xl font-black text-emerald-400">{config.max_qualified_per_day}</div>
          <span className="text-white/40 text-[10px]">Passed score ≥70</span>
        </div>
        <div className="bg-[#111] border border-white/10 rounded-xl p-5 space-y-1">
          <span className="text-white/40 uppercase font-semibold text-[10px] block">Max Sites / Day</span>
          <div className="text-2xl font-black text-white">{config.max_sites_per_day}</div>
          <span className="text-white/40 text-[10px]">Claude Factory builds</span>
        </div>
        <div className="bg-[#111] border border-white/10 rounded-xl p-5 space-y-1">
          <span className="text-white/40 uppercase font-semibold text-[10px] block">Daily AI Budget Cap</span>
          <div className="text-2xl font-black text-emerald-400">£{config.max_ai_spend_per_day.toFixed(2)}</div>
          <span className="text-white/40 text-[10px]">Hard circuit breaker</span>
        </div>
      </div>

      {/* 4. ACTIVE ROLLOUT COHORTS */}
      <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden text-xs">
        <div className="p-5 border-b border-white/10 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-sm text-white">Rollout Cohorts</h3>
            <p className="text-white/50 text-xs">Contained production batches with strict prospect and AI budget caps.</p>
          </div>
          <Link
            href="/admin/ai-auto/production/cohorts/new"
            className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded font-bold uppercase tracking-wider text-[10px]"
          >
            + New Cohort
          </Link>
        </div>

        <table className="w-full text-left">
          <thead className="bg-white/5 text-white/40 uppercase font-semibold text-[10px]">
            <tr>
              <th className="p-4">Cohort Name</th>
              <th className="p-4">Environment</th>
              <th className="p-4">Capacity</th>
              <th className="p-4">Max AI Budget</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {cohorts.map((c) => (
              <tr key={c.id} className="hover:bg-white/[0.02]">
                <td className="p-4 font-bold text-white">{c.name}</td>
                <td className="p-4">
                  <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] font-bold text-white/80">
                    {c.environment}
                  </span>
                </td>
                <td className="p-4 text-white/70">{c.max_prospects} prospects</td>
                <td className="p-4 text-emerald-400 font-semibold">£{c.total_ai_budget_limit.toFixed(2)}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    c.status === "ready"
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : c.status === "running"
                      ? "bg-amber-500/20 text-amber-400 border border-amber-500/30 animate-pulse"
                      : "bg-white/10 text-white/60"
                  }`}>
                    {c.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <Link
                    href={`/admin/ai-auto/production/cohorts/${c.id}`}
                    className="text-emerald-400 hover:underline font-bold text-[11px] inline-flex items-center gap-1"
                  >
                    Open Console <ArrowRight className="w-3 h-3" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 5. CONTROL MODULE NAVIGATION */}
      <div className="grid grid-cols-4 gap-4 text-xs">
        <Link
          href="/admin/ai-auto/production/readiness"
          className="p-5 bg-[#111] hover:bg-[#151515] border border-white/10 hover:border-white/20 rounded-xl space-y-2 group"
        >
          <div className="flex justify-between items-center text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
          <h4 className="font-bold text-white">Production Readiness</h4>
          <p className="text-white/50 text-[11px]">System-by-system checks for AI, Email, deliverability, and safety gates.</p>
        </Link>

        <Link
          href="/admin/ai-auto/production/autonomy"
          className="p-5 bg-[#111] hover:bg-[#151515] border border-white/10 hover:border-white/20 rounded-xl space-y-2 group"
        >
          <div className="flex justify-between items-center text-emerald-400">
            <Sliders className="w-4 h-4" />
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
          <h4 className="font-bold text-white">Autonomy Scorecard</h4>
          <p className="text-white/50 text-[11px]">Gate-by-gate evidence, human agreement rates, and automation policies.</p>
        </Link>

        <Link
          href="/admin/ai-auto/production/full-autopilot"
          className="p-5 bg-[#111] hover:bg-[#151515] border border-white/10 hover:border-white/20 rounded-xl space-y-2 group"
        >
          <div className="flex justify-between items-center text-white/40">
            <Lock className="w-4 h-4" />
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
          <h4 className="font-bold text-white">Full Autopilot Lock</h4>
          <p className="text-white/50 text-[11px]">Review prerequisite criteria for future unsupervised acquisition operations.</p>
        </Link>

        <Link
          href="/admin/ai-auto/production/change-log"
          className="p-5 bg-[#111] hover:bg-[#151515] border border-white/10 hover:border-white/20 rounded-xl space-y-2 group"
        >
          <div className="flex justify-between items-center text-white/60">
            <RotateCcw className="w-4 h-4" />
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
          <h4 className="font-bold text-white">Production Change Log</h4>
          <p className="text-white/50 text-[11px]">Audit ledger of every mode change, gate modification, and safety pause.</p>
        </Link>
      </div>
    </div>
  );
}
