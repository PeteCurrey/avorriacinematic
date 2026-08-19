import React from "react";
import Link from "next/link";
import { ENTIREFM_DELIVERABLES } from "@/lib/scenes/entirefm-scene-config";
import { CursorTrigger } from "@/providers/CursorContext";
import { Z } from "@/lib/scene-z";

interface EntireFMStatementStageProps {
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

export function EntireFMStatementStage({
  containerRef,
}: EntireFMStatementStageProps) {
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
            005 // ENTIREFM // OPERATIONS BACKBONE
          </div>
          <h3 className="font-display font-bold text-3xl sm:text-5xl uppercase tracking-tight text-avorria-white">
            Operations<br />Should Flow.
          </h3>
          <p className="font-body text-base text-avorria-muted leading-relaxed max-w-lg">
            Avorria designed and engineered EntireFM to unify multi-site facilities operations, technician dispatch routing, asset lifecycle histories, and digital search architecture into a single dependable operational backbone.
          </p>
          <div className="pt-4">
            <CursorTrigger state="view" label="VIEW">
              <Link
                href="/work/entirefm"
                className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-avorria-signal hover:text-avorria-white border-b border-avorria-signal pb-1 transition-colors"
              >
                <span>VIEW ENTIREFM CASE STUDY</span>
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
