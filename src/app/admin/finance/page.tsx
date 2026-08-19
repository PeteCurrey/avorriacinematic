"use client";
import React from "react";
import Link from "next/link";
import { DollarSign, TrendingUp, Clock, Users, Layers, Zap, ArrowRight, ShieldCheck } from "lucide-react";

export default function FinanceOverviewPage() {
  const kpis = [
    { label: "Cash Collected (Month)", val: "£3,700", sub: "Provider Confirmed", color: "text-emerald-400" },
    { label: "Contracted Revenue (Month)", val: "£5,550", sub: "Accepted Proposals", color: "text-white" },
    { label: "Outstanding Receivables", val: "£1,850", sub: "1 Invoice Due", color: "text-amber-400" },
    { label: "Active MRR", val: "£340/mo", sub: "5 Active Retainers", color: "text-emerald-400" },
    { label: "Tracked Contribution", val: "£5,120", sub: "92.2% Gross Margin", color: "text-emerald-400" },
  ];

  const subPages = [
    { title: "Receivables & Ageing", href: "/admin/finance/receivables", desc: "Payment ageing buckets (1–7d, 8–30d, 60d+), overdue chase", icon: Clock },
    { title: "Client Profitability", href: "/admin/finance/clients", desc: "Granular revenue, AI cost, manual labor & contribution margin", icon: Users },
    { title: "Service Economics", href: "/admin/finance/services", desc: "Average order value, unit delivery days, and service margins", icon: Layers },
    { title: "AI Auto Unit Economics", href: "/admin/finance/ai-auto", desc: "Cost per qualified prospect, cost per client, revenue per £1 AI", icon: Zap },
    { title: "Pipeline & Forecast", href: "/admin/finance/forecast", desc: "Deterministic Base / Upside / Downside revenue forecasts", icon: TrendingUp },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 text-white">
      <div className="flex justify-between items-start border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-1">
            <DollarSign className="w-3.5 h-3.5" /> Commercial Intelligence
          </div>
          <h1 className="text-3xl font-extrabold">Management Financial Intelligence</h1>
          <p className="text-sm text-white/50 mt-1">
            Real cash, contracted milestones, client unit contribution, and AI Auto unit economics.
          </p>
        </div>
        <span className="bg-white/5 border border-white/10 text-xs px-3 py-1.5 rounded font-mono text-white/70">
          Currency: GBP (£)
        </span>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-5 gap-4">
        {kpis.map((k) => (
          <div key={k.label} className="bg-[#111] border border-white/10 rounded-xl p-5 space-y-1">
            <span className="text-[10px] text-white/40 uppercase font-semibold tracking-wider block">{k.label}</span>
            <div className={`text-2xl font-black ${k.color}`}>{k.val}</div>
            <span className="text-[10px] text-white/50 block">{k.sub}</span>
          </div>
        ))}
      </div>

      {/* Sub-modules */}
      <div className="grid grid-cols-3 gap-5">
        {subPages.map((page) => {
          const Icon = page.icon;
          return (
            <Link
              key={page.href}
              href={page.href}
              className="bg-[#111] hover:bg-[#151515] border border-white/10 hover:border-white/20 rounded-xl p-5 transition-all group flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/80 group-hover:text-emerald-400 transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">{page.title}</h3>
                <p className="text-xs text-white/50 leading-relaxed">{page.desc}</p>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-semibold text-white/40 group-hover:text-white transition-colors">
                View Ledger <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
