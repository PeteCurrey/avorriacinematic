"use client";
import React, { useRef, useState } from "react";
import { useGsapContext } from "@/lib/motion/hooks";
import { useReducedMotion } from "@/providers/ReducedMotionProvider";
import { NestIQPropertyStage } from "./nestiq/NestIQPropertyStage";
import { NestIQContextStage } from "./nestiq/NestIQContextStage";
import { NestIQSpatialMapStage } from "./nestiq/NestIQSpatialMapStage";
import { NestIQDecisionStage } from "./nestiq/NestIQDecisionStage";
import { NestIQContributionStage } from "./nestiq/NestIQContributionStage";
import { NestIQFallback } from "./nestiq/NestIQFallback";
import { getSceneConfig } from "./registry";

export function Scene07NestIQ() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pinnedContentRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { effectiveReducedMotion } = useReducedMotion();
  const config = getSceneConfig("scene-07-nestiq")!;

  useGsapContext((ctx) => {
    if (effectiveReducedMotion || !containerRef.current || !pinnedContentRef.current) return;

    // Pinned scroll length: 470vh
    ctx.add(() => {
      const gsap = require("gsap").gsap;
      gsap.to(
        {},
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=470%",
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
      <section id={config.id} data-scene-id={config.id} data-scene-index="7">
        <NestIQFallback />
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      id={config.id}
      data-scene-id={config.id}
      data-scene-index="7"
      className="relative w-full bg-avorria-black select-none"
    >
      {/* Semantic Accessibility Heading */}
      <h2 className="sr-only">NestIQ — Property Intelligence and Spatial Data engineered by Avorria</h2>

      {/* Pinned Viewport Container */}
      <div
        ref={pinnedContentRef}
        className="w-full h-screen h-[100dvh] relative overflow-hidden flex flex-col justify-between p-6 sm:p-12 lg:p-16"
      >
        {/* Top Minimal Scene Marker */}
        <div className="flex items-center justify-between font-mono text-[10px] sm:text-xs uppercase tracking-widest text-avorria-quiet z-30">
          <span className="text-avorria-signal">003 / NESTIQ</span>
          <span className="text-avorria-white">PROPERTY INTELLIGENCE // 07</span>
        </div>

        {/* Chapters 1 & 2: Property Hero & Intelligence Lens */}
        <NestIQPropertyStage progress={scrollProgress} />

        {/* Chapter 3: Contextual Signal Extension */}
        <NestIQContextStage progress={scrollProgress} />

        {/* Chapters 4 & 5: Spatial Map & 3D Landscape */}
        <NestIQSpatialMapStage progress={scrollProgress} />

        {/* Chapter 6: Decision Intelligence & Product UI */}
        <NestIQDecisionStage progress={scrollProgress} />

        {/* Chapter 7: Avorria Contribution & Case Study Link */}
        <NestIQContributionStage progress={scrollProgress} />

        {/* Bottom Handoff Anchor for Scene 08 (Active during 0.94 - 1.00) */}
        <div className="flex items-center justify-between border-t border-avorria-line/40 pt-4 font-mono text-[10px] sm:text-xs text-avorria-quiet uppercase tracking-widest z-30">
          <div className="text-avorria-white">
            {scrollProgress >= 0.94 ? "08 / SEARCH // NEXT PHASE" : "DATA BECOMES SPACE"}
          </div>
          <div className="text-avorria-signal">
            07 / 18
          </div>
        </div>
      </div>
    </section>
  );
}
