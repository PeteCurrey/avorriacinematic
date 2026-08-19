"use client";
import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/providers/ReducedMotionProvider";
import { getSceneConfig } from "./registry";
import { MANIFESTO_STATEMENTS } from "@/lib/scenes/manifesto-config";
import { ManifestoStatement } from "./manifesto/ManifestoStatement";
import { ManifestoFallback } from "./manifesto/ManifestoFallback";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Scene15Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { effectiveReducedMotion } = useReducedMotion();
  const config = getSceneConfig("scene-15-manifesto")!;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (effectiveReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=230%",
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
      <section id={config.id} data-scene-id={config.id} data-scene-index="15">
        <ManifestoFallback />
      </section>
    );
  }

  // Calculate Opacity for each statement
  const getStatementOpacity = (start: number, end: number) => {
    if (progress < start || progress > end) return 0;
    const mid = (start + end) / 2;
    if (progress < mid) {
      return Math.min((progress - start) / (0.05), 1);
    } else {
      return Math.max(1 - (progress - (end - 0.05)) / 0.05, 0);
    }
  };

  const getStatementY = (start: number) => {
    if (progress < start) return 40;
    const p = (progress - start) / 0.08;
    return Math.max(40 * (1 - Math.min(p, 1)), 0);
  };

  return (
    <section
      ref={containerRef}
      id={config.id}
      data-scene-id={config.id}
      data-scene-index="15"
      className="relative w-full h-screen bg-avorria-black select-none overflow-hidden border-t border-avorria-line"
    >
      {/* Semantic Accessibility Heading */}
      <h2 className="sr-only">
        Manifesto — Brand Principles &amp; Conviction by Avorria
      </h2>

      {/* Small Ambient Metadata at Start */}
      <div
        className="absolute top-8 left-8 sm:left-16 font-mono text-xs text-avorria-signal uppercase tracking-widest transition-opacity duration-300 pointer-events-none z-10"
        style={{ opacity: progress < 0.15 ? 1 : 0 }}
      >
        15 / MANIFESTO <span>{"//"}</span> CONVICTION
      </div>

      {/* 4 Statements */}
      {MANIFESTO_STATEMENTS.map((st) => (
        <ManifestoStatement
          key={st.id}
          statement={st}
          opacity={getStatementOpacity(st.progressStart, st.progressEnd)}
          yTranslate={getStatementY(st.progressStart)}
        />
      ))}

      {/* Proof Handoff Anchor */}
      <div
        className="absolute bottom-8 left-8 sm:left-16 font-mono text-xs text-avorria-signal uppercase tracking-widest transition-opacity duration-300 pointer-events-none z-10"
        style={{ opacity: progress > 0.92 ? 1 : 0 }}
      >
        16 / PROOF <span>{"//"}</span> NEXT PHASE
      </div>
    </section>
  );
}
