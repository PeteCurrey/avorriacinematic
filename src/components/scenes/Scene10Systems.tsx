"use client";
import React, { useRef, useState } from "react";
import { useGsapContext } from "@/lib/motion/hooks";
import { useReducedMotion } from "@/providers/ReducedMotionProvider";
import { SystemsInputStage } from "./systems/SystemsInputStage";
import { SystemsIntelligenceStage } from "./systems/SystemsIntelligenceStage";
import { SystemsActionStage } from "./systems/SystemsActionStage";
import { SystemsCapabilityReveal } from "./systems/SystemsCapabilityReveal";
import { SystemsFallback } from "./systems/SystemsFallback";
import { getSceneConfig } from "./registry";

export function Scene10Systems() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pinnedContentRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { effectiveReducedMotion } = useReducedMotion();
  const config = getSceneConfig("scene-10-systems")!;

  useGsapContext((ctx) => {
    if (effectiveReducedMotion || !containerRef.current || !pinnedContentRef.current) return;

    // Pinned scroll length: 460vh
    ctx.add(() => {
      const gsap = require("gsap").gsap;
      gsap.to(
        {},
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=460%",
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
      <section id={config.id} data-scene-id={config.id} data-scene-index="10">
        <SystemsFallback />
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      id={config.id}
      data-scene-id={config.id}
      data-scene-index="10"
      className="relative w-full bg-avorria-black select-none"
    >
      {/* Semantic Accessibility Heading */}
      <h2 className="sr-only">
        Systems — Make It Think. AI, Automation, Data, Workflows, Integration.
      </h2>

      {/* Pinned Viewport Container */}
      <div
        ref={pinnedContentRef}
        className="w-full h-screen h-[100dvh] relative overflow-hidden flex flex-col justify-between p-6 sm:p-12 lg:p-16"
      >
        {/* Top Minimal Scene Marker */}
        <div className="flex items-center justify-between font-mono text-[10px] sm:text-xs uppercase tracking-widest text-avorria-quiet z-30">
          <span className="text-avorria-signal">03 / CAPABILITY</span>
          <span className="text-avorria-white">OPERATIONAL ARCHITECTURE // SYSTEMS</span>
        </div>

        {/* Chapters 1 & 2: 3-Zone Architecture & CRM Inputs */}
        <SystemsInputStage progress={scrollProgress} />

        {/* Chapters 3 & 4: Deterministic Rules & Context */}
        <SystemsIntelligenceStage progress={scrollProgress} />

        {/* Chapters 5 & 6: Action Preparation, Human Approval & Closed Loop */}
        <SystemsActionStage progress={scrollProgress} />

        {/* Chapters 7 & 8: SYSTEMS Capability Reveal */}
        <SystemsCapabilityReveal progress={scrollProgress} />

        {/* Bottom Handoff Anchor for Scene 11 (EntireFM) */}
        <div className="flex items-center justify-between border-t border-avorria-line/40 pt-4 font-mono text-[10px] sm:text-xs text-avorria-quiet uppercase tracking-widest z-30">
          <div className="text-avorria-white">
            {scrollProgress >= 0.94 ? "FACILITIES WORKFLOW // ENTIREFM" : "OPERATIONAL LEVERAGE"}
          </div>
          <div className="text-avorria-signal">
            10 / 18
          </div>
        </div>
      </div>
    </section>
  );
}
