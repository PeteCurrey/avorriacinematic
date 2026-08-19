"use client";
import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, AlertTriangle, RefreshCw, ShieldAlert } from "lucide-react";

export default function SystemHealthPage() {
  const [emergencyStopped, setEmergencyStopped] = useState(false);

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 text-white">
      <div className="flex justify-between items-center border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl font-bold">System Health & Circuit Breakers</h1>
          <p className="text-sm text-white/50">Real-time status of Avorria internal runtime and providers</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/system/integrity"
            className="bg-white/10 hover:bg-white/20 text-xs font-semibold px-4 py-2 rounded flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Run Integrity Check
          </Link>
          <button
            onClick={() => setEmergencyStopped(!emergencyStopped)}
            className={`text-xs font-bold px-4 py-2 rounded flex items-center gap-1.5 ${emergencyStopped ? "bg-amber-500 text-black" : "bg-red-500/20 text-red-400 border border-red-500/40"}`}
          >
            <ShieldAlert className="w-4 h-4" />
            {emergencyStopped ? "EMERGENCY STOP ACTIVE" : "ACTIVATE EMERGENCY STOP"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {[
          { name: "Database Store", status: "Healthy", detail: "In-memory / Persistent store operational" },
          { name: "OpenAI Operational Intelligence", status: "Connected", detail: "gpt-4o / gpt-4o-mini active" },
          { name: "Anthropic Creative Director", status: "Connected", detail: "Claude 3.7 / 3.5 Sonnet active" },
          { name: "Preview Runtime", status: "Healthy", detail: "Multi-tenant preview router online" },
          { name: "Automation Queue", status: "Healthy", detail: "0 dead-letter jobs, 0 stuck leases" },
          { name: "Payment System", status: "Ready", detail: "Stripe adapter test-mode configured" },
        ].map((sys) => (
          <div key={sys.name} className="bg-[#111] border border-white/10 rounded-lg p-5 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-sm">{sys.name}</span>
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> {sys.status}
              </span>
            </div>
            <p className="text-xs text-white/50">{sys.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
