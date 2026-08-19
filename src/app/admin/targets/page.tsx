"use client";
import React from "react";
import Link from "next/link";
import { Target, CheckCircle2, TrendingUp, AlertTriangle } from "lucide-react";

export default function TargetsPage() {
  const targets = [
    { key: "Monthly Revenue", actual: "£5,550", target: "£20,000", progress: "28%", pace: "ON_TRACK", color: "text-emerald-400" },
    { key: "Monthly Cash Collected", actual: "£3,700", target: "£15,000", progress: "25%", pace: "ON_TRACK", color: "text-emerald-400" },
    { key: "Clients Won", actual: "3", target: "8", progress: "38%", pace: "AHEAD", color: "text-emerald-400" },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 text-white">
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-3xl font-extrabold">Business Targets & Performance Pace</h1>
        <p className="text-sm text-white/50 mt-1">Track actual progress vs configured monthly operating milestones.</p>
      </div>

      <div className="grid grid-cols-3 gap-6 text-xs">
        {targets.map((t) => (
          <div key={t.key} className="bg-[#111] border border-white/10 rounded-xl p-5 space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-bold text-white">{t.key}</span>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                {t.pace}
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-2xl font-black text-white">{t.actual}</span>
              <span className="text-white/40">Target: {t.target}</span>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-400 h-full" style={{ width: t.progress }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
