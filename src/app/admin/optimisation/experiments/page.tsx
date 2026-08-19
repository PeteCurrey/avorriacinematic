"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, FlaskConical, CheckCircle2, Play, Pause } from "lucide-react";

export default function ExperimentsPage() {
  const [deployed, setDeployed] = useState(false);

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 text-white">
      <div className="flex justify-between items-start">
        <div>
          <Link href="/admin/optimisation" className="text-xs text-white/50 hover:text-white flex items-center gap-1 mb-2">
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Optimisation Centre
          </Link>
          <h1 className="text-2xl font-bold">A/B Testing & Controlled Experiments</h1>
          <p className="text-sm text-white/50">Run randomized, sticky hypothesis tests with deterministic statistical significance.</p>
        </div>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-xl p-6 space-y-6 text-xs">
        <div className="flex justify-between items-center border-b border-white/10 pb-4">
          <div>
            <div className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Active Experiment #1</div>
            <h2 className="text-base font-bold text-white mt-0.5">Outreach Copy: Short Direct vs Reputation Gap</h2>
          </div>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded font-bold text-xs flex items-center gap-1">
            <Play className="w-3 h-3" /> Running (59 Total Samples)
          </span>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-bold text-sm">Variant A: Short Direct (Control)</span>
              <span className="text-white/40">50% Allocation</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center pt-2">
              <div className="p-2 bg-black/50 rounded">
                <span className="text-[10px] text-white/40 block">Sample Size</span>
                <span className="font-bold text-sm mt-1 block">28</span>
              </div>
              <div className="p-2 bg-black/50 rounded">
                <span className="text-[10px] text-white/40 block">Conversions</span>
                <span className="font-bold text-sm mt-1 block">8 (28.6%)</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-emerald-500/5 rounded-lg border border-emerald-500/20 space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-bold text-sm text-emerald-400">Variant B: Reputation Gap (Treatment)</span>
              <span className="text-white/40">50% Allocation</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center pt-2">
              <div className="p-2 bg-black/50 rounded">
                <span className="text-[10px] text-white/40 block">Sample Size</span>
                <span className="font-bold text-sm mt-1 block">31</span>
              </div>
              <div className="p-2 bg-black/50 rounded">
                <span className="text-[10px] text-white/40 block">Conversions</span>
                <span className="font-bold text-sm text-emerald-400 mt-1 block">14 (45.2%)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-black/40 rounded-lg border border-white/10 flex justify-between items-center">
          <div>
            <span className="text-xs font-semibold text-white">Statistical Result: LIKELY WINNER (+58% Relative Lift)</span>
            <p className="text-[11px] text-white/50 mt-0.5">p-value: 0.18 (Approaching 95% target significance at n=60)</p>
          </div>
          <button
            onClick={() => setDeployed(true)}
            disabled={deployed}
            className="bg-white text-black font-semibold text-xs px-4 py-2 rounded flex items-center gap-1.5 disabled:opacity-50"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            {deployed ? "Variant B Deployed as Default" : "Deploy Winner as Default"}
          </button>
        </div>
      </div>
    </div>
  );
}
