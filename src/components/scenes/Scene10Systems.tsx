"use client";
import React from "react";
import { CinematicSceneViewport } from "./CinematicSceneViewport";
import { SystemsInputStage } from "./systems/SystemsInputStage";
import { SystemsIntelligenceStage } from "./systems/SystemsIntelligenceStage";
import { SystemsActionStage } from "./systems/SystemsActionStage";
import { SystemsCapabilityReveal } from "./systems/SystemsCapabilityReveal";
import { SystemsFallback } from "./systems/SystemsFallback";
import { getSceneConfig } from "./registry";

export function Scene10Systems() {
  const config = getSceneConfig("scene-10-systems")!;

  return (
    <CinematicSceneViewport
      config={config}
      sceneIndex={10}
      fallback={<SystemsFallback />}
    >
      {(progress) => (
        <>
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
          <SystemsInputStage progress={progress} />

          {/* Chapters 3 & 4: Deterministic Rules & Context */}
          <SystemsIntelligenceStage progress={progress} />

          {/* Chapters 5 & 6: Action Preparation, Human Approval & Closed Loop */}
          <SystemsActionStage progress={progress} />

          {/* Chapters 7 & 8: SYSTEMS Capability Reveal */}
          <SystemsCapabilityReveal progress={progress} />

          {/* Bottom Handoff Anchor for Scene 11 (EntireFM) */}
          <div className="absolute bottom-0 inset-x-0 z-30 flex items-center justify-between border-t border-avorria-line/40 pt-4 font-mono text-[10px] sm:text-xs text-avorria-quiet uppercase tracking-widest p-6 sm:p-12 lg:p-16">
            <div className="text-avorria-white">
              {progress >= 0.94 ? "FACILITIES WORKFLOW // ENTIREFM" : "OPERATIONAL LEVERAGE"}
            </div>
            <div className="text-avorria-signal">
              10 / 18
            </div>
          </div>
        </>
      )}
    </CinematicSceneViewport>
  );
}
