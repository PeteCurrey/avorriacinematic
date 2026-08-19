"use client";
import React, { useRef, useState } from "react";
import { useGsapContext } from "@/lib/motion/hooks";
import { useReducedMotion } from "@/providers/ReducedMotionProvider";
import { BreathPremise } from "./breath/BreathPremise";
import { BreathConclusion } from "./breath/BreathConclusion";
import { BreathFallback } from "./breath/BreathFallback";
import { getSceneConfig } from "./registry";

export function Scene04Breath() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pinnedContentRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { effectiveReducedMotion } = useReducedMotion();
  const config = getSceneConfig("scene-04-breath")!;

  useGsapContext((ctx) => {
    if (effectiveReducedMotion || !containerRef.current || !pinnedContentRef.current) return;

    // Pinned scroll length: 150vh
    ctx.add(() => {
      const gsap = require("gsap").gsap;
      gsap.to(
        {},
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=150%",
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
      <section id={config.id} data-scene-id={config.id} data-scene-index="4">
        <BreathFallback />
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      id={config.id}
      data-scene-id={config.id}
      data-scene-index="4"
      className="relative w-full bg-avorria-black select-none"
    >
      {/* Semantic Accessible Heading */}
      <h2 className="sr-only">
        We don&apos;t decorate businesses. We engineer advantage. Design is valuable when it changes what a business can do.
      </h2>

      {/* Pinned Viewport Container */}
      <div
        ref={pinnedContentRef}
        className="w-full h-screen h-[100dvh] relative overflow-hidden flex flex-col justify-between p-6 sm:p-12 lg:p-16"
      >
        {/* Top Minimal Scene Marker */}
        <div className="flex items-center justify-between font-mono text-[10px] sm:text-xs uppercase tracking-widest text-avorria-quiet z-30">
          <span className="text-avorria-signal">04 / PRINCIPLE</span>
          <span className="text-avorria-white">PHILOSOPHY // 01</span>
        </div>

        {/* Stage 1: Premise (WE DON'T DECORATE BUSINESSES.) */}
        <BreathPremise progress={scrollProgress} />

        {/* Stage 2: Conclusion (WE ENGINEER ADVANTAGE.) */}
        <BreathConclusion progress={scrollProgress} />

        {/* Bottom Scene Index & CareerOS Handoff Anchor (94 - 100%) */}
        <div className="flex items-center justify-between border-t border-avorria-line/40 pt-4 font-mono text-[10px] sm:text-xs text-avorria-quiet uppercase tracking-widest z-30">
          <div className="text-avorria-white">
            {scrollProgress >= 0.92 ? "05 / CAREEROS // NEXT PHASE" : "AVORRIA / BRAND POSITION"}
          </div>
          <div className="text-avorria-signal">
            04 / 18
          </div>
        </div>
      </div>
    </section>
  );
}
