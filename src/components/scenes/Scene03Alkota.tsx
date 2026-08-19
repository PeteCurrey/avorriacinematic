"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { AlkotaMaterialStage } from "./alkota/AlkotaMaterialStage";
import { AlkotaProductStage } from "./alkota/AlkotaProductStage";
import { AlkotaDigitalStage } from "./alkota/AlkotaDigitalStage";
import { AlkotaContributionStage } from "./alkota/AlkotaContributionStage";
import { AlkotaFallback } from "./alkota/AlkotaFallback";
import { CinematicSceneViewport } from "./CinematicSceneViewport";
import { CinematicMediaFrame } from "@/components/cinematic/CinematicMediaFrame";
import { getSceneConfig } from "./registry";

/**
 * SCENE 03 — ALKOTA BIKES (PROJECT 001)
 *
 * THE FIRST PROJECT A VISITOR SEES.
 *
 * Storytelling order:
 * 1. COMPLETE NAKED CARBON BIKE FIRST (0.00 - 0.24) — LANDS, HOLDS STATIONARY
 * 2. Carbon / Material Macro (0.24 - 0.44)
 * 3. Engineering Kinematics (0.44 - 0.60)
 * 4. Digital Flagship Website Experience & Scan (0.60 - 0.82)
 * 5. Avorria Contribution (0.82 - 0.94)
 * 6. Philosophy / Breath Handoff (0.94 - 1.00)
 */
export function Scene03Alkota() {
  const config = getSceneConfig("scene-03-alkota")!;

  // Refs for declarative GSAP timeline orchestration
  const bikeHeroContainerRef = useRef<HTMLDivElement>(null);
  const bikeHeroImageRef = useRef<HTMLDivElement>(null);
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
    timeline.addLabel("entry", 0);
    timeline.addLabel("complete_bike", 0.04);
    timeline.addLabel("carbon_material", 0.24);
    timeline.addLabel("engineering", 0.44);
    timeline.addLabel("digital_flagship", 0.62);
    timeline.addLabel("contribution", 0.84);
    timeline.addLabel("handoff", 0.95);

    // 0.00 - 0.24: COMPLETE MACHINE FIRST (Move -> Land -> Hold -> Exit)
    if (bikeHeroContainerRef.current) {
      timeline.fromTo(
        bikeHeroContainerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.08 },
        0
      );
      // Hold stationary 0.08 - 0.20
      timeline.to(
        bikeHeroContainerRef.current,
        { opacity: 0, duration: 0.05 },
        0.20
      );
    }
    if (bikeHeroImageRef.current) {
      timeline.fromTo(
        bikeHeroImageRef.current,
        { scale: 0.98 },
        { scale: 1.0, duration: 0.08 },
        0
      );
    }

    // 0.24 - 0.44: Carbon Material Macro
    if (macroRef.current) {
      timeline.fromTo(
        macroRef.current,
        { opacity: 0, scale: 1.0 },
        { opacity: 1, scale: 1.04, duration: 0.08 },
        0.24
      );
      // Hold stationary 0.32 - 0.40
      timeline.to(
        macroRef.current,
        { opacity: 0, duration: 0.04 },
        0.40
      );
    }
    if (materialAnnotationRef.current) {
      timeline.fromTo(
        materialAnnotationRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.06 },
        0.26
      );
      timeline.to(
        materialAnnotationRef.current,
        { opacity: 0, y: -10, duration: 0.04 },
        0.40
      );
    }

    // 0.44 - 0.62: Kinematics Engineering
    if (kinematicsRef.current) {
      timeline.fromTo(
        kinematicsRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.06 },
        0.44
      );
      // Hold 0.50 - 0.58
      timeline.to(
        kinematicsRef.current,
        { opacity: 0, duration: 0.04 },
        0.58
      );
    }

    // 0.62 - 0.84: Digital Flagship Interface & Scan
    if (digitalContainerRef.current) {
      timeline.fromTo(
        digitalContainerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.06 },
        0.62
      );
      // Hold 0.68 - 0.80
      timeline.to(
        digitalContainerRef.current,
        { opacity: 0, duration: 0.04 },
        0.80
      );
    }
    if (scanLineRef.current) {
      timeline.fromTo(
        scanLineRef.current,
        { left: "0%", opacity: 0 },
        { opacity: 1, duration: 0.02 },
        0.64
      );
      timeline.to(
        scanLineRef.current,
        { left: "100%", duration: 0.12 },
        0.64
      );
      timeline.to(
        scanLineRef.current,
        { opacity: 0, duration: 0.02 },
        0.78
      );
    }

    // 0.84 - 0.95: Avorria Delivered Contribution
    if (contributionContainerRef.current) {
      timeline.fromTo(
        contributionContainerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.05 },
        0.84
      );
      timeline.to(
        contributionContainerRef.current,
        { opacity: 0, y: -15, duration: 0.03 },
        0.95
      );
    }

    // 0.95 - 1.00: Philosophy / Breath Handoff Marker
    if (nextHandoffRef.current) {
      timeline.fromTo(
        nextHandoffRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.03 },
        0.95
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

        {/* Chapter 1: COMPLETE NAKED CARBON MACHINE (THE FIRST PROJECT IMAGE) */}
        <CinematicMediaFrame
          src="/media/projects/alkota/product/naked-carbon-hero.jpg"
          alt="Alkota Project 01 Naked Carbon Mountain Bike"
          mode="LANDSCAPE"
          fit="cover"
          desktopFocal={{ x: 50, y: 48 }}
          mobileFocal={{ x: 45, y: 50 }}
          priority
          containerRef={bikeHeroContainerRef}
          innerRef={bikeHeroImageRef}
        >
          {/* Restrained Project Context Instrumentation */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] sm:text-xs uppercase tracking-widest text-avorria-quiet z-20">
            <span className="text-avorria-signal">001 / ALKOTA</span>
            <span className="text-avorria-white">SELECTED WORK // DIGITAL FLAGSHIP</span>
          </div>
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] sm:text-xs uppercase tracking-widest text-avorria-quiet z-20 border-t border-avorria-line/30 pt-2">
            <span>PRE-PRODUCTION CARBON DEVELOPMENT</span>
            <span className="text-avorria-white">001 // THE MACHINE</span>
          </div>
        </CinematicMediaFrame>

        {/* Chapter 2: Material Macro */}
        <AlkotaMaterialStage
          macroRef={macroRef}
          kinematicsRef={kinematicsRef}
          annotationRef={materialAnnotationRef}
        />

        {/* Chapter 3: Physical to Digital Transformation */}
        <AlkotaDigitalStage
          containerRef={digitalContainerRef}
          scanLineRef={scanLineRef}
        />

        {/* Chapter 4: Avorria Contribution & Case Study Link */}
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
