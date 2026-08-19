"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Compass, Calculator } from "lucide-react";

export default function ScenarioModelingPage() {
  const [dailyDiscovered, setDailyDiscovered] = useState(25);
  const [qualRate, setQualRate] = useState(30);
  const [approvalRate, setApprovalRate] = useState(80);
  const [replyRate, setReplyRate] = useState(15);
  const [closeRate, setCloseRate] = useState(25);
  const [avgSale, setAvgSale] = useState(1850);
  const [aiCostPerProspect, setAiCostPerProspect] = useState(0.45);

  // Calculations
  const monthlyDiscovered = dailyDiscovered * 30;
  const monthlyQualified = Math.round(monthlyDiscovered * (qualRate / 100));
  const monthlyContacted = Math.round(monthlyQualified * (approvalRate / 100));
  const monthlyReplies = Math.round(monthlyContacted * (replyRate / 100));
  const monthlyClients = Math.round(monthlyReplies * (closeRate / 100));
  const monthlyRevenue = monthlyClients * avgSale;
  const monthlyAICost = Math.round(monthlyDiscovered * aiCostPerProspect + monthlyContacted * 0.85);
  const trackedContribution = monthlyRevenue - monthlyAICost;

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 text-white">
      <div>
        <Link href="/admin/optimisation" className="text-xs text-white/50 hover:text-white flex items-center gap-1 mb-2">
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Optimisation Centre
        </Link>
        <h1 className="text-2xl font-bold">Scenario Modeling & Capacity Simulator</h1>
        <p className="text-sm text-white/50">Mathematical simulator to forecast acquisition capacity, revenue, and tracked gross contribution.</p>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Sliders */}
        <div className="col-span-2 bg-[#111] border border-white/10 rounded-xl p-6 space-y-5 text-xs">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white/50 flex items-center gap-1.5">
            <Calculator className="w-4 h-4" /> Simulator Assumptions
          </h2>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span>Daily Scout Candidates</span>
                <span className="font-bold text-white">{dailyDiscovered} / day</span>
              </div>
              <input type="range" min="10" max="100" value={dailyDiscovered} onChange={(e) => setDailyDiscovered(Number(e.target.value))} className="w-full accent-white" />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span>Scout Qualification Rate (%)</span>
                <span className="font-bold text-white">{qualRate}%</span>
              </div>
              <input type="range" min="10" max="60" value={qualRate} onChange={(e) => setQualRate(Number(e.target.value))} className="w-full accent-white" />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span>Human Approval Rate (%)</span>
                <span className="font-bold text-white">{approvalRate}%</span>
              </div>
              <input type="range" min="40" max="100" value={approvalRate} onChange={(e) => setApprovalRate(Number(e.target.value))} className="w-full accent-white" />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span>Outreach Reply Rate (%)</span>
                <span className="font-bold text-white">{replyRate}%</span>
              </div>
              <input type="range" min="5" max="35" value={replyRate} onChange={(e) => setReplyRate(Number(e.target.value))} className="w-full accent-white" />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span>Reply &rarr; Client Close Rate (%)</span>
                <span className="font-bold text-white">{closeRate}%</span>
              </div>
              <input type="range" min="10" max="50" value={closeRate} onChange={(e) => setCloseRate(Number(e.target.value))} className="w-full accent-white" />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span>Average Deal Value (£)</span>
                <span className="font-bold text-white">£{avgSale}</span>
              </div>
              <input type="range" min="1000" max="5000" step="50" value={avgSale} onChange={(e) => setAvgSale(Number(e.target.value))} className="w-full accent-white" />
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="bg-[#111] border border-white/10 rounded-xl p-6 space-y-6 text-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-4">Forecasted 30-Day Output</h3>
            <div className="space-y-3">
              <div className="flex justify-between pb-2 border-b border-white/10">
                <span className="text-white/60">Contacted Volume</span>
                <span className="font-bold text-white">{monthlyContacted}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-white/10">
                <span className="text-white/60">Expected Replies</span>
                <span className="font-bold text-white">{monthlyReplies}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-white/10">
                <span className="text-white/60">Expected Clients</span>
                <span className="font-bold text-emerald-400 text-sm">{monthlyClients}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-white/10">
                <span className="text-white/60">Estimated AI Spend</span>
                <span className="font-mono text-white/80">£{monthlyAICost}</span>
              </div>
            </div>
          </div>

          <div className="bg-white/5 p-4 rounded-lg border border-white/10 space-y-1">
            <span className="text-[10px] text-white/40 uppercase font-semibold block">Tracked Monthly Gross Contribution</span>
            <div className="text-2xl font-black text-white">£{trackedContribution.toLocaleString()}</div>
            <p className="text-[10px] text-white/50">Revenue minus tracked AI generation and screening spend</p>
          </div>
        </div>
      </div>
    </div>
  );
}
