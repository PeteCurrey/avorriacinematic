"use client";
import React, { useState } from "react";
import { CursorTrigger } from "@/providers/CursorContext";

type Lens = "GROWTH" | "RISK" | "EFFICIENCY";

export function DataExperiment() {
  const [lens, setLens] = useState<Lens>("GROWTH");

  const metrics: Record<Lens, Array<{ label: string; val: string; pct: number }>> = {
    GROWTH: [
      { label: "USER ACQUISITION PATHWAYS", val: "MULTI-CHANNEL", pct: 85 },
      { label: "DATA INGESTION FREQUENCY", val: "REAL-TIME", pct: 75 },
      { label: "STATE REHYDRATION", val: "SUB-SECOND", pct: 90 }
    ],
    RISK: [
      { label: "SCHEMA DRIFT TOLERANCE", val: "ZERO TOLERANCE", pct: 15 },
      { label: "FAILOVER LATENCY BOUND", val: "< 50MS", pct: 30 },
      { label: "AUDIT TRAIL LOGGING", val: "DURABLE / IMMUTABLE", pct: 100 }
    ],
    EFFICIENCY: [
      { label: "CLIENT COMPONENT OVERHEAD", val: "MINIMAL / PRUNED", pct: 90 },
      { label: "STATIC PRERENDER RATIO", val: "SSG PRIORITY", pct: 95 },
      { label: "CDN EDGE CACHING", val: "ACTIVE", pct: 98 }
    ]
  };

  return (
    <article className="p-8 sm:p-12 border border-avorria-line bg-avorria-surface space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-avorria-line/40 pb-6">
        <div>
          <span className="font-mono text-xs text-avorria-signal uppercase tracking-wider">06 // EXPERIMENT</span>
          <h3 className="font-sans text-xl sm:text-2xl font-bold text-avorria-white mt-1">Data Reasoning Field</h3>
          <p className="font-mono text-xs text-avorria-muted uppercase mt-0.5">Dynamic Analytical Lenses &amp; Reclustering</p>
        </div>
        <div className="flex items-center gap-2">
          {( ["GROWTH", "RISK", "EFFICIENCY"] as Lens[] ).map((m) => (
            <CursorTrigger key={m} state="try" label="TRY">
              <button
                onClick={() => setLens(m)}
                className={`px-3 py-1.5 font-mono text-xs uppercase border transition-colors ${lens === m ? "border-avorria-signal bg-avorria-signal/20 text-avorria-signal" : "border-avorria-line text-avorria-muted hover:text-avorria-white"}`}
              >
                {m}
              </button>
            </CursorTrigger>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics[lens].map((item) => (
          <div key={item.label} className="p-6 bg-avorria-black border border-avorria-line space-y-4">
            <div className="font-mono text-xs text-avorria-quiet uppercase">{item.label}</div>
            <div className="font-sans text-2xl font-bold text-avorria-white">{item.val}</div>
            <div className="w-full h-1.5 bg-avorria-surface overflow-hidden">
              <div
                className="h-full bg-avorria-signal transition-all duration-500"
                style={{ width: `${item.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
