"use client";
import React, { useRef } from "react";
import { NestIQPropertyStage } from "./nestiq/NestIQPropertyStage";
import { NestIQContextStage } from "./nestiq/NestIQContextStage";
import { NestIQSpatialMapStage } from "./nestiq/NestIQSpatialMapStage";
import { NestIQDecisionStage } from "./nestiq/NestIQDecisionStage";
import { NestIQContributionStage } from "./nestiq/NestIQContributionStage";
import { NestIQFallback } from "./nestiq/NestIQFallback";
import { CinematicSceneViewport } from "./CinematicSceneViewport";
import { getSceneConfig } from "./registry";

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

    // 0.00 - 0.26: Property Hero (Move -> Land -> Hold -> Exit)
    if (propertyContainerRef.current) {
      timeline.fromTo(
        propertyContainerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.08 },
        0
      );
      // Hold 0.08 - 0.20
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
        { scale: 1.04, duration: 0.24 },
        0
      );
    }

    // 0.26 - 0.48: Context Engine
    if (contextContainerRef.current) {
      timeline.fromTo(
        contextContainerRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.08 },
        0.26
      );
      // Hold 0.34 - 0.42
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
        { width: "100%", duration: 0.12 },
        0.28
      );
    }

    // 0.48 - 0.70: Spatial 3D Map
    if (spatialContainerRef.current) {
      timeline.fromTo(
        spatialContainerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.08 },
        0.48
      );
      // Hold 0.56 - 0.64
      timeline.to(
        spatialContainerRef.current,
        { opacity: 0, duration: 0.06 },
        0.66
      );
    }
    if (spatialInnerRef.current) {
      timeline.fromTo(
        spatialInnerRef.current,
        { rotateX: 0, scale: 1.0 },
        { rotateX: 24, scale: 1.10, duration: 0.20 },
        0.48
      );
    }
    if (spatialAnnotationRef.current) {
      timeline.fromTo(
        spatialAnnotationRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.06 },
        0.52
      );
      timeline.to(
        spatialAnnotationRef.current,
        { opacity: 0, duration: 0.04 },
        0.64
      );
    }

    // 0.70 - 0.86: Decision Platform
    if (decisionContainerRef.current) {
      timeline.fromTo(
        decisionContainerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.06 },
        0.70
      );
      // Hold 0.76 - 0.82
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
      <div className="w-full h-full relative overflow-hidden flex flex-col justify-between p-6 sm:p-12 lg:p-16">
        {/* Semantic Accessibility Heading */}
        <h2 className="sr-only">NestIQ — Property Intelligence and Spatial Data engineered by Avorria</h2>

        {/* Top Minimal Scene Marker */}
        <div className="absolute top-0 inset-x-0 z-30 flex items-center justify-between font-mono text-[10px] sm:text-xs uppercase tracking-widest text-avorria-quiet p-6 sm:p-12 lg:p-16">
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
          className="absolute bottom-0 inset-x-0 z-30 flex items-center justify-between border-t border-avorria-line/40 pt-4 font-mono text-[10px] sm:text-xs text-avorria-quiet uppercase tracking-widest p-6 sm:p-12 lg:p-16"
        >
          <div className="text-avorria-white">
            TECHNICAL ARCHITECTURE // SEARCH
          </div>
          <div className="text-avorria-signal">
            07 / 18
          </div>
        </div>
      </div>
    </CinematicSceneViewport>
  );
}
