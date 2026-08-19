import React from "react";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { getProductionReadinessSections } from "@/lib/db/repository";
import { ArrowLeft, CheckCircle2, AlertTriangle, XCircle, ShieldCheck } from "lucide-react";

export default async function ProductionReadinessPage() {
  await requireAdmin();
  const sections = await getProductionReadinessSections();
  const hasBlockers = sections.some((s) => s.status === "BLOCKED");

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 text-white text-xs">
      <div>
        <Link href="/admin/ai-auto/production" className="text-white/50 hover:text-white flex items-center gap-1 mb-2">
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Production Control
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Production Readiness Certification</h1>
        <p className="text-white/50 mt-1">Deterministic verification of all AI, deliverability, and safety prerequisites.</p>
      </div>

      {/* OVERALL VERDICT BANNER */}
      <div className={`p-6 rounded-xl border flex items-start gap-4 ${
        hasBlockers
          ? "bg-red-500/10 border-red-500/30 text-white"
          : "bg-emerald-500/10 border-emerald-500/30 text-white"
      }`}>
        {hasBlockers ? (
          <XCircle className="w-6 h-6 text-red-400 shrink-0" />
        ) : (
          <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
        )}
        <div className="space-y-1">
          <h2 className="text-base font-extrabold tracking-wide uppercase">
            {hasBlockers ? "PILOT BLOCKED — CRITICAL PREREQUISITES REQUIRED" : "READY FOR PILOT EXECUTION"}
          </h2>
          <p className="text-white/70 leading-relaxed">
            {hasBlockers
              ? "Critical email deliverability dependencies must be resolved before executing live prospect outreach. Scout and Preview generation are ready."
              : "All technical dependencies and safety circuit breakers are certified ready for controlled pilot execution."}
          </p>
        </div>
      </div>

      {/* SECTIONS */}
      <div className="space-y-6">
        {sections.map((sec) => (
          <div key={sec.section} className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
              <span className="font-bold text-sm text-white">{sec.label}</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                sec.status === "READY"
                  ? "bg-emerald-500/20 text-emerald-400"
                  : sec.status === "BLOCKED"
                  ? "bg-red-500/20 text-red-400"
                  : "bg-amber-500/20 text-amber-400"
              }`}>
                {sec.status}
              </span>
            </div>

            <table className="w-full text-left">
              <tbody className="divide-y divide-white/5">
                {sec.checks.map((c) => (
                  <tr key={c.label} className="hover:bg-white/[0.01]">
                    <td className="p-3 font-semibold text-white/90 w-1/3">{c.label}</td>
                    <td className="p-3 text-white/50">{c.detail}</td>
                    <td className="p-3 text-right">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                        c.status === "READY"
                          ? "text-emerald-400"
                          : c.status === "BLOCKED"
                          ? "text-red-400"
                          : "text-amber-400"
                      }`}>
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}
