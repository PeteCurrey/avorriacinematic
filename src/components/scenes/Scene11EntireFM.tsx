"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { EntireFMFallback } from "./entirefm/EntireFMFallback";
import { CinematicSceneViewport } from "./CinematicSceneViewport";
import { SceneSafeFrame } from "./SceneSafeFrame";
import { CinematicMediaFrame } from "@/components/cinematic/CinematicMediaFrame";
import { getSceneConfig } from "./registry";

/**
 * SCENE 11 — ENTIREFM (005 / CLIENT WORK)
 *
 * SIMPLIFIED CLIENT PROOF TEASER:
 * 1. Operations Backbone Architecture (0.00 – 0.52) -> Lands 0.00-0.08, Holds stationary 0.08-0.44
 * 2. EntireFM Client Statement & Case Study CTA (0.54 – 0.94) -> Holds stationary 0.60-0.94
 */
export function Scene11EntireFM() {
  const config = getSceneConfig("scene-11-entirefm")!;

  const mediaContainerRef = useRef<HTMLDivElement>(null);
  const mediaInnerRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);
  const footerMarkerRef = useRef<HTMLDivElement>(null);

  const buildTimeline = (timeline: gsap.core.Timeline) => {
    timeline.addLabel("entry", 0);
    timeline.addLabel("media_hold", 0.08);
    timeline.addLabel("statement_entry", 0.54);
    timeline.addLabel("statement_hold", 0.60);
    timeline.addLabel("handoff", 0.94);

    // 1. Operations Infrastructure Media (0.00 - 0.52)
    if (mediaContainerRef.current) {
      timeline.fromTo(
        mediaContainerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.08 },
        0
      );
      // Stable hold 0.08 - 0.44
      timeline.to(
        mediaContainerRef.current,
        { opacity: 0, duration: 0.06 },
        0.46
      );
    }
    if (mediaInnerRef.current) {
      timeline.fromTo(
        mediaInnerRef.current,
        { scale: 0.98 },
        { scale: 1.0, duration: 0.08 },
        0
      );
    }

    // 2. EntireFM Client Statement & Case Study Link (0.54 - 0.94)
    if (statementRef.current) {
      timeline.fromTo(
        statementRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.06 },
        0.54
      );
      // Stable hold 0.60 - 0.94
      timeline.to(
        statementRef.current,
        { opacity: 0, y: -10, duration: 0.04 },
        0.94
      );
    }

    // 3. Footer Marker (0.94 - 1.00)
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
      sceneIndex={11}
      fallback={<EntireFMFallback />}
      buildTimeline={buildTimeline}
    >
      <SceneSafeFrame>
        {/* Semantic Accessibility Heading */}
        <h2 className="sr-only">
          EntireFM — Commercial Facilities Operations Platform engineered by Avorria
        </h2>

        {/* Top Minimal Scene Marker */}
        <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-avorria-quiet z-30">
          <span className="text-avorria-signal">005 / ENTIREFM</span>
          <span className="text-avorria-white font-medium">CLIENT WORK</span>
        </div>

        {/* Stage 1: Operations Infrastructure Media */}
        <CinematicMediaFrame
          src="/media/projects/entirefm/entirefm-operational.svg"
          alt="EntireFM Operations Backbone Infrastructure"
          mode="LANDSCAPE"
          fit="contain"
          containerRef={mediaContainerRef}
          innerRef={mediaInnerRef}
        >
          <div className="absolute top-4 left-4 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-avorria-quiet z-20">
            <span>005 // CAFM OPERATIONS PLATFORM</span>
          </div>
        </CinematicMediaFrame>

        {/* Stage 2: Client Statement & Case Study Link */}
        <div
          ref={statementRef}
          className="absolute inset-x-6 sm:inset-x-16 max-w-4xl mx-auto flex flex-col gap-6 bg-avorria-surface/90 border border-avorria-line p-8 sm:p-12 backdrop-blur-md z-30 opacity-0"
        >
          <div className="font-mono text-xs text-avorria-signal uppercase tracking-widest">
            005 / ENTIREFM // CLIENT WORK
          </div>
          <div className="display-lg text-avorria-white">
            Nationwide facilities management operations platform, dispatch automation, and organic search architecture.
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-avorria-line pt-6">
            <div className="font-mono text-xs uppercase tracking-widest text-avorria-muted">
              SYSTEMS / DISPATCH AUTOMATION / SEARCH ARCHITECTURE
            </div>
            <Link
              href="/work/entirefm"
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
            PORTFOLIO // SELECTED WORK
          </div>
          <div className="text-avorria-signal">
            11 / 18
          </div>
        </div>
      </SceneSafeFrame>
    </CinematicSceneViewport>
  );
}
