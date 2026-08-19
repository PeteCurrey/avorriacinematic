import React from "react";
import Link from "next/link";
import { OGN_PRINCIPLE } from "@/lib/scenes/ogn-scene-config";
import { CursorTrigger } from "@/providers/CursorContext";

interface OGNPrincipleStageProps {
  opacity: number;
  yTranslate: number;
}

export function OGNPrincipleStage({ opacity, yTranslate }: OGNPrincipleStageProps) {
  if (opacity <= 0.01) return null;
  return (
    <div
      className="absolute inset-0 flex flex-col justify-center items-center px-6 sm:px-12 z-40 bg-avorria-black/90 backdrop-blur-sm transition-opacity duration-300 select-none"
      style={{ opacity, transform: `translateY(${yTranslate}px)` }}
    >
      <div className="max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-t border-b border-avorria-line py-16">
        {/* Left: Statement */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="font-mono text-xs text-avorria-signal uppercase tracking-widest">
            {OGN_PRINCIPLE.roleLine}
          </div>
          <h3 className="font-display font-black text-4xl sm:text-7xl uppercase tracking-tight text-avorria-white leading-none whitespace-pre-line">
            GOOD DESIGN<br />ISN&#39;T A SECTOR<span className="text-avorria-signal">.</span>
          </h3>
          <p className="font-body text-base sm:text-lg text-avorria-muted leading-relaxed max-w-xl">
            {OGN_PRINCIPLE.supporting}
          </p>
          <div className="pt-4">
            <CursorTrigger state="view" label="VIEW">
              <Link
                href={OGN_PRINCIPLE.ctaHref}
                className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-avorria-signal hover:text-avorria-white border-b border-avorria-signal pb-1 transition-colors"
              >
                <span>{OGN_PRINCIPLE.ctaText}</span>
                <span>→</span>
              </Link>
            </CursorTrigger>
          </div>
        </div>

        {/* Right: Lab Handoff Anchor */}
        <div className="lg:col-span-4 flex flex-col gap-3 font-mono text-xs text-avorria-quiet border-l border-avorria-line/40 pl-8">
          <span className="text-avorria-signal">TRANSITION // PRODUCTION → EXPERIMENT</span>
          <span className="text-avorria-muted">14 / AVORRIA LAB // NEXT PHASE</span>
        </div>
      </div>
    </div>
  );
}
