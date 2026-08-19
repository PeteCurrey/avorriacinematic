import React from "react";
import { BREATH_CONFIG } from "@/lib/scenes/breath-scene-config";

export function BreathFallback() {
  return (
    <div className="w-full min-h-[90vh] bg-avorria-black px-6 sm:px-12 lg:px-16 py-24 flex flex-col justify-center max-w-[1760px] mx-auto select-none">
      <div className="max-w-5xl flex flex-col gap-10 border-l border-avorria-line pl-6 sm:pl-12">
        <div className="font-mono text-xs text-avorria-signal uppercase tracking-widest">
          {BREATH_CONFIG.metadataLabel}
        </div>

        <div className="space-y-4">
          <div className="display-lg text-avorria-white uppercase tracking-tight">
            {BREATH_CONFIG.premiseLine1} {BREATH_CONFIG.premiseLine2}
          </div>
          <div className="display-lg text-avorria-signal uppercase tracking-tight">
            {BREATH_CONFIG.conclusionLine1} {BREATH_CONFIG.conclusionLine2}
          </div>
        </div>

        <p className="font-body text-base text-avorria-muted leading-relaxed max-w-md">
          {BREATH_CONFIG.supportingCopy}
        </p>
      </div>
    </div>
  );
}
