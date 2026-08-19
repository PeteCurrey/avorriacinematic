"use client";
import React from "react";
import { CareerOSHumanStage } from "./careeros/CareerOSHumanStage";
import { CareerOSConversationStage } from "./careeros/CareerOSConversationStage";
import { CareerOSWorldStage } from "./careeros/CareerOSWorldStage";
import { CareerOpportunityStage } from "./careeros/CareerOpportunityStage";
import { CareerOSContributionStage } from "./careeros/CareerOSContributionStage";
import { CareerOSFallback } from "./careeros/CareerOSFallback";
import { CinematicSceneViewport } from "./CinematicSceneViewport";
import { getSceneConfig } from "./registry";

export function Scene05CareerOS() {
  const config = getSceneConfig("scene-05-careeros")!;

  return (
    <CinematicSceneViewport
      config={config}
      sceneIndex={5}
      fallback={<CareerOSFallback />}
    >
      {(scrollProgress) => (
        <div className="w-full h-full relative overflow-hidden flex flex-col justify-between p-6 sm:p-12 lg:p-16">
          {/* Semantic Accessibility Heading */}
          <h2 className="sr-only">CareerOS — Intelligent Career Platform engineered by Avorria</h2>

          {/* Top Minimal Scene Marker */}
          <div className="flex items-center justify-between font-mono text-[10px] sm:text-xs uppercase tracking-widest text-avorria-quiet z-30">
            <span className="text-avorria-signal">002 / CAREEROS</span>
            <span className="text-avorria-white">AI PLATFORM // 05</span>
          </div>

          {/* Stage 1: Human Portrait */}
          <CareerOSHumanStage progress={scrollProgress} />

          {/* Stage 2: Structured Dialogue */}
          <CareerOSConversationStage progress={scrollProgress} />

          {/* Stage 3: Career World Landscape */}
          <CareerOSWorldStage progress={scrollProgress} />

          {/* Stage 4: Opportunity Pathways */}
          <CareerOpportunityStage progress={scrollProgress} />

          {/* Stage 5: Avorria Contribution & Case Study Link */}
          <CareerOSContributionStage progress={scrollProgress} />

          {/* Bottom Handoff Anchor for Scene 06 */}
          <div className="flex items-center justify-between border-t border-avorria-line/40 pt-4 font-mono text-[10px] sm:text-xs text-avorria-quiet uppercase tracking-widest z-30">
            <div className="text-avorria-white">
              {scrollProgress >= 0.92 ? "DIGITAL PRODUCTS // BUILD" : "CAREEROS PLATFORM ARCHITECTURE"}
            </div>
            <div className="text-avorria-signal">
              CAREEROS // 002
            </div>
          </div>
        </div>
      )}
    </CinematicSceneViewport>
  );
}
