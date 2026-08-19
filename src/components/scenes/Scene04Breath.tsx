"use client";
import React, { useRef } from "react";
import { BreathPremise } from "./breath/BreathPremise";
import { BreathConclusion } from "./breath/BreathConclusion";
import { BreathFallback } from "./breath/BreathFallback";
import { CinematicSceneViewport } from "./CinematicSceneViewport";
import { SceneSafeFrame } from "./SceneSafeFrame";
import { getSceneConfig } from "./registry";

/**
 * SCENE 04 — THE FIRST BREATH (04 / PHILOSOPHY)
 *
 * READABILITY & TIMING:
 * - 0.00 – 0.10: Premise enters
 * - 0.10 – 0.44: PREMISE READABLE HOLD (34% stable hold)
 * - 0.44 – 0.54: Premise exits, Conclusion enters
 * - 0.54 – 0.88: CONCLUSION READABLE HOLD (34% stable hold)
 * - 0.88 – 1.00: Handoff to CareerOS
 */
export function Scene04Breath() {
  const config = getSceneConfig("scene-04-breath")!;

  const premiseRef = useRef<HTMLDivElement>(null);
  const conclusionRef = useRef<HTMLDivElement>(null);
  const footerMarkerRef = useRef<HTMLDivElement>(null);

  const buildTimeline = (timeline: gsap.core.Timeline) => {
    timeline.addLabel("entry", 0);
    timeline.addLabel("premise_hold", 0.10);
    timeline.addLabel("transition", 0.46);
    timeline.addLabel("conclusion_hold", 0.56);
    timeline.addLabel("handoff", 0.92);

    // 1. Premise Stage (0.00 - 0.48)
    if (premiseRef.current) {
      timeline.fromTo(
        premiseRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.10 },
        0
      );
      // Stable hold 0.10 - 0.44 (zero drift)
      timeline.to(
        premiseRef.current,
        { opacity: 0, y: -20, duration: 0.06 },
        0.44
      );
    }

    // 2. Conclusion Stage (0.46 - 0.94)
    if (conclusionRef.current) {
      timeline.fromTo(
        conclusionRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.10 },
        0.46
      );
      // Stable hold 0.56 - 0.88 (zero drift)
      timeline.to(
        conclusionRef.current,
        { opacity: 0, y: -20, duration: 0.06 },
        0.88
      );
    }

    // 3. Footer Marker (0.92 - 1.00)
    if (footerMarkerRef.current) {
      timeline.fromTo(
        footerMarkerRef.current,
        { opacity: 0.4 },
        { opacity: 1, duration: 0.08 },
        0.92
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
      <SceneSafeFrame>
        {/* Semantic Accessibility Heading */}
        <h2 className="sr-only">
          Philosophy — We Don&apos;t Decorate Businesses. We Engineer Advantage.
        </h2>

        {/* Top Minimal Scene Marker */}
        <div className="flex items-center justify-between font-mono text-[10px] sm:text-xs uppercase tracking-widest text-avorria-quiet z-30">
          <span className="text-avorria-signal">PHILOSOPHY // 04</span>
          <span className="text-avorria-white">FIRST BREATH</span>
        </div>

        {/* Phase A: Premise */}
        <BreathPremise containerRef={premiseRef} />

        {/* Phase B: Conclusion */}
        <BreathConclusion containerRef={conclusionRef} />

        {/* Bottom Handoff Anchor for Scene 05 (CareerOS) */}
        <div
          ref={footerMarkerRef}
          className="flex items-center justify-between border-t border-avorria-line/40 pt-4 font-mono text-[10px] sm:text-xs text-avorria-quiet uppercase tracking-widest z-30"
        >
          <div className="text-avorria-white">
            AUTONOMOUS SYSTEMS // CAREEROS
          </div>
          <div className="text-avorria-signal">
            04 / 18
          </div>
        </div>
      </SceneSafeFrame>
    </CinematicSceneViewport>
  );
}
