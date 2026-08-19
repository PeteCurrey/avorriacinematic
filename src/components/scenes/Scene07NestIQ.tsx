"use client";
import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { NestIQFallback } from "./nestiq/NestIQFallback";
import { CinematicSceneViewport } from "./CinematicSceneViewport";
import { SceneSafeFrame } from "./SceneSafeFrame";
import { CinematicMediaFrame } from "@/components/cinematic/CinematicMediaFrame";
import { getSceneConfig } from "./registry";

/**
 * SCENE 07 — NESTIQ (003 / AVORRIA VENTURE)
 *
 * SIMPLIFIED TEASER MODEL:
 * 1. Property Intelligence Dashboard (0.00 – 0.50) -> Lands 0.00-0.08, Holds stationary 0.08-0.42
 * 2. Spatial 3D Map / Context Analysis (0.50 – 0.80) -> Lands 0.50-0.56, Holds stationary 0.56-0.74
 * 3. Venture Contribution & Case Study Link (0.80 – 0.94) -> Holds stationary 0.84-0.94
 */
export function Scene07NestIQ() {
  const config = getSceneConfig("scene-07-nestiq")!;

  const dashboardContainerRef = useRef<HTMLDivElement>(null);
  const dashboardImageRef = useRef<HTMLDivElement>(null);
  const spatialContainerRef = useRef<HTMLDivElement>(null);
  const contributionContainerRef = useRef<HTMLDivElement>(null);
  const footerMarkerRef = useRef<HTMLDivElement>(null);

  const buildTimeline = (timeline: gsap.core.Timeline) => {
    timeline.addLabel("entry", 0);
    timeline.addLabel("dashboard_hold", 0.08);
    timeline.addLabel("spatial_entry", 0.50);
    timeline.addLabel("spatial_hold", 0.56);
    timeline.addLabel("contribution", 0.80);
    timeline.addLabel("handoff", 0.94);

    // 1. Dashboard Interface (0.00 - 0.48)
    if (dashboardContainerRef.current) {
      timeline.fromTo(
        dashboardContainerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.08 },
        0
      );
      // Stable hold 0.08 - 0.42
      timeline.to(
        dashboardContainerRef.current,
        { opacity: 0, duration: 0.06 },
        0.44
      );
    }
    if (dashboardImageRef.current) {
      timeline.fromTo(
        dashboardImageRef.current,
        { scale: 0.98 },
        { scale: 1.0, duration: 0.08 },
        0
      );
    }

    // 2. Spatial Context Stage (0.50 - 0.78)
    if (spatialContainerRef.current) {
      timeline.fromTo(
        spatialContainerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.06 },
        0.50
      );
      // Stable hold 0.56 - 0.72
      timeline.to(
        spatialContainerRef.current,
        { opacity: 0, duration: 0.06 },
        0.74
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
      sceneIndex={7}
      fallback={<NestIQFallback />}
      buildTimeline={buildTimeline}
    >
      <SceneSafeFrame>
        {/* Semantic Accessibility Heading */}
        <h2 className="sr-only">NestIQ — Institutional Real Estate Search and Valuation Intelligence by Avorria</h2>

        {/* Top Minimal Scene Marker */}
        <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-avorria-quiet z-30">
          <span className="text-avorria-signal">003 / NESTIQ</span>
          <span className="text-avorria-white font-medium">AVORRIA VENTURE</span>
        </div>

        {/* Stage 1: Real Estate Dashboard Capture */}
        <CinematicMediaFrame
          src="/media/projects/nestiq/interface/agent-dashboard-preview.png"
          alt="NestIQ Agent Intelligence Dashboard"
          mode="UI_LANDSCAPE"
          fit="contain"
          containerRef={dashboardContainerRef}
          innerRef={dashboardImageRef}
        >
          <div className="absolute top-4 left-4 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-avorria-quiet z-20">
            <span>003 // SEARCH INTELLIGENCE ENGINE</span>
          </div>
        </CinematicMediaFrame>

        {/* Stage 2: Spatial Data Layer */}
        <div
          ref={spatialContainerRef}
          className="absolute inset-0 w-full h-full flex items-center justify-center p-6 sm:p-12 pointer-events-none opacity-0"
        >
          <div className="relative w-full max-w-[min(86vw,1380px)] h-[min(70dvh,800px)] overflow-hidden bg-avorria-surface border border-avorria-line p-8 flex flex-col justify-between">
            <div className="flex items-center justify-between font-mono text-xs text-avorria-quiet uppercase tracking-widest">
              <span className="text-avorria-signal">SPATIAL CONTEXT ENGINE</span>
              <span>12 DETERMINISTIC DATA LAYERS</span>
            </div>
            <div className="my-auto max-w-xl">
              <div className="display-lg text-avorria-white mb-2">
                Automated valuation modeling with multi-source spatial telemetry.
              </div>
            </div>
            <div className="font-mono text-[10px] text-avorria-quiet uppercase tracking-widest border-t border-avorria-line/40 pt-4">
              PARCEL BOUNDARIES / TRANSPORT VECTORS / INFRASTRUCTURE PROXIMITY
            </div>
          </div>
        </div>

        {/* Stage 3: Venture Contribution & Case Study Link */}
        <div
          ref={contributionContainerRef}
          className="absolute inset-x-6 sm:inset-x-16 max-w-4xl mx-auto flex flex-col gap-6 bg-avorria-surface/90 border border-avorria-line p-8 sm:p-12 backdrop-blur-md z-30 opacity-0"
        >
          <div className="font-mono text-xs text-avorria-signal uppercase tracking-widest">
            003 / NESTIQ // AVORRIA VENTURE
          </div>
          <div className="display-lg text-avorria-white">
            Institutional real estate search intelligence, spatial data layers, and valuation models.
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-avorria-line pt-6">
            <div className="font-mono text-xs uppercase tracking-widest text-avorria-muted">
              SPATIAL DATA / SEARCH ARCHITECTURE / PRODUCT
            </div>
            <Link
              href="/work/nestiq"
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
