"use client";

import React, { useRef } from "react";
import { useGsapContext } from "@/lib/motion/hooks";
import { useReducedMotion } from "@/providers/ReducedMotionProvider";
import { useHeader } from "@/providers/HeaderContext";
import { gsap } from "@/lib/motion/gsap-config";

export function Scene01Precision() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pinnedContentRef = useRef<HTMLDivElement | null>(null);
  const compositionRef = useRef<HTMLDivElement | null>(null);
  const signalLineRef = useRef<HTMLDivElement | null>(null);
  const slitHandoffRef = useRef<HTMLDivElement | null>(null);
  const precisionMaskRef = useRef<HTMLDivElement | null>(null);
  const powerMaskRef = useRef<HTMLDivElement | null>(null);
  const metadataRef = useRef<HTMLDivElement | null>(null);
  const descriptorRef = useRef<HTMLDivElement | null>(null);

  const { effectiveReducedMotion } = useReducedMotion();
  const { setNavVisible, setWordmarkOpacity, setHeaderState } = useHeader();

  useGsapContext((ctx) => {
    if (effectiveReducedMotion || !containerRef.current || !pinnedContentRef.current) {
      setNavVisible(true);
      setWordmarkOpacity(1);
      setHeaderState("standard");
      return;
    }

    // Main Pinned ScrollTrigger Timeline (Total ~220vh scroll)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=220%",
        pin: pinnedContentRef.current,
        pinSpacing: true,
        scrub: 1.0,
        anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress;

          // Header & Navigation activation between 60% and 75%
          if (p >= 0.62 && p <= 0.88) {
            setNavVisible(true);
            setWordmarkOpacity(1.0);
            setHeaderState("standard");
          } else if (p < 0.62) {
            setNavVisible(false);
            setWordmarkOpacity(0.75);
            setHeaderState("void");
          } else if (p > 0.88) {
            setNavVisible(true);
            setWordmarkOpacity(1.0);
            setHeaderState("standard");
          }
        }
      }
    });

    // 1. Stage 0 - 15%: Line expands outward from center across the grid
    tl.fromTo(
      signalLineRef.current,
      { scaleX: 0.08, opacity: 0.8 },
      { scaleX: 1, opacity: 1, ease: "power2.out", duration: 0.15 },
      0
    );

    // 2. Stage 15 - 35%: Masked reveal of PRECISION
    if (precisionMaskRef.current) {
      tl.fromTo(
        precisionMaskRef.current,
        { yPercent: 105, opacity: 0.2 },
        { yPercent: 0, opacity: 1, ease: "power3.out", duration: 0.2 },
        0.15
      );
    }

    // 3. Stage 35 - 52%: Masked reveal of AS POWER.
    if (powerMaskRef.current) {
      tl.fromTo(
        powerMaskRef.current,
        { yPercent: -105, opacity: 0.2 },
        { yPercent: 0, opacity: 1, ease: "power3.out", duration: 0.17 },
        0.35
      );
    }

    // 4. Stage 52 - 62%: Micro technical metadata & descriptor
    if (metadataRef.current) {
      tl.fromTo(metadataRef.current, { opacity: 0 }, { opacity: 1, duration: 0.1 }, 0.52);
    }
    if (descriptorRef.current) {
      tl.fromTo(descriptorRef.current, { opacity: 0 }, { opacity: 1, duration: 0.1 }, 0.54);
    }

    // 5. Stage 72 - 82%: Hold moment with subtle scale pull-back (1.0 -> 0.985)
    if (compositionRef.current) {
      tl.to(compositionRef.current, { scale: 0.985, ease: "none", duration: 0.1 }, 0.72);
    }

    // 6. Stage 82 - 92%: Exit Sequence (Typography separates vertically and fades)
    if (precisionMaskRef.current) {
      tl.to(precisionMaskRef.current, { yPercent: -40, opacity: 0, ease: "power2.in", duration: 0.1 }, 0.82);
    }
    if (powerMaskRef.current) {
      tl.to(powerMaskRef.current, { yPercent: 40, opacity: 0, ease: "power2.in", duration: 0.1 }, 0.82);
    }
    if (metadataRef.current) {
      tl.to(metadataRef.current, { opacity: 0, duration: 0.08 }, 0.82);
    }
    if (descriptorRef.current) {
      tl.to(descriptorRef.current, { opacity: 0, duration: 0.08 }, 0.82);
    }

    // 7. Stage 92 - 100%: Signal line contracts into vertical slit handoff anchor for Scene 02
    tl.to(
      signalLineRef.current,
      { scaleX: 0, opacity: 0, ease: "power3.inOut", duration: 0.08 },
      0.92
    );
    if (slitHandoffRef.current) {
      tl.fromTo(
        slitHandoffRef.current,
        { scaleY: 0, opacity: 0 },
        { scaleY: 1, opacity: 1, ease: "power3.out", duration: 0.08 },
        0.93
      );
    }
  }, containerRef, [effectiveReducedMotion]);

  return (
    <div
      ref={containerRef}
      id="scene-01-precision"
      data-scene-id="scene-01-precision"
      data-scene-index="1"
      className="relative w-full bg-avorria-black"
    >
      {/* Pinned Viewport Container */}
      <div
        ref={pinnedContentRef}
        className="w-full h-screen h-[100dvh] flex flex-col justify-between p-6 sm:p-10 lg:p-16 overflow-hidden relative"
      >
        {/* Semantic SEO Accessibility H1 */}
        <h1 className="sr-only">Precision as Power. Avorria Digital Design and Engineering Studio.</h1>

        {/* Top Instrumentation Metadata */}
        <div
          ref={metadataRef}
          className="max-w-[1760px] w-full mx-auto flex items-center justify-between font-mono text-[10px] sm:text-xs uppercase tracking-widest text-avorria-quiet"
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
              className="display-xxl text-avorria-white select-none pl-2 sm:pl-8 lg:pl-16 tracking-tight"
            >
              PRECISION
            </div>
          </div>

          {/* Central 1px Chartreuse Dividing Rule */}
          <div className="relative w-full my-2 sm:my-4 flex items-center justify-center">
            <div
              ref={signalLineRef}
              className="w-full h-[1px] bg-avorria-signal origin-center"
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
              className="display-xxl text-avorria-signal select-none pl-8 sm:pl-28 lg:pl-56 tracking-tight"
            >
              AS POWER<span className="text-avorria-signal">.</span>
            </div>
          </div>
        </div>

        {/* Bottom Editorial Capability Descriptor & Index */}
        <div className="max-w-[1760px] w-full mx-auto flex items-center justify-between border-t border-avorria-line/40 pt-4 font-mono text-[10px] sm:text-xs text-avorria-quiet uppercase tracking-widest">
          <div ref={descriptorRef} className="text-avorria-white">
            DESIGN / ENGINEERING / SEARCH / INTELLIGENCE
          </div>
          <div className="text-avorria-signal">
            01 / 18
          </div>
        </div>
      </div>
    </div>
  );
}
