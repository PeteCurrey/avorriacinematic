"use client";

import React, { useRef } from "react";
import { useReducedMotion } from "@/providers/ReducedMotionProvider";
import { useHeaderActions } from "@/providers/HeaderContext";
import { useGsapContext } from "@/lib/motion/hooks";
import { gsap } from "@/lib/motion/gsap-config";
import { CinematicSceneViewport } from "./CinematicSceneViewport";
import { SceneSafeFrame } from "./SceneSafeFrame";
import { getSceneConfig } from "./registry";

/**
 * SCENE 01 — PRECISION AS POWER
 *
 * THE SINGLE HOMEPAGE HERO.
 *
 * MOTION CONTRACT — two independent timelines:
 *
 *   1. INTRO (autonomous, on mount, ~1.9s)
 *      Plays the moment the page loads so the hero is fully composed at
 *      scroll position 0. The entrance must NEVER be scroll-bound: a
 *      scrubbed entrance renders the landing viewport empty until the
 *      visitor scrolls, which is the worst possible first frame.
 *
 *   2. EXIT (scroll-scrubbed, 0.55 -> 1.00)
 *      The composition holds rock-steady for the first 55% of the scene's
 *      scroll distance, then parts vertically and hands off to the
 *      Selected Work reel.
 */
/**
 * Hero display size.
 *
 * Calibrated for Syne Extrabold, which is far wider than the body face —
 * roughly 1.02em per character for this string at weight 800, against ~0.62em
 * for DM Sans. The longest line, "AS POWER.", is 9 characters, so the size has
 * to clear 9 x 1.02 x fontSize inside the safe frame's inner width at every
 * breakpoint. The lower bound is what mobile can hold, not what looks big.
 */
