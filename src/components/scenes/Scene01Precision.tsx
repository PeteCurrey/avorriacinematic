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
 * Scene00Void has been removed. This scene is now the first viewport.
 * Signal dot behaviour from Void is absorbed here.
 *
 * INITIAL VIEWPORT (before scrolling):
 *   - Avorria wordmark (via Header, always visible)
 *   - Label: DIGITAL MARKETING & ENGINEERING STUDIO
 *   - H1:    PRECISION / AS POWER.
 *   - Body:  WE BUILD WEBSITES, SEARCH VISIBILITY AND AI SYSTEMS...
 *   - Line:  WEB DESIGN / DEVELOPMENT / SEO / AI SYSTEMS
 *   - Signal dot → precision line (animates on first scroll)
 *
 * Navigation is available from page load (nav visible from 0%).
 *
 * AS POWER. is always one line — whitespace-nowrap, no large left offset.
 * Font size: clamp(3rem, 9.5vw, 10.75rem) — AS POWER. stays on one line at all tested viewports.
 */
export function Scene01Precision() {
  const signalDotRef = useRef<HTMLDivElement | null>(null);
  const signalLineRef = useRef<HTMLDivElement | null>(null);
  const slitHandoffRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLDivElement | null>(null);
  const precisionRef = useRef<HTMLDivElement | null>(null);
  const powerRef = useRef<HTMLDivElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const serviceLineRef = useRef<HTMLDivElement | null>(null);
  const compositionRef = useRef<HTMLDivElement | null>(null);

  const lastHeaderStateRef = useRef<string>("standard");

  const { effectiveReducedMotion } = useReducedMotion();
  const { setNavVisible, setWordmarkOpacity, setHeaderState } = useHeaderActions();
  const config = getSceneConfig("scene-01-precision")!;

  const buildTimeline = (timeline: gsap.core.Timeline) => {
    // Labels
    timeline.addLabel("entry", 0);
    timeline.addLabel("dot_pulse", 0.04);
    timeline.addLabel("line_expand", 0.10);
    timeline.addLabel("hold", 0.70);
    timeline.addLabel("exit", 0.82);
    timeline.addLabel("handoff", 0.94);

    // Nav is visible from the start — set state immediately on init
    setNavVisible(true);
    setWordmarkOpacity(1.0);
    setHeaderState("standard");

    // Direction-aware header evaluation (stays standard throughout this hero)
    timeline.eventCallback("onUpdate", () => {
      if (lastHeaderStateRef.current !== "standard") {
        lastHeaderStateRef.current = "standard";
        setNavVisible(true);
        setWordmarkOpacity(1.0);
        setHeaderState("standard");
      }
    });

    // 0. Signal dot: pulse on load (opacity 0 → 1 → 0.7), then stays until line expands
    if (signalDotRef.current) {
      timeline.fromTo(
        signalDotRef.current,
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.04, ease: "power2.out" },
        0
      );
      // Dot fades as line expands
      timeline.to(
        signalDotRef.current,
        { opacity: 0, scale: 0.6, duration: 0.06 },
        0.10
      );
    }

    // 1. Signal line expands outward from center
    if (signalLineRef.current) {
      timeline.fromTo(
        signalLineRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.14, ease: "power2.out" },
        0.10
      );
      // Line contracts as exit begins
      timeline.to(
        signalLineRef.current,
        { scaleX: 0, opacity: 0, duration: 0.08 },
        0.84
      );
    }

    // 2. Label — DIGITAL MARKETING & ENGINEERING STUDIO
    if (labelRef.current) {
      timeline.fromTo(
        labelRef.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.10 },
        0.06
      );
      timeline.to(
        labelRef.current,
        { opacity: 0, y: -6, duration: 0.08 },
        0.84
      );
    }

    // 3. PRECISION — mask reveal upward
    if (precisionRef.current) {
      timeline.fromTo(
        precisionRef.current,
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.16, ease: "power2.out" },
        0.14
      );
      timeline.to(
        precisionRef.current,
        { yPercent: -45, opacity: 0, duration: 0.10 },
        0.82
      );
    }

    // 4. AS POWER. — mask reveal downward
    if (powerRef.current) {
      timeline.fromTo(
        powerRef.current,
        { yPercent: -110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.16, ease: "power2.out" },
        0.22
      );
      timeline.to(
        powerRef.current,
        { yPercent: 45, opacity: 0, duration: 0.10 },
        0.82
      );
    }

    // 5. Body descriptor
    if (bodyRef.current) {
      timeline.fromTo(
        bodyRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.10 },
        0.36
      );
      timeline.to(
        bodyRef.current,
        { opacity: 0, duration: 0.08 },
        0.84
      );
    }

    // 6. Service line
    if (serviceLineRef.current) {
      timeline.fromTo(
        serviceLineRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.10 },
        0.40
      );
      timeline.to(
        serviceLineRef.current,
        { opacity: 0, duration: 0.08 },
        0.84
      );
    }

    // 7. Exit composition scale-back
    if (compositionRef.current) {
      timeline.to(
        compositionRef.current,
        { scale: 0.985, duration: 0.12 },
        0.72
      );
    }

    // 8. Slit handoff anchor for Scene03 Alkota entry
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
      <SceneSafeFrame>
        {/* Semantic H1 — essential for SEO and screen readers */}
        <h1 className="sr-only">
          Precision as Power. Avorria — Digital Marketing, Web Design, SEO and AI Systems Studio.
        </h1>

        {/* Top: Scene label + service line */}
        <div className="flex items-start justify-between w-full">
          {/* Label — primary commercial identifier */}
          <div
            ref={labelRef}
            className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-avorria-quiet opacity-0"
          >
            DIGITAL MARKETING &amp; ENGINEERING STUDIO
          </div>

          {/* Service line — top right */}
          <div
            ref={serviceLineRef}
            className="hidden sm:block font-mono text-[10px] uppercase tracking-widest text-avorria-quiet opacity-0 text-right"
            aria-hidden="true"
          >
            WEB DESIGN / DEVELOPMENT<br />SEO / AI SYSTEMS
          </div>
        </div>

        {/* Central composition */}
        <div
          ref={compositionRef}
          className="flex flex-col justify-center my-auto py-4 sm:py-6"
          style={{ willChange: "transform" }}
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

          {/* Signal line + dot — between the two words */}
          <div className="relative w-full my-2 sm:my-4 flex items-center justify-center">
            {/* Chartreuse dot — pulse on load, then collapses as line appears */}
            <div
              ref={signalDotRef}
              className="absolute w-1.5 h-1.5 rounded-full bg-avorria-signal opacity-0 z-10"
              style={{ willChange: "transform, opacity" }}
              aria-hidden="true"
            />
            {/* Precision rule — expands from center */}
            <div
              ref={signalLineRef}
              className="w-full h-[1px] bg-avorria-signal origin-center opacity-0"
              style={{ willChange: "transform, opacity" }}
              aria-hidden="true"
            />
            {/* Vertical slit — handoff anchor to Alkota */}
            <div
              ref={slitHandoffRef}
              className="absolute w-[1px] h-16 sm:h-20 bg-avorria-signal origin-center opacity-0"
              style={{ willChange: "transform, opacity" }}
              aria-hidden="true"
            />
          </div>

          {/* AS POWER. — never wraps */}
          <div className="overflow-hidden pt-1 sm:pt-2">
            <div
              ref={powerRef}
              className="select-none tracking-tight leading-none text-avorria-signal opacity-0 whitespace-nowrap"
              style={{ fontSize: "clamp(3rem, 9.5vw, 10.75rem)" }}
            >
              AS POWER<span className="text-avorria-signal">.</span>
            </div>
          </div>

          {/* Supporting commercial descriptor */}
          <div
            ref={bodyRef}
            className="mt-6 sm:mt-8 max-w-[640px] opacity-0"
          >
            <p className="font-body text-sm sm:text-base text-avorria-muted leading-relaxed uppercase tracking-wide">
              We build websites, search visibility and AI systems
              <br className="hidden sm:block" />
              that make businesses harder to compete with.
            </p>
          </div>
        </div>

        {/* Bottom: service line on mobile */}
        <div
          className="sm:hidden font-mono text-[10px] uppercase tracking-widest text-avorria-quiet opacity-0"
          ref={serviceLineRef as unknown as React.RefObject<HTMLDivElement>}
          aria-hidden="true"
        >
          WEB DESIGN / DEVELOPMENT / SEO / AI SYSTEMS
        </div>
      </SceneSafeFrame>
    </CinematicSceneViewport>
  );
}
