"use client";
import React, { useRef } from "react";
import { SearchPageStage } from "./search/SearchPageStage";
import { SearchGraphStage } from "./search/SearchGraphStage";
import { SearchCapabilityReveal } from "./search/SearchCapabilityReveal";
import { SearchFallback } from "./search/SearchFallback";
import { CinematicSceneViewport } from "./CinematicSceneViewport";
import { getSceneConfig } from "./registry";

export function Scene08Search() {
  const config = getSceneConfig("scene-08-search")!;

  const pageContainerRef = useRef<HTMLDivElement>(null);
  const wireframeRef = useRef<HTMLDivElement>(null);
  const graphContainerRef = useRef<HTMLDivElement>(null);
  const revealContainerRef = useRef<HTMLDivElement>(null);

  const buildTimeline = (timeline: gsap.core.Timeline) => {
    timeline.addLabel("entry", 0);
    timeline.addLabel("page", 0.08);
    timeline.addLabel("wireframe", 0.22);
    timeline.addLabel("topology_graph", 0.44);
    timeline.addLabel("capability", 0.74);
    timeline.addLabel("handoff", 0.94);

    // 0.00 - 0.40: Single Page & Wireframe Breakdown
    if (pageContainerRef.current) {
      timeline.fromTo(
        pageContainerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.08 },
        0
      );
      timeline.to(
        pageContainerRef.current,
        { opacity: 0, duration: 0.06 },
        0.38
      );
    }
    if (wireframeRef.current) {
      timeline.fromTo(
        wireframeRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.12 },
        0.16
      );
    }

    // 0.42 - 0.72: Site Expansion & Topology Graph
    if (graphContainerRef.current) {
      timeline.fromTo(
        graphContainerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.08 },
        0.42
      );
      timeline.to(
        graphContainerRef.current,
        { opacity: 0, duration: 0.06 },
        0.72
      );
    }

    // 0.74 - 0.98: SEARCH Capability Reveal
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
      sceneIndex={8}
      fallback={<SearchFallback />}
      buildTimeline={buildTimeline}
    >
      <div className="w-full h-full relative overflow-hidden flex flex-col justify-between p-6 sm:p-12 lg:p-16">
        {/* Semantic Accessibility Heading */}
        <h2 className="sr-only">
          Search — Visibility is Engineered. Technical SEO, Content Architecture, Authority, Discovery.
        </h2>

        {/* Top Minimal Scene Marker */}
        <div className="flex items-center justify-between font-mono text-[10px] sm:text-xs uppercase tracking-widest text-avorria-quiet z-30">
          <span className="text-avorria-signal">02 / CAPABILITY</span>
          <span className="text-avorria-white">TECHNICAL SEO // SEARCH</span>
        </div>

        {/* Chapters 1 & 2: Single Page Hero & Semantic Layers */}
        <SearchPageStage
          containerRef={pageContainerRef}
          wireframeRef={wireframeRef}
        />

        {/* Chapters 3, 4, 5, 6: Site Expansion & Deterministic Topology Graph */}
        <div ref={graphContainerRef} className="absolute inset-0 w-full h-full opacity-0">
          <SearchGraphStage progress={0.65} />
        </div>

        {/* Chapters 7 & 8: SEARCH Capability Reveal */}
        <SearchCapabilityReveal containerRef={revealContainerRef} />

        {/* Bottom Handoff Anchor for Scene 09 (Drawdown.Trading) */}
        <div className="flex items-center justify-between border-t border-avorria-line/40 pt-4 font-mono text-[10px] sm:text-xs text-avorria-quiet uppercase tracking-widest z-30">
          <div className="text-avorria-white">
            FINANCIAL INTELLIGENCE // DRAWDOWN.TRADING
          </div>
          <div className="text-avorria-signal">
            08 / 18
          </div>
        </div>
      </div>
    </CinematicSceneViewport>
  );
}
