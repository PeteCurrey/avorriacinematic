"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { CinematicSceneViewport } from "@/components/scenes/CinematicSceneViewport";
import { SceneSafeFrame } from "@/components/scenes/SceneSafeFrame";
import { SceneConfig } from "@/types/scene";

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
 * Spatial, un-boxed architecture for Avorria capabilities.
 * Explains: BUILD, SEARCH, and SYSTEMS across 360vh (~120vh per discipline).
 *
 * Sequence:
 * 0.00 – 0.33: 01 / BUILD (Digital Products, Web Design, Commerce) -> Holds 0.03 – 0.30 (~97vh)
 * 0.33 – 0.66: 02 / SEARCH (Technical SEO, Content Architecture, Visibility) -> Holds 0.36 – 0.63 (~97vh)
 * 0.66 – 0.99: 03 / SYSTEMS (AI Systems, Automations, Internal Operations) -> Holds 0.69 – 0.96 (~97vh)
 */
export function HomeCapabilitiesShowcase() {
  const c1Ref = useRef<HTMLDivElement>(null);
  const c2Ref = useRef<HTMLDivElement>(null);
  const c3Ref = useRef<HTMLDivElement>(null);

  const buildTimeline = (timeline: gsap.core.Timeline) => {
    timeline.addLabel("entry", 0);
    timeline.addLabel("build", 0.03);
    timeline.addLabel("search", 0.36);
    timeline.addLabel("systems", 0.69);
    timeline.addLabel("handoff", 0.98);

    // 01 / BUILD (0.00 – 0.33)
    if (c1Ref.current) {
      timeline.fromTo(
        c1Ref.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.03, ease: "power2.out" },
        0.00
      );
      // Zero drift during hold (0.03 - 0.30)
      timeline.to(
        c1Ref.current,
        { opacity: 0, y: -10, duration: 0.03, ease: "power2.in" },
        0.30
      );
    }

    // 02 / SEARCH (0.33 – 0.66)
    if (c2Ref.current) {
      timeline.fromTo(
        c2Ref.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.03, ease: "power2.out" },
        0.33
      );
      // Zero drift during hold (0.36 - 0.63)
      timeline.to(
        c2Ref.current,
        { opacity: 0, y: -10, duration: 0.03, ease: "power2.in" },
        0.63
      );
    }

    // 03 / SYSTEMS (0.66 – 0.99)
    if (c3Ref.current) {
      timeline.fromTo(
        c3Ref.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.03, ease: "power2.out" },
        0.66
      );
      // Zero drift during hold (0.69 - 0.96)
      timeline.to(
        c3Ref.current,
        { opacity: 0, y: -10, duration: 0.03, ease: "power2.in" },
        0.96
      );
    }
  };

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

        {/* 01 / BUILD */}
        <div
          ref={c1Ref}
          className="absolute inset-x-6 sm:inset-x-12 lg:inset-x-16 max-w-6xl mx-auto flex flex-col justify-between h-full py-6 opacity-0 pointer-events-auto select-none"
        >
          {/* Header */}
          <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-avorria-quiet border-b border-avorria-line/40 pb-4">
            <span className="text-avorria-signal font-medium">01 / CAPABILITY</span>
            <span className="text-avorria-white font-medium">DIGITAL PRODUCTS &amp; ENGINEERING</span>
          </div>

          {/* Central Architecture */}
          <div className="my-auto flex flex-col gap-6 max-w-3xl">
            <div
              className="tracking-tight leading-none text-avorria-white font-bold"
              style={{ fontSize: "clamp(3.5rem, 9vw, 9.5rem)" }}
            >
              BUILD<span className="text-avorria-signal">.</span>
            </div>
            <div className="display-md text-avorria-white font-light">
              Digital flagships, custom web applications, and high-conversion commerce infrastructure.
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs sm:text-sm text-avorria-signal uppercase tracking-widest pt-2">
              <span>WEB DESIGN</span>
              <span>•</span>
              <span>DEVELOPMENT</span>
              <span>•</span>
              <span>PRODUCT DESIGN</span>
              <span>•</span>
              <span>COMMERCE</span>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-avorria-line/40 pt-4">
            <span className="font-mono text-xs text-avorria-quiet uppercase">WE DON&apos;T DECORATE. WE ENGINEER ADVANTAGE.</span>
            <Link
              href="/capabilities/build"
              className="font-mono text-xs sm:text-sm text-avorria-signal uppercase tracking-widest hover:underline flex items-center gap-2"
            >
              <span>EXPLORE BUILD</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* 02 / SEARCH */}
        <div
          ref={c2Ref}
          className="absolute inset-x-6 sm:inset-x-12 lg:inset-x-16 max-w-6xl mx-auto flex flex-col justify-between h-full py-6 opacity-0 pointer-events-auto select-none"
        >
          {/* Header */}
          <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-avorria-quiet border-b border-avorria-line/40 pb-4">
            <span className="text-avorria-signal font-medium">02 / CAPABILITY</span>
            <span className="text-avorria-white font-medium">TECHNICAL SEARCH &amp; VISIBILITY</span>
          </div>

          {/* Central Architecture */}
          <div className="my-auto flex flex-col gap-6 max-w-3xl">
            <div
              className="tracking-tight leading-none text-avorria-white font-bold"
              style={{ fontSize: "clamp(3.5rem, 9vw, 9.5rem)" }}
            >
              SEARCH<span className="text-avorria-signal">.</span>
            </div>
            <div className="display-md text-avorria-white font-light">
              Visibility is engineered. Technical SEO architecture, entity graphs, and algorithmic discovery systems.
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs sm:text-sm text-avorria-signal uppercase tracking-widest pt-2">
              <span>TECHNICAL SEO</span>
              <span>•</span>
              <span>CONTENT ARCHITECTURE</span>
              <span>•</span>
              <span>MIGRATIONS</span>
              <span>•</span>
              <span>DISCOVERY</span>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-avorria-line/40 pt-4">
            <span className="font-mono text-xs text-avorria-quiet uppercase">SEARCH ADVANTAGE THROUGH ARCHITECTURE</span>
            <Link
              href="/capabilities/search"
              className="font-mono text-xs sm:text-sm text-avorria-signal uppercase tracking-widest hover:underline flex items-center gap-2"
            >
              <span>EXPLORE SEARCH</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* 03 / SYSTEMS */}
        <div
          ref={c3Ref}
          className="absolute inset-x-6 sm:inset-x-12 lg:inset-x-16 max-w-6xl mx-auto flex flex-col justify-between h-full py-6 opacity-0 pointer-events-auto select-none"
        >
          {/* Header */}
          <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-avorria-quiet border-b border-avorria-line/40 pb-4">
            <span className="text-avorria-signal font-medium">03 / CAPABILITY</span>
            <span className="text-avorria-white font-medium">AI SYSTEMS &amp; AUTOMATION</span>
          </div>

          {/* Central Architecture */}
          <div className="my-auto flex flex-col gap-6 max-w-3xl">
            <div
              className="tracking-tight leading-none text-avorria-white font-bold"
              style={{ fontSize: "clamp(3.5rem, 9vw, 9.5rem)" }}
            >
              SYSTEMS<span className="text-avorria-signal">.</span>
            </div>
            <div className="display-md text-avorria-white font-light">
              Make it think. Autonomous workflows, custom AI integrations, internal tools, and closed-loop pipelines.
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs sm:text-sm text-avorria-signal uppercase tracking-widest pt-2">
              <span>AI SYSTEMS</span>
              <span>•</span>
              <span>AUTOMATION</span>
              <span>•</span>
              <span>INTERNAL TOOLS</span>
              <span>•</span>
              <span>WORKFLOW ENGINES</span>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-avorria-line/40 pt-4">
            <span className="font-mono text-xs text-avorria-quiet uppercase">CLOSED-LOOP AUTONOMOUS PIPELINES</span>
            <Link
              href="/capabilities/systems"
              className="font-mono text-xs sm:text-sm text-avorria-signal uppercase tracking-widest hover:underline flex items-center gap-2"
            >
              <span>EXPLORE SYSTEMS</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </SceneSafeFrame>
    </CinematicSceneViewport>
  );
}
