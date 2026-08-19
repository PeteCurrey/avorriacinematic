"use client";
import React from "react";
import { BuildCapabilityReveal } from "./build/BuildCapabilityReveal";
import { BuildAssemblyStage } from "./build/BuildAssemblyStage";
import { BuildFallback } from "./build/BuildFallback";
import { CinematicSceneViewport } from "./CinematicSceneViewport";
import { getSceneConfig } from "./registry";

export function Scene06Build() {
  const config = getSceneConfig("scene-06-build")!;

  return (
    <CinematicSceneViewport
      config={config}
      sceneIndex={6}
      fallback={<BuildFallback />}
    >
      {(scrollProgress) => (
        <div className="w-full h-full relative overflow-hidden flex flex-col justify-between p-6 sm:p-12 lg:p-16">
          {/* Semantic Accessibility Heading */}
          <h2 className="sr-only">
            Build — We Engineer Digital Flagships, Custom Software, and Connected Hardware.
          </h2>

          {/* Top Minimal Scene Marker */}
          <div className="flex items-center justify-between font-mono text-[10px] sm:text-xs uppercase tracking-widest text-avorria-quiet z-30">
            <span className="text-avorria-signal">01 / CAPABILITY</span>
            <span className="text-avorria-white">DIGITAL ENGINEERING // BUILD</span>
          </div>

          {/* Chapters 1 & 2: BUILD Monolith Typography */}
          <BuildCapabilityReveal progress={scrollProgress} />

          {/* Chapters 3, 4, 5: Interactive Fragment Assembly Grid */}
          <BuildAssemblyStage progress={scrollProgress} />

          {/* Bottom Handoff Anchor for Scene 07 (NestIQ) */}
          <div className="flex items-center justify-between border-t border-avorria-line/40 pt-4 font-mono text-[10px] sm:text-xs text-avorria-quiet uppercase tracking-widest z-30">
            <div className="text-avorria-white">
              {scrollProgress >= 0.92 ? "SPATIAL PLATFORMS // NESTIQ" : "CODE IS CRAFT"}
            </div>
            <div className="text-avorria-signal">
              06 / 18
            </div>
          </div>
        </div>
      )}
    </CinematicSceneViewport>
  );
}
