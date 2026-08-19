"use client";
import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { CareerOSFallback } from "./careeros/CareerOSFallback";
import { CinematicSceneViewport } from "./CinematicSceneViewport";
import { SceneSafeFrame } from "./SceneSafeFrame";
import { CinematicMediaFrame } from "@/components/cinematic/CinematicMediaFrame";
import { getSceneConfig } from "./registry";

/**
 * SCENE 05 — CAREEROS (002 / AVORRIA VENTURE)
 *
 * SIMPLIFIED TEASER MODEL:
 * 1. Human / Career World Composition (0.00 – 0.50) -> Lands 0.00-0.08, Holds stationary 0.08-0.42
 * 2. Career Vector / Platform Intelligence (0.50 – 0.82) -> Lands 0.50-0.56, Holds stationary 0.56-0.76
 * 3. Venture Contribution & Case Study Link (0.80 – 0.94) -> Holds stationary 0.84-0.94
 */
export function Scene05CareerOS() {
  const config = getSceneConfig("scene-05-careeros")!;

  const humanContainerRef = useRef<HTMLDivElement>(null);
  const humanImageRef = useRef<HTMLDivElement>(null);
  const worldContainerRef = useRef<HTMLDivElement>(null);
  const contributionContainerRef = useRef<HTMLDivElement>(null);
  const footerMarkerRef = useRef<HTMLDivElement>(null);

  const buildTimeline = (timeline: gsap.core.Timeline) => {
    timeline.addLabel("entry", 0);
    timeline.addLabel("human_hold", 0.08);
    timeline.addLabel("world_entry", 0.50);
    timeline.addLabel("world_hold", 0.56);
    timeline.addLabel("contribution", 0.80);
    timeline.addLabel("handoff", 0.94);

    // 1. Human Portrait Stage (0.00 - 0.48)
    if (humanContainerRef.current) {
      timeline.fromTo(
        humanContainerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.08 },
        0
      );
      // Stable hold 0.08 - 0.42
      timeline.to(
        humanContainerRef.current,
        { opacity: 0, duration: 0.06 },
        0.44
      );
    }
    if (humanImageRef.current) {
      timeline.fromTo(
        humanImageRef.current,
        { scale: 0.98 },
        { scale: 1.0, duration: 0.08 },
        0
      );
    }

    // 2. Platform / World Canvas Stage (0.50 - 0.80)
    if (worldContainerRef.current) {
      timeline.fromTo(
        worldContainerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.06 },
        0.50
      );
      // Stable hold 0.56 - 0.74
      timeline.to(
        worldContainerRef.current,
        { opacity: 0, duration: 0.06 },
        0.76
      );
    }

    // 3. Contribution & Case Study Link (0.80 - 0.94)
    if (contributionContainerRef.current) {
      timeline.fromTo(
        contributionContainerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.06 },
        0.80
      );
      timeline.to(
        contributionContainerRef.current,
        { opacity: 0, y: -10, duration: 0.04 },
        0.94
      );
    }

    // 4. Footer marker (0.94 - 1.00)
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
      sceneIndex={5}
      fallback={<CareerOSFallback />}
      buildTimeline={buildTimeline}
    >
      <SceneSafeFrame>
        {/* Semantic Accessibility Heading */}
        <h2 className="sr-only">CareerOS — Autonomous Career Orchestration Platform engineered by Avorria</h2>

        {/* Top Minimal Scene Marker */}
        <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-avorria-quiet z-30">
          <span className="text-avorria-signal">002 / CAREEROS</span>
          <span className="text-avorria-white font-medium">AVORRIA VENTURE</span>
        </div>

        {/* Stage 1: Human Intelligence Portrait */}
        <CinematicMediaFrame
          src="/media/projects/careeros/hero/woman_looking_into_camera_lens.jpeg"
          alt="CareerOS Human Intelligence User Portrait"
          mode="PORTRAIT_SPLIT"
          fit="cover"
          desktopFocal={{ x: 50, y: 35 }}
          mobileFocal={{ x: 50, y: 30 }}
          containerRef={humanContainerRef}
          innerRef={humanImageRef}
          className="!justify-end !items-center"
        >
          <div className="absolute top-4 left-4 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-avorria-quiet z-20">
            <span>002 // HUMAN INTELLIGENCE</span>
          </div>
        </CinematicMediaFrame>

        {/* Stage 2: Product World Canvas */}
        <div
          ref={worldContainerRef}
          className="absolute inset-0 w-full h-full flex items-center justify-center p-6 sm:p-12 pointer-events-none opacity-0"
        >
          <div className="relative w-full max-w-[min(88vw,1440px)] h-[min(72dvh,820px)] overflow-hidden">
            <Image
              src="/media/projects/careeros/hero/hero_career_world_desktop.jpg"
              alt="CareerOS Product World Canvas"
              fill
              className="object-cover"
            />
            <div className="absolute top-4 left-4 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-avorria-signal z-20">
              <span>002 // AI CAREER TWIN ENGINE</span>
            </div>
          </div>
        </div>

        {/* Stage 3: Venture Contribution & Case Study Link */}
        <div
          ref={contributionContainerRef}
          className="absolute inset-x-6 sm:inset-x-16 max-w-4xl mx-auto flex flex-col gap-6 bg-avorria-surface/90 border border-avorria-line p-8 sm:p-12 backdrop-blur-md z-30 opacity-0"
        >
          <div className="font-mono text-xs text-avorria-signal uppercase tracking-widest">
            002 / CAREEROS // AVORRIA VENTURE
          </div>
          <div className="display-lg text-avorria-white">
            Autonomous talent acceleration platform and intelligent Career Twin workflow.
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-avorria-line pt-6">
            <div className="font-mono text-xs uppercase tracking-widest text-avorria-muted">
              AI SYSTEMS / PRODUCT DESIGN / UX ARCHITECTURE
            </div>
            <Link
              href="/work/careeros"
              className="inline-flex items-center gap-3 font-mono text-xs text-avorria-signal uppercase tracking-widest hover:underline"
            >
              <span>VIEW CASE STUDY</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* Bottom Handoff Anchor */}
        <div
          ref={footerMarkerRef}
          className="flex items-center justify-between border-t border-avorria-line/40 pt-4 font-mono text-[10px] sm:text-xs text-avorria-quiet uppercase tracking-widest z-30"
        >
          <div className="text-avorria-white">
            DIGITAL PRODUCTS // BUILD
          </div>
          <div className="text-avorria-signal">
            05 / 18
          </div>
        </div>
      </SceneSafeFrame>
    </CinematicSceneViewport>
  );
}
