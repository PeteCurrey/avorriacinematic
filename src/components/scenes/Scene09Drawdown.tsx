"use client";
import React, { useRef } from "react";
import { DrawdownChartStage } from "./drawdown/DrawdownChartStage";
import { DrawdownInterfaceStage } from "./drawdown/DrawdownInterfaceStage";
import { DrawdownPrincipleStage } from "./drawdown/DrawdownPrincipleStage";
import { DrawdownFallback } from "./drawdown/DrawdownFallback";
import { CinematicSceneViewport } from "./CinematicSceneViewport";
import { getSceneConfig } from "./registry";

export function Scene09Drawdown() {
  const config = getSceneConfig("scene-09-drawdown")!;

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartImageRef = useRef<HTMLDivElement>(null);
  const interfaceContainerRef = useRef<HTMLDivElement>(null);
  const principleContainerRef = useRef<HTMLDivElement>(null);

  const buildTimeline = (timeline: gsap.core.Timeline) => {
    timeline.addLabel("entry", 0);
    timeline.addLabel("dashboard", 0.08);
    timeline.addLabel("decompose", 0.40);
    timeline.addLabel("principle", 0.76);
    timeline.addLabel("handoff", 0.94);

    // 0.00 - 0.38: Dashboard Entry & Hold (Move -> Land -> Hold -> Exit)
    if (chartContainerRef.current) {
      timeline.fromTo(
        chartContainerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.08 },
        0
      );
      // Hold 0.08 - 0.28
      timeline.to(
        chartContainerRef.current,
        { opacity: 0, duration: 0.06 },
        0.34
      );
    }
    if (chartImageRef.current) {
      timeline.fromTo(
        chartImageRef.current,
        { scale: 0.98 },
        { scale: 1.03, duration: 0.34 },
        0
      );
    }

    // 0.36 - 0.74: Decomposed Interface Modules (3D perspective within safe bounds)
    if (interfaceContainerRef.current) {
      timeline.fromTo(
        interfaceContainerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.06 },
        0.36
      );
      // Hold 0.48 - 0.66
      timeline.to(
        interfaceContainerRef.current,
        { opacity: 0, duration: 0.06 },
        0.72
      );
    }

    // 0.76 - 0.98: Quantitative Principle & Delivered Scope
    if (principleContainerRef.current) {
      timeline.fromTo(
        principleContainerRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.06 },
        0.76
      );
      timeline.to(
        principleContainerRef.current,
        { opacity: 0, y: -15, duration: 0.04 },
        0.96
      );
    }
  };

  return (
    <CinematicSceneViewport
      config={config}
      sceneIndex={9}
      fallback={<DrawdownFallback />}
      buildTimeline={buildTimeline}
    >
      <div className="w-full h-full relative overflow-hidden flex flex-col justify-between p-6 sm:p-12 lg:p-16">
        {/* Semantic Accessibility Heading */}
        <h2 className="sr-only">
          Drawdown.Trading — Quantitative Risk and Execution Interface engineered by Avorria
        </h2>

        {/* Top Minimal Scene Marker */}
        <div className="flex items-center justify-between font-mono text-[10px] sm:text-xs uppercase tracking-widest text-avorria-quiet z-30">
          <span className="text-avorria-signal">004 / DRAWDOWN.TRADING</span>
          <span className="text-avorria-white">FINANCIAL INTELLIGENCE // 09</span>
        </div>

        {/* Chapters 1 & 2: Risk Architecture & Institutional Interface */}
        <DrawdownChartStage
          containerRef={chartContainerRef}
          imageRef={chartImageRef}
        />

        {/* Chapters 3, 4 & 5: Exploded 3D Modules & Decomposition */}
        <div ref={interfaceContainerRef} className="absolute inset-0 w-full h-full opacity-0">
          <DrawdownInterfaceStage progress={0.55} />
        </div>

        {/* Chapter 6: Quantitative Principle & Delivered Scope */}
        <DrawdownPrincipleStage containerRef={principleContainerRef} />

        {/* Bottom Handoff Anchor for Scene 10 (Systems) */}
        <div className="flex items-center justify-between border-t border-avorria-line/40 pt-4 font-mono text-[10px] sm:text-xs text-avorria-quiet uppercase tracking-widest z-30">
          <div className="text-avorria-white">
            AUTONOMOUS OPERATIONS // SYSTEMS
          </div>
          <div className="text-avorria-signal">
            09 / 18
          </div>
        </div>
      </div>
    </CinematicSceneViewport>
  );
}
