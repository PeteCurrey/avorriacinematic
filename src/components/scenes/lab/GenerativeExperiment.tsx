"use client";
import React, { useState } from "react";
import { CursorTrigger } from "@/providers/CursorContext";

type Intent = "DEFAULT" | "COMPARE" | "DATA" | "CONFIGURE";

export function GenerativeExperiment() {
  const [intent, setIntent] = useState<Intent>("DEFAULT");

  return (
    <article className="p-8 sm:p-12 border border-avorria-line bg-avorria-surface space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-avorria-line/40 pb-6">
        <div>
          <span className="font-mono text-xs text-avorria-signal uppercase tracking-wider">01 // PROTOTYPE</span>
          <h3 className="font-sans text-xl sm:text-2xl font-bold text-avorria-white mt-1">Generative Interface</h3>
          <p className="font-mono text-xs text-avorria-muted uppercase mt-0.5">Adaptive Layout Hierarchy based on Intent</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {( ["DEFAULT", "COMPARE", "DATA", "CONFIGURE"] as Intent[] ).map((mode) => (
            <CursorTrigger key={mode} state="try" label="TRY">
              <button
                onClick={() => setIntent(mode)}
                className={`px-3 py-1.5 font-mono text-xs uppercase border transition-colors ${intent === mode ? "border-avorria-signal bg-avorria-signal/20 text-avorria-signal" : "border-avorria-line text-avorria-muted hover:text-avorria-white"}`}
              >
                {mode}
              </button>
            </CursorTrigger>
          ))}
        </div>
      </div>

      {/* Dynamic Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 min-h-[260px] transition-all duration-500">
        {intent === "DEFAULT" && (
          <>
            <div className="md:col-span-8 p-6 bg-avorria-black border border-avorria-line space-y-2">
              <div className="font-mono text-xs text-avorria-signal">PRIMARY WORKSPACE</div>
              <div className="font-sans text-lg font-bold text-avorria-white">Standard Operational Layout</div>
              <p className="text-xs text-avorria-muted">Neutral balanced information architecture.</p>
            </div>
            <div className="md:col-span-4 p-6 bg-avorria-black border border-avorria-line space-y-2">
              <div className="font-mono text-xs text-avorria-quiet">CONTEXT MODULE</div>
              <div className="font-sans text-sm font-bold text-avorria-white">Auxiliary Details</div>
            </div>
          </>
        )}

        {intent === "COMPARE" && (
          <>
            <div className="md:col-span-6 p-6 bg-avorria-black border border-avorria-signal/60 space-y-3">
              <div className="font-mono text-xs text-avorria-signal">OPTION A // SYSTEM ALPHA</div>
              <div className="font-sans text-base font-bold text-avorria-white">Direct API Pipeline</div>
              <div className="font-mono text-xs text-avorria-muted">Latency: 12ms | Throughput: 4.8k ops/s</div>
            </div>
            <div className="md:col-span-6 p-6 bg-avorria-black border border-avorria-signal/60 space-y-3">
              <div className="font-mono text-xs text-avorria-signal">OPTION B // SYSTEM BETA</div>
              <div className="font-sans text-base font-bold text-avorria-white">Distributed Cache</div>
              <div className="font-mono text-xs text-avorria-muted">Latency: 4ms | Throughput: 18.2k ops/s</div>
            </div>
          </>
        )}

        {intent === "DATA" && (
          <div className="md:col-span-12 p-6 bg-avorria-black border border-avorria-signal space-y-4">
            <div className="font-mono text-xs text-avorria-signal">ANALYTICAL DEEP-DIVE</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
              <div className="p-3 bg-avorria-surface border border-avorria-line/40">DENSITY: 94.2%</div>
              <div className="p-3 bg-avorria-surface border border-avorria-line/40">VARIANCE: -0.04</div>
              <div className="p-3 bg-avorria-surface border border-avorria-line/40">PEAK: 1,840 req/s</div>
              <div className="p-3 bg-avorria-surface border border-avorria-line/40">HEALTH: OPTIMAL</div>
            </div>
          </div>
        )}

        {intent === "CONFIGURE" && (
          <>
            <div className="md:col-span-4 p-6 bg-avorria-black border border-avorria-line space-y-2">
              <div className="font-mono text-xs text-avorria-signal">PARAMETER CONTROLS</div>
              <div className="text-xs text-avorria-muted">Adjust operational bounds in real-time.</div>
            </div>
            <div className="md:col-span-8 p-6 bg-avorria-black border border-avorria-signal space-y-2 flex items-center justify-center">
              <span className="font-mono text-xs text-avorria-signal">DYNAMIC PARAMETER VIEWPORT (ADAPTED)</span>
            </div>
          </>
        )}
      </div>
    </article>
  );
}
