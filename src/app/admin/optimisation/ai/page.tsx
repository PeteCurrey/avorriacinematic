"use client";
import React from "react";
import Link from "next/link";
import { ArrowLeft, DollarSign, Zap } from "lucide-react";

export default function AIEconomicsPage() {
  const tasks = [
    { task: "website_analysis", calls: 142, cost: "£5.68", pct: "34%", model: "gpt-4o" },
    { task: "creative_direction", calls: 38, cost: "£4.18", pct: "25%", model: "claude-3-7-sonnet" },
    { task: "business_discovery", calls: 18, cost: "£2.70", pct: "16%", model: "gpt-4o (web)" },
    { task: "deep_research", calls: 12, cost: "£2.16", pct: "13%", model: "gpt-4o" },
    { task: "outreach_copy", calls: 28, cost: "£0.56", pct: "3%", model: "gpt-4o-mini" },
    { task: "business_verification", calls: 110, cost: "£0.22", pct: "1%", model: "gpt-4o-mini" },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 text-white">
      <div>
        <Link href="/admin/optimisation" className="text-xs text-white/50 hover:text-white flex items-center gap-1 mb-2">
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Optimisation Centre
        </Link>
        <h1 className="text-2xl font-bold">AI Economics & Task Waste Analysis</h1>
        <p className="text-sm text-white/50">Granular token consumption, model costs, and unit economics per qualified prospect.</p>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden text-xs">
        <div className="p-5 border-b border-white/10 flex justify-between items-center">
          <span className="font-semibold text-sm">Task Spend Distribution</span>
          <span className="text-white/40">Total AI Spend: £16.70 (30 Days)</span>
        </div>
        <table className="w-full text-left">
          <thead className="bg-white/5 text-white/40 uppercase font-semibold text-[10px]">
            <tr>
              <th className="p-4">AI Task</th>
              <th className="p-4">Model Assigned</th>
              <th className="p-4">Calls</th>
              <th className="p-4">Total Cost</th>
              <th className="p-4">% of AI Budget</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {tasks.map((t) => (
              <tr key={t.task} className="hover:bg-white/[0.02]">
                <td className="p-4 font-mono font-semibold text-white">{t.task}</td>
                <td className="p-4 text-white/70">{t.model}</td>
                <td className="p-4">{t.calls}</td>
                <td className="p-4 font-bold text-white">{t.cost}</td>
                <td className="p-4 text-emerald-400 font-bold">{t.pct}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
