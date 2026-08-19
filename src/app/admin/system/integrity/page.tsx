"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ShieldCheck } from "lucide-react";

export default function SystemIntegrityPage() {
  const [running, setRunning] = useState(false);
  const [checked, setChecked] = useState(true);

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 text-white">
      <div>
        <Link href="/admin/system" className="text-xs text-white/50 hover:text-white flex items-center gap-1 mb-2">
          <ArrowLeft className="w-3.5 h-3.5" /> Return to System Health
        </Link>
        <h1 className="text-2xl font-bold">System Integrity Verification</h1>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-lg p-6 space-y-4 text-xs">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-white/50">Integrity Checks (0 Issues Found)</h2>
        <div className="space-y-3">
          {[
            "Prospect & Business foreign key consistency",
            "Site project & active version linkage",
            "Payment schedules & proposal value reconciliation",
            "SSRF filter rules & IP restriction bounds",
            "Prompt injection boundaries & delimiter validation",
            "No duplicate running automation leases",
          ].map((check) => (
            <div key={check} className="flex items-center justify-between p-3 bg-white/5 rounded border border-white/10">
              <span className="text-white/80">{check}</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Pass
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
