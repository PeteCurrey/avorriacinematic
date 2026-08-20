"use client";
import React, { useRef } from "react";
import { MANIFESTO_STATEMENTS } from "@/lib/scenes/manifesto-config";
import { ManifestoFallback } from "./manifesto/ManifestoFallback";
import { CinematicSceneViewport } from "./CinematicSceneViewport";
import { SceneSafeFrame } from "./SceneSafeFrame";
import { getSceneConfig } from "./registry";

/**
 * SCENE 15 — MANIFESTO
 *
 * READABILITY & TIMING:
 * - 0.00 – 0.25: Short staggered reveal of all 4 statements
 * - 0.25 – 0.85: SUBSTANTIAL STABLE HOLD (60% of timeline stable and readable)
 * - 0.85 – 0.95: Exit transition
 * - 0.95 – 1.00: Proof handoff
 */
export function Scene15Manifesto() {
  const config = getSceneConfig("scene-15-manifesto")!;

  const statementRefs = useRef<{ [id: string]: HTMLDivElement | null }>({});
  const footerMarkerRef = useRef<HTMLDivElement>(null);

  const buildTimeline = (timeline: gsap.core.Timeline) => {
    timeline.addLabel("entry", 0);
    timeline.addLabel("all_resolved", 0.25);
    timeline.addLabel("hold", 0.30);
    timeline.addLabel("exit", 0.85);
    timeline.addLabel("handoff", 0.95);

    // Staggered arrival of statements, all settling by 0.25
    MANIFESTO_STATEMENTS.forEach((st, idx) => {
      const el = statementRefs.current[st.id];
      if (el) {
        const start = idx * 0.05;
        timeline.fromTo(
          el,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.08 },
          start
        );
        // Stable hold until 0.85
        timeline.to(
          el,
          { opacity: 0, y: -15, duration: 0.06 },
          0.85
        );
      }
    });

    if (footerMarkerRef.current) {
      timeline.fromTo(
        footerMarkerRef.current,
        { opacity: 0.4 },
        { opacity: 1, duration: 0.05 },
        0.95
      );
    }
  };

  return (
    <CinematicSceneViewport
      config={config}
      sceneIndex={15}
      fallback={<ManifestoFallback />}
      buildTimeline={buildTimeline}
    >
      <SceneSafeFrame>
        {/* Semantic Heading */}
        <h2 className="sr-only">
          Manifesto — The Beliefs That Guide Avorria Engineering
        </h2>

        {/* Top Minimal Scene Marker */}
        <div className="flex items-center justify-between font-mono text-[10px] sm:text-xs uppercase tracking-widest text-avorria-quiet z-30">
          <span className="text-avorria-signal">06 / MANIFESTO</span>
          <span className="text-avorria-white">FIRST PRINCIPLES</span>
        </div>

        {/* 4 Architectural Statements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 my-auto max-w-5xl">
          {MANIFESTO_STATEMENTS.map((st, idx) => (
            <div
              key={st.id}
              ref={(el) => {
                statementRefs.current[st.id] = el;
              }}
              className="flex flex-col gap-3 opacity-0 border-l-2 border-avorria-signal/40 pl-6"
            >
              <div className="font-mono text-xs text-avorria-signal uppercase tracking-widest">
                STATEMENT 0{idx + 1}
              </div>
              <div className="display-md text-avorria-white whitespace-pre-line">
                {st.text}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Handoff */}
        <div
          ref={footerMarkerRef}
          className="flex items-center justify-between border-t border-avorria-line/40 pt-4 font-mono text-[10px] sm:text-xs text-avorria-quiet uppercase tracking-widest z-30"
        >
          <div className="text-avorria-white">
            EVIDENCE // PROOF
          </div>
          <div className="text-avorria-signal">
            06 / 08
          </div>
        </div>
      </SceneSafeFrame>
    </CinematicSceneViewport>
  );
}
