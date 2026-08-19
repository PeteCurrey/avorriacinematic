"use client";
import React from "react";
import Link from "next/link";
import { ArrowLeft, Zap, DollarSign } from "lucide-react";

export default function AIAutoFinancePage() {
  const metrics = [
    { label: "AI Cost / Qualified Prospect", val: "£0.44", sub: "Scout + Analysis" },
    { label: "AI Cost / Generated Website", val: "£0.42", sub: "Claude Creative Director" },
    { label: "AI Cost / Client Won", val: "£8.35", sub: "End-to-End Machine Spend" },
    { label: "Revenue / £1 AI Spend", val: "£221.50", sub: "ROI Multiple" },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 text-white">
      <div>
        <Link href="/admin/finance" className="text-xs text-white/50 hover:text-white flex items-center gap-1 mb-2">
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Finance Command
        </Link>
        <h1 className="text-2xl font-bold">AI Auto Unit Economics & Machine ROI</h1>
        <p className="text-sm text-white/50">Tracking every cent of AI spend from Scout discovery to signed client.</p>
      </div>

      <div className="grid grid-cols-4 gap-4 text-xs">
        {metrics.map((m) => (
          <div key={m.label} className="bg-[#111] border border-white/10 rounded-xl p-5 space-y-1">
            <span className="text-[10px] text-white/40 uppercase font-semibold block">{m.label}</span>
            <div className="text-2xl font-black text-emerald-400">{m.val}</div>
            <span className="text-[10px] text-white/50">{m.sub}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
