"use client";
import React, { useState } from "react";
import { CursorTrigger } from "@/providers/CursorContext";

type Lens = "GROWTH" | "RISK" | "EFFICIENCY";

export function DataExperiment() {
  const [lens, setLens] = useState<Lens>("GROWTH");

  const metrics: Record<Lens, Array<{ label: string; val: string; pct: number }>> = {
    GROWTH: [
      { label: "GLOBAL PIPELINE", val: "+34.2%", pct: 88 },
      { label: "ACTIVE INTEGRATIONS", val: "142 NODES", pct: 72 },
      { label: "NEW CAPACITY", val: "85.0k", pct: 64 }
    ],
    RISK: [
      { label: "DRIFT DETECTED", val: "0.01%", pct: 12 },
      { label: "FALLBACK LATENCY", val: "< 18ms", pct: 24 },
      { label: "CIRCUIT HEALTH", val: "99.98%", pct: 99 }
    ],
    EFFICIENCY: [
      { label: "RESOURCE UTILIZATION", val: "91.4%", pct: 91 },
      { label: "AVG CYCLE DURATION", val: "1.2s", pct: 82 },
      { label: "CACHE HIT RATE", val: "98.6%", pct: 98 }
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
