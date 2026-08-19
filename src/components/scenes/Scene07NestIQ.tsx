"use client";
import React from "react";
import { CinematicSceneViewport } from "./CinematicSceneViewport";
import { NestIQPropertyStage } from "./nestiq/NestIQPropertyStage";
import { NestIQContextStage } from "./nestiq/NestIQContextStage";
import { NestIQSpatialMapStage } from "./nestiq/NestIQSpatialMapStage";
import { NestIQDecisionStage } from "./nestiq/NestIQDecisionStage";
import { NestIQContributionStage } from "./nestiq/NestIQContributionStage";
import { NestIQFallback } from "./nestiq/NestIQFallback";
import { getSceneConfig } from "./registry";

export function Scene07NestIQ() {
  const config = getSceneConfig("scene-07-nestiq")!;

  return (
    <CinematicSceneViewport
      config={config}
      sceneIndex={7}
      fallback={<NestIQFallback />}
    >
      {(progress) => (
        <>
          {/* Semantic Accessibility Heading */}
          <h2 className="sr-only">NestIQ — Property Intelligence and Spatial Data engineered by Avorria</h2>

          {/* Top Minimal Scene Marker */}
          <div className="absolute top-0 inset-x-0 z-30 flex items-center justify-between font-mono text-[10px] sm:text-xs uppercase tracking-widest text-avorria-quiet p-6 sm:p-12 lg:p-16">
            <span className="text-avorria-signal">003 / NESTIQ</span>
            <span className="text-avorria-white">PROPERTY INTELLIGENCE // 07</span>
          </div>

          {/* Chapters 1 & 2: Property Hero & Intelligence Lens */}
          <NestIQPropertyStage progress={progress} />

          {/* Chapter 3: Contextual Signal Extension */}
          <NestIQContextStage progress={progress} />

          {/* Chapters 4 & 5: Spatial Map & 3D Landscape */}
          <NestIQSpatialMapStage progress={progress} />

          {/* Chapter 6: Decision Intelligence & Product UI */}
          <NestIQDecisionStage progress={progress} />

          {/* Chapter 7: Avorria Contribution & Case Study Link */}
          <NestIQContributionStage progress={progress} />

          {/* Bottom Handoff Anchor for Scene 08 (Active during 0.94 - 1.00) */}
          <div className="absolute bottom-0 inset-x-0 z-30 flex items-center justify-between border-t border-avorria-line/40 pt-4 font-mono text-[10px] sm:text-xs text-avorria-quiet uppercase tracking-widest p-6 sm:p-12 lg:p-16">
            <div className="text-avorria-white">
              {progress >= 0.94 ? "TECHNICAL ARCHITECTURE // SEARCH" : "DATA BECOMES SPACE"}
            </div>
            <div className="text-avorria-signal">
              07 / 18
            </div>
          </div>
        </>
      )}
    </CinematicSceneViewport>
  );
}
