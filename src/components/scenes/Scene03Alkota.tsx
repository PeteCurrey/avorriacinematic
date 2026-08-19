"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { AlkotaMaterialStage } from "./alkota/AlkotaMaterialStage";
import { AlkotaProductStage } from "./alkota/AlkotaProductStage";
import { AlkotaDigitalStage } from "./alkota/AlkotaDigitalStage";
import { AlkotaContributionStage } from "./alkota/AlkotaContributionStage";
import { AlkotaFallback } from "./alkota/AlkotaFallback";
import { CinematicSceneViewport } from "./CinematicSceneViewport";
import { getSceneConfig } from "./registry";

export function Scene03Alkota() {
  const config = getSceneConfig("scene-03-alkota")!;

  // Refs for declarative GSAP timeline orchestration
  const handoffRef = useRef<HTMLDivElement>(null);
  const macroRef = useRef<HTMLDivElement>(null);
  const kinematicsRef = useRef<HTMLDivElement>(null);
  const materialAnnotationRef = useRef<HTMLDivElement>(null);
  const productContainerRef = useRef<HTMLDivElement>(null);
  const productImageRef = useRef<HTMLDivElement>(null);
  const productCopyRef = useRef<HTMLDivElement>(null);
  const digitalContainerRef = useRef<HTMLDivElement>(null);
  const scanLineRef = useRef<HTMLDivElement>(null);
  const contributionContainerRef = useRef<HTMLDivElement>(null);
  const nextHandoffRef = useRef<HTMLDivElement>(null);

  const buildTimeline = (timeline: gsap.core.Timeline) => {
    // Stage Timeline Labels & Non-Overlapping Orchestration
    timeline.addLabel("entry", 0);
    timeline.addLabel("carbon_material", 0.08);
    timeline.addLabel("engineering", 0.30);
    timeline.addLabel("product_hero", 0.52);
    timeline.addLabel("digital_flagship", 0.73);
    timeline.addLabel("contribution", 0.90);
    timeline.addLabel("handoff", 0.96);

    // 0.00 - 0.08: Handoff from Signal fades out cleanly
    if (handoffRef.current) {
      timeline.fromTo(
        handoffRef.current,
        { opacity: 1 },
        { opacity: 0, duration: 0.08 },
        0
      );
    }

    // 0.08 - 0.30: Carbon Material Macro (Move -> Land -> Hold -> Exit)
    if (macroRef.current) {
      timeline.fromTo(
        macroRef.current,
        { opacity: 0, scale: 1.0 },
        { opacity: 1, scale: 1.08, duration: 0.12 },
        0.08
      );
      // Hold 0.20 - 0.28
      timeline.to(
        macroRef.current,
        { opacity: 0, scale: 1.15, duration: 0.06 },
        0.28
      );
    }

    if (materialAnnotationRef.current) {
      timeline.fromTo(
        materialAnnotationRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.08 },
        0.12
      );
      timeline.to(
        materialAnnotationRef.current,
        { opacity: 0, y: -10, duration: 0.06 },
        0.46
      );
    }

    // 0.30 - 0.50: Kinematics Engineering (Move -> Land -> Hold -> Exit)
    if (kinematicsRef.current) {
      timeline.fromTo(
        kinematicsRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.10 },
        0.30
      );
      // Hold 0.40 - 0.46
      timeline.to(
        kinematicsRef.current,
        { opacity: 0, duration: 0.06 },
        0.48
      );
    }

    // 0.52 - 0.72: Complete Product Hero (Move -> Land -> Hold -> Exit)
    if (productContainerRef.current) {
      timeline.fromTo(
        productContainerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.07 },
        0.52
      );
      // Hold 0.59 - 0.68 (stationary)
      timeline.to(
        productContainerRef.current,
        { opacity: 0, duration: 0.05 },
        0.68
      );
    }
    if (productImageRef.current) {
      timeline.fromTo(
        productImageRef.current,
        { scale: 0.96 },
        { scale: 1.02, duration: 0.07 },
        0.52
      );
    }

    // 0.73 - 0.89: Digital Flagship Interface & Scan
    if (digitalContainerRef.current) {
      timeline.fromTo(
        digitalContainerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.07 },
        0.73
      );
      // Hold 0.80 - 0.86
      timeline.to(
        digitalContainerRef.current,
        { opacity: 0, duration: 0.05 },
        0.87
      );
    }
    if (scanLineRef.current) {
      timeline.fromTo(
        scanLineRef.current,
        { left: "0%", opacity: 0 },
        { opacity: 1, duration: 0.02 },
        0.75
      );
      timeline.to(
        scanLineRef.current,
        { left: "100%", duration: 0.10 },
        0.75
      );
      timeline.to(
        scanLineRef.current,
        { opacity: 0, duration: 0.02 },
        0.85
      );
    }

    // 0.90 - 0.96: Avorria Delivered Contribution
    if (contributionContainerRef.current) {
      timeline.fromTo(
        contributionContainerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.05 },
        0.90
      );
      timeline.to(
        contributionContainerRef.current,
        { opacity: 0, y: -15, duration: 0.03 },
        0.96
      );
    }

    // 0.96 - 1.00: Philosophy / Breath Handoff Marker
    if (nextHandoffRef.current) {
      timeline.fromTo(
        nextHandoffRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.03 },
        0.96
      );
    }
  };

  return (
    <CinematicSceneViewport
      config={config}
      sceneIndex={3}
      fallback={<AlkotaFallback />}
      buildTimeline={buildTimeline}
    >
      <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
        {/* Semantic Accessibility Heading */}
        <h2 className="sr-only">Alkota Bikes — Product, Brand and Digital Engineering by Avorria</h2>

        {/* Chapter 0: Continuous Handoff from Scene 02 */}
        <div
          ref={handoffRef}
          className="absolute inset-0 w-full h-full z-0 pointer-events-none"
          aria-hidden="true"
        >
          <Image
            src="/media/projects/alkota/product/naked-carbon-hero.jpg"
            alt="Alkota Naked Carbon Master Entry"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Chapter A & B: Material Macro & Engineering Kinematics */}
        <AlkotaMaterialStage
          macroRef={macroRef}
          kinematicsRef={kinematicsRef}
          annotationRef={materialAnnotationRef}
        />

        {/* Chapter C: The Object / Product Hero */}
        <AlkotaProductStage
          containerRef={productContainerRef}
          imageRef={productImageRef}
          copyRef={productCopyRef}
        />

        {/* Chapter D: Physical to Digital Transformation */}
        <AlkotaDigitalStage
          containerRef={digitalContainerRef}
          scanLineRef={scanLineRef}
        />

        {/* Chapter E: Avorria Contribution & Case Study Link */}
        <AlkotaContributionStage
          containerRef={contributionContainerRef}
        />

        {/* Bottom Handoff Anchor for Scene 04 */}
        <div
          ref={nextHandoffRef}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 font-mono text-[11px] text-avorria-quiet uppercase tracking-widest z-30 opacity-0 pointer-events-none"
          aria-hidden="true"
        >
          <span>PHILOSOPHY // 04</span>
        </div>
      </div>
    </CinematicSceneViewport>
  );
}
