"use client";
import React, { useRef } from "react";
import { getSceneConfig } from "./registry";
import { MANIFESTO_STATEMENTS } from "@/lib/scenes/manifesto-config";
import { ManifestoStatement } from "./manifesto/ManifestoStatement";
import { ManifestoFallback } from "./manifesto/ManifestoFallback";
import { CinematicSceneViewport } from "./CinematicSceneViewport";

export function Scene15Manifesto() {
  const config = getSceneConfig("scene-15-manifesto")!;

  const s0Ref = useRef<HTMLDivElement>(null);
  const s1Ref = useRef<HTMLDivElement>(null);
  const s2Ref = useRef<HTMLDivElement>(null);
  const s3Ref = useRef<HTMLDivElement>(null);
  const topMetaRef = useRef<HTMLDivElement>(null);
  const bottomMetaRef = useRef<HTMLDivElement>(null);

  const statementRefs = [s0Ref, s1Ref, s2Ref, s3Ref];

  const buildTimeline = (timeline: gsap.core.Timeline) => {
    timeline.addLabel("entry", 0);
    timeline.addLabel("statement_1", 0.08);
    timeline.addLabel("statement_2", 0.32);
    timeline.addLabel("statement_3", 0.56);
    timeline.addLabel("statement_4", 0.80);
    timeline.addLabel("handoff", 0.94);

    if (topMetaRef.current) {
      timeline.fromTo(
        topMetaRef.current,
        { opacity: 1 },
        { opacity: 0, duration: 0.08 },
        0.15
      );
    }

    // Statement 1: 0.00 - 0.28 (Hold 0.08 - 0.22)
    if (s0Ref.current) {
      timeline.fromTo(
        s0Ref.current,
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.08 },
        0.02
      );
      timeline.to(
        s0Ref.current,
        { opacity: 0, y: -25, duration: 0.06 },
        0.24
      );
    }

    // Statement 2: 0.28 - 0.52 (Hold 0.34 - 0.46)
    if (s1Ref.current) {
      timeline.fromTo(
        s1Ref.current,
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.08 },
        0.28
      );
      timeline.to(
        s1Ref.current,
        { opacity: 0, y: -25, duration: 0.06 },
        0.48
      );
    }

    // Statement 3: 0.52 - 0.76 (Hold 0.58 - 0.70)
    if (s2Ref.current) {
      timeline.fromTo(
        s2Ref.current,
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.08 },
        0.52
      );
      timeline.to(
        s2Ref.current,
        { opacity: 0, y: -25, duration: 0.06 },
        0.72
      );
    }

    // Statement 4 (Climax): 0.76 - 0.96 (Hold 0.82 - 0.92)
    if (s3Ref.current) {
      timeline.fromTo(
        s3Ref.current,
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.08 },
        0.76
      );
      timeline.to(
        s3Ref.current,
        { opacity: 0, y: -20, duration: 0.04 },
        0.95
      );
    }

    if (bottomMetaRef.current) {
      timeline.fromTo(
        bottomMetaRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.06 },
        0.92
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
      <div className="w-full h-full relative bg-avorria-black select-none overflow-hidden border-t border-avorria-line">
        {/* Semantic Accessibility Heading */}
        <h2 className="sr-only">
          Manifesto — Brand Principles &amp; Conviction by Avorria
        </h2>

        {/* Small Ambient Metadata at Start */}
        <div
          ref={topMetaRef}
          className="absolute top-8 left-8 sm:left-16 font-mono text-xs text-avorria-signal uppercase tracking-widest pointer-events-none z-10"
        >
          15 / MANIFESTO <span>{"//"}</span> CONVICTION
        </div>

        {/* 4 Statements */}
        {MANIFESTO_STATEMENTS.map((st, idx) => (
          <ManifestoStatement
            key={st.id}
            statement={st}
            containerRef={statementRefs[idx]}
          />
        ))}

        {/* Proof Handoff Anchor */}
        <div
          ref={bottomMetaRef}
          className="absolute bottom-8 left-8 sm:left-16 font-mono text-xs text-avorria-signal uppercase tracking-widest pointer-events-none z-10 opacity-0"
        >
          VERIFIED DELIVERIES <span>{"//"}</span> PROOF
        </div>
      </div>
    </CinematicSceneViewport>
  );
}
