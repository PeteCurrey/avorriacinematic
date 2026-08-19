"use client";
import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/providers/ReducedMotionProvider";
import { getSceneConfig } from "./registry";
import { OGNHandoffStage } from "./ogn/OGNHandoffStage";
import { OGNPreviousStage } from "./ogn/OGNPreviousStage";
import { OGNStructureStage } from "./ogn/OGNStructureStage";
import { OGNTransformationStage } from "./ogn/OGNTransformationStage";
import { OGNNewStage } from "./ogn/OGNNewStage";
import { OGNPrincipleStage } from "./ogn/OGNPrincipleStage";
import { OGNFallback } from "./ogn/OGNFallback";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Scene13OGN() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { effectiveReducedMotion } = useReducedMotion();
  const config = getSceneConfig("scene-13-ogn")!;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (effectiveReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=240%",
        pin: true,
        pinSpacing: true,
        scrub: 0.6,
        onUpdate: (self) => {
          setProgress(self.progress);
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [effectiveReducedMotion]);

  if (effectiveReducedMotion) {
    return (
      <section id={config.id} data-scene-id={config.id} data-scene-index="13">
        <OGNFallback />
      </section>
    );
  }

  // Stage Opacity & Transforms Calculation
  // 0.00 - 0.14: Handoff
  const handoffOpacity = progress < 0.14 ? 1 - progress / 0.14 : 0;

  // 0.14 - 0.31: Previous Experience
  const prevOpacity = progress >= 0.10 && progress < 0.49 ? 1 : 0;

  // 0.31 - 0.49: Structural Analysis
  const structOpacity = progress >= 0.31 && progress < 0.49 ? (progress - 0.31) / 0.10 : progress >= 0.49 && progress < 0.55 ? 1 - (progress - 0.49) / 0.06 : 0;

  // 0.49 - 0.72: Transformation (Wipe Sweep)
  const transformOpacity = progress >= 0.49 && progress < 0.75 ? 1 : 0;
  const transformProgress = Math.min(Math.max((progress - 0.49) / 0.23, 0), 1);

  // 0.72 - 0.86: New Experience
  const newOpacity = progress >= 0.72 && progress < 0.88 ? 1 : 0;

  // 0.86 - 0.96: Principle
  const principleOpacity = progress >= 0.84 ? Math.min((progress - 0.84) / 0.06, 1) : 0;
  const principleY = progress >= 0.84 ? (1 - Math.min((progress - 0.84) / 0.06, 1)) * 30 : 30;

  return (
    <section
      ref={containerRef}
      id={config.id}
      data-scene-id={config.id}
      data-scene-index="13"
      className="relative w-full min-h-screen bg-avorria-black select-none flex items-center justify-center border-t border-avorria-line px-6 sm:px-16"
    >
      {/* Semantic Accessibility Heading */}
      <h2 className="sr-only">
        One Great Northern — Industrial Crane Hire, Lifting and Infrastructure
      </h2>

      <div className="max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-24">
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="font-mono text-xs text-avorria-signal uppercase tracking-widest">
            006 // ONE GREAT NORTHERN // INDUSTRIAL INFRASTRUCTURE
          </div>
          <h3 className="font-display font-black text-4xl sm:text-7xl uppercase tracking-tight text-avorria-white leading-none whitespace-pre-line">
            ONE GREAT NORTHERN<br />INDUSTRIAL OPERATIONS<span className="text-avorria-signal">.</span>
          </h3>
          <p className="font-body text-base sm:text-lg text-avorria-muted leading-relaxed max-w-xl">
            Mobile crane hire, contract lifting, plant equipment, and industrial infrastructure services.
          </p>
          <div className="pt-4 flex items-center gap-4">
            <span className="font-mono text-xs uppercase text-avorria-quiet border border-avorria-line px-3 py-1.5">
              SOURCE MEDIA: PENDING VERIFICATION
            </span>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-4 font-mono text-xs text-avorria-quiet border-l border-avorria-line/40 pl-8">
          <span className="text-avorria-signal uppercase">SECTOR TRUTH</span>
          <span className="text-avorria-white">CRANE HIRE &amp; CONTRACT LIFTING</span>
          <span className="text-avorria-muted">PLANT &amp; ACCESS EQUIPMENT</span>
          <span className="text-avorria-muted">CIVILS &amp; INDUSTRIAL WORK</span>
        </div>
      </div>
    </section>
  );
}
