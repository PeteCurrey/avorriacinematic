"use client";
import React from "react";
import Link from "next/link";
import { ArrowLeft, TrendingUp } from "lucide-react";

export default function ForecastPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 text-white">
      <div>
        <Link href="/admin/finance" className="text-xs text-white/50 hover:text-white flex items-center gap-1 mb-2">
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Finance Command
        </Link>
        <h1 className="text-2xl font-bold">Pipeline Forecasting & Sales Velocity</h1>
        <p className="text-sm text-white/50">Deterministic Base / Upside / Downside revenue projections.</p>
      </div>

      <div className="grid grid-cols-3 gap-6 text-xs">
        <div className="bg-[#111] border border-white/10 rounded-xl p-5 space-y-2">
          <span className="text-white/40 uppercase font-semibold text-[10px]">Downside Band</span>
          <div className="text-2xl font-bold text-white">£12,000</div>
          <p className="text-white/50">Committed cash + locked contracts</p>
        </div>
        <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-5 space-y-2">
          <span className="text-emerald-400 uppercase font-bold text-[10px]">Base Forecast</span>
          <div className="text-3xl font-black text-emerald-400">£18,500</div>
          <p className="text-white/70">Weighted pipeline (42% stage close probability)</p>
        </div>
        <div className="bg-[#111] border border-white/10 rounded-xl p-5 space-y-2">
          <span className="text-white/40 uppercase font-semibold text-[10px]">Upside Band</span>
          <div className="text-2xl font-bold text-white">£24,500</div>
          <p className="text-white/50">All active proposals close</p>
        </div>
      </div>
    </div>
  );
}
