"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, AlertTriangle } from "lucide-react";

export default function NewCohortPage() {
  const [name, setName] = useState("PILOT 002 — PRECISION ENGINEERING");
  const [environment, setEnvironment] = useState("PILOT");
  const [maxProspects, setMaxProspects] = useState(10);
  const [maxOutreach, setMaxOutreach] = useState(6);
  const [dailyBudget, setDailyBudget] = useState(5);
  const [totalBudget, setTotalBudget] = useState(30);
  const [minScore, setMinScore] = useState(72);
  const [notes, setNotes] = useState("");

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-8 text-white text-xs">
      <div>
        <Link href="/admin/ai-auto/production/cohorts" className="text-white/50 hover:text-white flex items-center gap-1 mb-2">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Rollout Cohorts
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Configure New Rollout Cohort</h1>
        <p className="text-white/50 mt-1">
          Create a contained rollout experiment. Initial status will be set to DRAFT until certified.
        </p>
      </div>

      <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex gap-3">
        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-amber-400 block mb-0.5">Progressive Rollout Governance</span>
          <span className="text-white/70">
            Rollout cohorts enforce strict prospect limits, daily AI spend caps, and require Pete&apos;s manual sign-off on all high-risk gates.
          </span>
        </div>
      </div>

      <form className="space-y-6 bg-[#111] border border-white/10 p-6 rounded-xl" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-white/60 mb-1 font-semibold uppercase text-[10px]">Cohort Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 p-2.5 rounded text-white font-bold text-xs focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-white/60 mb-1 font-semibold uppercase text-[10px]">Environment</label>
            <select
              value={environment}
              onChange={(e) => setEnvironment(e.target.value)}
              className="w-full bg-[#151515] border border-white/10 p-2.5 rounded text-white text-xs focus:outline-none"
            >
              <option value="TEST">TEST</option>
              <option value="PILOT">PILOT</option>
              <option value="CONTROLLED_PRODUCTION">CONTROLLED PRODUCTION</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-white/60 mb-1 font-semibold uppercase text-[10px]">Max Prospects</label>
            <input
              type="number"
              value={maxProspects}
              onChange={(e) => setMaxProspects(Number(e.target.value))}
              className="w-full bg-white/5 border border-white/10 p-2.5 rounded text-white text-xs focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-white/60 mb-1 font-semibold uppercase text-[10px]">Max Outreach Sent</label>
            <input
              type="number"
              value={maxOutreach}
              onChange={(e) => setMaxOutreach(Number(e.target.value))}
              className="w-full bg-white/5 border border-white/10 p-2.5 rounded text-white text-xs focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-white/60 mb-1 font-semibold uppercase text-[10px]">Min Opportunity Score</label>
            <input
              type="number"
              value={minScore}
              onChange={(e) => setMinScore(Number(e.target.value))}
              className="w-full bg-white/5 border border-white/10 p-2.5 rounded text-white text-xs focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-white/60 mb-1 font-semibold uppercase text-[10px]">Daily AI Budget (£)</label>
            <input
              type="number"
              value={dailyBudget}
              onChange={(e) => setDailyBudget(Number(e.target.value))}
              className="w-full bg-white/5 border border-white/10 p-2.5 rounded text-white text-xs focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-white/60 mb-1 font-semibold uppercase text-[10px]">Total AI Budget (£)</label>
            <input
              type="number"
              value={totalBudget}
              onChange={(e) => setTotalBudget(Number(e.target.value))}
              className="w-full bg-white/5 border border-white/10 p-2.5 rounded text-white text-xs focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-white/60 mb-1 font-semibold uppercase text-[10px]">Targeting Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="Geographic focus, sector criteria, and expected hypothesis..."
            className="w-full bg-white/5 border border-white/10 p-2.5 rounded text-white text-xs focus:outline-none resize-none"
          />
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-white/10">
          <Link href="/admin/ai-auto/production/cohorts" className="text-white/50 hover:text-white">
            Cancel
          </Link>
          <button
            type="submit"
            className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold uppercase tracking-wider rounded flex items-center gap-2"
          >
            <Plus className="w-3.5 h-3.5" /> Save Draft Cohort
          </button>
        </div>
      </form>
    </div>
  );
}
