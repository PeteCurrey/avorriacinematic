import React from "react";
import Link from "next/link";
import { CAREEROS_DELIVERABLES } from "@/lib/scenes/careeros-scene-config";
import { CursorTrigger } from "@/providers/CursorContext";

interface CareerOSContributionStageProps {
  progress: number; // 0.0 to 1.0
}

export function CareerOSContributionStage({ progress }: CareerOSContributionStageProps) {
  // Active between 0.82 and 0.95
  if (progress < 0.80 || progress > 0.96) return null;

  const opacity = progress < 0.86 ? (progress - 0.80) / 0.06 : progress < 0.92 ? 1.0 : Math.max(0, 1.0 - (progress - 0.92) / 0.04);

  return (
    <div
      className="absolute inset-0 w-full h-full flex items-center justify-center p-6 sm:p-16 z-30"
      style={{ opacity }}
    >
      <div className="max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-t border-b border-avorria-line py-12">
        {/* Left: Statement & Narrative */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="font-mono text-xs text-avorria-signal uppercase tracking-widest">
            005 // CAREEROS // AI PLATFORM
          </div>
          <h3 className="font-display font-bold text-3xl sm:text-5xl uppercase tracking-tight text-avorria-white">
            AI isn\x27t the product.<br />What it enables is.
          </h3>
          <p className="font-body text-base text-avorria-muted leading-relaxed max-w-lg">
            We designed CareerOS as an ecosystem of human intelligence and adaptive recommendation engines. Rather than wrapping an LLM in a chatbot, we engineered structured context models that turn conversations into lifetime career leverage.
          </p>
          <div className="pt-4">
            <CursorTrigger state="view" label="VIEW">
              <Link
                href="/work/careeros"
                className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-avorria-signal hover:text-avorria-white border-b border-avorria-signal pb-1 transition-colors"
              >
                <span>VIEW CAREEROS CASE STUDY</span>
                <span>→</span>
              </Link>
            </CursorTrigger>
          </div>
        </div>

        {/* Right: Delivered Scope */}
        <div className="lg:col-span-6 flex flex-col gap-4 font-mono text-xs uppercase tracking-wider">
          <span className="text-avorria-quiet mb-2">DELIVERED SCOPE OF WORK</span>
          {CAREEROS_DELIVERABLES.map((item) => (
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
