import React from "react";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { getRolloutCohorts } from "@/lib/db/repository";
import { ArrowLeft, Plus, Users, ArrowRight, Layers } from "lucide-react";

export default async function CohortManagementPage() {
  await requireAdmin();
  const cohorts = await getRolloutCohorts();

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 text-white text-xs">
      <div className="flex justify-between items-start border-b border-white/10 pb-6">
        <div>
          <Link href="/admin/ai-auto/production" className="text-white/50 hover:text-white flex items-center gap-1 mb-2">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Production Control
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">Rollout Cohort Management</h1>
          <p className="text-white/50 mt-1">Compare performance, unit economics, and gate policies across rollout batches.</p>
        </div>
        <Link
          href="/admin/ai-auto/production/cohorts/new"
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black rounded font-bold uppercase tracking-wider flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" /> Create Cohort
        </Link>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-white/40 uppercase font-semibold text-[10px]">
            <tr>
              <th className="p-4">Cohort</th>
              <th className="p-4">Environment</th>
              <th className="p-4">Max Volume</th>
              <th className="p-4">AI Spend</th>
              <th className="p-4">First-Pass %</th>
              <th className="p-4">Interventions</th>
              <th className="p-4">Clients Won</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {cohorts.map((c) => (
              <tr key={c.id} className="hover:bg-white/[0.02]">
                <td className="p-4 font-bold text-white">{c.name}</td>
                <td className="p-4 text-white/70">{c.environment}</td>
                <td className="p-4 text-white/70">{c.max_prospects}</td>
                <td className="p-4 text-emerald-400 font-semibold">£0.00 / £{c.total_ai_budget_limit.toFixed(2)}</td>
                <td className="p-4 text-white/50">—</td>
                <td className="p-4 text-white/50">0</td>
                <td className="p-4 text-white/50">0</td>
                <td className="p-4">
                  <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                    {c.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <Link
                    href={`/admin/ai-auto/production/cohorts/${c.id}`}
                    className="text-emerald-400 hover:underline font-bold"
                  >
                    Console &rarr;
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
