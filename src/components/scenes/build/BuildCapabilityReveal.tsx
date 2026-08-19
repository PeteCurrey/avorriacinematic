import React from "react";
import Link from "next/link";
import { BUILD_PROPOSITION } from "@/lib/scenes/build-scene-config";
import { CursorTrigger } from "@/providers/CursorContext";

interface BuildCapabilityRevealProps {
  progress: number; // 0.0 to 1.0
}

export function BuildCapabilityReveal({ progress }: BuildCapabilityRevealProps) {
  // Active between 0.72 and 1.00
  if (progress < 0.70) return null;

  // Reveal opacity (0.76 -> 0.88)
  const opacity = progress < 0.86 ? (progress - 0.72) / 0.14 : progress < 0.94 ? 1.0 : Math.max(0, 1.0 - (progress - 0.94) / 0.06);
  const yTranslate = progress < 0.86 ? (1 - (progress - 0.72) / 0.14) * 36 : 0;

  return (
    <div
      className="absolute inset-0 w-full h-full flex items-center justify-center max-w-[1760px] mx-auto px-6 sm:px-12 lg:px-16 pointer-events-none z-20"
      style={{ opacity, transform: `translateY(${yTranslate}px)` }}
      aria-hidden={progress < 0.74 ? "true" : "false"}
    >
      <div className="max-w-4xl w-full flex flex-col gap-8 pointer-events-auto pl-2 sm:pl-8 border-l border-avorria-signal/40 py-6">
        {/* Capability Label */}
        <div className="font-mono text-xs text-avorria-signal uppercase tracking-widest">
          {BUILD_PROPOSITION.label}
        </div>

        {/* Headline BUILD. */}
        <h2 className="display-xl text-avorria-white uppercase tracking-tight">
          {BUILD_PROPOSITION.title}
        </h2>

        {/* Proposition */}
        <div className="font-display font-bold text-2xl sm:text-4xl text-avorria-white uppercase tracking-tight leading-snug">
          {BUILD_PROPOSITION.proposition}
        </div>

        {/* Scope string */}
        <div className="font-mono text-xs sm:text-sm text-avorria-muted uppercase tracking-widest border-t border-avorria-line/40 pt-4">
          {BUILD_PROPOSITION.capabilities}
        </div>

        {/* CTA Link */}
        <div className="pt-2">
          <CursorTrigger state="active" label="EXPLORE">
            <Link
              href={BUILD_PROPOSITION.ctaHref}
              className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-avorria-signal hover:text-avorria-white border-b border-avorria-signal pb-1 transition-colors"
            >
              <span>{BUILD_PROPOSITION.ctaText}</span>
              <span>→</span>
            </Link>
          </CursorTrigger>
        </div>
      </div>
    </div>
  );
}
