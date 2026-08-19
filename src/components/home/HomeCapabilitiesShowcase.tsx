"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { CinematicSceneViewport } from "@/components/scenes/CinematicSceneViewport";
import { SceneConfig } from "@/types/scene";

const CAPABILITIES_CONFIG: SceneConfig = {
  id: "scene-capabilities-showcase" as any,
  index: 3,
  label: "CAPABILITIES SHOWCASE",
  chapter: "CAPABILITY",
  minHeight: "300vh",
  mobileHeight: "270svh",
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
 * Consolidated, grouped capability presentation.
 * Explains: BUILD, SEARCH, and SYSTEMS in one continuous argument.
 *
 * Sequence:
 * 0.00 – 0.32: 01 / BUILD (Digital Products, Web Design, Commerce)
 * 0.34 – 0.64: 02 / SEARCH (Technical SEO, Content Architecture, Visibility)
 * 0.66 – 0.98: 03 / SYSTEMS (AI Systems, Automations, Internal Operations)
 */
export function HomeCapabilitiesShowcase() {
  const c1Ref = useRef<HTMLDivElement>(null);
  const c2Ref = useRef<HTMLDivElement>(null);
  const c3Ref = useRef<HTMLDivElement>(null);

  const buildTimeline = (timeline: gsap.core.Timeline) => {
    timeline.addLabel("entry", 0);
    timeline.addLabel("build", 0.02);
    timeline.addLabel("search", 0.34);
    timeline.addLabel("systems", 0.66);
    timeline.addLabel("handoff", 0.96);

    // 01 / BUILD (0.00 – 0.32)
    if (c1Ref.current) {
      timeline.fromTo(
        c1Ref.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.04 },
        0.02
      );
      timeline.to(
        c1Ref.current,
        { opacity: 0, y: -20, duration: 0.04 },
        0.30
      );
    }

    // 02 / SEARCH (0.34 – 0.64)
    if (c2Ref.current) {
      timeline.fromTo(
        c2Ref.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.04 },
        0.34
      );
      timeline.to(
        c2Ref.current,
        { opacity: 0, y: -20, duration: 0.04 },
        0.62
      );
    }

    // 03 / SYSTEMS (0.66 – 0.98)
    if (c3Ref.current) {
      timeline.fromTo(
        c3Ref.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.04 },
        0.66
      );
      timeline.to(
        c3Ref.current,
        { opacity: 0, y: -20, duration: 0.04 },
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
      <div className="w-full h-full relative overflow-hidden flex items-center justify-center p-6 sm:p-12 lg:p-16">
        {/* Semantic Section Heading */}
        <h2 className="sr-only">
          Avorria Capabilities — Build, Search, Systems Engineering
        </h2>

        {/* 01 / BUILD */}
        <div
          ref={c1Ref}
          className="absolute inset-x-6 sm:inset-x-16 max-w-5xl mx-auto flex flex-col justify-between h-[70vh] border border-avorria-line bg-avorria-surface/80 p-8 sm:p-14 backdrop-blur-md opacity-0 pointer-events-auto select-none"
        >
          <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-avorria-quiet border-b border-avorria-line/40 pb-4">
            <span className="text-avorria-signal">01 / CAPABILITY</span>
            <span className="text-avorria-white">DIGITAL PRODUCTS</span>
          </div>

          <div className="my-auto flex flex-col gap-4">
            <div className="display-xl text-avorria-white font-normal tracking-tight">
              BUILD<span className="text-avorria-signal">.</span>
            </div>
            <div className="display-md text-avorria-muted max-w-2xl font-light">
              Digital flagships, custom software, and bespoke web platforms engineered to dominate markets.
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-avorria-signal uppercase tracking-widest pt-2">
              <span>WEB DESIGN</span>
              <span>•</span>
              <span>DEVELOPMENT</span>
              <span>•</span>
              <span>PRODUCT DESIGN</span>
              <span>•</span>
              <span>COMMERCE</span>
            </div>
          </div>

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
          className="absolute inset-x-6 sm:inset-x-16 max-w-5xl mx-auto flex flex-col justify-between h-[70vh] border border-avorria-line bg-avorria-surface/80 p-8 sm:p-14 backdrop-blur-md opacity-0 pointer-events-auto select-none"
        >
          <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-avorria-quiet border-b border-avorria-line/40 pb-4">
            <span className="text-avorria-signal">02 / CAPABILITY</span>
            <span className="text-avorria-white">TECHNICAL VISIBILITY</span>
          </div>

          <div className="my-auto flex flex-col gap-4">
            <div className="display-xl text-avorria-white font-normal tracking-tight">
              SEARCH<span className="text-avorria-signal">.</span>
            </div>
            <div className="display-md text-avorria-muted max-w-2xl font-light">
              Visibility is engineered. Technical SEO architecture, entity graphs, and high-intent discovery engines.
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-avorria-signal uppercase tracking-widest pt-2">
              <span>TECHNICAL SEO</span>
              <span>•</span>
              <span>CONTENT ARCHITECTURE</span>
              <span>•</span>
              <span>MIGRATIONS</span>
              <span>•</span>
              <span>AUTHORITY</span>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-avorria-line/40 pt-4">
            <span className="font-mono text-xs text-avorria-quiet uppercase">SEARCH VALUATION BY ARCHITECTURE</span>
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
          className="absolute inset-x-6 sm:inset-x-16 max-w-5xl mx-auto flex flex-col justify-between h-[70vh] border border-avorria-line bg-avorria-surface/80 p-8 sm:p-14 backdrop-blur-md opacity-0 pointer-events-auto select-none"
        >
          <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-avorria-quiet border-b border-avorria-line/40 pb-4">
            <span className="text-avorria-signal">03 / CAPABILITY</span>
            <span className="text-avorria-white">INTELLIGENCE &amp; AUTOMATION</span>
          </div>

          <div className="my-auto flex flex-col gap-4">
            <div className="display-xl text-avorria-white font-normal tracking-tight">
              SYSTEMS<span className="text-avorria-signal">.</span>
            </div>
            <div className="display-md text-avorria-muted max-w-2xl font-light">
              Make it think. Autonomous workflows, custom AI integrations, internal tools, and closed-loop operations.
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-avorria-signal uppercase tracking-widest pt-2">
              <span>AI SYSTEMS</span>
              <span>•</span>
              <span>AUTOMATION</span>
              <span>•</span>
              <span>INTERNAL TOOLS</span>
              <span>•</span>
              <span>WORKFLOW ENGINES</span>
            </div>
          </div>

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
      </div>
    </CinematicSceneViewport>
  );
}
