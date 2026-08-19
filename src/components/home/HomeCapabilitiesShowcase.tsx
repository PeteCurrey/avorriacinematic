"use client";

import React, { useRef } from "react";
import { CinematicSceneViewport } from "@/components/scenes/CinematicSceneViewport";
import { SceneSafeFrame } from "@/components/scenes/SceneSafeFrame";
import { useReducedMotion } from "@/providers/ReducedMotionProvider";
import { SceneConfig } from "@/types/scene";
import { CAPABILITY_ITEMS } from "@/lib/home/home-capabilities";
import {
  HomeCapabilityChapter,
  BuildBlueprintVisual,
  SearchTopologyVisual,
  SystemsPipelineVisual,
} from "./HomeCapabilityChapter";

const CAPABILITIES_CONFIG: SceneConfig = {
  id: "scene-capabilities-showcase" as any,
  index: 3,
  label: "CAPABILITIES SHOWCASE",
  chapter: "CAPABILITY",
  minHeight: "360vh",
  mobileHeight: "300svh",
  mobileSceneClass: "B",
  bgMode: "black",
  pinningEligibility: true,
  webglRequirement: false,
  mediaPriority: "normal",
  reducedMotionStrategy: "static",
  mobileStrategy: "mobileCinematic",
  analyticsName: "home_capabilities_showcase"
};

/**
 * HOME CAPABILITIES SHOWCASE
 *
 * Full-screen spatial composition for Avorria capabilities.
 * Spans the entire SceneSafeFrame width (12-column editorial grid).
 *
 * Sequence (360vh total across 3 disciplines):
 * 0.00 – 0.33: 01 / BUILD   -> Holds 0.03 – 0.30 (~97vh rock-solid hold)
 * 0.33 – 0.66: 02 / SEARCH  -> Holds 0.36 – 0.63 (~97vh rock-solid hold)
 * 0.66 – 1.00: 03 / SYSTEMS -> Holds 0.69 – 0.97 (~100vh rock-solid hold)
 */
export function HomeCapabilitiesShowcase() {
  const { effectiveReducedMotion } = useReducedMotion();

  const c1Ref = useRef<HTMLDivElement>(null);
  const c2Ref = useRef<HTMLDivElement>(null);
  const c3Ref = useRef<HTMLDivElement>(null);

  const refs = [c1Ref, c2Ref, c3Ref];
  const visuals = [
    <BuildBlueprintVisual key="build-vis" />,
    <SearchTopologyVisual key="search-vis" />,
    <SystemsPipelineVisual key="systems-vis" />,
  ];

  const buildTimeline = (timeline: gsap.core.Timeline) => {
    timeline.addLabel("entry", 0);
    timeline.addLabel("build", 0.03);
    timeline.addLabel("search", 0.36);
    timeline.addLabel("systems", 0.69);
    timeline.addLabel("handoff", 0.98);

    const count = CAPABILITY_ITEMS.length;
    const windowSize = 1 / count; // 0.3333

    CAPABILITY_ITEMS.forEach((_, i) => {
      const container = refs[i]?.current;
      if (!container) return;

      const enterStart = i === 0 ? 0 : i * windowSize;
      const enterEnd = i === 0 ? 0.03 : i * windowSize + 0.03;
      const exitStart = i === count - 1 ? 0.97 : (i + 1) * windowSize - 0.03;
      const exitEnd = (i + 1) * windowSize;

      // Entrance: autoAlpha 0 -> 1 and pointer-events activation
      timeline.fromTo(
        container,
        { autoAlpha: 0, y: 15, pointerEvents: "none" },
        {
          autoAlpha: 1,
          y: 0,
          pointerEvents: "auto",
          duration: enterEnd - enterStart,
          ease: "power2.out"
        },
        enterStart
      );

      // Exit: autoAlpha 1 -> 0 and pointer-events deactivation
      timeline.to(
        container,
        {
          autoAlpha: 0,
          y: -10,
          pointerEvents: "none",
          duration: exitEnd - exitStart,
          ease: "power2.in"
        },
        exitStart
      );
    });
  };

  // Reduced Motion Fallback: Stacked static chapters
  if (effectiveReducedMotion) {
    return (
      <section
        id="scene-capabilities-showcase"
        className="w-full bg-avorria-black select-none border-t border-avorria-line py-20"
      >
        <div className="max-w-[1760px] mx-auto px-[clamp(24px,4vw,72px)] flex flex-col gap-24">
          <h2 className="sr-only">
            Avorria Capabilities — Build, Search, Systems Engineering
          </h2>
          {CAPABILITY_ITEMS.map((capability, idx) => (
            <div
              key={capability.id}
              className="relative min-h-[70svh] border-b border-avorria-line/30 pb-16 flex flex-col justify-between"
            >
              {/* Header */}
              <div className="w-full flex items-center justify-between font-mono text-xs uppercase tracking-widest text-avorria-quiet border-b border-avorria-line/40 pb-4">
                <span className="text-avorria-signal font-medium">
                  {capability.chapterNumber}
                </span>
                <span className="text-avorria-white font-medium">
                  {capability.category}
                </span>
              </div>

              {/* Body */}
              <div className="w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-8">
                <div className="lg:col-span-7 flex flex-col justify-center">
                  <h3
                    className="tracking-tight leading-none text-avorria-white font-bold"
                    style={{ fontSize: "clamp(3.5rem, 8vw, 8rem)" }}
                  >
                    {capability.title}
                    <span className="text-avorria-signal">.</span>
                  </h3>
                  <p className="text-xl sm:text-2xl font-light text-avorria-white/90 leading-snug max-w-[760px] mt-6">
                    {capability.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs sm:text-sm text-avorria-signal uppercase tracking-widest mt-6">
                    {capability.services.map((service, sIdx) => (
                      <React.Fragment key={service}>
                        <span>{service}</span>
                        {sIdx < capability.services.length - 1 && (
                          <span className="text-white/30">•</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                <div className="lg:col-span-5 hidden lg:flex items-center justify-center">
                  {visuals[idx]}
                </div>
              </div>

              {/* Footer */}
              <div className="w-full flex items-center justify-between border-t border-avorria-line/40 pt-4 font-mono text-xs">
                <span className="text-avorria-quiet uppercase tracking-wider hidden sm:inline-block">
                  {capability.footerStatement}
                </span>
                <a
                  href={capability.href}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm text-avorria-signal uppercase tracking-widest hover:underline ml-auto sm:ml-0"
                >
                  <span>{capability.ctaLabel}</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <CinematicSceneViewport
      config={CAPABILITIES_CONFIG}
      sceneIndex={3}
      buildTimeline={buildTimeline}
    >
      <SceneSafeFrame>
        {/* Semantic Section Heading */}
        <h2 className="sr-only">
          Avorria Capabilities — Build, Search, Systems Engineering
        </h2>

        {CAPABILITY_ITEMS.map((capability, idx) => (
          <HomeCapabilityChapter
            key={capability.id}
            capability={capability}
            containerRef={refs[idx]}
            visual={visuals[idx]}
          />
        ))}
      </SceneSafeFrame>
    </CinematicSceneViewport>
  );
}
