"use client";
import React from "react";
import Link from "next/link";
import { ArrowLeft, Users, TrendingUp } from "lucide-react";

export default function ClientProfitabilityPage() {
  const clients = [
    { name: "Apex Autocare Ltd", revenue: "£1,850.00", cash: "£925.00", aiCost: "£5.04", manualCost: "£90.00", fees: "£14.08", contribution: "£1,728.88", margin: "93.5%" },
    { name: "Vance Precision Engineering", revenue: "£3,700.00", cash: "£1,850.00", aiCost: "£5.35", manualCost: "£180.00", fees: "£28.15", contribution: "£3,462.50", margin: "93.6%" },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 text-white">
      <div>
        <Link href="/admin/finance" className="text-xs text-white/50 hover:text-white flex items-center gap-1 mb-2">
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Finance Command
        </Link>
        <h1 className="text-2xl font-bold">Client Unit Profitability & Contribution</h1>
        <p className="text-sm text-white/50">Revenue minus direct token costs, Stripe payment fees, and manual labor.</p>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-white/40 uppercase font-semibold text-[10px]">
            <tr>
              <th className="p-4">Client</th>
              <th className="p-4">Contracted</th>
              <th className="p-4">Cash Received</th>
              <th className="p-4">AI Spend</th>
              <th className="p-4">Manual Cost</th>
              <th className="p-4">Tracked Contribution</th>
              <th className="p-4">Margin %</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {clients.map((c) => (
              <tr key={c.name} className="hover:bg-white/[0.02]">
                <td className="p-4 font-bold text-white">{c.name}</td>
                <td className="p-4 font-bold">{c.revenue}</td>
                <td className="p-4 text-emerald-400 font-semibold">{c.cash}</td>
                <td className="p-4 text-white/60">{c.aiCost}</td>
                <td className="p-4 text-white/60">{c.manualCost}</td>
                <td className="p-4 font-black text-white">{c.contribution}</td>
                <td className="p-4 text-emerald-400 font-bold">{c.margin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
