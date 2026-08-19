"use client";
import React from "react";
import Link from "next/link";
import { ArrowLeft, Zap, CheckCircle2, Sliders } from "lucide-react";

export default function ScoringCalibrationPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 text-white">
      <div>
        <Link href="/admin/optimisation" className="text-xs text-white/50 hover:text-white flex items-center gap-1 mb-2">
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Optimisation Centre
        </Link>
        <h1 className="text-2xl font-bold">Opportunity Score Calibration & Validation</h1>
        <p className="text-sm text-white/50">Compare Opportunity Score weights against actual commercial reply and close rates.</p>
      </div>

      <div className="grid grid-cols-2 gap-6 text-xs">
        <div className="bg-[#111] border border-white/10 rounded-xl p-6 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white/50">Current Scoring (v1_heuristic)</h2>
          <div className="space-y-2">
            {[
              { label: "Website Visual / Quality Gap", w: "30%" },
              { label: "Mobile Usability Gap", w: "20%" },
              { label: "Digital Reputation Strength", w: "20%" },
              { label: "Commercial Sector Fit", w: "15%" },
              { label: "Contactability Confidence", w: "15%" },
            ].map((dim) => (
              <div key={dim.label} className="flex justify-between p-2.5 bg-white/5 rounded">
                <span className="text-white/80">{dim.label}</span>
                <span className="font-mono text-white font-bold">{dim.w}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-emerald-400">Proposed Calibration (v3_data_informed)</h2>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold">Shadow Testing</span>
          </div>
          <div className="space-y-2">
            {[
              { label: "Digital Reputation Gap (High Reviews + Poor Site)", w: "35%", change: "+15%" },
              { label: "Website Visual / Quality Gap", w: "25%", change: "-5%" },
              { label: "Mobile Usability Gap", w: "20%", change: "0%" },
              { label: "Commercial Sector Fit", w: "10%", change: "-5%" },
              { label: "Contactability Confidence", w: "10%", change: "-5%" },
            ].map((dim) => (
              <div key={dim.label} className="flex justify-between p-2.5 bg-black/40 rounded border border-white/10">
                <span className="text-white/80">{dim.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold text-[10px]">{dim.change}</span>
                  <span className="font-mono text-white font-bold">{dim.w}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
