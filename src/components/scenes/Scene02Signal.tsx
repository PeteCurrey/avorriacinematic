"use client";
import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useGsapContext } from "@/lib/motion/hooks";
import { useReducedMotion } from "@/providers/ReducedMotionProvider";
import { useWebGLCapabilities } from "@/providers/WebGLCapabilityProvider";
import { SignalAperture } from "./signal/SignalAperture";
import { SignalMetadataOverlay } from "./signal/SignalMetadataOverlay";
import { AlkotaHandoffLayer } from "./signal/AlkotaHandoffLayer";
import { SignalFallback } from "./signal/SignalFallback";
import { getSceneConfig } from "./registry";

const SignalCanvas = dynamic(
  () => import("./signal/SignalCanvas").then((mod) => mod.SignalCanvas),
  { ssr: false }
);

export function Scene02Signal() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pinnedContentRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  
  const { effectiveReducedMotion } = useReducedMotion();
  const { effectiveSupported } = useWebGLCapabilities();
  const config = getSceneConfig("scene-02-signal")!;

  useGsapContext((ctx) => {
    if (effectiveReducedMotion || !effectiveSupported || !containerRef.current || !pinnedContentRef.current) return;

    ctx.add(() => {
      const gsap = require("gsap").gsap;
      gsap.to(
        {},
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=420%",
            pin: pinnedContentRef.current,
            pinSpacing: true,
            scrub: 0.8,
            anticipatePin: 1,
            onUpdate: (self: { progress: number }) => {
              setScrollProgress(self.progress);
            }
          }
        }
      );
    });
  }, containerRef, [effectiveReducedMotion, effectiveSupported]);

  if (effectiveReducedMotion || !effectiveSupported) {
    return (
      <section id={config.id} data-scene-id={config.id} data-scene-index="2">
        <SignalFallback />
      </section>
    );
  }

  const apertureProgress = Math.min(1, scrollProgress / 0.12);
  const alkotaOpacity = scrollProgress >= 0.94 ? (scrollProgress - 0.94) / 0.06 : 0;

  return (
    <section
      ref={containerRef}
      id={config.id}
      data-scene-id={config.id}
      data-scene-index="2"
      className="relative w-full bg-avorria-black"
    >
      <div
        ref={pinnedContentRef}
        className="w-full h-screen h-[100dvh] relative overflow-hidden flex items-center justify-center"
      >
        <SignalAperture progress={apertureProgress}>
          <SignalCanvas
            progress={scrollProgress}
            onActiveProjectChange={setActiveProjectIndex}
          />
        </SignalAperture>

        <SignalMetadataOverlay
          activeIndex={activeProjectIndex}
          progress={scrollProgress}
        />

        <AlkotaHandoffLayer opacity={alkotaOpacity} />

        <div
          className="absolute top-8 right-6 sm:right-12 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-avorria-quiet z-20 pointer-events-none"
          aria-hidden="true"
        >
          <span>02 / 18 // SIGNAL</span>
        </div>
      </div>
    </section>
  );
}
