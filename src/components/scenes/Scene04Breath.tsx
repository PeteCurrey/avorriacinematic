"use client";
import React from "react";
import { BreathPremise } from "./breath/BreathPremise";
import { BreathConclusion } from "./breath/BreathConclusion";
import { BreathFallback } from "./breath/BreathFallback";
import { CinematicSceneViewport } from "./CinematicSceneViewport";
import { getSceneConfig } from "./registry";

export function Scene04Breath() {
  const config = getSceneConfig("scene-04-breath")!;

  return (
    <CinematicSceneViewport
      config={config}
      sceneIndex={4}
      fallback={<BreathFallback />}
    >
      {(scrollProgress) => (
        <div className="w-full h-full relative overflow-hidden flex flex-col justify-between p-6 sm:p-12 lg:p-16">
          {/* Semantic Accessibility Heading */}
          <h2 className="sr-only">Philosophy — Precision as Intent</h2>

          {/* Top Minimal Scene Marker */}
          <div className="flex items-center justify-between font-mono text-[10px] sm:text-xs uppercase tracking-widest text-avorria-quiet z-30">
            <span className="text-avorria-signal">04 / PHILOSOPHY</span>
            <span className="text-avorria-white">PRECISION AS INTENT</span>
          </div>

          {/* Stage 1: The Monolith Statement (0.00 - 0.55) */}
          <BreathPremise progress={scrollProgress} />

          {/* Stage 2: The Core Conviction & Handoff (0.55 - 1.00) */}
          <BreathConclusion progress={scrollProgress} />

          {/* Bottom Scene Indicator */}
          <div className="flex items-center justify-between border-t border-avorria-line/40 pt-4 font-mono text-[10px] sm:text-xs text-avorria-quiet uppercase tracking-widest z-30">
            <div className="text-avorria-white">
              {scrollProgress >= 0.88 ? "DIGITAL PRODUCT PLATFORMS // CAREEROS" : "RADICAL SIMPLICITY"}
            </div>
            <div className="text-avorria-signal">
              04 / 18
            </div>
          </div>
        </div>
      )}
    </CinematicSceneViewport>
  );
}
