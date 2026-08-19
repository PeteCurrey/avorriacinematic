import React from "react";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { getCommandMetrics } from "@/lib/db/repository";
import { 
  Sparkles, 
  CheckSquare, 
  Users, 
  Cpu, 
  ArrowUpRight, 
  Radio, 
  ShieldCheck, 
  Layers, 
  TrendingUp, 
  Activity,
  AlertCircle,
  Clock
} from "lucide-react";

export default async function AdminCommandPage() {
  await requireAdmin();
  const metrics = await getCommandMetrics();

  return (
    <div className="space-y-8">
      {/* Page Title & Operational Status */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-avorria-signal mb-2">
            <span className="w-2 h-2 rounded-full bg-avorria-signal animate-pulse" />
            OPERATIONAL COMMAND CENTER
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-avorria-white leading-none">
            AVORRIA COMMAND
          </h1>
          <p className="font-mono text-xs text-avorria-muted uppercase tracking-wider mt-2">
            Operations, acquisition and delivery.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/ai-auto/review"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-avorria-signal hover:bg-[#b5dc2d] text-black font-mono text-xs font-bold uppercase tracking-wider rounded-[2px] transition-all"
          >
            <CheckSquare className="w-4 h-4" />
            <span>DAILY REVIEW QUEUE ({metrics.aiAuto.awaitingReview})</span>
          </Link>
        </div>
      </div>

      {/* Flagship AI Auto Operational Metrics Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-avorria-signal" />
            <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-avorria-white">
              AI AUTO CLIENT ACQUISITION TELEMETRY
            </h2>
          </div>
          <Link 
            href="/admin/ai-auto"
            className="font-mono text-[11px] text-avorria-signal hover:underline flex items-center gap-1 uppercase tracking-wider"
          >
            Open Flagship Module <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {/* Discovered Today */}
          <div className="p-4 bg-[#0F0F0F] border border-white/10 rounded-[2px] space-y-1">
            <div className="font-mono text-[10px] uppercase tracking-wider text-avorria-muted">
              Discovered Today
            </div>
            <div className="font-mono text-2xl font-black text-avorria-white">
              {metrics.aiAuto.discoveredToday}
            </div>
            <div className="font-mono text-[9px] text-avorria-quiet uppercase">
              Scout engine intake
            </div>
          </div>

          {/* Analysed Today */}
          <div className="p-4 bg-[#0F0F0F] border border-white/10 rounded-[2px] space-y-1">
            <div className="font-mono text-[10px] uppercase tracking-wider text-avorria-muted">
              Analysed Today
            </div>
            <div className="font-mono text-2xl font-black text-avorria-white">
              {metrics.aiAuto.analysedToday}
            </div>
            <div className="font-mono text-[9px] text-avorria-quiet uppercase">
              Heuristic evaluated
            </div>
          </div>

          {/* Qualified */}
          <div className="p-4 bg-[#0F0F0F] border border-white/10 rounded-[2px] space-y-1">
            <div className="font-mono text-[10px] uppercase tracking-wider text-avorria-muted">
              Qualified Prospects
            </div>
            <div className="font-mono text-2xl font-black text-avorria-signal">
              {metrics.aiAuto.qualified}
            </div>
            <div className="font-mono text-[9px] text-avorria-quiet uppercase">
              Score ≥ 70
            </div>
          </div>

          {/* Awaiting Review */}
          <div className="p-4 bg-[#0F0F0F] border border-avorria-signal/40 bg-avorria-signal/[0.02] rounded-[2px] space-y-1">
            <div className="font-mono text-[10px] uppercase tracking-wider text-avorria-signal">
              Awaiting Review
            </div>
            <div className="font-mono text-2xl font-black text-avorria-white">
              {metrics.aiAuto.awaitingReview}
            </div>
            <div className="font-mono text-[9px] text-avorria-signal uppercase">
              Requires human sign-off
            </div>
          </div>

          {/* Approved */}
          <div className="p-4 bg-[#0F0F0F] border border-white/10 rounded-[2px] space-y-1">
            <div className="font-mono text-[10px] uppercase tracking-wider text-avorria-muted">
              Approved Prospects
            </div>
            <div className="font-mono text-2xl font-black text-avorria-white">
              {metrics.aiAuto.approved}
            </div>
            <div className="font-mono text-[9px] text-avorria-quiet uppercase">
              In deep research
            </div>
          </div>

          {/* Rejected */}
          <div className="p-4 bg-[#0F0F0F] border border-white/10 rounded-[2px] space-y-1">
            <div className="font-mono text-[10px] uppercase tracking-wider text-avorria-muted">
              Rejected
            </div>
            <div className="font-mono text-2xl font-black text-avorria-white">
              {metrics.aiAuto.rejected}
            </div>
            <div className="font-mono text-[9px] text-avorria-quiet uppercase">
              Suppressed from queue
            </div>
          </div>

          {/* Research Requested */}
          <div className="p-4 bg-[#0F0F0F] border border-white/10 rounded-[2px] space-y-1">
            <div className="font-mono text-[10px] uppercase tracking-wider text-avorria-muted">
              Research Requested
            </div>
            <div className="font-mono text-2xl font-black text-avorria-white">
              {metrics.aiAuto.researchRequested}
            </div>
            <div className="font-mono text-[9px] text-avorria-quiet uppercase">
              Intelligence pending
            </div>
          </div>

          {/* Builds Queued */}
          <div className="p-4 bg-[#0F0F0F] border border-white/10 rounded-[2px] space-y-1 opacity-75">
            <div className="font-mono text-[10px] uppercase tracking-wider text-avorria-muted">
              Builds Queued
            </div>
            <div className="font-mono text-2xl font-black text-avorria-white">
              {metrics.aiAuto.buildsQueued > 0 ? metrics.aiAuto.buildsQueued : "—"}
            </div>
            <div className="font-mono text-[9px] text-avorria-quiet uppercase">
              Phase 2 Website Factory
            </div>
          </div>

          {/* Previews Ready */}
          <div className="p-4 bg-[#0F0F0F] border border-white/10 rounded-[2px] space-y-1 opacity-75">
            <div className="font-mono text-[10px] uppercase tracking-wider text-avorria-muted">
              Previews Ready
            </div>
            <div className="font-mono text-2xl font-black text-avorria-white">
              {metrics.aiAuto.previewsReady > 0 ? metrics.aiAuto.previewsReady : "—"}
            </div>
            <div className="font-mono text-[9px] text-avorria-quiet uppercase">
              Phase 2 QA & Deploy
            </div>
          </div>

          {/* Outreach Queued */}
          <div className="p-4 bg-[#0F0F0F] border border-white/10 rounded-[2px] space-y-1 opacity-75">
            <div className="font-mono text-[10px] uppercase tracking-wider text-avorria-muted">
              Outreach Queued
            </div>
            <div className="font-mono text-2xl font-black text-avorria-white">
              {metrics.aiAuto.outreachQueued > 0 ? metrics.aiAuto.outreachQueued : "—"}
            </div>
            <div className="font-mono text-[9px] text-avorria-quiet uppercase">
              Phase 3 Email Dispatch
            </div>
          </div>
        </div>
      </section>

      {/* Commercial Sales Pipeline & System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sales Pipeline Telemetry */}
        <section className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-avorria-signal" />
              <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-avorria-white">
                SALES PIPELINE OVERVIEW
              </h2>
            </div>
            <Link 
              href="/admin/pipeline"
              className="font-mono text-[11px] text-avorria-muted hover:text-avorria-white flex items-center gap-1 uppercase tracking-wider"
            >
              View Pipeline <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="p-4 bg-[#0F0F0F] border border-white/10 rounded-[2px] space-y-1">
              <div className="font-mono text-[10px] uppercase tracking-wider text-avorria-muted">
                Active Opportunities
              </div>
              <div className="font-mono text-2xl font-black text-avorria-white">
                {metrics.pipeline.opportunitiesCount}
              </div>
              <div className="font-mono text-[9px] text-avorria-quiet uppercase">
                Qualified deals
              </div>
            </div>

            <div className="p-4 bg-[#0F0F0F] border border-white/10 rounded-[2px] space-y-1">
              <div className="font-mono text-[10px] uppercase tracking-wider text-avorria-muted">
                Estimated Value
              </div>
              <div className="font-mono text-2xl font-black text-avorria-white">
                {metrics.pipeline.estimatedPipelineValue > 0 ? `£${metrics.pipeline.estimatedPipelineValue.toLocaleString()}` : "—"}
              </div>
              <div className="font-mono text-[9px] text-avorria-quiet uppercase">
                Weighted pipeline
              </div>
            </div>

            <div className="p-4 bg-[#0F0F0F] border border-white/10 rounded-[2px] space-y-1">
              <div className="font-mono text-[10px] uppercase tracking-wider text-avorria-muted">
                Won This Month
              </div>
              <div className="font-mono text-2xl font-black text-avorria-white">
                {metrics.pipeline.wonThisMonth}
              </div>
              <div className="font-mono text-[9px] text-avorria-quiet uppercase">
                Closed commissions
              </div>
            </div>
          </div>
        </section>

        {/* System & Job Telemetry */}
        <section className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-avorria-signal" />
              <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-avorria-white">
                SYSTEM & AUTOMATION JOBS
              </h2>
            </div>
            <Link 
              href="/admin/automations"
              className="font-mono text-[11px] text-avorria-muted hover:text-avorria-white flex items-center gap-1 uppercase tracking-wider"
            >
              Job Console <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="p-4 bg-[#0F0F0F] border border-white/10 rounded-[2px] space-y-1">
              <div className="font-mono text-[10px] uppercase tracking-wider text-avorria-muted">
                Queued Tasks
              </div>
              <div className="font-mono text-2xl font-black text-avorria-white">
                {metrics.system.queuedJobs}
              </div>
              <div className="font-mono text-[9px] text-avorria-quiet uppercase">
                Pending workers
              </div>
            </div>

            <div className="p-4 bg-[#0F0F0F] border border-white/10 rounded-[2px] space-y-1">
              <div className="font-mono text-[10px] uppercase tracking-wider text-avorria-muted">
                Running Jobs
              </div>
              <div className="font-mono text-2xl font-black text-avorria-signal">
                {metrics.system.runningJobs}
              </div>
              <div className="font-mono text-[9px] text-avorria-quiet uppercase">
                Active execution
              </div>
            </div>

            <div className="p-4 bg-[#0F0F0F] border border-white/10 rounded-[2px] space-y-1">
              <div className="font-mono text-[10px] uppercase tracking-wider text-avorria-muted">
                Failed Jobs
              </div>
              <div className={`font-mono text-2xl font-black ${metrics.system.failedJobs > 0 ? "text-red-400" : "text-avorria-white"}`}>
                {metrics.system.failedJobs}
              </div>
              <div className="font-mono text-[9px] text-avorria-quiet uppercase">
                Requires retry
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Operational Modules Direct Access */}
      <section className="space-y-4 pt-4 border-t border-white/10">
        <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-avorria-muted">
          OPERATIONAL WORKSPACES
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/ai-auto/review"
            className="p-5 bg-[#0D0D0D] hover:bg-[#121212] border border-white/10 hover:border-avorria-signal/40 transition-all rounded-[2px] space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 bg-white/5 border border-white/10 flex items-center justify-center text-avorria-signal rounded-[2px]">
                <CheckSquare className="w-4 h-4" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-avorria-signal group-hover:underline">
                OPEN QUEUE →
              </span>
            </div>
            <div>
              <h3 className="font-mono text-sm font-bold text-avorria-white uppercase tracking-wider">
                Daily Review Queue
              </h3>
              <p className="font-mono text-xs text-avorria-muted mt-1 leading-relaxed">
                Approve, reject, or request deep research on AI-qualified business prospects.
              </p>
            </div>
          </Link>

          <Link
            href="/admin/prospects"
            className="p-5 bg-[#0D0D0D] hover:bg-[#121212] border border-white/10 hover:border-avorria-signal/40 transition-all rounded-[2px] space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 bg-white/5 border border-white/10 flex items-center justify-center text-avorria-signal rounded-[2px]">
                <Users className="w-4 h-4" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-avorria-signal group-hover:underline">
                VIEW DIRECTORY →
              </span>
            </div>
            <div>
              <h3 className="font-mono text-sm font-bold text-avorria-white uppercase tracking-wider">
                Prospect Database
              </h3>
              <p className="font-mono text-xs text-avorria-muted mt-1 leading-relaxed">
                Query, filter by opportunity band, search by sector or city, and inspect website assessments.
              </p>
            </div>
          </Link>

          <Link
            href="/admin/ai-auto/settings"
            className="p-5 bg-[#0D0D0D] hover:bg-[#121212] border border-white/10 hover:border-avorria-signal/40 transition-all rounded-[2px] space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 bg-white/5 border border-white/10 flex items-center justify-center text-avorria-signal rounded-[2px]">
                <Radio className="w-4 h-4" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-avorria-signal group-hover:underline">
                CONFIGURE →
              </span>
            </div>
            <div>
              <h3 className="font-mono text-sm font-bold text-avorria-white uppercase tracking-wider">
                AI Auto Targeting & Parameters
              </h3>
              <p className="font-mono text-xs text-avorria-muted mt-1 leading-relaxed">
                Tune target sectors, geographic boundaries, review constraints, and assisted mode.
              </p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
