import React from "react";
import Link from "next/link";
import { DRAWDOWN_PRINCIPLE, DRAWDOWN_DELIVERABLES } from "@/lib/scenes/drawdown-scene-config";
import { CursorTrigger } from "@/providers/CursorContext";
import { Z } from "@/lib/scene-z";

interface DrawdownPrincipleStageProps {
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

export function DrawdownPrincipleStage({
  containerRef,
}: DrawdownPrincipleStageProps) {
  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full flex items-center justify-center p-6 sm:p-16 opacity-0"
      style={{ zIndex: Z.copy }}
    >
      <div className="max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-t border-b border-avorria-line py-12">
        {/* Left: Statement */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="font-mono text-xs text-avorria-signal uppercase tracking-widest">
            004 // DRAWDOWN.TRADING // FINANCIAL PLATFORM
          </div>
          <h3 className="font-display font-bold text-3xl sm:text-5xl uppercase tracking-tight text-avorria-white leading-tight whitespace-pre-line">
            {DRAWDOWN_PRINCIPLE.title}
          </h3>
          <p className="font-body text-base text-avorria-muted leading-relaxed max-w-lg">
            {DRAWDOWN_PRINCIPLE.description}
          </p>
          <div className="pt-4">
            <CursorTrigger state="view" label="VIEW">
              <Link
                href={DRAWDOWN_PRINCIPLE.ctaHref}
                className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-avorria-signal hover:text-avorria-white border-b border-avorria-signal pb-1 transition-colors"
              >
                <span>{DRAWDOWN_PRINCIPLE.ctaText}</span>
                <span>→</span>
              </Link>
            </CursorTrigger>
          </div>
        </div>

        {/* Right: Delivered Scope */}
        <div className="lg:col-span-6 flex flex-col gap-4 font-mono text-xs uppercase tracking-wider">
          <span className="text-avorria-quiet mb-2">DELIVERED SCOPE OF WORK</span>
          {DRAWDOWN_DELIVERABLES.map((item) => (
            <div key={item.code} className="flex items-center justify-between py-3 border-b border-avorria-line/40 text-avorria-white">
              <span>{item.title}</span>
              <span className="text-avorria-signal">{item.code}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
