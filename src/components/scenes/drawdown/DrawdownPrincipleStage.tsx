import React from "react";
import Link from "next/link";
import { DRAWDOWN_PRINCIPLE, DRAWDOWN_DELIVERABLES } from "@/lib/scenes/drawdown-scene-config";
import { CursorTrigger } from "@/providers/CursorContext";

interface DrawdownPrincipleStageProps {
  progress: number; // 0.0 to 1.0
}

export function DrawdownPrincipleStage({ progress }: DrawdownPrincipleStageProps) {
  // Active between 0.85 and 0.98
  if (progress < 0.84 || progress > 0.98) return null;

  const opacity = progress < 0.90 ? (progress - 0.84) / 0.06 : progress < 0.95 ? 1.0 : Math.max(0, 1.0 - (progress - 0.95) / 0.03);

  return (
    <div
      className="absolute inset-0 w-full h-full flex items-center justify-center p-6 sm:p-16 z-30"
      style={{ opacity }}
    >
      <div className="max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-t border-b border-avorria-line py-12">
        {/* Left: Statement */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="font-mono text-xs text-avorria-signal uppercase tracking-widest">
            {DRAWDOWN_PRINCIPLE.label}
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
