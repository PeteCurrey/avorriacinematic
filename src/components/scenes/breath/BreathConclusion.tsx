import React from "react";
import { BREATH_CONFIG } from "@/lib/scenes/breath-scene-config";
import { Z } from "@/lib/scene-z";

interface BreathConclusionProps {
  containerRef?: React.RefObject<HTMLDivElement | null>;
  supportRef?: React.RefObject<HTMLDivElement | null>;
}

export function BreathConclusion({
  containerRef,
  supportRef,
}: BreathConclusionProps) {
  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full flex flex-col justify-center max-w-[1760px] mx-auto px-6 sm:px-12 lg:px-16 pointer-events-none opacity-0"
      style={{ zIndex: Z.copy }}
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
          ref={supportRef}
          className="pt-6 sm:pt-10 max-w-lg opacity-0"
        >
          <p className="font-body text-sm sm:text-base text-avorria-muted leading-relaxed select-none">
            {BREATH_CONFIG.supportingCopy}
          </p>
        </div>
      </div>
    </div>
  );
}
