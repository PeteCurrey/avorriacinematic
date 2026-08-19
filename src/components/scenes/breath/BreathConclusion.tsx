import React from "react";
import { BREATH_CONFIG } from "@/lib/scenes/breath-scene-config";

interface BreathConclusionProps {
  progress: number; // 0.0 to 1.0
}

export function BreathConclusion({ progress }: BreathConclusionProps) {
  // Active between 0.56 and 0.96
  if (progress < 0.54) return null;

  // Entry reveal (0.58 -> 0.74)
  const enterT = Math.min(1, Math.max(0, (progress - 0.58) / 0.16));
  const exitT = progress > 0.88 ? Math.min(1, (progress - 0.88) / 0.10) : 0;
  const opacity = exitT > 0 ? (1 - exitT) : enterT;
  const yTranslate = enterT < 1 ? (1 - enterT) * 44 : exitT > 0 ? -exitT * 36 : 0;

  // Support copy opacity (fades in at 0.72 -> 0.82)
  const supportOpacity = progress < 0.72 ? 0 : progress < 0.82 ? (progress - 0.72) / 0.10 : exitT > 0 ? (1 - exitT * 1.5) : 1.0;

  return (
    <div
      className="absolute inset-0 w-full h-full flex flex-col justify-center max-w-[1760px] mx-auto px-6 sm:px-12 lg:px-16 pointer-events-none z-20"
      style={{ opacity, transform: `translateY(${yTranslate}px)` }}
      aria-hidden="true"
    >
      <div className="max-w-6xl pl-4 sm:pl-20 lg:pl-48 flex flex-col gap-1 sm:gap-3">
        <div className="overflow-hidden pb-1">
          <div className="display-xl text-avorria-white tracking-tight uppercase select-none">
            {BREATH_CONFIG.conclusionLine1}
          </div>
        </div>
        <div className="overflow-hidden pt-1">
          <div className="display-xl text-avorria-signal tracking-tight uppercase select-none">
            ADVANTAGE<span className="text-avorria-signal">.</span>
          </div>
        </div>

        {/* Subordinate Supporting Line */}
        <div
          className="pt-6 sm:pt-10 max-w-lg transition-opacity duration-300"
          style={{ opacity: Math.max(0, supportOpacity) }}
        >
          <p className="font-body text-sm sm:text-base text-avorria-muted leading-relaxed select-none">
            {BREATH_CONFIG.supportingCopy}
          </p>
        </div>
      </div>
    </div>
  );
}
