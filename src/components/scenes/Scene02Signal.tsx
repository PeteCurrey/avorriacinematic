"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "@/providers/ReducedMotionProvider";
import { useWebGLCapabilities } from "@/providers/WebGLCapabilityProvider";
import { SignalAperture } from "./signal/SignalAperture";
import { SignalMetadataOverlay } from "./signal/SignalMetadataOverlay";
import { AlkotaHandoffLayer } from "./signal/AlkotaHandoffLayer";
import { SignalFallback } from "./signal/SignalFallback";
import { CinematicSceneViewport } from "./CinematicSceneViewport";
import { getSceneConfig } from "./registry";

const SignalCanvas = dynamic(
  () => import("./signal/SignalCanvas").then((mod) => mod.SignalCanvas),
  { ssr: false }
);

export function Scene02Signal() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
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

  return (
    <CinematicSceneViewport
      config={config}
      sceneIndex={2}
      fallback={<SignalFallback />}
    >
      {(progress) => {
        const apertureProgress = Math.min(1, progress / 0.12);
        const alkotaOpacity = progress >= 0.94 ? (progress - 0.94) / 0.06 : 0;

        return (
          <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
            {/* Semantic Accessibility Heading */}
            <h2 className="sr-only">The Avorria Signal — Spatial Project Discovery and Architectural Gallery</h2>

            <SignalAperture progress={apertureProgress}>
              <SignalCanvas
                progress={progress}
                onActiveProjectChange={setActiveProjectIndex}
              />
            </SignalAperture>

            <SignalMetadataOverlay
              activeIndex={activeProjectIndex}
              progress={progress}
            />

            <AlkotaHandoffLayer opacity={alkotaOpacity} />

            <div
              className="absolute top-8 right-6 sm:right-12 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-avorria-quiet z-20 pointer-events-none"
              aria-hidden="true"
            >
              <span>PROJECT SIGNAL // 02</span>
            </div>
          </div>
        );
      }}
    </CinematicSceneViewport>
  );
}
