"use client";
import React from "react";
import Link from "next/link";
import { ArrowLeft, Target, ShieldCheck, CheckCircle2, TrendingUp } from "lucide-react";

export default function TargetingOptimisationPage() {
  const sectors = [
    { sector: "Automotive Specialists", contacted: 42, replies: 6, clients: 2, conv: "4.8%", conf: "MODERATE", lift: "+128%", spend: "£88", revenue: "£3,700" },
    { sector: "Plumbing & Heating", contacted: 36, replies: 4, clients: 1, conv: "2.8%", conf: "MODERATE", lift: "+33%", spend: "£72", revenue: "£1,850" },
    { sector: "Electrical Contractors", contacted: 24, replies: 2, clients: 0, conv: "0.0%", conf: "EARLY_SIGNAL", lift: "-100%", spend: "£48", revenue: "£0" },
    { sector: "Dental & Private Health", contacted: 14, replies: 1, clients: 0, conv: "0.0%", conf: "EARLY_SIGNAL", lift: "—", spend: "£28", revenue: "£0" },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 text-white">
      <div>
        <Link href="/admin/optimisation" className="text-xs text-white/50 hover:text-white flex items-center gap-1 mb-2">
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Optimisation Centre
        </Link>
        <h1 className="text-2xl font-bold">Targeting Performance & Allocation</h1>
        <p className="text-sm text-white/50">Empirical conversion by sector and geographic cluster with statistical sample guardrails.</p>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden text-xs">
        <div className="p-5 border-b border-white/10 flex justify-between items-center">
          <span className="font-semibold text-sm">Sector Performance Breakdown</span>
          <span className="text-white/40">Sample Size Threshold: 10 contacts min</span>
        </div>
        <table className="w-full text-left">
          <thead className="bg-white/5 text-white/40 uppercase font-semibold text-[10px]">
            <tr>
              <th className="p-4">Sector</th>
              <th className="p-4">Contacted</th>
              <th className="p-4">Replies</th>
              <th className="p-4">Clients</th>
              <th className="p-4">Close Rate</th>
              <th className="p-4">Sample Confidence</th>
              <th className="p-4">AI Spend</th>
              <th className="p-4">Tracked Revenue</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {sectors.map((s) => (
              <tr key={s.sector} className="hover:bg-white/[0.02]">
                <td className="p-4 font-semibold text-white">{s.sector}</td>
                <td className="p-4">{s.contacted}</td>
                <td className="p-4">{s.replies}</td>
                <td className="p-4 font-bold text-emerald-400">{s.clients}</td>
                <td className="p-4 font-bold">{s.conv}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${s.conf === "MODERATE" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-white/10 text-white/60"}`}>
                    {s.conf}
                  </span>
                </td>
                <td className="p-4 text-white/60">{s.spend}</td>
                <td className="p-4 font-bold text-white">{s.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Suggested Allocation */}
      <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-6 space-y-3">
        <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
          <TrendingUp className="w-4 h-4" /> Recommendation: Adjust Tomorrow&apos;s Scout Allocation
        </h3>
        <p className="text-xs text-white/80 leading-relaxed">
          Automotive demonstrates statistically superior close rate (4.8% vs 2.1% overall) at £44 tracked AI cost per client. Recommended Scout capacity increase: 20% &rarr; 35%.
        </p>
      </div>
    </div>
  );
}
