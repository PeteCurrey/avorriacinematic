"use client";
import React, { useRef, useState } from "react";
import { useGsapContext } from "@/lib/motion/hooks";
import { useReducedMotion } from "@/providers/ReducedMotionProvider";
import { SearchPageStage } from "./search/SearchPageStage";
import { SearchGraphStage } from "./search/SearchGraphStage";
import { SearchCapabilityReveal } from "./search/SearchCapabilityReveal";
import { SearchFallback } from "./search/SearchFallback";
import { getSceneConfig } from "./registry";

export function Scene08Search() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pinnedContentRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { effectiveReducedMotion } = useReducedMotion();
  const config = getSceneConfig("scene-08-search")!;

  useGsapContext((ctx) => {
    if (effectiveReducedMotion || !containerRef.current || !pinnedContentRef.current) return;

    // Pinned scroll length: 430vh
    ctx.add(() => {
      const gsap = require("gsap").gsap;
      gsap.to(
        {},
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=430%",
            pin: pinnedContentRef.current,
            pinSpacing: true,
            scrub: 0.7,
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
      <section id={config.id} data-scene-id={config.id} data-scene-index="8">
        <SearchFallback />
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      id={config.id}
      data-scene-id={config.id}
      data-scene-index="8"
      className="relative w-full bg-avorria-black select-none"
    >
      {/* Semantic Accessibility Heading */}
      <h2 className="sr-only">
        Search — Visibility is Engineered. Technical SEO, Content Architecture, Authority, Discovery.
      </h2>

      {/* Pinned Viewport Container */}
      <div
        ref={pinnedContentRef}
        className="w-full h-screen h-[100dvh] relative overflow-hidden flex flex-col justify-between p-6 sm:p-12 lg:p-16"
      >
        {/* Top Minimal Scene Marker */}
        <div className="flex items-center justify-between font-mono text-[10px] sm:text-xs uppercase tracking-widest text-avorria-quiet z-30">
          <span className="text-avorria-signal">02 / CAPABILITY</span>
          <span className="text-avorria-white">TECHNICAL SEO // SEARCH</span>
        </div>

        {/* Chapters 1 & 2: Single Page Hero & Semantic Layers */}
        <SearchPageStage progress={scrollProgress} />

        {/* Chapters 3, 4, 5, 6: Site Expansion & Deterministic Topology Graph */}
        <SearchGraphStage progress={scrollProgress} />

        {/* Chapters 7 & 8: SEARCH Capability Reveal */}
        <SearchCapabilityReveal progress={scrollProgress} />

        {/* Bottom Handoff Anchor for Scene 09 (Drawdown.Trading) */}
        <div className="flex items-center justify-between border-t border-avorria-line/40 pt-4 font-mono text-[10px] sm:text-xs text-avorria-quiet uppercase tracking-widest z-30">
          <div className="text-avorria-white">
            {scrollProgress >= 0.94 ? "FINANCIAL INTELLIGENCE // DRAWDOWN.TRADING" : "VISIBILITY IS ENGINEERED"}
          </div>
          <div className="text-avorria-signal">
            08 / 18
          </div>
        </div>
      </div>
    </section>
  );
}
