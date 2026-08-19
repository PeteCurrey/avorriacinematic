"use client";
import React, { useRef } from "react";
import { SystemsInputStage } from "./systems/SystemsInputStage";
import { SystemsIntelligenceStage } from "./systems/SystemsIntelligenceStage";
import { SystemsActionStage } from "./systems/SystemsActionStage";
import { SystemsCapabilityReveal } from "./systems/SystemsCapabilityReveal";
import { SystemsFallback } from "./systems/SystemsFallback";
import { CinematicSceneViewport } from "./CinematicSceneViewport";
import { getSceneConfig } from "./registry";

export function Scene10Systems() {
  const config = getSceneConfig("scene-10-systems")!;

  const inputRef = useRef<HTMLDivElement>(null);
  const intelligenceRef = useRef<HTMLDivElement>(null);
  const actionRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const footerMarkerRef = useRef<HTMLDivElement>(null);

  const buildTimeline = (timeline: gsap.core.Timeline) => {
    timeline.addLabel("entry", 0);
    timeline.addLabel("input", 0.08);
    timeline.addLabel("intelligence", 0.32);
    timeline.addLabel("action", 0.54);
    timeline.addLabel("capability", 0.76);
    timeline.addLabel("handoff", 0.94);

    // 0.00 - 0.30: 3-Zone Architecture & CRM Inputs
    if (inputRef.current) {
      timeline.fromTo(
        inputRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.08 },
        0
      );
      timeline.to(
        inputRef.current,
        { opacity: 0, duration: 0.06 },
        0.28
      );
    }

    // 0.30 - 0.52: Deterministic Rules & Context
    if (intelligenceRef.current) {
      timeline.fromTo(
        intelligenceRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.06 },
        0.30
      );
      timeline.to(
        intelligenceRef.current,
        { opacity: 0, duration: 0.06 },
        0.50
      );
    }

    // 0.52 - 0.74: Action Preparation & Human Approval
    if (actionRef.current) {
      timeline.fromTo(
        actionRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.06 },
        0.52
      );
      timeline.to(
        actionRef.current,
        { opacity: 0, duration: 0.06 },
        0.72
      );
    }

    // 0.74 - 0.98: SYSTEMS Capability Reveal
    if (revealRef.current) {
      timeline.fromTo(
        revealRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.08 },
        0.74
      );
      timeline.to(
        revealRef.current,
        { opacity: 0, y: -20, duration: 0.04 },
        0.96
      );
    }

    // 0.94 - 1.00: Footer Handoff
    if (footerMarkerRef.current) {
      timeline.fromTo(
        footerMarkerRef.current,
        { opacity: 0.4 },
        { opacity: 1, duration: 0.06 },
        0.94
      );
    }
  };

  return (
    <CinematicSceneViewport
      config={config}
      sceneIndex={10}
      fallback={<SystemsFallback />}
      buildTimeline={buildTimeline}
    >
      <div className="w-full h-full relative overflow-hidden flex flex-col justify-between p-6 sm:p-12 lg:p-16">
        {/* Semantic Accessibility Heading */}
        <h2 className="sr-only">
          Systems — Make It Think. AI, Automation, Data, Workflows, Integration.
        </h2>

        {/* Top Minimal Scene Marker */}
        <div className="absolute top-0 inset-x-0 z-30 flex items-center justify-between font-mono text-[10px] sm:text-xs uppercase tracking-widest text-avorria-quiet p-6 sm:p-12 lg:p-16">
          <span className="text-avorria-signal">03 / CAPABILITY</span>
          <span className="text-avorria-white">OPERATIONAL ARCHITECTURE // SYSTEMS</span>
        </div>

        {/* Chapters 1 & 2: 3-Zone Architecture & CRM Inputs */}
        <SystemsInputStage containerRef={inputRef} />

        {/* Chapters 3 & 4: Deterministic Rules & Context */}
        <SystemsIntelligenceStage containerRef={intelligenceRef} />

        {/* Chapters 5 & 6: Action Preparation, Human Approval & Closed Loop */}
        <SystemsActionStage containerRef={actionRef} />

        {/* Chapters 7 & 8: SYSTEMS Capability Reveal */}
        <SystemsCapabilityReveal containerRef={revealRef} />

        {/* Bottom Handoff Anchor for Scene 11 (EntireFM) */}
        <div
          ref={footerMarkerRef}
          className="absolute bottom-0 inset-x-0 z-30 flex items-center justify-between border-t border-avorria-line/40 pt-4 font-mono text-[10px] sm:text-xs text-avorria-quiet uppercase tracking-widest p-6 sm:p-12 lg:p-16"
        >
          <div className="text-avorria-white">
            FACILITIES WORKFLOW // ENTIREFM
          </div>
          <div className="text-avorria-signal">
            10 / 18
          </div>
        </div>
      </div>
    </CinematicSceneViewport>
  );
}
