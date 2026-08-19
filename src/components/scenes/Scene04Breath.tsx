"use client";
import React, { useRef } from "react";
import { BreathPremise } from "./breath/BreathPremise";
import { BreathConclusion } from "./breath/BreathConclusion";
import { BreathFallback } from "./breath/BreathFallback";
import { CinematicSceneViewport } from "./CinematicSceneViewport";
import { getSceneConfig } from "./registry";

export function Scene04Breath() {
  const config = getSceneConfig("scene-04-breath")!;

  const premiseRef = useRef<HTMLDivElement>(null);
  const conclusionRef = useRef<HTMLDivElement>(null);
  const supportRef = useRef<HTMLDivElement>(null);
  const handoffRef = useRef<HTMLDivElement>(null);

  const buildTimeline = (timeline: gsap.core.Timeline) => {
    timeline.addLabel("entry", 0);
    timeline.addLabel("premise_reveal", 0.12);
    timeline.addLabel("premise_hold", 0.28);
    timeline.addLabel("conclusion_reveal", 0.54);
    timeline.addLabel("conclusion_hold", 0.70);
    timeline.addLabel("handoff", 0.92);

    // 0.12 - 0.48: Stage 1 Monolith Statement
    if (premiseRef.current) {
      timeline.fromTo(
        premiseRef.current,
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.14 },
        0.12
      );
      // Hold 0.26 - 0.44
      timeline.to(
        premiseRef.current,
        { opacity: 0, y: -25, duration: 0.08 },
        0.44
      );
    }

    // 0.54 - 0.90: Stage 2 Core Conviction
    if (conclusionRef.current) {
      timeline.fromTo(
        conclusionRef.current,
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.14 },
        0.54
      );
      timeline.to(
        conclusionRef.current,
        { opacity: 0, y: -25, duration: 0.08 },
        0.88
      );
    }

    if (supportRef.current) {
      timeline.fromTo(
        supportRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.10 },
        0.66
      );
      timeline.to(
        supportRef.current,
        { opacity: 0, duration: 0.06 },
        0.88
      );
    }

    // 0.90 - 1.00: Handoff Marker
    if (handoffRef.current) {
      timeline.fromTo(
        handoffRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.06 },
        0.90
      );
    }
  };

  return (
    <CinematicSceneViewport
      config={config}
      sceneIndex={4}
      fallback={<BreathFallback />}
      buildTimeline={buildTimeline}
    >
      <div className="w-full h-full relative overflow-hidden flex flex-col justify-between p-6 sm:p-12 lg:p-16">
        {/* Semantic Accessibility Heading */}
        <h2 className="sr-only">Philosophy — Precision as Intent</h2>

        {/* Top Minimal Scene Marker */}
        <div className="flex items-center justify-between font-mono text-[10px] sm:text-xs uppercase tracking-widest text-avorria-quiet z-30">
          <span className="text-avorria-signal">04 / PHILOSOPHY</span>
          <span className="text-avorria-white">PRECISION AS INTENT</span>
        </div>

        {/* Stage 1: The Monolith Statement (0.00 - 0.55) */}
        <BreathPremise containerRef={premiseRef} />

        {/* Stage 2: The Core Conviction & Handoff (0.55 - 1.00) */}
        <BreathConclusion
          containerRef={conclusionRef}
          supportRef={supportRef}
        />

        {/* Bottom Scene Indicator */}
        <div
          ref={handoffRef}
          className="flex items-center justify-between border-t border-avorria-line/40 pt-4 font-mono text-[10px] sm:text-xs text-avorria-quiet uppercase tracking-widest z-30 opacity-0"
        >
          <div className="text-avorria-white">
            DIGITAL PRODUCT PLATFORMS // CAREEROS
          </div>
          <div className="text-avorria-signal">
            04 / 18
          </div>
        </div>
      </div>
    </CinematicSceneViewport>
  );
}
