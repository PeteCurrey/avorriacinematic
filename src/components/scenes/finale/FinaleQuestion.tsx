import React from "react";
import { FINALE_CONFIG } from "@/lib/scenes/finale-config";

interface FinaleQuestionProps {
  progress: number;
}

export function FinaleQuestion({ progress }: FinaleQuestionProps) {
  // Visible 0.28 -> 0.46, stays subtle at top
  if (progress < 0.25) return null;

  const opacity = progress < 0.28 ? (progress - 0.25) / 0.03 : progress > 0.65 ? Math.max(1 - (progress - 0.65) / 0.1, 0.2) : 1;
  const translateY = progress < 0.35 ? 30 * (1 - (progress - 0.28) / 0.07) : 0;

  return (
    <div
      className="absolute top-24 sm:top-28 left-6 sm:left-16 select-none pointer-events-none transition-all duration-300 z-10"
      style={{ opacity, transform: `translateY(${Math.max(translateY, 0)}px)` }}
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
