"use client";
import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/providers/ReducedMotionProvider";
import { getSceneConfig } from "./registry";
import { FinaleSignal } from "./finale/FinaleSignal";
import { FinaleQuestion } from "./finale/FinaleQuestion";
import { FinaleProposition } from "./finale/FinaleProposition";
import { FinaleActions } from "./finale/FinaleActions";
import { FinaleFallback } from "./finale/FinaleFallback";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Scene18Finale() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { effectiveReducedMotion } = useReducedMotion();
  const config = getSceneConfig("scene-18-finale")!;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (effectiveReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=220%",
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
      <section id={config.id} data-scene-id={config.id} data-scene-index="18">
        <FinaleFallback />
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      id={config.id}
      data-scene-id={config.id}
      data-scene-index="18"
      className="relative w-full h-screen bg-avorria-black select-none overflow-hidden border-t border-avorria-line"
    >
      {/* Semantic Accessibility Heading */}
      <h2 className="sr-only">
        Finale — Start a Project with Avorria
      </h2>

      {/* 01. Signal Callback Line */}
      <FinaleSignal progress={progress} />

      {/* 02. Conversational Question */}
      <FinaleQuestion progress={progress} />

      {/* 03. Monumental Proposition */}
      <FinaleProposition progress={progress} />

      {/* 04. Primary Action & Contact */}
      <FinaleActions progress={progress} />
    </section>
  );
}
