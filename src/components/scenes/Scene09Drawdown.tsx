"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { DrawdownChartStage } from "./drawdown/DrawdownChartStage";
import { DrawdownFallback } from "./drawdown/DrawdownFallback";
import { CinematicSceneViewport } from "./CinematicSceneViewport";
import { SceneSafeFrame } from "./SceneSafeFrame";
import { getSceneConfig } from "./registry";

/**
 * SCENE 09 — DRAWDOWN.TRADING (004 / AVORRIA VENTURE)
 *
 * SIMPLIFIED TEASER MODEL:
 * 1. High-Density Trading Dashboard (0.00 – 0.52) -> Lands 0.00-0.08, Holds stationary 0.08-0.44
 * 2. Venture Contribution & Case Study Link (0.54 – 0.94) -> Holds stationary 0.60-0.94
 */
export function Scene09Drawdown() {
  const config = getSceneConfig("scene-09-drawdown")!;

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartImageRef = useRef<HTMLDivElement>(null);
  const contributionRef = useRef<HTMLDivElement>(null);

  const buildTimeline = (timeline: gsap.core.Timeline) => {
    timeline.addLabel("entry", 0);
    timeline.addLabel("dashboard_hold", 0.08);
    timeline.addLabel("contribution_entry", 0.54);
    timeline.addLabel("contribution_hold", 0.60);
    timeline.addLabel("handoff", 0.94);

    // 1. Trading Dashboard (0.00 - 0.50)
    if (chartContainerRef.current) {
      timeline.fromTo(
        chartContainerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.08 },
        0
      );
      // Stable hold 0.08 - 0.44
      timeline.to(
        chartContainerRef.current,
        { opacity: 0, duration: 0.06 },
        0.46
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

    // 2. Venture Contribution & Case Study Link (0.54 - 0.94)
    if (contributionRef.current) {
      timeline.fromTo(
        contributionRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.06 },
        0.54
      );
      // Stable hold 0.60 - 0.94
      timeline.to(
        contributionRef.current,
        { opacity: 0, y: -10, duration: 0.04 },
        0.94
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
        <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-avorria-quiet z-30">
          <span className="text-avorria-signal">004 / DRAWDOWN.TRADING</span>
          <span className="text-avorria-white font-medium">AVORRIA VENTURE</span>
        </div>

        {/* Stage 1: Risk Architecture Dashboard Capture */}
        <DrawdownChartStage
          containerRef={chartContainerRef}
          imageRef={chartImageRef}
        />

        {/* Stage 2: Venture Contribution & Case Study Link */}
        <div
          ref={contributionRef}
          className="absolute inset-x-6 sm:inset-x-16 max-w-4xl mx-auto flex flex-col gap-6 bg-avorria-surface/90 border border-avorria-line p-8 sm:p-12 backdrop-blur-md z-30 opacity-0"
        >
          <div className="font-mono text-xs text-avorria-signal uppercase tracking-widest">
            004 / DRAWDOWN.TRADING // AVORRIA VENTURE
          </div>
          <div className="display-lg text-avorria-white">
            High-frequency analytics dashboard, risk mitigation architecture, and quantitative execution UI.
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-avorria-line pt-6">
            <div className="font-mono text-xs uppercase tracking-widest text-avorria-muted">
              DATA VISUALISATION / SYSTEMS ARCHITECTURE / UX
            </div>
            <Link
              href="/work/drawdown-trading"
              className="inline-flex items-center gap-3 font-mono text-xs text-avorria-signal uppercase tracking-widest hover:underline"
            >
              <span>VIEW CASE STUDY</span>
              <span>→</span>
            </Link>
          </div>
        </div>

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
