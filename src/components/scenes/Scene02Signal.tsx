"use client";
import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "@/providers/ReducedMotionProvider";
import { useWebGLCapabilities } from "@/providers/WebGLCapabilityProvider";
import { SignalAperture } from "./signal/SignalAperture";
import { SignalMetadataOverlay } from "./signal/SignalMetadataOverlay";
import { AlkotaHandoffLayer } from "./signal/AlkotaHandoffLayer";
import { SignalFallback } from "./signal/SignalFallback";
import { SignalCanvasHandle } from "./signal/SignalCanvas";
import { CinematicSceneViewport } from "./CinematicSceneViewport";
import { getSceneConfig } from "./registry";

const SignalCanvas = dynamic(
  () => import("./signal/SignalCanvas").then((mod) => mod.SignalCanvas),
  { ssr: false }
);

export function Scene02Signal() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const canvasHandleRef = useRef<SignalCanvasHandle | null>(null);
  const apertureRef = useRef<HTMLDivElement | null>(null);
  const metaOverlayRef = useRef<HTMLDivElement | null>(null);
  const handoffRef = useRef<HTMLDivElement | null>(null);

  const { effectiveReducedMotion } = useReducedMotion();
  const { effectiveSupported } = useWebGLCapabilities();
  const config = getSceneConfig("scene-02-signal")!;

  if (effectiveReducedMotion || !effectiveSupported) {
    return (
      <section id={config.id} data-scene-id={config.id} data-scene-index="2">
        <SignalFallback />
      </section>
    );
  }

  const buildTimeline = (timeline: gsap.core.Timeline) => {
    timeline.addLabel("entry", 0);
    timeline.addLabel("aperture_open", 0.08);
    timeline.addLabel("gallery_active", 0.15);
    timeline.addLabel("alkota_takeover", 0.94);
    timeline.addLabel("handoff", 1.0);

    // Direct imperative Three.js progress update via timeline update without React state
    timeline.eventCallback("onUpdate", () => {
      const p = timeline.progress();
      if (canvasHandleRef.current) {
        canvasHandleRef.current.setProgress(p);
      }
    });

    // 0.00 - 0.12: Aperture opening
    if (apertureRef.current) {
      timeline.fromTo(
        apertureRef.current,
        { clipPath: "inset(0% 49.9% 0% 49.9%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 0.12 },
        0
      );
    }

    // 0.12 - 0.94: Project Metadata Overlay
    if (metaOverlayRef.current) {
      timeline.fromTo(
        metaOverlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.08 },
        0.12
      );
      timeline.to(
        metaOverlayRef.current,
        { opacity: 0, duration: 0.04 },
        0.94
      );
    }

    // 0.94 - 1.00: Alkota Handoff Layer
    if (handoffRef.current) {
      timeline.fromTo(
        handoffRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.06 },
        0.94
      );
    }
  };

  return (
    <CinematicSceneViewport
      config={config}
      sceneIndex={2}
      fallback={<SignalFallback />}
      buildTimeline={buildTimeline}
    >
      <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
        {/* Semantic Accessibility Heading */}
        <h2 className="sr-only">The Avorria Signal — Spatial Project Discovery and Architectural Gallery</h2>

        <SignalAperture containerRef={apertureRef}>
          <SignalCanvas
            ref={canvasHandleRef}
            onActiveProjectChange={setActiveProjectIndex}
          />
        </SignalAperture>

        <SignalMetadataOverlay
          containerRef={metaOverlayRef}
          activeIndex={activeProjectIndex}
        />

        <div ref={handoffRef} className="absolute inset-0 w-full h-full opacity-0 pointer-events-none z-30">
          <AlkotaHandoffLayer opacity={1} />
        </div>

        <div
          className="absolute top-8 right-6 sm:right-12 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-avorria-quiet z-20 pointer-events-none"
          aria-hidden="true"
        >
          <span>PROJECT SIGNAL // 02</span>
        </div>
      </div>
    </CinematicSceneViewport>
  );
}
