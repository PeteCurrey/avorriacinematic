"use client";
import React, { useRef, useState } from "react";
import { useGsapContext } from "@/lib/motion/hooks";
import { useReducedMotion } from "@/providers/ReducedMotionProvider";
import { EntireFMContextStage } from "./entirefm/EntireFMContextStage";
import { EntireFMWorkOrderStage } from "./entirefm/EntireFMWorkOrderStage";
import { EntireFMFieldStage } from "./entirefm/EntireFMFieldStage";
import { EntireFMHistoryStage } from "./entirefm/EntireFMHistoryStage";
import { EntireFMStatementStage } from "./entirefm/EntireFMStatementStage";
import { EntireFMFallback } from "./entirefm/EntireFMFallback";
import { getSceneConfig } from "./registry";

export function Scene11EntireFM() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pinnedContentRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { effectiveReducedMotion } = useReducedMotion();
  const config = getSceneConfig("scene-11-entirefm")!;

  useGsapContext((ctx) => {
    if (effectiveReducedMotion || !containerRef.current || !pinnedContentRef.current) return;

    // Pinned scroll length: 310vh with graceful pin release at end
    ctx.add(() => {
      const gsap = require("gsap").gsap;
      gsap.to(
        {},
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=310%",
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
      <section id={config.id} data-scene-id={config.id} data-scene-index="11">
        <EntireFMFallback />
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      id={config.id}
      data-scene-id={config.id}
      data-scene-index="11"
      className="relative w-full bg-avorria-black select-none"
    >
      {/* Semantic Accessibility Heading */}
      <h2 className="sr-only">
        EntireFM — Facilities Operations Platform engineered by Avorria
      </h2>

      {/* Pinned Viewport Container */}
      <div
        ref={pinnedContentRef}
        className="w-full h-screen h-[100dvh] relative overflow-hidden flex flex-col justify-between p-6 sm:p-12 lg:p-16"
      >
        {/* Top Minimal Scene Marker */}
        <div className="flex items-center justify-between font-mono text-[10px] sm:text-xs uppercase tracking-widest text-avorria-quiet z-30">
          <span className="text-avorria-signal">011 / ENTIREFM</span>
          <span className="text-avorria-white">OPERATIONAL WORKFLOW // 11</span>
        </div>

        {/* Chapters 1 & 2: Systems Handoff & Location/Asset Hierarchy */}
        <EntireFMContextStage progress={scrollProgress} />

        {/* Chapters 3 & 4: Fault Arrival & Work Order Interface */}
        <EntireFMWorkOrderStage progress={scrollProgress} />

        {/* Chapters 5 & 6: Field Execution & Completion Simulation */}
        <EntireFMFieldStage progress={scrollProgress} />

        {/* Chapter 7: Closed Operational Record & Asset History */}
        <EntireFMHistoryStage progress={scrollProgress} />

        {/* Chapters 8 & 9: EntireFM Statement & Selected Work Handoff */}
        <EntireFMStatementStage progress={scrollProgress} />

        {/* Bottom Handoff Anchor for Scene 12 (Selected Work) */}
        <div className="flex items-center justify-between border-t border-avorria-line/40 pt-4 font-mono text-[10px] sm:text-xs text-avorria-quiet uppercase tracking-widest z-30">
          <div className="text-avorria-white">
            {scrollProgress >= 0.94 ? "12 / SELECTED WORK // NEXT PHASE" : "OPERATIONS SHOULD FLOW"}
          </div>
          <div className="text-avorria-signal">
            11 / 18
          </div>
        </div>
      </div>
    </section>
  );
}
