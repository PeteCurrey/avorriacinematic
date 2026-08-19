import React from "react";
import Link from "next/link";
import { BUILD_PROPOSITION } from "@/lib/scenes/build-scene-config";
import { CursorTrigger } from "@/providers/CursorContext";
import { Z } from "@/lib/scene-z";

interface BuildCapabilityRevealProps {
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

export function BuildCapabilityReveal({
  containerRef,
}: BuildCapabilityRevealProps) {
  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full flex items-center justify-center max-w-[1760px] mx-auto px-6 sm:px-12 lg:px-16 pointer-events-none opacity-0"
      style={{ zIndex: Z.copy }}
      aria-hidden="true"
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
