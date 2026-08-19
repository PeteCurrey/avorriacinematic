import React from "react";
import { FINALE_CONFIG } from "@/lib/scenes/finale-config";
import { Z } from "@/lib/scene-z";

interface FinalePropositionProps {
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

export function FinaleProposition({ containerRef }: FinalePropositionProps) {
  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex items-center justify-center p-6 sm:p-16 select-none pointer-events-none opacity-0"
      style={{ zIndex: Z.copy }}
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
