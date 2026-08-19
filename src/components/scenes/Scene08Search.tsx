"use client";
import React from "react";
import { CinematicSceneViewport } from "./CinematicSceneViewport";
import { SearchPageStage } from "./search/SearchPageStage";
import { SearchGraphStage } from "./search/SearchGraphStage";
import { SearchCapabilityReveal } from "./search/SearchCapabilityReveal";
import { SearchFallback } from "./search/SearchFallback";
import { getSceneConfig } from "./registry";

export function Scene08Search() {
  const config = getSceneConfig("scene-08-search")!;

  return (
    <CinematicSceneViewport
      config={config}
      sceneIndex={8}
      fallback={<SearchFallback />}
    >
      {(progress) => (
        <>
          {/* Semantic Accessibility Heading */}
          <h2 className="sr-only">
            Search — Visibility is Engineered. Technical SEO, Content Architecture, Authority, Discovery.
          </h2>

          {/* Top Minimal Scene Marker */}
          <div className="absolute top-0 inset-x-0 z-30 flex items-center justify-between font-mono text-[10px] sm:text-xs uppercase tracking-widest text-avorria-quiet p-6 sm:p-12 lg:p-16">
            <span className="text-avorria-signal">02 / CAPABILITY</span>
            <span className="text-avorria-white">TECHNICAL SEO // SEARCH</span>
          </div>

          {/* Chapters 1 & 2: Single Page Hero & Semantic Layers */}
          <SearchPageStage progress={progress} />

          {/* Chapters 3, 4, 5, 6: Site Expansion & Deterministic Topology Graph */}
          <SearchGraphStage progress={progress} />

          {/* Chapters 7 & 8: SEARCH Capability Reveal */}
          <SearchCapabilityReveal progress={progress} />

          {/* Bottom Handoff Anchor for Scene 09 (Drawdown.Trading) */}
          <div className="absolute bottom-0 inset-x-0 z-30 flex items-center justify-between border-t border-avorria-line/40 pt-4 font-mono text-[10px] sm:text-xs text-avorria-quiet uppercase tracking-widest p-6 sm:p-12 lg:p-16">
            <div className="text-avorria-white">
              {progress >= 0.94 ? "FINANCIAL INTELLIGENCE // DRAWDOWN.TRADING" : "VISIBILITY IS ENGINEERED"}
            </div>
            <div className="text-avorria-signal">
              08 / 18
            </div>
          </div>
        </>
      )}
    </CinematicSceneViewport>
  );
}
