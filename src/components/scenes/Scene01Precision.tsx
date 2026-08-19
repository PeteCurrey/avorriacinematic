"use client";

import React, { useRef } from "react";
import { useReducedMotion } from "@/providers/ReducedMotionProvider";
import { useHeaderActions } from "@/providers/HeaderContext";
import { CinematicSceneViewport } from "./CinematicSceneViewport";
import { SceneSafeFrame } from "./SceneSafeFrame";
import { getSceneConfig } from "./registry";

/**
 * SCENE 01 — PRECISION AS POWER
 *
 * THE SINGLE HOMEPAGE HERO.
 *
 * READABILITY & TIMING:
 * - 0.00 – 0.12: Intro animation completes (dot pulse -> line expand -> text reveals)
 * - 0.12 – 0.18: Commercial proposition & service lines resolve
 * - 0.18 – 0.78: READABLE HOLD (60% of scene timeline completely stationary, 0 drift, 0 scale creep)
 * - 0.78 – 0.88: Prepare Alkota transition
 * - 0.88 – 1.00: Alkota website handoff
 */
export function Scene01Precision() {
  const signalDotRef = useRef<HTMLDivElement | null>(null);
  const signalLineRef = useRef<HTMLDivElement | null>(null);
  const slitHandoffRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLDivElement | null>(null);
  const precisionRef = useRef<HTMLDivElement | null>(null);
  const powerRef = useRef<HTMLDivElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const desktopServiceLineRef = useRef<HTMLDivElement | null>(null);
  const mobileServiceLineRef = useRef<HTMLDivElement | null>(null);
  const compositionRef = useRef<HTMLDivElement | null>(null);

  const lastHeaderStateRef = useRef<string>("standard");

  const { effectiveReducedMotion } = useReducedMotion();
  const { setNavVisible, setWordmarkOpacity, setHeaderState } = useHeaderActions();
  const config = getSceneConfig("scene-01-precision")!;

  const buildTimeline = (timeline: gsap.core.Timeline) => {
    timeline.addLabel("entry", 0);
    timeline.addLabel("dot_pulse", 0.03);
    timeline.addLabel("line_expand", 0.06);
    timeline.addLabel("settled", 0.18);
    timeline.addLabel("hold", 0.20);
    timeline.addLabel("exit", 0.78);
    timeline.addLabel("handoff", 0.90);

    // Nav is visible from the start
    setNavVisible(true);
    setWordmarkOpacity(1.0);
    setHeaderState("standard");

    timeline.eventCallback("onUpdate", () => {
      if (lastHeaderStateRef.current !== "standard") {
        lastHeaderStateRef.current = "standard";
        setNavVisible(true);
        setWordmarkOpacity(1.0);
        setHeaderState("standard");
      }
    });

    // 0. Signal dot: pulse on load (0.00 -> 0.03), collapses at 0.06
    if (signalDotRef.current) {
      timeline.fromTo(
        signalDotRef.current,
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.03, ease: "power2.out" },
        0
      );
      timeline.to(
        signalDotRef.current,
        { opacity: 0, scale: 0.5, duration: 0.03 },
        0.06
      );
    }

    // 1. Signal line expands (0.06 -> 0.16)
    if (signalLineRef.current) {
      timeline.fromTo(
        signalLineRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.10, ease: "power2.out" },
        0.06
      );
      timeline.to(
        signalLineRef.current,
        { scaleX: 0, opacity: 0, duration: 0.08 },
        0.80
      );
    }

    // 2. Label: DIGITAL MARKETING / WEB / AI STUDIO (0.04 -> 0.12)
    if (labelRef.current) {
      timeline.fromTo(
        labelRef.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.08 },
        0.04
      );
      timeline.to(
        labelRef.current,
        { opacity: 0, y: -6, duration: 0.08 },
        0.80
      );
    }

    // 3. PRECISION (0.06 -> 0.16)
    if (precisionRef.current) {
      timeline.fromTo(
        precisionRef.current,
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.10, ease: "power2.out" },
        0.06
      );
      timeline.to(
        precisionRef.current,
        { yPercent: -45, opacity: 0, duration: 0.08 },
        0.78
      );
    }

    // 4. AS POWER. (0.08 -> 0.18)
    if (powerRef.current) {
      timeline.fromTo(
        powerRef.current,
        { yPercent: -110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.10, ease: "power2.out" },
        0.08
      );
      timeline.to(
        powerRef.current,
        { yPercent: 45, opacity: 0, duration: 0.08 },
        0.78
      );
    }

    // 5. Commercial body descriptor (0.12 -> 0.18)
    if (bodyRef.current) {
      timeline.fromTo(
        bodyRef.current,
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.06 },
        0.12
      );
      timeline.to(
        bodyRef.current,
        { opacity: 0, duration: 0.08 },
        0.80
      );
    }

    // 6. Service lines (Desktop & Mobile distinct refs)
    if (desktopServiceLineRef.current) {
      timeline.fromTo(
        desktopServiceLineRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.06 },
        0.12
      );
      timeline.to(
        desktopServiceLineRef.current,
        { opacity: 0, duration: 0.08 },
        0.80
      );
    }
    if (mobileServiceLineRef.current) {
      timeline.fromTo(
        mobileServiceLineRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.06 },
        0.12
      );
      timeline.to(
        mobileServiceLineRef.current,
        { opacity: 0, duration: 0.08 },
        0.80
      );
    }

    // 7. Slit handoff anchor (0.88 -> 0.98)
    if (slitHandoffRef.current) {
      timeline.fromTo(
        slitHandoffRef.current,
        { scaleY: 0, opacity: 0 },
        { scaleY: 1, opacity: 1, duration: 0.08 },
        0.88
      );
    }
  };

  return (
    <CinematicSceneViewport
      config={config}
      sceneIndex={1}
      buildTimeline={buildTimeline}
    >
      <SceneSafeFrame>
        {/* Semantic H1 */}
        <h1 className="sr-only">
          Precision as Power. Avorria — Digital Marketing, Web Design, SEO and AI Systems Studio.
        </h1>

        {/* Top: Commercial Label & Service Line */}
        <div className="flex items-start justify-between w-full">
          <div
            ref={labelRef}
            className="font-mono text-xs sm:text-sm uppercase tracking-widest text-avorria-signal opacity-0 font-medium"
          >
            DIGITAL MARKETING / WEB / AI STUDIO
          </div>

          <div
            ref={desktopServiceLineRef}
            className="hidden sm:block font-mono text-[10px] sm:text-xs uppercase tracking-widest text-avorria-muted opacity-0 text-right"
            aria-hidden="true"
          >
            WEB DESIGN / DEVELOPMENT<br />SEO / AI SYSTEMS
          </div>
        </div>

        {/* Central Brand & Commercial Composition */}
        <div
          ref={compositionRef}
          className="flex flex-col justify-center my-auto py-4 sm:py-6"
        >
          {/* PRECISION */}
          <div className="overflow-hidden pb-1 sm:pb-2">
            <div
              ref={precisionRef}
              className="select-none tracking-tight leading-none text-avorria-white opacity-0"
              style={{ fontSize: "clamp(3rem, 9.5vw, 10.75rem)" }}
            >
              PRECISION
            </div>
          </div>

          {/* Central Precision Rule */}
          <div className="relative w-full my-2 sm:my-4 flex items-center justify-center">
            <div
              ref={signalDotRef}
              className="absolute w-1.5 h-1.5 rounded-full bg-avorria-signal opacity-0 z-10"
              style={{ willChange: "transform, opacity" }}
              aria-hidden="true"
            />
            <div
              ref={signalLineRef}
              className="w-full h-[1px] bg-avorria-signal origin-center opacity-0"
              style={{ willChange: "transform, opacity" }}
              aria-hidden="true"
            />
            <div
              ref={slitHandoffRef}
              className="absolute w-[1px] h-16 sm:h-20 bg-avorria-signal origin-center opacity-0"
              style={{ willChange: "transform, opacity" }}
              aria-hidden="true"
            />
          </div>

          {/* AS POWER. */}
          <div className="overflow-hidden pt-1 sm:pt-2">
            <div
              ref={powerRef}
              className="select-none tracking-tight leading-none text-avorria-signal opacity-0 whitespace-nowrap"
              style={{ fontSize: "clamp(3rem, 9.5vw, 10.75rem)" }}
            >
              AS POWER<span className="text-avorria-signal">.</span>
            </div>
          </div>

          {/* Supporting Commercial Proposition — 15-18px desktop with high contrast */}
          <div
            ref={bodyRef}
            className="mt-6 sm:mt-8 max-w-[680px] opacity-0"
          >
            <p className="font-body text-base sm:text-lg text-avorria-white/90 font-light leading-relaxed uppercase tracking-wide">
              We design and build websites, grow search visibility and engineer AI systems for ambitious businesses.
            </p>
          </div>
        </div>

        {/* Mobile Service Line */}
        <div
          className="sm:hidden font-mono text-[10px] uppercase tracking-widest text-avorria-muted opacity-0"
          ref={mobileServiceLineRef}
          aria-hidden="true"
        >
          WEB DESIGN / DEVELOPMENT / SEO / AI SYSTEMS
        </div>
      </SceneSafeFrame>
    </CinematicSceneViewport>
  );
}
