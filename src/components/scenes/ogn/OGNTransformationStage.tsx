import React from "react";
import Image from "next/image";

interface OGNTransformationStageProps {
  opacity: number;
  progress: number; // 0.0 -> 1.0 within transformation window
}

export function OGNTransformationStage({ opacity, progress }: OGNTransformationStageProps) {
  if (opacity <= 0.01) return null;
  const dividerPercent = Math.min(Math.max(progress * 100, 0), 100);

  return (
    <div
      className="absolute inset-0 flex items-center justify-center p-4 sm:p-12 z-20 transition-opacity duration-300"
      style={{ opacity }}
    >
      <div className="relative w-full max-w-[1320px] aspect-[16/10] bg-avorria-surface border border-avorria-line overflow-hidden shadow-2xl select-none">
        {/* Base Layer: Previous Experience */}
        <div className="absolute inset-0">
          <Image
            src="/media/projects/ogn/ogn-previous-desktop.svg"
            alt="Previous digital experience"
            fill
            className="object-contain"
          />
        </div>

        {/* Top Layer: New Experience (Clipped via inset) */}
        <div
          className="absolute inset-0"
          style={{
            clipPath: `inset(0 ${100 - dividerPercent}% 0 0)`
          }}
        >
          <Image
            src="/media/projects/ogn/ogn-new-desktop.svg"
            alt="New digital experience"
            fill
            className="object-contain"
          />
        </div>

        {/* 1px Chartreuse Signal Divider */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-avorria-signal shadow-[0_0_12px_rgba(200,241,53,0.8)] z-30 pointer-events-none"
          style={{ left: `${dividerPercent}%` }}
        >
          <div className="absolute top-3 -left-3 bg-avorria-black border border-avorria-signal px-1.5 py-0.5 font-mono text-[9px] text-avorria-signal uppercase tracking-wider">
            RESTRUCTURING
          </div>
        </div>
      </div>
    </div>
  );
}
