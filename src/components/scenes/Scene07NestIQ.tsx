"use client";
import React, { useRef } from "react";
import { NestIQPropertyStage } from "./nestiq/NestIQPropertyStage";
import { NestIQContextStage } from "./nestiq/NestIQContextStage";
import { NestIQSpatialMapStage } from "./nestiq/NestIQSpatialMapStage";
import { NestIQDecisionStage } from "./nestiq/NestIQDecisionStage";
import { NestIQContributionStage } from "./nestiq/NestIQContributionStage";
import { NestIQFallback } from "./nestiq/NestIQFallback";
import { CinematicSceneViewport } from "./CinematicSceneViewport";
import { SceneSafeFrame } from "./SceneSafeFrame";
import { getSceneConfig } from "./registry";

/**
 * SCENE 07 — NESTIQ (PROJECT 003)
 *
 * Fixed motion contract:
 * - Property image scale completes within 0.00 - 0.07, holds stationary 0.07 - 0.22, exits 0.22 - 0.28
 * - Spatial 3D rotation completes within 0.48 - 0.56, holds stationary 0.56 - 0.66, exits 0.66 - 0.72
 */
export function Scene07NestIQ() {
  const config = getSceneConfig("scene-07-nestiq")!;

  const propertyContainerRef = useRef<HTMLDivElement>(null);
  const propertyImageRef = useRef<HTMLDivElement>(null);
  const contextContainerRef = useRef<HTMLDivElement>(null);
  const contextLineRef = useRef<HTMLDivElement>(null);
  const spatialContainerRef = useRef<HTMLDivElement>(null);
  const spatialInnerRef = useRef<HTMLDivElement>(null);
  const spatialAnnotationRef = useRef<HTMLDivElement>(null);
  const decisionContainerRef = useRef<HTMLDivElement>(null);
  const contributionContainerRef = useRef<HTMLDivElement>(null);
  const footerMarkerRef = useRef<HTMLDivElement>(null);

  const buildTimeline = (timeline: gsap.core.Timeline) => {
    timeline.addLabel("entry", 0);
    timeline.addLabel("property", 0.08);
    timeline.addLabel("context", 0.28);
    timeline.addLabel("spatial", 0.50);
    timeline.addLabel("decision", 0.72);
    timeline.addLabel("contribution", 0.88);
    timeline.addLabel("handoff", 0.96);

    // 0.00 - 0.28: Property Hero (Move -> Land -> Hold -> Exit)
    if (propertyContainerRef.current) {
      timeline.fromTo(
        propertyContainerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.07 },
        0
      );
      // Hold stationary 0.07 - 0.22
      timeline.to(
        propertyContainerRef.current,
        { opacity: 0, duration: 0.06 },
        0.22
      );
    }
    if (propertyImageRef.current) {
      timeline.fromTo(
        propertyImageRef.current,
        { scale: 0.98 },
        { scale: 1.0, duration: 0.07 },
        0
      );
    }

    // 0.28 - 0.48: Context Engine
    if (contextContainerRef.current) {
      timeline.fromTo(
        contextContainerRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.08 },
        0.28
      );
      // Hold 0.36 - 0.42
      timeline.to(
        contextContainerRef.current,
        { opacity: 0, y: -15, duration: 0.06 },
        0.44
      );
    }
    if (contextLineRef.current) {
      timeline.fromTo(
        contextLineRef.current,
        { width: "0%" },
        { width: "100%", duration: 0.10 },
        0.30
      );
    }

    // 0.48 - 0.72: Spatial 3D Map
    if (spatialContainerRef.current) {
      timeline.fromTo(
        spatialContainerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.08 },
        0.48
      );
      // Hold stationary 0.56 - 0.66
      timeline.to(
        spatialContainerRef.current,
        { opacity: 0, duration: 0.06 },
        0.66
      );
    }
    if (spatialInnerRef.current) {
      // Rotation completes early at 0.56, then holds static
      timeline.fromTo(
        spatialInnerRef.current,
        { rotateX: 0, scale: 1.0 },
        { rotateX: 20, scale: 1.05, duration: 0.08 },
        0.48
      );
    }
    if (spatialAnnotationRef.current) {
      timeline.fromTo(
        spatialAnnotationRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.06 },
        0.50
      );
      timeline.to(
        spatialAnnotationRef.current,
        { opacity: 0, duration: 0.04 },
        0.64
      );
    }

    // 0.72 - 0.86: Decision Platform
    if (decisionContainerRef.current) {
      timeline.fromTo(
        decisionContainerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.06 },
        0.72
      );
      // Hold 0.78 - 0.82
      timeline.to(
        decisionContainerRef.current,
        { opacity: 0, duration: 0.04 },
        0.84
      );
    }

    // 0.86 - 0.95: Contribution
    if (contributionContainerRef.current) {
      timeline.fromTo(
        contributionContainerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.05 },
        0.86
      );
      timeline.to(
        contributionContainerRef.current,
        { opacity: 0, y: -15, duration: 0.04 },
        0.95
      );
    }

    // 0.94 - 1.00: Bottom Marker
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
      sceneIndex={7}
      fallback={<NestIQFallback />}
      buildTimeline={buildTimeline}
    >
      <SceneSafeFrame>
        {/* Semantic Accessibility Heading */}
        <h2 className="sr-only">NestIQ — Property Intelligence and Spatial Data engineered by Avorria</h2>

        {/* Top Minimal Scene Marker */}
        <div className="flex items-center justify-between font-mono text-[10px] sm:text-xs uppercase tracking-widest text-avorria-quiet z-30">
          <span className="text-avorria-signal">003 / NESTIQ</span>
          <span className="text-avorria-white">PROPERTY INTELLIGENCE // 07</span>
        </div>

        {/* Chapters 1 & 2: Property Hero & Intelligence Lens */}
        <NestIQPropertyStage
          containerRef={propertyContainerRef}
          imageRef={propertyImageRef}
        />

        {/* Chapter 3: Contextual Signal Extension */}
        <NestIQContextStage
          containerRef={contextContainerRef}
          lineRef={contextLineRef}
        />

        {/* Chapters 4 & 5: Spatial Map & 3D Landscape */}
        <NestIQSpatialMapStage
          containerRef={spatialContainerRef}
          innerRef={spatialInnerRef}
          annotationRef={spatialAnnotationRef}
        />

        {/* Chapter 6: Decision Intelligence & Product UI */}
        <NestIQDecisionStage
          containerRef={decisionContainerRef}
        />

        {/* Chapter 7: Avorria Contribution & Case Study Link */}
        <NestIQContributionStage
          containerRef={contributionContainerRef}
        />

        {/* Bottom Handoff Anchor for Scene 08 */}
        <div
          ref={footerMarkerRef}
          className="flex items-center justify-between border-t border-avorria-line/40 pt-4 font-mono text-[10px] sm:text-xs text-avorria-quiet uppercase tracking-widest z-30"
        >
          <div className="text-avorria-white">
            TECHNICAL ARCHITECTURE // SEARCH
          </div>
          <div className="text-avorria-signal">
            07 / 18
          </div>
        </div>
      </SceneSafeFrame>
    </CinematicSceneViewport>
  );
}
