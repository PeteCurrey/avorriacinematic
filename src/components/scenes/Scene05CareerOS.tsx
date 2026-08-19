"use client";
import React, { useRef, useState } from "react";
import { useGsapContext } from "@/lib/motion/hooks";
import { useReducedMotion } from "@/providers/ReducedMotionProvider";
import { CareerOSHumanStage } from "./careeros/CareerOSHumanStage";
import { CareerOSConversationStage } from "./careeros/CareerOSConversationStage";
import { CareerTwinGraphStage } from "./careeros/CareerTwinGraphStage";
import { CareerOpportunityStage } from "./careeros/CareerOpportunityStage";
import { CareerOSLiveDemoStage } from "./careeros/CareerOSLiveDemoStage";
import { CareerOSContributionStage } from "./careeros/CareerOSContributionStage";
import { CareerOSFallback } from "./careeros/CareerOSFallback";
import { getSceneConfig } from "./registry";

export function Scene05CareerOS() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pinnedContentRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { effectiveReducedMotion } = useReducedMotion();
  const config = getSceneConfig("scene-05-careeros")!;

  useGsapContext((ctx) => {
    if (effectiveReducedMotion || !containerRef.current || !pinnedContentRef.current) return;

    // Pinned scroll length: 480vh
    ctx.add(() => {
      const gsap = require("gsap").gsap;
      gsap.to(
        {},
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=480%",
            pin: pinnedContentRef.current,
            pinSpacing: true,
            scrub: 0.8,
            anticipatePin: 1,
            onUpdate: (self: { progress: number }) => {
              setScrollProgress(self.progress);
            }
          }
        }
      );
    });
  }, containerRef, [effectiveReducedMotion]);

  if (effectiveReducedMotion) {
    return (
      <section id={config.id} data-scene-id={config.id} data-scene-index="5">
        <CareerOSFallback />
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      id={config.id}
      data-scene-id={config.id}
      data-scene-index="5"
      className="relative w-full bg-avorria-black select-none"
    >
      {/* Semantic Accessibility Heading */}
      <h2 className="sr-only">CareerOS — Intelligent Career Platform engineered by Avorria</h2>

      {/* Pinned Viewport Container */}
      <div
        ref={pinnedContentRef}
        className="w-full h-screen h-[100dvh] relative overflow-hidden flex flex-col justify-between p-6 sm:p-12 lg:p-16"
      >
        {/* Top Minimal Scene Marker */}
        <div className="flex items-center justify-between font-mono text-[10px] sm:text-xs uppercase tracking-widest text-avorria-quiet z-30">
          <span className="text-avorria-signal">005 / CAREEROS</span>
          <span className="text-avorria-white">AI PLATFORM // 05</span>
        </div>

        {/* Chapter 1: Human Portrait */}
        <CareerOSHumanStage progress={scrollProgress} />

        {/* Chapter 2: Structured Dialogue */}
        <CareerOSConversationStage progress={scrollProgress} />

        {/* Chapter 3: Career Twin Graph */}
        <CareerTwinGraphStage progress={scrollProgress} />

        {/* Chapter 4: Opportunity Pathways */}
        <CareerOpportunityStage progress={scrollProgress} />

        {/* Chapter 5: Live AI Interaction */}
        <CareerOSLiveDemoStage progress={scrollProgress} />

        {/* Chapter 6: Avorria Contribution & Case Study Link */}
        <CareerOSContributionStage progress={scrollProgress} />

        {/* Bottom Handoff Anchor for Scene 06 (Active during 0.94 - 1.00) */}
        <div className="flex items-center justify-between border-t border-avorria-line/40 pt-4 font-mono text-[10px] sm:text-xs text-avorria-quiet uppercase tracking-widest z-30">
          <div className="text-avorria-white">
            {scrollProgress >= 0.92 ? "DIGITAL PRODUCTS // BUILD" : "CAREEROS PLATFORM ARCHITECTURE"}
          </div>
          <div className="text-avorria-signal">
            05 / 18
          </div>
        </div>
      </div>
    </section>
  );
}
