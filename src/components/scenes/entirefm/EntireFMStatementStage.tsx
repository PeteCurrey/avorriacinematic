import React from "react";
import Link from "next/link";
import { ENTIREFM_PRINCIPLE, ENTIREFM_DELIVERABLES } from "@/lib/scenes/entirefm-scene-config";
import { CursorTrigger } from "@/providers/CursorContext";

interface EntireFMStatementStageProps {
  progress: number; // 0.0 to 1.0
}

export function EntireFMStatementStage({ progress }: EntireFMStatementStageProps) {
  // Active between 0.88 and 1.00
  if (progress < 0.86) return null;

  const opacity = progress < 0.92 ? (progress - 0.86) / 0.06 : 1.0;
  const yTranslate = progress < 0.92 ? (1 - (progress - 0.86) / 0.06) * 32 : 0;

  return (
    <div
      className="absolute inset-0 w-full h-full flex items-center justify-center p-6 sm:p-16 z-30 pointer-events-auto"
      style={{ opacity, transform: `translateY(${yTranslate}px)` }}
    >
      <div className="max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-t border-b border-avorria-line py-12">
        {/* Left: Statement */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="font-mono text-xs text-avorria-signal uppercase tracking-widest">
            {ENTIREFM_PRINCIPLE.label} <span>{"//"}</span> {ENTIREFM_PRINCIPLE.subLabel}
          </div>
          <h3 className="font-display font-bold text-3xl sm:text-5xl uppercase tracking-tight text-avorria-white leading-tight whitespace-pre-line">
            {ENTIREFM_PRINCIPLE.statement}
          </h3>
          <p className="font-body text-base text-avorria-muted leading-relaxed max-w-lg">
            {ENTIREFM_PRINCIPLE.description}
          </p>
          <div className="pt-4">
            <CursorTrigger state="view" label="VIEW">
              <Link
                href={ENTIREFM_PRINCIPLE.ctaHref}
                className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-avorria-signal hover:text-avorria-white border-b border-avorria-signal pb-1 transition-colors"
              >
                <span>{ENTIREFM_PRINCIPLE.ctaText}</span>
                <span>→</span>
              </Link>
            </CursorTrigger>
          </div>
        </div>

        {/* Right: Delivered Scope */}
        <div className="lg:col-span-6 flex flex-col gap-4 font-mono text-xs uppercase tracking-wider">
          <span className="text-avorria-quiet mb-2">DELIVERED SCOPE OF WORK</span>
          {ENTIREFM_DELIVERABLES.map((item) => (
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
