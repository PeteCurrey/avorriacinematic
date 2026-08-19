"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Compass, Calculator, AlertTriangle } from "lucide-react";
import { calculateReverseTarget } from "@/lib/finance/scenario-engine";

export default function CEOReverseTargetSimulatorPage() {
  const [goal, setGoal] = useState(50000);
  const [aov, setAov] = useState(1850);
  const [closeRate, setCloseRate] = useState(0.045);

  const res = calculateReverseTarget({
    targetRevenueGoal: goal,
    averageOrderValue: aov,
    closeRateFromContacted: closeRate,
    approvalRate: 0.85,
    qualificationRate: 0.25,
    aiCostPerScoutCandidate: 0.35,
  });

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 text-white text-xs">
      <div>
        <Link href="/admin/finance" className="text-white/50 hover:text-white flex items-center gap-1 mb-2">
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Finance Command
        </Link>
        <h1 className="text-2xl font-bold">CEO Reverse Target Engine</h1>
        <p className="text-sm text-white/50">Enter a target revenue goal to back-calculate the required operational funnel.</p>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-1 bg-[#111] border border-white/10 rounded-xl p-6 space-y-4">
          <h2 className="text-sm font-semibold uppercase text-white/50">Goal Parameters</h2>
          <div>
            <label className="block text-white/60 mb-1">Monthly Revenue Goal (£)</label>
            <input
              type="number"
              value={goal}
              onChange={(e) => setGoal(Number(e.target.value))}
              className="w-full bg-white/5 border border-white/10 p-2.5 rounded text-white font-bold text-base focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-white/60 mb-1">Average Sale Value (£)</label>
            <input
              type="number"
              value={aov}
              onChange={(e) => setAov(Number(e.target.value))}
              className="w-full bg-white/5 border border-white/10 p-2.5 rounded text-white font-mono text-sm focus:outline-none"
            />
          </div>
        </div>

        <div className="col-span-2 bg-[#111] border border-white/10 rounded-xl p-6 space-y-4 flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-4">Required Funnel Cadence</h2>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-white/5 rounded border border-white/10">
                <span className="text-[10px] text-white/40 block">Clients Required</span>
                <span className="text-xl font-bold text-white mt-1 block">{res.requiredClients}</span>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10">
                <span className="text-[10px] text-white/40 block">Prospects Contacted</span>
                <span className="text-xl font-bold text-white mt-1 block">{res.requiredContactedProspects}</span>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10">
                <span className="text-[10px] text-white/40 block">Daily Scout Cadence</span>
                <span className="text-xl font-bold text-emerald-400 mt-1 block">{res.dailyScoutCadence} / day</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-black/40 rounded border border-white/10 flex justify-between items-center">
            <div>
              <span className="text-white/60 block">Estimated AI Machine Spend</span>
              <span className="font-mono text-white font-bold text-base">£{res.estimatedAISpend.toLocaleString()}</span>
            </div>
            <div className="text-right">
              <span className="text-white/60 block">Estimated Gross Contribution</span>
              <span className="font-bold text-emerald-400 text-lg">£{res.estimatedContribution.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
