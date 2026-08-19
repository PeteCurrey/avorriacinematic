"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  Target,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  DollarSign,
  Layers,
  FlaskConical,
  Compass,
  FileText
} from "lucide-react";

export default function OptimisationCentrePage() {
  const [activeTab, setActiveTab] = useState<"overview" | "recommendations">("overview");

  const subPages = [
    { title: "Targeting Performance", href: "/admin/optimisation/targeting", desc: "Sector & location conversion rates, sample confidence", icon: Target },
    { title: "Scoring Calibration", href: "/admin/optimisation/scoring", desc: "Opportunity score validation & shadow simulation", icon: Zap },
    { title: "Creative Analytics", href: "/admin/optimisation/creative", desc: "Claude strategies, AI slop score impact, Sonnet vs Opus", icon: Sparkles },
    { title: "AI Economics & Waste", href: "/admin/optimisation/ai", desc: "OpenAI task cost analysis, cost per qualified client", icon: DollarSign },
    { title: "Outreach Variants", href: "/admin/optimisation/outreach", desc: "Subject style, body length, response rate breakdowns", icon: FileText },
    { title: "A/B Experiments", href: "/admin/optimisation/experiments", desc: "Active controlled experiments & winner deployment", icon: FlaskConical },
    { title: "Scenario Forecasting", href: "/admin/optimisation/scenarios", desc: "Interactive CEO capacity & commercial simulator", icon: Compass },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 text-white">
      {/* Header */}
      <div className="flex justify-between items-start border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-1">
            <TrendingUp className="w-3.5 h-3.5" /> Commercial Intelligence & Optimisation
          </div>
          <h1 className="text-3xl font-extrabold">Avorria Optimisation Centre</h1>
          <p className="text-sm text-white/50 mt-1">
            Evidence-backed learning across the entire client acquisition & fulfilment engine.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs px-3 py-1.5 rounded-full font-medium flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" /> Mode: RECOMMEND (Human in the Loop)
          </span>
        </div>
      </div>

      {/* CEO Daily AI Auto Brief */}
      <div className="bg-gradient-to-br from-[#141414] to-[#0d0d0d] border border-white/15 rounded-xl p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <h2 className="text-sm font-bold tracking-wide uppercase text-white/90">CEO Daily AI Auto Brief</h2>
          </div>
          <span className="text-xs text-white/40">Updated Today at 06:00 UTC</span>
        </div>

        <div className="grid grid-cols-3 gap-6 pt-2 text-xs">
          <div className="space-y-1.5">
            <span className="text-white/40 uppercase font-semibold text-[10px] tracking-wider block">What Happened</span>
            <p className="text-white/80 leading-relaxed">
              Yesterday AI Scout analysed 18 businesses and qualified 4 high-probability targets. 1 new proposal (£1,850) was accepted for Apex Autocare Ltd.
            </p>
          </div>
          <div className="space-y-1.5">
            <span className="text-white/40 uppercase font-semibold text-[10px] tracking-wider block">What Matters</span>
            <p className="text-white/80 leading-relaxed">
              Automotive continues to outpace other sectors in preview engagement (48% vs 22% overall). Variant B in the outreach experiment shows +75% reply lift.
            </p>
          </div>
          <div className="space-y-1.5">
            <span className="text-white/40 uppercase font-semibold text-[10px] tracking-wider block">What Needs You</span>
            <p className="text-emerald-400/90 font-medium leading-relaxed">
              2 new qualified prospects are in the human review queue. 1 proposal awaits commercial authorisation.
            </p>
          </div>
        </div>
      </div>

      {/* End-to-End Funnel Performance */}
      <div className="bg-[#111] border border-white/10 rounded-xl p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-base font-bold">Canonical Commercial Funnel</h3>
            <p className="text-xs text-white/50">Cumulative production performance across all verified records</p>
          </div>
          <span className="text-xs text-white/40 font-mono">Benchmark: UK B2B High-Ticket</span>
        </div>

        <div className="grid grid-cols-7 gap-3 text-center">
          {[
            { label: "Discovered", val: "142", sub: "Scouted" },
            { label: "Qualified", val: "38", sub: "26.7%" },
            { label: "Approved", val: "32", sub: "84.2%" },
            { label: "Contacted", val: "28", sub: "87.5%" },
            { label: "Replied", val: "6", sub: "21.4%" },
            { label: "Proposals", val: "3", sub: "50.0%" },
            { label: "Clients Won", val: "2", sub: "66.7%" },
          ].map((step, idx) => (
            <div key={step.label} className="bg-white/5 border border-white/10 rounded-lg p-3 relative">
              <div className="text-[10px] text-white/40 uppercase font-semibold tracking-wider">{step.label}</div>
              <div className="text-xl font-black text-white mt-1">{step.val}</div>
              <div className="text-[10px] text-emerald-400 font-medium mt-0.5">{step.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Sub-module Navigation Grid */}
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
                Explore Analytics <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
