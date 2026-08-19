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
      className="relative w-full h-screen bg-avorria-black select-none overflow-hidden border-t border-avorria-line"
    >
      {/* Semantic Accessibility Heading */}
      <h2 className="sr-only">
        One Great Northern — Commercial Digital Experience &amp; Transformation by Avorria
      </h2>

      <OGNHandoffStage opacity={handoffOpacity} />
      <OGNPreviousStage opacity={prevOpacity} />
      <OGNStructureStage opacity={structOpacity} />
      <OGNTransformationStage opacity={transformOpacity} progress={transformProgress} />
      <OGNNewStage opacity={newOpacity} />
      <OGNPrincipleStage opacity={principleOpacity} yTranslate={principleY} />
    </section>
  );
}
