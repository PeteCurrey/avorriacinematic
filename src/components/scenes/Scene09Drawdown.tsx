"use client";
import React from "react";
import { CinematicSceneViewport } from "./CinematicSceneViewport";
import { DrawdownChartStage } from "./drawdown/DrawdownChartStage";
import { DrawdownInterfaceStage } from "./drawdown/DrawdownInterfaceStage";
import { DrawdownPrincipleStage } from "./drawdown/DrawdownPrincipleStage";
import { DrawdownFallback } from "./drawdown/DrawdownFallback";
import { getSceneConfig } from "./registry";

export function Scene09Drawdown() {
  const config = getSceneConfig("scene-09-drawdown")!;

  return (
    <CinematicSceneViewport
      config={config}
      sceneIndex={9}
      fallback={<DrawdownFallback />}
    >
      {(progress) => (
        <>
          {/* Semantic Accessibility Heading */}
          <h2 className="sr-only">
            Drawdown.Trading — Financial Intelligence and Complex Systems engineered by Avorria
          </h2>

          {/* Top Minimal Scene Marker */}
          <div className="absolute top-0 inset-x-0 z-30 flex items-center justify-between font-mono text-[10px] sm:text-xs uppercase tracking-widest text-avorria-quiet p-6 sm:p-12 lg:p-16">
            <span className="text-avorria-signal">009 / DRAWDOWN.TRADING</span>
            <span className="text-avorria-white">COMPLEX SYSTEMS // 09</span>
          </div>

          {/* Chapters 1 & 2: Time-series Chart Hero & Inspection Probe */}
          <DrawdownChartStage progress={progress} />

          {/* Chapters 3, 4, 5, 6: Full Platform UI & CSS 3D Layer Separation */}
          <DrawdownInterfaceStage progress={progress} />

          {/* Chapter 7: Avorria Principle & Case Study Link */}
          <DrawdownPrincipleStage progress={progress} />

          {/* Bottom Handoff Anchor for Scene 10 (SYSTEMS) */}
          <div className="absolute bottom-0 inset-x-0 z-30 flex items-center justify-between border-t border-avorria-line/40 pt-4 font-mono text-[10px] sm:text-xs text-avorria-quiet uppercase tracking-widest p-6 sm:p-12 lg:p-16">
            <div className="text-avorria-white">
              {progress >= 0.94 ? "OPERATIONAL SYSTEMS // AUTOMATION" : "COMPLEX SYSTEMS MADE SIMPLE"}
            </div>
            <div className="text-avorria-signal">
              09 / 18
            </div>
          </div>
        </>
      )}
    </CinematicSceneViewport>
  );
}
