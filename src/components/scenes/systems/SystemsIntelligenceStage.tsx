import React from "react";
import { SYSTEMS_LEADS } from "@/lib/scenes/systems-scene-config";

interface SystemsIntelligenceStageProps {
  progress: number; // 0.0 to 1.0
}

export function SystemsIntelligenceStage({ progress }: SystemsIntelligenceStageProps) {
  // Active between 0.25 and 0.65
  if (progress < 0.24 || progress > 0.66) return null;

  const opacity = progress < 0.32 ? (progress - 0.24) / 0.08 : progress < 0.58 ? 1.0 : Math.max(0, 1.0 - (progress - 0.58) / 0.07);

  return (
    <div
      className="absolute inset-0 w-full h-full flex flex-col justify-center max-w-[1760px] mx-auto px-6 sm:px-12 z-20 pointer-events-none"
      style={{ opacity }}
      aria-hidden="true"
    >
      <div className="max-w-xl flex flex-col gap-4 bg-avorria-black/90 border border-avorria-line p-6 backdrop-blur-md shadow-2xl ml-auto">
        <div className="flex items-center justify-between font-mono text-[10px] sm:text-xs uppercase tracking-widest text-avorria-quiet border-b border-avorria-line/40 pb-2">
          <span className="text-avorria-signal">INTELLIGENCE &amp; RULES EVALUATION</span>
          <span>AUTOMATED TRIAGE</span>
        </div>

        <div className="space-y-3 font-mono text-xs text-avorria-white">
          {SYSTEMS_LEADS.map((lead) => (
            <div key={lead.id} className="p-3 border border-avorria-line/40 bg-avorria-surface/80 flex flex-col gap-1">
              <div className="flex justify-between text-avorria-white font-bold">
                <span>{lead.label}</span>
                <span className="text-avorria-signal">INACTIVE: {lead.inactiveDays}D</span>
              </div>
              <div className="text-avorria-muted text-[11px]">{lead.status}</div>
              <div className="text-avorria-signal text-[10px] pt-1 border-t border-avorria-line/20">
                → {lead.ruleMatch}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
