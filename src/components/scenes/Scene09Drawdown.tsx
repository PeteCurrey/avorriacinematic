"use client";
import React, { useRef } from "react";
import { DrawdownChartStage } from "./drawdown/DrawdownChartStage";
import { DrawdownInterfaceStage } from "./drawdown/DrawdownInterfaceStage";
import { DrawdownPrincipleStage } from "./drawdown/DrawdownPrincipleStage";
import { DrawdownFallback } from "./drawdown/DrawdownFallback";
import { CinematicSceneViewport } from "./CinematicSceneViewport";
import { SceneSafeFrame } from "./SceneSafeFrame";
import { getSceneConfig } from "./registry";

/**
 * SCENE 09 — DRAWDOWN.TRADING (PROJECT 004)
 *
 * Progression:
 * 1. Chart / Terminal dashboard lands (0.00 - 0.34) -> Holds stationary
 * 2. Interface Stage arrives unified (0.36 - 0.48) -> Decomposes into 3D modules (0.48 - 0.62) -> Reassembles (0.62 - 0.70)
 * 3. Principle & Delivered Scope (0.74 - 0.94)
 */
export function Scene09Drawdown() {
  const config = getSceneConfig("scene-09-drawdown")!;

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartImageRef = useRef<HTMLDivElement>(null);
  const interfaceContainerRef = useRef<HTMLDivElement>(null);
  const unifiedRef = useRef<HTMLDivElement>(null);
  const modulesContainerRef = useRef<HTMLDivElement>(null);
  const principleContainerRef = useRef<HTMLDivElement>(null);

  const buildTimeline = (timeline: gsap.core.Timeline) => {
    timeline.addLabel("entry", 0);
    timeline.addLabel("dashboard", 0.08);
    timeline.addLabel("decompose", 0.40);
    timeline.addLabel("principle", 0.76);
    timeline.addLabel("handoff", 0.94);

    // 0.00 - 0.36: Dashboard Entry & Hold (Move -> Land -> Hold -> Exit)
    if (chartContainerRef.current) {
      timeline.fromTo(
        chartContainerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.08 },
        0
      );
      // Hold stationary 0.08 - 0.28
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
        { scale: 1.0, duration: 0.08 },
        0
      );
    }

    // 0.36 - 0.74: Unified -> Decomposed Modules -> Reassembled
    if (interfaceContainerRef.current) {
      timeline.fromTo(
        interfaceContainerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.06 },
        0.36
      );
      timeline.to(
        interfaceContainerRef.current,
        { opacity: 0, duration: 0.06 },
        0.72
      );
    }

    // Unified view visible 0.36 - 0.48, then fades out as decomposed modules take over
    if (unifiedRef.current) {
      timeline.fromTo(
        unifiedRef.current,
        { opacity: 1 },
        { opacity: 0, duration: 0.06 },
        0.48
      );
      // Reassembles back at 0.64
      timeline.to(
        unifiedRef.current,
        { opacity: 1, duration: 0.06 },
        0.64
      );
    }

    // Decomposed modules visible 0.48 - 0.64
    if (modulesContainerRef.current) {
      timeline.fromTo(
        modulesContainerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.06 },
        0.48
      );
      timeline.to(
        modulesContainerRef.current,
        { opacity: 0, duration: 0.06 },
        0.64
      );
    }

    // 0.74 - 0.96: Quantitative Principle & Delivered Scope
    if (principleContainerRef.current) {
      timeline.fromTo(
        principleContainerRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.06 },
        0.74
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
      <SceneSafeFrame>
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
        <DrawdownInterfaceStage
          containerRef={interfaceContainerRef}
          unifiedRef={unifiedRef}
          modulesContainerRef={modulesContainerRef}
        />

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
      </SceneSafeFrame>
    </CinematicSceneViewport>
  );
}
