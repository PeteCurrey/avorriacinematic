import React from "react";
import { BREATH_CONFIG } from "@/lib/scenes/breath-scene-config";

interface BreathPremiseProps {
  progress: number; // Global scene progress 0.0 to 1.0
}

export function BreathPremise({ progress }: BreathPremiseProps) {
  // Active between 0.12 and 0.65
  if (progress < 0.10 || progress > 0.68) return null;

  // Entry reveal (0.15 -> 0.35)
  const enterT = Math.min(1, Math.max(0, (progress - 0.15) / 0.20));
  const opacity = enterT < 1 ? enterT : progress < 0.48 ? 1.0 : Math.max(0.15, 1.0 - (progress - 0.48) / 0.14 * 0.85);
  const yTranslate = enterT < 1 ? (1 - enterT) * 48 : progress < 0.48 ? 0 : -(progress - 0.48) / 0.14 * 40;

  return (
    <div
      className="absolute inset-0 w-full h-full flex flex-col justify-center max-w-[1760px] mx-auto px-6 sm:px-12 lg:px-16 pointer-events-none z-10"
      style={{ opacity, transform: `translateY(${yTranslate}px)` }}
      aria-hidden="true"
    >
      <div className="max-w-6xl pl-2 sm:pl-8 lg:pl-16 flex flex-col gap-1 sm:gap-3">
        <div className="overflow-hidden pb-1">
          <div className="display-xl text-avorria-white tracking-tight uppercase select-none">
            {BREATH_CONFIG.premiseLine1}
          </div>
        </div>
        <div className="overflow-hidden pt-1">
          <div className="display-xl text-avorria-white tracking-tight uppercase select-none">
            {BREATH_CONFIG.premiseLine2}
          </div>
        </div>
      </div>
    </div>
  );
}
