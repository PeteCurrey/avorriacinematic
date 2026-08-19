"use client";
import React, { useRef, useState } from "react";
import { useGsapContext } from "@/lib/motion/hooks";
import { useReducedMotion } from "@/providers/ReducedMotionProvider";
import { DrawdownChartStage } from "./drawdown/DrawdownChartStage";
import { DrawdownInterfaceStage } from "./drawdown/DrawdownInterfaceStage";
import { DrawdownPrincipleStage } from "./drawdown/DrawdownPrincipleStage";
import { DrawdownFallback } from "./drawdown/DrawdownFallback";
import { getSceneConfig } from "./registry";

export function Scene09Drawdown() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pinnedContentRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { effectiveReducedMotion } = useReducedMotion();
  const config = getSceneConfig("scene-09-drawdown")!;

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
      <section id={config.id} data-scene-id={config.id} data-scene-index="9">
        <DrawdownFallback />
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      id={config.id}
      data-scene-id={config.id}
      data-scene-index="9"
      className="relative w-full bg-avorria-black select-none"
    >
      {/* Semantic Accessibility Heading */}
      <h2 className="sr-only">
        Drawdown.Trading — Financial Intelligence and Complex Systems engineered by Avorria
      </h2>

      {/* Pinned Viewport Container */}
      <div
        ref={pinnedContentRef}
        className="w-full h-screen h-[100dvh] relative overflow-hidden flex flex-col justify-between p-6 sm:p-12 lg:p-16"
      >
        {/* Top Minimal Scene Marker */}
        <div className="flex items-center justify-between font-mono text-[10px] sm:text-xs uppercase tracking-widest text-avorria-quiet z-30">
          <span className="text-avorria-signal">009 / DRAWDOWN.TRADING</span>
          <span className="text-avorria-white">COMPLEX SYSTEMS // 09</span>
        </div>

        {/* Chapters 1 & 2: Time-series Chart Hero & Inspection Probe */}
        <DrawdownChartStage progress={scrollProgress} />

        {/* Chapters 3, 4, 5, 6: Full Platform UI & CSS 3D Layer Separation */}
        <DrawdownInterfaceStage progress={scrollProgress} />

        {/* Chapter 7: Avorria Principle & Case Study Link */}
        <DrawdownPrincipleStage progress={scrollProgress} />

        {/* Bottom Handoff Anchor for Scene 10 (SYSTEMS) */}
        <div className="flex items-center justify-between border-t border-avorria-line/40 pt-4 font-mono text-[10px] sm:text-xs text-avorria-quiet uppercase tracking-widest z-30">
          <div className="text-avorria-white">
            {scrollProgress >= 0.94 ? "OPERATIONAL SYSTEMS // AUTOMATION" : "COMPLEX SYSTEMS MADE SIMPLE"}
          </div>
          <div className="text-avorria-signal">
            09 / 18
          </div>
        </div>
      </div>
    </section>
  );
}
