"use client";
import React, { useRef, useState } from "react";
import { useGsapContext } from "@/lib/motion/hooks";
import { useReducedMotion } from "@/providers/ReducedMotionProvider";
import { BuildAssemblyStage } from "./build/BuildAssemblyStage";
import { BuildCapabilityReveal } from "./build/BuildCapabilityReveal";
import { BuildFallback } from "./build/BuildFallback";
import { getSceneConfig } from "./registry";

export function Scene06Build() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pinnedContentRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { effectiveReducedMotion } = useReducedMotion();
  const config = getSceneConfig("scene-06-build")!;

  useGsapContext((ctx) => {
    if (effectiveReducedMotion || !containerRef.current || !pinnedContentRef.current) return;

    // Pinned scroll length: 340vh
    ctx.add(() => {
      const gsap = require("gsap").gsap;
      gsap.to(
        {},
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=340%",
            pin: pinnedContentRef.current,
            pinSpacing: true,
            scrub: 0.6,
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
      <section id={config.id} data-scene-id={config.id} data-scene-index="6">
        <BuildFallback />
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      id={config.id}
      data-scene-id={config.id}
      data-scene-index="6"
      className="relative w-full bg-avorria-black select-none"
    >
      {/* Semantic Accessibility Heading */}
      <h2 className="sr-only">
        Build — Digital Products People Want To Use. Web, Product, UX, Development, Commerce.
      </h2>

      {/* Pinned Viewport Container */}
      <div
        ref={pinnedContentRef}
        className="w-full h-screen h-[100dvh] relative overflow-hidden flex flex-col justify-between p-6 sm:p-12 lg:p-16"
      >
        {/* Top Minimal Scene Marker */}
        <div className="flex items-center justify-between font-mono text-[10px] sm:text-xs uppercase tracking-widest text-avorria-quiet z-30">
          <span className="text-avorria-signal">01 / CAPABILITY</span>
          <span className="text-avorria-white">DIGITAL PRODUCTS // BUILD</span>
        </div>

        {/* Stage 1: 3D Perspective Fragment Assembly */}
        <BuildAssemblyStage progress={scrollProgress} />

        {/* Stage 2: BUILD Capability Proposition Reveal */}
        <BuildCapabilityReveal progress={scrollProgress} />

        {/* Bottom Handoff Anchor for Scene 07 (Active during 0.94 - 1.00) */}
        <div className="flex items-center justify-between border-t border-avorria-line/40 pt-4 font-mono text-[10px] sm:text-xs text-avorria-quiet uppercase tracking-widest z-30">
          <div className="text-avorria-white">
            {scrollProgress >= 0.92 ? "07 / NESTIQ // NEXT PHASE" : "INTERFACE & PRODUCT ENGINEERING"}
          </div>
          <div className="text-avorria-signal">
            06 / 18
          </div>
        </div>
      </div>
    </section>
  );
}
