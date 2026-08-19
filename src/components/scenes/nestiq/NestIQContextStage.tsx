import React from "react";

interface NestIQContextStageProps {
  progress: number; // 0.0 to 1.0
}

export function NestIQContextStage({ progress }: NestIQContextStageProps) {
  // Active between 0.25 and 0.48
  if (progress < 0.24 || progress > 0.49) return null;

  const opacity = progress < 0.32 ? (progress - 0.24) / 0.08 : progress < 0.42 ? 1.0 : Math.max(0, 1.0 - (progress - 0.42) / 0.06);
  const lineT = Math.min(1, Math.max(0, (progress - 0.26) / 0.12));

  return (
    <div
      className="absolute inset-0 w-full h-full flex flex-col justify-center max-w-[1760px] mx-auto px-6 sm:px-12 z-20 pointer-events-none"
      style={{ opacity }}
      aria-hidden="true"
    >
      <div className="max-w-md flex flex-col gap-4 bg-avorria-black/85 border border-avorria-line p-6 backdrop-blur-md">
        <div className="flex items-center justify-between font-mono text-[10px] sm:text-xs uppercase tracking-widest text-avorria-quiet border-b border-avorria-line/40 pb-2">
          <span className="text-avorria-signal">003 / NESTIQ</span>
          <span>SPATIAL CONTEXT</span>
        </div>

        <div className="space-y-3 font-mono text-xs text-avorria-white">
          <div className="flex justify-between py-1.5 border-b border-avorria-line/30">
            <span className="text-avorria-quiet">LOCATION</span>
            <span>CHELSEA EMBANKMENT, SW3</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-avorria-line/30">
            <span className="text-avorria-quiet">TYPOLOGY</span>
            <span>PRIME RESIDENTIAL TOWNHOUSE</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-avorria-line/30">
            <span className="text-avorria-quiet">COMPARABLES</span>
            <span className="text-avorria-signal">12 ACTIVE DATA POINTS</span>
          </div>
        </div>

        {/* Fine Connecting Signal Rule extending to map */}
        <div className="w-full h-0.5 bg-avorria-line relative overflow-hidden mt-2">
          <div
            className="absolute inset-y-0 left-0 bg-avorria-signal transition-all duration-75"
            style={{ width: `${lineT * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
