import React from "react";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { getFullAutopilotReadiness } from "@/lib/db/repository";
import { ArrowLeft, Lock, AlertTriangle, ShieldCheck } from "lucide-react";

export default async function FullAutopilotReadinessPage() {
  await requireAdmin();
  const checks = await getFullAutopilotReadiness();

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 text-white text-xs">
      <div>
        <Link href="/admin/ai-auto/production" className="text-white/50 hover:text-white flex items-center gap-1 mb-2">
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Production Control
        </Link>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight">Full Autopilot Certification</h1>
          <span className="bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1">
            <Lock className="w-3 h-3" /> LOCKED BY POLICY
          </span>
        </div>
        <p className="text-white/50 mt-1">
          Full Autopilot requires certified human agreement and deliverability benchmarks. Proposals, pricing, and live site launch remain permanently human-controlled.
        </p>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
          <span className="font-bold text-sm text-white">Full Autopilot Readiness Criteria</span>
          <span className="text-red-400 font-bold uppercase text-[10px]">OVERALL: NOT READY</span>
        </div>

        <table className="w-full text-left">
          <thead className="bg-white/5 text-white/40 uppercase font-semibold text-[10px]">
            <tr>
              <th className="p-3">Requirement</th>
              <th className="p-3">Category</th>
              <th className="p-3">Threshold</th>
              <th className="p-3">Current</th>
              <th className="p-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {checks.map((c) => (
              <tr key={c.check_key} className="hover:bg-white/[0.01]">
                <td className="p-3 font-semibold text-white/90">{c.label}</td>
                <td className="p-3 text-white/50">{c.category}</td>
                <td className="p-3 font-mono text-white/60">{c.threshold ?? "Enforced"}</td>
                <td className="p-3 font-mono text-white">{c.metric_value ?? "—"}</td>
                <td className="p-3 text-right">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                    c.status === "READY"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : c.status === "BLOCKED"
                      ? "bg-red-500/20 text-red-400"
                      : c.status === "NOT_AUTHORIZED" || c.status === "DISABLED_BY_POLICY"
                      ? "bg-white/10 text-white/50"
                      : "bg-amber-500/20 text-amber-400"
                  }`}>
                    {c.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
