"use client";

import React, { useRef } from "react";
import { useGsapContext } from "@/lib/motion/hooks";
import { useReducedMotion } from "@/providers/ReducedMotionProvider";
import { useHeader } from "@/providers/HeaderContext";
import { gsap } from "@/lib/motion/gsap-config";
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

  const handleProgress = (p: number) => {
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

    if (effectiveReducedMotion) return;

    // 1. Stage 0 - 15%: Line expands outward from center across the grid
    if (signalLineRef.current) {
      const lineProgress = Math.min(1, p / 0.15);
      const scaleX = 0.08 + lineProgress * 0.92;
      const opacity = p >= 0.92 ? Math.max(0, 1 - (p - 0.92) / 0.08) : 0.8 + lineProgress * 0.2;
      signalLineRef.current.style.transform = `scaleX(${p >= 0.92 ? Math.max(0, 1 - (p - 0.92) / 0.08) : scaleX})`;
      signalLineRef.current.style.opacity = `${opacity}`;
    }

    // 2. Stage 15 - 35%: Masked reveal of PRECISION
    if (precisionMaskRef.current) {
      if (p < 0.15) {
        precisionMaskRef.current.style.transform = "translateY(105%)";
        precisionMaskRef.current.style.opacity = "0";
      } else if (p <= 0.35) {
        const t = (p - 0.15) / 0.20;
        precisionMaskRef.current.style.transform = `translateY(${105 * (1 - t)}%)`;
        precisionMaskRef.current.style.opacity = `${0.2 + t * 0.8}`;
      } else if (p <= 0.82) {
        precisionMaskRef.current.style.transform = "translateY(0%)";
        precisionMaskRef.current.style.opacity = "1";
      } else {
        const t = Math.min(1, (p - 0.82) / 0.10);
        precisionMaskRef.current.style.transform = `translateY(${-40 * t}%)`;
        precisionMaskRef.current.style.opacity = `${Math.max(0, 1 - t)}`;
      }
    }

    // 3. Stage 35 - 52%: Masked reveal of AS POWER.
    if (powerMaskRef.current) {
      if (p < 0.35) {
        powerMaskRef.current.style.transform = "translateY(-105%)";
        powerMaskRef.current.style.opacity = "0";
      } else if (p <= 0.52) {
        const t = (p - 0.35) / 0.17;
        powerMaskRef.current.style.transform = `translateY(${-105 * (1 - t)}%)`;
        powerMaskRef.current.style.opacity = `${0.2 + t * 0.8}`;
      } else if (p <= 0.82) {
        powerMaskRef.current.style.transform = "translateY(0%)";
        powerMaskRef.current.style.opacity = "1";
      } else {
        const t = Math.min(1, (p - 0.82) / 0.10);
        powerMaskRef.current.style.transform = `translateY(${40 * t}%)`;
        powerMaskRef.current.style.opacity = `${Math.max(0, 1 - t)}`;
      }
    }

    // 4. Stage 52 - 62%: Micro technical metadata & descriptor
    if (metadataRef.current) {
      if (p < 0.52) {
        metadataRef.current.style.opacity = "0";
      } else if (p <= 0.62) {
        metadataRef.current.style.opacity = `${(p - 0.52) / 0.10}`;
      } else if (p <= 0.82) {
        metadataRef.current.style.opacity = "1";
      } else {
        metadataRef.current.style.opacity = `${Math.max(0, 1 - (p - 0.82) / 0.08)}`;
      }
    }
    if (descriptorRef.current) {
      if (p < 0.54) {
        descriptorRef.current.style.opacity = "0";
      } else if (p <= 0.64) {
        descriptorRef.current.style.opacity = `${(p - 0.54) / 0.10}`;
      } else if (p <= 0.82) {
        descriptorRef.current.style.opacity = "1";
      } else {
        descriptorRef.current.style.opacity = `${Math.max(0, 1 - (p - 0.82) / 0.08)}`;
      }
    }

    // 5. Stage 72 - 82%: Hold moment with subtle scale pull-back (1.0 -> 0.985)
    if (compositionRef.current) {
      if (p >= 0.72 && p <= 0.82) {
        const t = (p - 0.72) / 0.10;
        compositionRef.current.style.transform = `scale(${1 - 0.015 * t})`;
      } else if (p > 0.82) {
        compositionRef.current.style.transform = "scale(0.985)";
      } else {
        compositionRef.current.style.transform = "scale(1)";
      }
    }

    // 7. Stage 92 - 100%: Vertical slit handoff anchor
    if (slitHandoffRef.current) {
      if (p >= 0.93) {
        const t = Math.min(1, (p - 0.93) / 0.07);
        slitHandoffRef.current.style.transform = `scaleY(${t})`;
        slitHandoffRef.current.style.opacity = `${t}`;
      } else {
        slitHandoffRef.current.style.opacity = "0";
      }
    }
  };

  return (
    <CinematicSceneViewport
      config={config}
      sceneIndex={1}
      onProgress={handleProgress}
    >
      {() => (
        <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 lg:p-16 overflow-hidden relative">
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

          {/* Bottom Editorial Capability Descriptor */}
          <div className="max-w-[1760px] w-full mx-auto flex items-center justify-between border-t border-avorria-line/40 pt-4 font-mono text-[10px] sm:text-xs text-avorria-quiet uppercase tracking-widest">
            <div ref={descriptorRef} className="text-avorria-white">
              DESIGN / ENGINEERING / SEARCH / INTELLIGENCE
            </div>
          </div>
        </div>
      )}
    </CinematicSceneViewport>
  );
}
