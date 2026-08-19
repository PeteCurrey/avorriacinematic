"use client";
import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { AlkotaFallback } from "./alkota/AlkotaFallback";
import { CinematicSceneViewport } from "./CinematicSceneViewport";
import { CinematicMediaFrame } from "@/components/cinematic/CinematicMediaFrame";
import { getSceneConfig } from "./registry";

/**
 * SCENE 03 — ALKOTA BIKES (001 / CLIENT WORK)
 *
 * SIMPLIFIED EDITORIAL SEQUENCE:
 * 1. ACTUAL ALKOTA WEBSITE TAKEOVER (0.00 – 0.44) -> Lands 0.00-0.08, Holds stationary 0.08-0.36
 * 2. NAKED CARBON MOUNTAIN BIKE PRODUCT (0.44 – 0.80) -> Lands 0.44-0.52, Holds stationary 0.52-0.74
 * 3. AVORRIA CONTRIBUTION & CASE STUDY CTA (0.80 – 0.94) -> Holds stationary 0.84-0.94
 * 4. Handoff to Breath (0.94 – 1.00)
 */
export function Scene03Alkota() {
  const config = getSceneConfig("scene-03-alkota")!;

  const siteContainerRef = useRef<HTMLDivElement>(null);
  const siteInnerRef = useRef<HTMLDivElement>(null);
  const bikeContainerRef = useRef<HTMLDivElement>(null);
  const bikeInnerRef = useRef<HTMLDivElement>(null);
  const contributionRef = useRef<HTMLDivElement>(null);
  const nextHandoffRef = useRef<HTMLDivElement>(null);

  const buildTimeline = (timeline: gsap.core.Timeline) => {
    timeline.addLabel("entry", 0);
    timeline.addLabel("website_hold", 0.08);
    timeline.addLabel("bike_entry", 0.44);
    timeline.addLabel("bike_hold", 0.52);
    timeline.addLabel("contribution", 0.80);
    timeline.addLabel("handoff", 0.94);

    // 1. ACTUAL ALKOTA WEBSITE CAPTURE (0.00 - 0.44)
    if (siteContainerRef.current) {
      timeline.fromTo(
        siteContainerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.08 },
        0
      );
      // Stable hold 0.08 - 0.36
      timeline.to(
        siteContainerRef.current,
        { opacity: 0, duration: 0.08 },
        0.36
      );
    }
    if (siteInnerRef.current) {
      timeline.fromTo(
        siteInnerRef.current,
        { scale: 0.98 },
        { scale: 1.0, duration: 0.08 },
        0
      );
    }

    // 2. NAKED CARBON BIKE HERO (0.44 - 0.80)
    if (bikeContainerRef.current) {
      timeline.fromTo(
        bikeContainerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.08 },
        0.44
      );
      // Stable hold 0.52 - 0.74
      timeline.to(
        bikeContainerRef.current,
        { opacity: 0, duration: 0.06 },
        0.74
      );
    }
    if (bikeInnerRef.current) {
      timeline.fromTo(
        bikeInnerRef.current,
        { scale: 0.98 },
        { scale: 1.0, duration: 0.08 },
        0.44
      );
    }

    // 3. AVORRIA CONTRIBUTION & CASE STUDY CTA (0.80 - 0.94)
    if (contributionRef.current) {
      timeline.fromTo(
        contributionRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.06 },
        0.80
      );
      // Stable hold 0.86 - 0.94
      timeline.to(
        contributionRef.current,
        { opacity: 0, y: -10, duration: 0.04 },
        0.94
      );
    }

    // 4. Philosophy Handoff (0.94 - 1.00)
    if (nextHandoffRef.current) {
      timeline.fromTo(
        nextHandoffRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.04 },
        0.94
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
        {/* Semantic Heading */}
        <h2 className="sr-only">Alkota Bikes — Digital Flagship Platform and Performance Brand by Avorria</h2>

        {/* 1. ACTUAL ALKOTA WEBSITE TAKEOVER */}
        <div
          ref={siteContainerRef}
          className="absolute inset-0 w-full h-full z-10 pointer-events-none opacity-0"
          aria-hidden="false"
        >
          <div ref={siteInnerRef} className="relative w-full h-full">
            {/* Desktop Website Capture */}
            <Image
              src="/media/projects/alkota/interface/homepage-desktop.png"
              alt="Alkota Cycles website homepage designed and developed by Avorria"
              fill
              priority
              className="hidden sm:block object-cover object-top"
            />
            {/* Mobile Website Capture */}
            <Image
              src="/media/projects/alkota/interface/homepage-mobile.png"
              alt="Alkota Cycles mobile website designed and developed by Avorria"
              fill
              priority
              className="sm:hidden object-cover object-top"
            />

            {/* Restrained Avorria Client Work Instrumentation */}
            <div className="absolute top-6 left-6 sm:left-12 right-6 sm:right-12 flex items-center justify-between font-mono text-xs uppercase tracking-widest text-avorria-white bg-avorria-black/60 backdrop-blur-md px-4 py-2 border border-white/10 z-20">
              <span className="text-avorria-signal">001 / ALKOTA</span>
              <span className="text-avorria-white font-medium">CLIENT WORK</span>
            </div>

            <div className="absolute bottom-6 left-6 sm:left-12 right-6 sm:right-12 flex items-center justify-between font-mono text-xs uppercase tracking-widest text-avorria-white bg-avorria-black/60 backdrop-blur-md px-4 py-2 border border-white/10 z-20">
              <span className="text-avorria-muted">WEB DESIGN / DIGITAL PRODUCT / LUXURY COMMERCE</span>
              <Link
                href="/work/alkota-bikes"
                className="text-avorria-signal hover:underline pointer-events-auto"
              >
                VIEW CASE STUDY →
              </Link>
            </div>
          </div>
        </div>

        {/* 2. THE MACHINE / NAKED CARBON BIKE */}
        <CinematicMediaFrame
          src="/media/projects/alkota/product/naked-carbon-hero.jpg"
          alt="Alkota Project 01 Naked Carbon Mountain Bike"
          mode="LANDSCAPE"
          fit="cover"
          desktopFocal={{ x: 50, y: 48 }}
          mobileFocal={{ x: 45, y: 50 }}
          containerRef={bikeContainerRef}
          innerRef={bikeInnerRef}
        >
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] sm:text-xs uppercase tracking-widest text-avorria-quiet z-20">
            <span className="text-avorria-signal">001 / THE PRODUCT</span>
            <span className="text-avorria-white">NAKED CARBON // CHASSIS</span>
          </div>
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] sm:text-xs uppercase tracking-widest text-avorria-quiet z-20 border-t border-avorria-line/30 pt-2">
            <span>PRE-PRODUCTION CARBON DEVELOPMENT</span>
            <span className="text-avorria-white">001 // ALKOTA BIKES</span>
          </div>
        </CinematicMediaFrame>

        {/* 3. AVORRIA CONTRIBUTION & CASE STUDY CTA */}
        <div
          ref={contributionRef}
          className="absolute inset-x-6 sm:inset-x-16 max-w-4xl mx-auto flex flex-col gap-6 bg-avorria-surface/90 border border-avorria-line p-8 sm:p-12 backdrop-blur-md z-20 opacity-0"
        >
          <div className="font-mono text-xs text-avorria-signal uppercase tracking-widest">
            001 / ALKOTA // CLIENT WORK
          </div>
          <div className="display-lg text-avorria-white">
            Digital flagship for a bespoke high-performance carbon bicycle brand.
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-avorria-line pt-6">
            <div className="font-mono text-xs uppercase tracking-widest text-avorria-muted">
              WEB / PRODUCT / UX / DEVELOPMENT
            </div>
            <Link
              href="/work/alkota-bikes"
              className="inline-flex items-center gap-3 font-mono text-xs text-avorria-signal uppercase tracking-widest hover:underline"
            >
              <span>VIEW CASE STUDY</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* 4. Bottom Philosophy Marker */}
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
