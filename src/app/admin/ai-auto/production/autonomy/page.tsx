import React from "react";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { getAutonomyReadiness } from "@/lib/db/repository";
import { ArrowLeft, Sliders, ShieldCheck } from "lucide-react";

export default async function AutonomyScorecardPage() {
  await requireAdmin();
  const items = await getAutonomyReadiness();

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 text-white text-xs">
      <div>
        <Link href="/admin/ai-auto/production" className="text-white/50 hover:text-white flex items-center gap-1 mb-2">
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Production Control
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Autonomy Readiness Scorecard</h1>
        <p className="text-white/50 mt-1">
          Evidence-based evaluation for every operational gate. Gates are moved individually based on observed data.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item.gate_key} className="p-5 bg-[#111] border border-white/10 rounded-xl space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-sm text-white">{item.gate_label}</h3>
                <span className="text-[10px] font-mono text-white/40">{item.gate_key}</span>
              </div>
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                {item.current_mode}
              </span>
            </div>

            <div className="p-3 bg-white/5 rounded space-y-1">
              <div className="flex justify-between text-white/60 text-[11px]">
                <span>Evidence Sample:</span>
                <span className="font-mono text-white">{item.evidence_sample_size} cases</span>
              </div>
              <div className="flex justify-between text-white/60 text-[11px]">
                <span>Recommendation:</span>
                <span className={`font-bold ${
                  item.readiness_recommendation === "DO_NOT_AUTOMATE"
                    ? "text-red-400"
                    : item.readiness_recommendation === "KEEP_MANUAL"
                    ? "text-white"
                    : "text-amber-400"
                }`}>
                  {item.readiness_recommendation}
                </span>
              </div>
            </div>

            <p className="text-white/60 leading-relaxed text-[11px]">{item.readiness_reason}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
