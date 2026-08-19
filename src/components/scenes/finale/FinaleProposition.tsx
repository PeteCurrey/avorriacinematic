import React from "react";
import { FINALE_CONFIG } from "@/lib/scenes/finale-config";

interface FinalePropositionProps {
  progress: number;
}

export function FinaleProposition({ progress }: FinalePropositionProps) {
  // Lands at 0.46 -> holds until release
  if (progress < 0.44) return null;

  const opacity = Math.min((progress - 0.44) / 0.06, 1);
  const translateY = Math.max(40 * (1 - (progress - 0.44) / 0.08), 0);

  return (
    <div
      className="absolute inset-0 flex items-center justify-center p-6 sm:p-16 select-none pointer-events-none z-10"
      style={{ opacity, transform: `translateY(${translateY}px)` }}
    >
      <div className="max-w-[1760px] w-full grid grid-cols-12">
        <div className="col-span-12 lg:col-start-2 lg:col-span-10">
          <h2 className="font-display font-black text-5xl sm:text-7xl lg:text-[10vw] uppercase tracking-tight leading-[0.9] text-avorria-white whitespace-pre-line">
            BUILD<br />
            SOMETHING<br />
            <span className="text-avorria-signal">{FINALE_CONFIG.emphasisText}</span>
          </h2>
        </div>
      </div>
    </div>
  );
}
