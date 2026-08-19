import React from "react";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { getCommandMetrics, getExecutiveKPIs, getAdminNotifications } from "@/lib/db/repository";
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
  DollarSign,
  AlertCircle,
  Clock,
  Inbox,
  ArrowRight
} from "lucide-react";

export default async function AdminCommandPage() {
  await requireAdmin();
  const metrics = await getCommandMetrics();
  const kpis = await getExecutiveKPIs();
  const notifs = await getAdminNotifications();
  const priorityNotifs = notifs.filter(n => !n.dismissed_at).slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Page Title & Operational Status */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-avorria-signal mb-2">
            <span className="w-2 h-2 rounded-full bg-avorria-signal animate-pulse" />
            EXECUTIVE COMMAND & OPERATIONS
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-avorria-white leading-none">
            AVORRIA COMMAND
          </h1>
          <p className="font-mono text-xs text-avorria-muted uppercase tracking-wider mt-2">
            Commercial intelligence, acquisition and executive operations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/finance"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider rounded-[2px] transition-all"
          >
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <span>FINANCE & P&L</span>
          </Link>
          <Link
            href="/admin/ai-auto/review"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-avorria-signal hover:bg-[#b5dc2d] text-black font-mono text-xs font-bold uppercase tracking-wider rounded-[2px] transition-all"
          >
            <CheckSquare className="w-4 h-4" />
            <span>DAILY REVIEW ({metrics.aiAuto.awaitingReview})</span>
          </Link>
        </div>
      </div>

      {/* 1. RANKED EXECUTIVE ATTENTION FEED */}
      {priorityNotifs.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
              <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-avorria-white">
                NEEDS YOUR ATTENTION
              </h2>
            </div>
            <Link href="/admin/notifications" className="font-mono text-[10px] text-white/50 hover:text-white uppercase tracking-wider">
              View All ({notifs.length}) &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {priorityNotifs.map((n) => (
              <div
                key={n.id}
                className={`p-4 rounded-[2px] border flex justify-between items-start ${
                  n.severity === "CRITICAL"
                    ? "bg-red-500/10 border-red-500/30 text-white"
                    : "bg-[#111] border-white/15 text-white"
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                      n.severity === "CRITICAL" ? "bg-red-500/20 text-red-400" : "bg-amber-500/20 text-amber-400"
                    }`}>
                      {n.severity}
                    </span>
                    <span className="font-mono font-bold text-xs text-white">{n.title}</span>
                  </div>
                  <p className="font-mono text-[11px] text-white/70">{n.summary}</p>
                </div>
                {n.entity_type === "inbound_lead" && (
                  <Link href={`/admin/leads/${n.entity_id}`} className="shrink-0 text-avorria-signal hover:underline text-[10px] font-mono uppercase ml-3">
                    Review &rarr;
                  </Link>
                )}
                {n.entity_type === "proposal" && (
                  <Link href="/admin/pipeline" className="shrink-0 text-avorria-signal hover:underline text-[10px] font-mono uppercase ml-3">
                    View &rarr;
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 2. EXECUTIVE FINANCIAL KPI STRIP */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-avorria-white">
              COMMERCIAL FINANCIAL TELEMETRY (MONTH-TO-DATE)
            </h2>
          </div>
          <Link href="/admin/finance" className="font-mono text-[11px] text-avorria-signal hover:underline flex items-center gap-1 uppercase tracking-wider">
            Finance Command <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-4 bg-[#0F0F0F] border border-white/10 rounded-[2px] space-y-1">
            <div className="font-mono text-[10px] uppercase tracking-wider text-avorria-muted">Cash Collected</div>
            <div className="font-mono text-xl font-black text-emerald-400">£{kpis.cash_collected_month.toLocaleString()}</div>
            <div className="font-mono text-[9px] text-avorria-quiet uppercase">Confirmed in bank</div>
          </div>
          <div className="p-4 bg-[#0F0F0F] border border-white/10 rounded-[2px] space-y-1">
            <div className="font-mono text-[10px] uppercase tracking-wider text-avorria-muted">Contracted Revenue</div>
            <div className="font-mono text-xl font-black text-white">£{kpis.contracted_revenue_month.toLocaleString()}</div>
            <div className="font-mono text-[9px] text-avorria-quiet uppercase">Signed proposals</div>
          </div>
          <div className="p-4 bg-[#0F0F0F] border border-white/10 rounded-[2px] space-y-1">
            <div className="font-mono text-[10px] uppercase tracking-wider text-avorria-muted">Weighted Pipeline</div>
            <div className="font-mono text-xl font-black text-white">£{kpis.active_pipeline_weighted.toLocaleString()}</div>
            <div className="font-mono text-[9px] text-avorria-quiet uppercase">Probability adjusted</div>
          </div>
          <div className="p-4 bg-[#0F0F0F] border border-white/10 rounded-[2px] space-y-1">
            <div className="font-mono text-[10px] uppercase tracking-wider text-avorria-muted">Active MRR</div>
            <div className="font-mono text-xl font-black text-emerald-400">£{kpis.active_mrr.toLocaleString()}</div>
            <div className="font-mono text-[9px] text-avorria-quiet uppercase">Monthly retainers</div>
          </div>
          <div className="p-4 bg-[#0F0F0F] border border-white/10 rounded-[2px] space-y-1">
            <div className="font-mono text-[10px] uppercase tracking-wider text-avorria-muted">Tracked Contribution</div>
            <div className="font-mono text-xl font-black text-emerald-400">£{kpis.tracked_contribution_month.toLocaleString()}</div>
            <div className="font-mono text-[9px] text-avorria-quiet uppercase">Gross margin (92%)</div>
          </div>
          <div className="p-4 bg-[#0F0F0F] border border-white/10 rounded-[2px] space-y-1">
            <div className="font-mono text-[10px] uppercase tracking-wider text-avorria-muted">Monthly Target</div>
            <div className="font-mono text-xl font-black text-white">£{kpis.monthly_revenue_target.toLocaleString()}</div>
            <div className="font-mono text-[9px] text-emerald-400 font-bold uppercase">{kpis.revenue_pace_status}</div>
          </div>
        </div>
      </section>

      {/* 3. AI AUTO CLIENT ACQUISITION TELEMETRY */}
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
          <div className="p-4 bg-[#0F0F0F] border border-white/10 rounded-[2px] space-y-1">
            <div className="font-mono text-[10px] uppercase tracking-wider text-avorria-muted">Discovered Today</div>
            <div className="font-mono text-2xl font-black text-avorria-white">{metrics.aiAuto.discoveredToday}</div>
            <div className="font-mono text-[9px] text-avorria-quiet uppercase">Scout engine intake</div>
          </div>
          <div className="p-4 bg-[#0F0F0F] border border-white/10 rounded-[2px] space-y-1">
            <div className="font-mono text-[10px] uppercase tracking-wider text-avorria-muted">Analysed Today</div>
            <div className="font-mono text-2xl font-black text-avorria-white">{metrics.aiAuto.analysedToday}</div>
            <div className="font-mono text-[9px] text-avorria-quiet uppercase">Heuristic evaluated</div>
          </div>
          <div className="p-4 bg-[#0F0F0F] border border-white/10 rounded-[2px] space-y-1">
            <div className="font-mono text-[10px] uppercase tracking-wider text-avorria-muted">Qualified Prospects</div>
            <div className="font-mono text-2xl font-black text-avorria-signal">{metrics.aiAuto.qualified}</div>
            <div className="font-mono text-[9px] text-avorria-quiet uppercase">Score ≥ 70</div>
          </div>
          <div className="p-4 bg-[#0F0F0F] border border-avorria-signal/40 bg-avorria-signal/[0.02] rounded-[2px] space-y-1">
            <div className="font-mono text-[10px] uppercase tracking-wider text-avorria-signal">Awaiting Review</div>
            <div className="font-mono text-2xl font-black text-avorria-white">{metrics.aiAuto.awaitingReview}</div>
            <div className="font-mono text-[9px] text-avorria-signal uppercase">Requires human sign-off</div>
          </div>
          <div className="p-4 bg-[#0F0F0F] border border-white/10 rounded-[2px] space-y-1">
            <div className="font-mono text-[10px] uppercase tracking-wider text-avorria-muted">Approved Prospects</div>
            <div className="font-mono text-2xl font-black text-avorria-white">{metrics.aiAuto.approved}</div>
            <div className="font-mono text-[9px] text-avorria-quiet uppercase">In deep research</div>
          </div>
        </div>
      </section>

      {/* 4. WORKSPACES GRID */}
      <section className="space-y-4 pt-4 border-t border-white/10">
        <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-avorria-muted">
          EXECUTIVE OPERATIONAL WORKSPACES
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link
            href="/admin/finance"
            className="p-5 bg-[#0D0D0D] hover:bg-[#121212] border border-white/10 hover:border-emerald-400/40 transition-all rounded-[2px] space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 rounded-[2px]">
                <DollarSign className="w-4 h-4" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400 group-hover:underline">
                FINANCE →
              </span>
            </div>
            <div>
              <h3 className="font-mono text-sm font-bold text-avorria-white uppercase tracking-wider">
                Financial Management
              </h3>
              <p className="font-mono text-xs text-avorria-muted mt-1 leading-relaxed">
                Cash collected, receivables ageing, client unit profitability, and MRR.
              </p>
            </div>
          </Link>

          <Link
            href="/admin/targets"
            className="p-5 bg-[#0D0D0D] hover:bg-[#121212] border border-white/10 hover:border-avorria-signal/40 transition-all rounded-[2px] space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 bg-white/5 border border-white/10 flex items-center justify-center text-avorria-signal rounded-[2px]">
                <TrendingUp className="w-4 h-4" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-avorria-signal group-hover:underline">
                TARGETS →
              </span>
            </div>
            <div>
              <h3 className="font-mono text-sm font-bold text-avorria-white uppercase tracking-wider">
                Targets & Pace
              </h3>
              <p className="font-mono text-xs text-avorria-muted mt-1 leading-relaxed">
                Track revenue, cash, and client targets with deterministic pacing calculators.
              </p>
            </div>
          </Link>

          <Link
            href="/admin/executive/scenarios"
            className="p-5 bg-[#0D0D0D] hover:bg-[#121212] border border-white/10 hover:border-avorria-signal/40 transition-all rounded-[2px] space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 bg-white/5 border border-white/10 flex items-center justify-center text-avorria-signal rounded-[2px]">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-avorria-signal group-hover:underline">
                SIMULATE →
              </span>
            </div>
            <div>
              <h3 className="font-mono text-sm font-bold text-avorria-white uppercase tracking-wider">
                Reverse Target Engine
              </h3>
              <p className="font-mono text-xs text-avorria-muted mt-1 leading-relaxed">
                Back-calculate required Scout, outreach, and close volume to hit monthly revenue goals.
              </p>
            </div>
          </Link>

          <Link
            href="/admin/leads"
            className="p-5 bg-[#0D0D0D] hover:bg-[#121212] border border-white/10 hover:border-avorria-signal/40 transition-all rounded-[2px] space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 bg-white/5 border border-white/10 flex items-center justify-center text-avorria-signal rounded-[2px]">
                <Inbox className="w-4 h-4" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-avorria-signal group-hover:underline">
                INBOUND →
              </span>
            </div>
            <div>
              <h3 className="font-mono text-sm font-bold text-avorria-white uppercase tracking-wider">
                Inbound Enquiries
              </h3>
              <p className="font-mono text-xs text-avorria-muted mt-1 leading-relaxed">
                Website project submissions with UTM campaign tracking and sales conversion.
              </p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
