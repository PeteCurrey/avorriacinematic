"use client";
import React, { useRef } from "react";
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

  const humanContainerRef = useRef<HTMLDivElement>(null);
  const humanImageRef = useRef<HTMLDivElement>(null);
  const conversationContainerRef = useRef<HTMLDivElement>(null);
  const worldContainerRef = useRef<HTMLDivElement>(null);
  const opportunityContainerRef = useRef<HTMLDivElement>(null);
  const contributionContainerRef = useRef<HTMLDivElement>(null);
  const footerMarkerRef = useRef<HTMLDivElement>(null);

  const buildTimeline = (timeline: gsap.core.Timeline) => {
    // Stage Timeline Labels & Non-Overlapping Orchestration
    timeline.addLabel("entry", 0);
    timeline.addLabel("human", 0.08);
    timeline.addLabel("conversation", 0.30);
    timeline.addLabel("career_world", 0.52);
    timeline.addLabel("opportunity", 0.74);
    timeline.addLabel("contribution", 0.88);
    timeline.addLabel("handoff", 0.96);

    // 0.00 - 0.28: Human Portrait Arrival (Move -> Land -> Hold -> Exit)
    if (humanContainerRef.current) {
      timeline.fromTo(
        humanContainerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.08 },
        0
      );
      // Hold 0.10 - 0.23 (stationary)
      timeline.to(
        humanContainerRef.current,
        { opacity: 0, duration: 0.05 },
        0.23
      );
    }
    if (humanImageRef.current) {
      timeline.fromTo(
        humanImageRef.current,
        { scale: 0.98 },
        { scale: 1.02, duration: 0.08 },
        0
      );
    }

    // 0.28 - 0.50: Conversation Dialogue (Move -> Land -> Hold -> Exit)
    if (conversationContainerRef.current) {
      timeline.fromTo(
        conversationContainerRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.08 },
        0.28
      );
      // Hold 0.36 - 0.44
      timeline.to(
        conversationContainerRef.current,
        { opacity: 0, y: -15, duration: 0.06 },
        0.46
      );
    }

    // 0.50 - 0.72: Career World Desktop (Move -> Land -> Hold -> Exit)
    if (worldContainerRef.current) {
      timeline.fromTo(
        worldContainerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.08 },
        0.50
      );
      // Hold 0.58 - 0.66
      timeline.to(
        worldContainerRef.current,
        { opacity: 0, duration: 0.06 },
        0.68
      );
    }

    // 0.72 - 0.86: Opportunity Pathways
    if (opportunityContainerRef.current) {
      timeline.fromTo(
        opportunityContainerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.06 },
        0.72
      );
      // Hold 0.78 - 0.82
      timeline.to(
        opportunityContainerRef.current,
        { opacity: 0, duration: 0.04 },
        0.84
      );
    }

    // 0.86 - 0.95: Avorria Contribution
    if (contributionContainerRef.current) {
      timeline.fromTo(
        contributionContainerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.05 },
        0.86
      );
      timeline.to(
        contributionContainerRef.current,
        { opacity: 0, y: -15, duration: 0.04 },
        0.95
      );
    }

    // 0.94 - 1.00: Bottom Handoff Anchor for Scene 06
    if (footerMarkerRef.current) {
      timeline.fromTo(
        footerMarkerRef.current,
        { opacity: 0.4 },
        { opacity: 1, duration: 0.06 },
        0.94
      );
    }
  };

  return (
    <CinematicSceneViewport
      config={config}
      sceneIndex={5}
      fallback={<CareerOSFallback />}
      buildTimeline={buildTimeline}
    >
      <div className="w-full h-full relative overflow-hidden flex flex-col justify-between p-6 sm:p-12 lg:p-16">
        {/* Semantic Accessibility Heading */}
        <h2 className="sr-only">CareerOS — Intelligent Career Platform engineered by Avorria</h2>

        {/* Top Minimal Scene Marker */}
        <div className="flex items-center justify-between font-mono text-[10px] sm:text-xs uppercase tracking-widest text-avorria-quiet z-30">
          <span className="text-avorria-signal">002 / CAREEROS</span>
          <span className="text-avorria-white">AI PLATFORM // 05</span>
        </div>

        {/* Stage 1: Human Portrait */}
        <CareerOSHumanStage
          containerRef={humanContainerRef}
          imageRef={humanImageRef}
        />

        {/* Stage 2: Structured Dialogue */}
        <CareerOSConversationStage
          containerRef={conversationContainerRef}
        />

        {/* Stage 3: Career World Landscape */}
        <CareerOSWorldStage
          containerRef={worldContainerRef}
        />

        {/* Stage 4: Opportunity Pathways */}
        <CareerOpportunityStage
          containerRef={opportunityContainerRef}
        />

        {/* Stage 5: Avorria Contribution & Case Study Link */}
        <CareerOSContributionStage
          containerRef={contributionContainerRef}
        />

        {/* Bottom Handoff Anchor for Scene 06 */}
        <div
          ref={footerMarkerRef}
          className="flex items-center justify-between border-t border-avorria-line/40 pt-4 font-mono text-[10px] sm:text-xs text-avorria-quiet uppercase tracking-widest z-30"
        >
          <div className="text-avorria-white">
            DIGITAL PRODUCTS // BUILD
          </div>
          <div className="text-avorria-signal">
            CAREEROS // 002
          </div>
        </div>
      </div>
    </CinematicSceneViewport>
  );
}
