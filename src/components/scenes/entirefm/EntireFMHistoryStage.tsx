import React from "react";
import { ENTIREFM_FIXTURE } from "@/lib/scenes/entirefm-scene-config";

interface EntireFMHistoryStageProps {
  progress: number; // 0.0 to 1.0
}

export function EntireFMHistoryStage({ progress }: EntireFMHistoryStageProps) {
  // Active between 0.74 and 0.92
  if (progress < 0.72 || progress > 0.93) return null;

  const opacity = progress < 0.78 ? (progress - 0.72) / 0.06 : progress < 0.88 ? 1.0 : Math.max(0, 1.0 - (progress - 0.88) / 0.04);

  return (
    <div
      className="absolute inset-0 w-full h-full flex items-center justify-center p-6 sm:p-12 z-20 pointer-events-none"
      style={{ opacity }}
      aria-hidden="true"
    >
      <div className="max-w-2xl w-full bg-avorria-surface border border-avorria-line p-8 shadow-2xl space-y-6">
        <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-avorria-quiet border-b border-avorria-line/40 pb-3">
          <span className="text-avorria-signal">ASSET RECORD UPDATED</span>
          <span>HISTORICAL LOG</span>
        </div>

        <div className="space-y-2">
          <div className="font-mono text-xs text-avorria-signal">TARGET ASSET: {ENTIREFM_FIXTURE.assetId} ({ENTIREFM_FIXTURE.assetName})</div>
          <div className="font-sans text-base font-bold text-avorria-white">{ENTIREFM_FIXTURE.location}</div>
        </div>

        <div className="p-4 border border-avorria-line/40 bg-avorria-black/80 font-mono text-xs space-y-2">
          <div className="text-avorria-white">RECORD: {ENTIREFM_FIXTURE.id} <span>{"//"}</span> RESOLUTION CONFIRMED</div>
          <div className="text-avorria-muted text-[11px]">{ENTIREFM_FIXTURE.resolution}</div>
          <div className="text-avorria-signal text-[10px] pt-2 border-t border-avorria-line/20 flex justify-between">
            <span>SLA: {ENTIREFM_FIXTURE.slaStatus}</span>
            <span>ASSIGNEE: {ENTIREFM_FIXTURE.assignee}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
