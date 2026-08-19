"use client";
import React from "react";
import Link from "next/link";
import { ArrowLeft, FileText, CheckCircle2 } from "lucide-react";

export default function OutreachOptimisationPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 text-white">
      <div>
        <Link href="/admin/optimisation" className="text-xs text-white/50 hover:text-white flex items-center gap-1 mb-2">
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Optimisation Centre
        </Link>
        <h1 className="text-2xl font-bold">Outreach Strategy & Response Analytics</h1>
        <p className="text-sm text-white/50">Evaluate open rates, preview clicks, and reply classifications across message variants.</p>
      </div>

      <div className="grid grid-cols-2 gap-6 text-xs">
        <div className="bg-[#111] border border-white/10 rounded-xl p-6 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white/50">Strategy: REPUTATION_GAP (Winner)</h2>
          <p className="text-white/70 leading-relaxed">
            Leading directly with the gap between 5-star Google reviews and outdated mobile site creates highest curiosity.
          </p>
          <div className="grid grid-cols-3 gap-2 text-center pt-2">
            <div className="p-3 bg-white/5 rounded">
              <span className="text-[10px] text-white/40 block">Sent</span>
              <span className="font-bold text-base mt-1 block">31</span>
            </div>
            <div className="p-3 bg-white/5 rounded">
              <span className="text-[10px] text-white/40 block">Preview Clicks</span>
              <span className="font-bold text-base text-emerald-400 mt-1 block">45.2%</span>
            </div>
            <div className="p-3 bg-white/5 rounded">
              <span className="text-[10px] text-white/40 block">Positive Reply</span>
              <span className="font-bold text-base text-emerald-400 mt-1 block">19.4%</span>
            </div>
          </div>
        </div>

        <div className="bg-[#111] border border-white/10 rounded-xl p-6 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white/50">Strategy: SHORT_DIRECT</h2>
          <p className="text-white/70 leading-relaxed">
            Concise 2-paragraph note informing the director that a preview was prepared for their business.
          </p>
          <div className="grid grid-cols-3 gap-2 text-center pt-2">
            <div className="p-3 bg-white/5 rounded">
              <span className="text-[10px] text-white/40 block">Sent</span>
              <span className="font-bold text-base mt-1 block">28</span>
            </div>
            <div className="p-3 bg-white/5 rounded">
              <span className="text-[10px] text-white/40 block">Preview Clicks</span>
              <span className="font-bold text-base mt-1 block">28.6%</span>
            </div>
            <div className="p-3 bg-white/5 rounded">
              <span className="text-[10px] text-white/40 block">Positive Reply</span>
              <span className="font-bold text-base mt-1 block">10.7%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
