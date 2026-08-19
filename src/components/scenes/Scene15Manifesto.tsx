"use client";
import React from "react";
import { getSceneConfig } from "./registry";
import { MANIFESTO_STATEMENTS } from "@/lib/scenes/manifesto-config";
import { ManifestoStatement } from "./manifesto/ManifestoStatement";
import { ManifestoFallback } from "./manifesto/ManifestoFallback";
import { CinematicSceneViewport } from "./CinematicSceneViewport";

export function Scene15Manifesto() {
  const config = getSceneConfig("scene-15-manifesto")!;

  // Calculate Opacity for each statement
  const getStatementOpacity = (progress: number, start: number, end: number) => {
    if (progress < start || progress > end) return 0;
    const mid = (start + end) / 2;
    if (progress < mid) {
      return Math.min((progress - start) / 0.05, 1);
    } else {
      return Math.max(1 - (progress - (end - 0.05)) / 0.05, 0);
    }
  };

  const getStatementY = (progress: number, start: number) => {
    if (progress < start) return 40;
    const p = (progress - start) / 0.08;
    return Math.max(40 * (1 - Math.min(p, 1)), 0);
  };

  return (
    <CinematicSceneViewport
      config={config}
      sceneIndex={15}
      fallback={<ManifestoFallback />}
    >
      {(progress) => (
        <div className="w-full h-full relative bg-avorria-black select-none overflow-hidden border-t border-avorria-line">
          {/* Semantic Accessibility Heading */}
          <h2 className="sr-only">
            Manifesto — Brand Principles &amp; Conviction by Avorria
          </h2>

          {/* Small Ambient Metadata at Start */}
          <div
            className="absolute top-8 left-8 sm:left-16 font-mono text-xs text-avorria-signal uppercase tracking-widest transition-opacity duration-300 pointer-events-none z-10"
            style={{ opacity: progress < 0.15 ? 1 : 0 }}
          >
            15 / MANIFESTO <span>{"//"}</span> CONVICTION
          </div>

          {/* 4 Statements */}
          {MANIFESTO_STATEMENTS.map((st) => (
            <ManifestoStatement
              key={st.id}
              statement={st}
              opacity={getStatementOpacity(progress, st.progressStart, st.progressEnd)}
              yTranslate={getStatementY(progress, st.progressStart)}
            />
          ))}

          {/* Proof Handoff Anchor */}
          <div
            className="absolute bottom-8 left-8 sm:left-16 font-mono text-xs text-avorria-signal uppercase tracking-widest transition-opacity duration-300 pointer-events-none z-10"
            style={{ opacity: progress > 0.92 ? 1 : 0 }}
          >
            VERIFIED DELIVERIES <span>{"//"}</span> PROOF
          </div>
        </div>
      )}
    </CinematicSceneViewport>
  );
}
