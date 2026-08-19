"use client";
import React from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, CheckCircle2 } from "lucide-react";

export default function CreativeOptimisationPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 text-white">
      <div>
        <Link href="/admin/optimisation" className="text-xs text-white/50 hover:text-white flex items-center gap-1 mb-2">
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Optimisation Centre
        </Link>
        <h1 className="text-2xl font-bold">Creative Strategy & Claude Analytics</h1>
        <p className="text-sm text-white/50">Analyze preview engagement, AI slop scores, and design economics.</p>
      </div>

      <div className="grid grid-cols-3 gap-6 text-xs">
        <div className="bg-[#111] border border-white/10 rounded-xl p-5 space-y-2">
          <span className="text-white/40 uppercase font-semibold text-[10px]">Top Strategy</span>
          <div className="text-lg font-bold text-white">high_energy_automotive</div>
          <p className="text-emerald-400 font-medium">48% preview dwell time lift</p>
        </div>
        <div className="bg-[#111] border border-white/10 rounded-xl p-5 space-y-2">
          <span className="text-white/40 uppercase font-semibold text-[10px]">Average AI Slop Score</span>
          <div className="text-lg font-bold text-emerald-400">14/100</div>
          <p className="text-white/50">Well below the 35/100 threshold</p>
        </div>
        <div className="bg-[#111] border border-white/10 rounded-xl p-5 space-y-2">
          <span className="text-white/40 uppercase font-semibold text-[10px]">Sonnet vs Opus</span>
          <div className="text-lg font-bold text-white">Sonnet 3.7 (Default)</div>
          <p className="text-white/50">£0.38 / design vs £1.85 (Opus)</p>
        </div>
      </div>
    </div>
  );
}
