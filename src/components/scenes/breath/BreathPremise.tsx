import React from "react";
import { BREATH_CONFIG } from "@/lib/scenes/breath-scene-config";
import { Z } from "@/lib/scene-z";

interface BreathPremiseProps {
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

export function BreathPremise({ containerRef }: BreathPremiseProps) {
  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full flex flex-col justify-center max-w-[1760px] mx-auto px-6 sm:px-12 lg:px-16 pointer-events-none opacity-0"
      style={{ zIndex: Z.copy }}
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
