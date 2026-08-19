import React from "react";
import { FINALE_CONFIG } from "@/lib/scenes/finale-config";
import { Z } from "@/lib/scene-z";

interface FinaleQuestionProps {
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

export function FinaleQuestion({ containerRef }: FinaleQuestionProps) {
  return (
    <div
      ref={containerRef}
      className="absolute top-24 sm:top-28 left-6 sm:left-16 select-none pointer-events-none opacity-0"
      style={{ zIndex: Z.copy }}
    >
      <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest block mb-2">
        18 / FINALE <span>{"//"}</span> ACTION
      </span>
      <h3 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-avorria-white leading-tight whitespace-pre-line">
        {FINALE_CONFIG.questionText}
      </h3>
    </div>
  );
}
