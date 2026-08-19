"use client";

import React, { useRef } from "react";
import { useReducedMotion } from "@/providers/ReducedMotionProvider";
import { useHeader } from "@/providers/HeaderContext";
import { CinematicSceneViewport } from "./CinematicSceneViewport";
import { getSceneConfig } from "./registry";

export function Scene01Precision() {
  const compositionRef = useRef<HTMLDivElement | null>(null);
  const signalLineRef = useRef<HTMLDivElement | null>(null);
  const slitHandoffRef = useRef<HTMLDivElement | null>(null);
  const precisionMaskRef = useRef<HTMLDivElement | null>(null);
  const powerMaskRef = useRef<HTMLDivElement | null>(null);
  const metadataRef = useRef<HTMLDivElement | null>(null);
  const descriptorRef = useRef<HTMLDivElement | null>(null);

  const { effectiveReducedMotion } = useReducedMotion();
  const { setNavVisible, setWordmarkOpacity, setHeaderState } = useHeader();
  const config = getSceneConfig("scene-01-precision")!;

  const buildTimeline = (timeline: gsap.core.Timeline) => {
    timeline.addLabel("entry", 0);
    timeline.addLabel("line_expand", 0.05);
    timeline.addLabel("precision_reveal", 0.20);
    timeline.addLabel("power_reveal", 0.40);
    timeline.addLabel("meta_reveal", 0.56);
    timeline.addLabel("hold", 0.72);
    timeline.addLabel("exit", 0.85);
    timeline.addLabel("handoff", 0.94);

    // Callbacks for header state
    timeline.call(() => {
      setNavVisible(false);
      setWordmarkOpacity(0.75);
      setHeaderState("void");
    }, undefined, 0);

    timeline.call(() => {
      setNavVisible(true);
      setWordmarkOpacity(1.0);
      setHeaderState("standard");
    }, undefined, 0.62);

    // 1. Stage 0 - 15%: Line expands outward from center across the grid
    if (signalLineRef.current) {
      timeline.fromTo(
        signalLineRef.current,
        { scaleX: 0.08, opacity: 0.8 },
        { scaleX: 1, opacity: 1, duration: 0.15 },
        0
      );
      timeline.to(
        signalLineRef.current,
        { scaleX: 0, opacity: 0, duration: 0.08 },
        0.92
      );
    }

    // 2. Stage 15 - 35%: Masked reveal of PRECISION
    if (precisionMaskRef.current) {
      timeline.fromTo(
        precisionMaskRef.current,
        { yPercent: 105, opacity: 0.2 },
        { yPercent: 0, opacity: 1, duration: 0.20 },
        0.15
      );
      timeline.to(
        precisionMaskRef.current,
        { yPercent: -40, opacity: 0, duration: 0.10 },
        0.82
      );
    }

    // 3. Stage 35 - 52%: Masked reveal of AS POWER.
    if (powerMaskRef.current) {
      timeline.fromTo(
        powerMaskRef.current,
        { yPercent: -105, opacity: 0.2 },
        { yPercent: 0, opacity: 1, duration: 0.17 },
        0.35
      );
      timeline.to(
        powerMaskRef.current,
        { yPercent: 40, opacity: 0, duration: 0.10 },
        0.82
      );
    }

    // 4. Stage 52 - 62%: Micro technical metadata & descriptor
    if (metadataRef.current) {
      timeline.fromTo(
        metadataRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.10 },
        0.52
      );
      timeline.to(
        metadataRef.current,
        { opacity: 0, duration: 0.08 },
        0.82
      );
    }

    if (descriptorRef.current) {
      timeline.fromTo(
        descriptorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.10 },
        0.54
      );
      timeline.to(
        descriptorRef.current,
        { opacity: 0, duration: 0.08 },
        0.82
      );
    }

    // 5. Stage 72 - 82%: Hold moment with subtle scale pull-back (1.0 -> 0.985)
    if (compositionRef.current) {
      timeline.to(
        compositionRef.current,
        { scale: 0.985, duration: 0.10 },
        0.72
      );
    }

    // 7. Stage 93 - 100%: Vertical slit handoff anchor
    if (slitHandoffRef.current) {
      timeline.fromTo(
        slitHandoffRef.current,
        { scaleY: 0, opacity: 0 },
        { scaleY: 1, opacity: 1, duration: 0.07 },
        0.93
      );
    }
  };

  return (
    <CinematicSceneViewport
      config={config}
      sceneIndex={1}
      buildTimeline={buildTimeline}
    >
      <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 lg:p-16 overflow-hidden relative">
        {/* Semantic SEO Accessibility H1 */}
        <h1 className="sr-only">Precision as Power. Avorria Digital Design and Engineering Studio.</h1>

        {/* Top Instrumentation Metadata */}
        <div
          ref={metadataRef}
          className="max-w-[1760px] w-full mx-auto flex items-center justify-between font-mono text-[10px] sm:text-xs uppercase tracking-widest text-avorria-quiet opacity-0"
          aria-hidden="true"
        >
          <span className="text-avorria-quiet">SCENE 01 // STATEMENT</span>
          <span className="text-avorria-white">AVORRIA / DIGITAL ENGINEERING</span>
        </div>

        {/* Central Architectural Statement Composition */}
        <div
          ref={compositionRef}
          className="max-w-[1760px] w-full mx-auto my-auto flex flex-col justify-center relative py-6"
        >
          {/* Top Line: PRECISION */}
          <div className="overflow-hidden pb-1 sm:pb-3">
            <div
              ref={precisionMaskRef}
              className="display-xxl text-avorria-white select-none pl-2 sm:pl-8 lg:pl-16 tracking-tight opacity-0"
            >
              PRECISION
            </div>
          </div>

          {/* Central 1px Chartreuse Dividing Rule */}
          <div className="relative w-full my-2 sm:my-4 flex items-center justify-center">
            <div
              ref={signalLineRef}
              className="w-full h-[1px] bg-avorria-signal origin-center opacity-0"
              style={{ willChange: "transform, opacity" }}
              aria-hidden="true"
            />
            {/* Center Vertical Slit Handoff Anchor (Becomes active in exit stage) */}
            <div
              ref={slitHandoffRef}
              className="absolute w-[1px] h-16 bg-avorria-signal origin-center opacity-0"
              style={{ willChange: "transform, opacity" }}
              aria-hidden="true"
            />
          </div>

          {/* Bottom Line: AS POWER. */}
          <div className="overflow-hidden pt-1 sm:pt-3">
            <div
              ref={powerMaskRef}
              className="display-xxl text-avorria-signal select-none pl-8 sm:pl-28 lg:pl-56 tracking-tight opacity-0"
            >
              AS POWER<span className="text-avorria-signal">.</span>
            </div>
          </div>
        </div>

        {/* Bottom Editorial Capability Descriptor */}
        <div className="max-w-[1760px] w-full mx-auto flex items-center justify-between border-t border-avorria-line/40 pt-4 font-mono text-[10px] sm:text-xs text-avorria-quiet uppercase tracking-widest">
          <div ref={descriptorRef} className="text-avorria-white opacity-0">
            DESIGN / ENGINEERING / SEARCH / INTELLIGENCE
          </div>
        </div>
      </div>
    </CinematicSceneViewport>
  );
}