const HERO_TYPE_SIZE = "clamp(2.15rem, 8.2vw, 9.5rem)";

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
  const scrollCueRef = useRef<HTMLDivElement | null>(null);
  const compositionRef = useRef<HTMLDivElement | null>(null);
  const introScopeRef = useRef<HTMLDivElement | null>(null);

  const lastHeaderStateRef = useRef<string>("standard");

  const { effectiveReducedMotion } = useReducedMotion();
  const { setNavVisible, setWordmarkOpacity, setHeaderState } = useHeaderActions();
  const config = getSceneConfig("scene-01-precision")!;

  /**
   * INTRO — autonomous, runs once on mount.
   * Every element that starts at opacity-0 in the markup is resolved here,
   * so the hero is legible without any scroll input.
   */
  useGsapContext(
    () => {
      const targets = [
        labelRef.current,
        desktopServiceLineRef.current,
        mobileServiceLineRef.current,
        precisionRef.current,
        powerRef.current,
        bodyRef.current,
        scrollCueRef.current,
        signalLineRef.current,
      ].filter(Boolean);

      // Reduced motion: resolve instantly to the settled state, no animation.
      if (effectiveReducedMotion) {
        gsap.set(targets, { opacity: 1, y: 0, yPercent: 0, clearProps: "transform" });
        gsap.set(signalLineRef.current, { scaleX: 1, opacity: 1 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 0. Signal dot pulses, then collapses into the rule
      tl.fromTo(
        signalDotRef.current,
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.36, ease: "power2.out" },
        0
      ).to(
        signalDotRef.current,
        { opacity: 0, scale: 0.4, duration: 0.3 },
        0.42
      );

      // 1. Precision rule draws outward from centre
      tl.fromTo(
        signalLineRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.9, ease: "expo.out" },
        0.34
      );

      // 2. Wordmark label
      tl.fromTo(
        labelRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.7 },
        0.42
      );

      // 3. PRECISION rises, AS POWER descends — meeting at the rule
      tl.fromTo(
        precisionRef.current,
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.05, ease: "expo.out" },
        0.4
      );
      tl.fromTo(
        powerRef.current,
        { yPercent: -110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.05, ease: "expo.out" },
        0.5
      );

      // 4. Supporting commercial proposition
      tl.fromTo(
        bodyRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.75 },
        0.95
      );

      // 5. Service lines
      tl.fromTo(
        [desktopServiceLineRef.current, mobileServiceLineRef.current].filter(Boolean),
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.7 },
        1.05
      );

      // 6. Scroll cue — last in, invites the scroll that starts the film
      tl.fromTo(
        scrollCueRef.current,
        { opacity: 0, y: -6 },
        { opacity: 1, y: 0, duration: 0.6 },
        1.3
      );
    },
    introScopeRef,
    [effectiveReducedMotion]
  );

  /**
   * EXIT — scroll-scrubbed only. No entrance tweens live on this timeline,
   * so at scroll progress 0 the hero sits exactly where the intro left it.
   */
  const buildTimeline = (timeline: gsap.core.Timeline) => {
    timeline.addLabel("hold", 0);
    timeline.addLabel("exit", 0.55);
    timeline.addLabel("handoff", 0.88);

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

    // The scroll cue is the first thing to go — it has done its job.
    if (scrollCueRef.current) {
      timeline.to(scrollCueRef.current, { opacity: 0, y: 8, duration: 0.08 }, 0.04);
    }

    // Supporting copy and metadata dissolve
    if (bodyRef.current) {
      timeline.to(bodyRef.current, { opacity: 0, y: -10, duration: 0.16 }, 0.55);
    }
    if (labelRef.current) {
      timeline.to(labelRef.current, { opacity: 0, y: -8, duration: 0.16 }, 0.55);
    }
    if (desktopServiceLineRef.current) {
      timeline.to(desktopServiceLineRef.current, { opacity: 0, duration: 0.16 }, 0.55);
    }
    if (mobileServiceLineRef.current) {
      timeline.to(mobileServiceLineRef.current, { opacity: 0, duration: 0.16 }, 0.55);
    }

    // The type parts vertically around the rule
    if (precisionRef.current) {
      timeline.to(
        precisionRef.current,
        { yPercent: -48, opacity: 0, duration: 0.26, ease: "power2.in" },
        0.6
      );
    }
    if (powerRef.current) {
      timeline.to(
        powerRef.current,
        { yPercent: 48, opacity: 0, duration: 0.26, ease: "power2.in" },
        0.6
      );
    }

    // The rule collapses back to a point
    if (signalLineRef.current) {
      timeline.to(
        signalLineRef.current,
        { scaleX: 0, opacity: 0, duration: 0.2, ease: "power2.inOut" },
        0.68
      );
    }

    // Slit handoff anchor opens into the next scene
    if (slitHandoffRef.current) {
      timeline.fromTo(
        slitHandoffRef.current,
        { scaleY: 0, opacity: 0 },
        { scaleY: 1, opacity: 1, duration: 0.12 },
        0.86
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
        <div ref={introScopeRef} className="contents">
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
                className="font-display font-extrabold select-none tracking-tight leading-none text-avorria-white opacity-0"
                style={{ fontSize: HERO_TYPE_SIZE }}
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
                className="font-display font-extrabold select-none tracking-tight leading-none text-avorria-signal opacity-0 whitespace-nowrap"
                style={{ fontSize: HERO_TYPE_SIZE }}
              >
                AS POWER<span className="text-avorria-signal">.</span>
              </div>
            </div>

            {/* Supporting Commercial Proposition */}
            <div
              ref={bodyRef}
              className="mt-6 sm:mt-8 max-w-[680px] opacity-0"
            >
              <p className="font-body text-base sm:text-lg text-avorria-white/90 font-light leading-relaxed uppercase tracking-wide">
                We design and build websites, grow search visibility and engineer AI systems for ambitious businesses.
              </p>
            </div>
          </div>

          {/* Bottom row: mobile service line + scroll cue */}
          <div className="flex items-end justify-between w-full gap-6">
            <div
              className="sm:hidden font-mono text-[10px] uppercase tracking-widest text-avorria-muted opacity-0"
              ref={mobileServiceLineRef}
              aria-hidden="true"
            >
              WEB DESIGN / DEVELOPMENT / SEO / AI SYSTEMS
            </div>

            <div
              ref={scrollCueRef}
              className="ml-auto flex items-center gap-3 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-avorria-quiet opacity-0"
              aria-hidden="true"
            >
              <span>SCROLL</span>
              <span
                className="block w-8 h-[1px] bg-avorria-line-strong origin-left"
                style={{ animation: "avorria-cue 2.4s var(--ease-avorria-in-out) infinite" }}
              />
            </div>
          </div>
        </div>
      </SceneSafeFrame>
    </CinematicSceneViewport>
  );
}
