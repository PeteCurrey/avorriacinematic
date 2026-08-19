"use client";
import React, { useRef } from "react";
import { BuildCapabilityReveal } from "./build/BuildCapabilityReveal";
import { BuildAssemblyStage } from "./build/BuildAssemblyStage";
import { BuildFallback } from "./build/BuildFallback";
import { CinematicSceneViewport } from "./CinematicSceneViewport";
import { getSceneConfig } from "./registry";

export function Scene06Build() {
  const config = getSceneConfig("scene-06-build")!;

  const assemblyContainerRef = useRef<HTMLDivElement>(null);
  const revealContainerRef = useRef<HTMLDivElement>(null);

  const buildTimeline = (timeline: gsap.core.Timeline) => {
    timeline.addLabel("entry", 0);
    timeline.addLabel("assembly", 0.15);
    timeline.addLabel("assemble_peak", 0.50);
    timeline.addLabel("capability_reveal", 0.74);
    timeline.addLabel("handoff", 0.94);

    // 0.00 - 0.72: Fragment Assembly
    if (assemblyContainerRef.current) {
      timeline.fromTo(
        assemblyContainerRef.current,
        { opacity: 1 },
        { opacity: 0, duration: 0.08 },
        0.66
      );
    }

    // 0.74 - 0.98: BUILD Capability Reveal
    if (revealContainerRef.current) {
      timeline.fromTo(
        revealContainerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.08 },
        0.74
      );
      timeline.to(
        revealContainerRef.current,
        { opacity: 0, y: -20, duration: 0.04 },
        0.96
      );
    }
  };

  return (
    <CinematicSceneViewport
      config={config}
      sceneIndex={6}
      fallback={<BuildFallback />}
      buildTimeline={buildTimeline}
    >
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
        <BuildCapabilityReveal containerRef={revealContainerRef} />

        {/* Chapters 3, 4, 5: Interactive Fragment Assembly Grid */}
        <div ref={assemblyContainerRef} className="absolute inset-0 w-full h-full">
          <BuildAssemblyStage progress={0.5} />
        </div>

        {/* Bottom Handoff Anchor for Scene 07 (NestIQ) */}
        <div className="flex items-center justify-between border-t border-avorria-line/40 pt-4 font-mono text-[10px] sm:text-xs text-avorria-quiet uppercase tracking-widest z-30">
          <div className="text-avorria-white">
            SPATIAL PLATFORMS // NESTIQ
          </div>
          <div className="text-avorria-signal">
            06 / 18
          </div>
        </div>
      </div>
    </CinematicSceneViewport>
  );
}
