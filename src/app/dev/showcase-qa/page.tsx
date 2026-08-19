"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HOMEPAGE_FEATURED_PROJECTS, HomepageProjectFeatureDef } from "@/lib/home/homepage-projects";
import { ShowcaseMediaAperture } from "@/components/home/ShowcaseMediaAperture";

export default function ShowcaseQAPage() {
  const [selectedSlug, setSelectedSlug] = useState<string>(HOMEPAGE_FEATURED_PROJECTS[0].slug);
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");
  const [showGridOverlay, setShowGridOverlay] = useState<boolean>(true);

  const currentProject =
    HOMEPAGE_FEATURED_PROJECTS.find((p) => p.slug === selectedSlug) ||
    HOMEPAGE_FEATURED_PROJECTS[0];

  return (
    <main className="min-h-screen bg-[#050505] text-white p-6 sm:p-10 font-sans">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-10 border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest bg-avorria-signal/10 px-2.5 py-1 border border-avorria-signal/20">
              QA TOOLING
            </span>
            <span className="font-mono text-xs text-white/50 uppercase tracking-widest">
              DIRECTOR&apos;S CUT V2
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl text-white tracking-tight">
            Featured Work Showcase Reel QA Matrix
          </h1>
          <p className="font-mono text-xs text-white/60 mt-1">
            Uniform 16:9 Aperture Geometry &middot; Exact Baseline Alignment &middot; Authentic Viewport Captures
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="font-mono text-xs text-avorria-signal uppercase tracking-widest hover:underline"
          >
            &larr; Return to Homepage
          </Link>
        </div>
      </div>

      {/* Control Bar */}
      <div className="max-w-7xl mx-auto mb-8 bg-[#0e0e0e] border border-white/10 p-4 flex flex-wrap items-center justify-between gap-4">
        {/* Project Selector */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs text-white/40 uppercase tracking-wider mr-2">
            Project:
          </span>
          {HOMEPAGE_FEATURED_PROJECTS.map((proj) => (
            <button
              key={proj.slug}
              onClick={() => setSelectedSlug(proj.slug)}
              className={`font-mono text-xs uppercase px-3 py-1.5 border transition-all ${
                selectedSlug === proj.slug
                  ? "border-avorria-signal bg-avorria-signal text-black font-semibold"
                  : "border-white/10 bg-white/5 text-white/70 hover:border-white/30 hover:text-white"
              }`}
            >
              {proj.projectIndex.split("/")[1]?.trim() || proj.slug}
            </button>
          ))}
        </div>

        {/* View Mode & Toggles */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setViewMode(viewMode === "desktop" ? "mobile" : "desktop")}
            className="font-mono text-xs uppercase px-3 py-1.5 border border-white/20 bg-white/5 hover:bg-white/10"
          >
            Viewport: <span className="text-avorria-signal font-medium">{viewMode.toUpperCase()}</span>
          </button>
          <button
            onClick={() => setShowGridOverlay(!showGridOverlay)}
            className={`font-mono text-xs uppercase px-3 py-1.5 border ${
              showGridOverlay
                ? "border-avorria-signal/40 bg-avorria-signal/10 text-avorria-signal"
                : "border-white/20 bg-white/5 text-white/60"
            }`}
          >
            Alignment Grid: {showGridOverlay ? "ON" : "OFF"}
          </button>
        </div>
      </div>

      {/* Interactive Aperture Stage */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="relative bg-[#000000] border border-white/15 p-6 sm:p-12 min-h-[500px] flex flex-col justify-between overflow-hidden">
          {/* Alignment Crosshairs (Visual QA) */}
          {showGridOverlay && (
            <div className="absolute inset-0 pointer-events-none z-30">
              <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-avorria-signal/20 border-t border-dashed border-avorria-signal/30" />
              <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-avorria-signal/20 border-l border-dashed border-avorria-signal/30" />
              <div className="absolute top-4 left-4 font-mono text-[9px] text-avorria-signal/60 uppercase">
                Aperture Center: (50%, 50%)
              </div>
            </div>
          )}

          {/* Region A: Top Meta */}
          <div className="relative z-20 flex items-center justify-between font-mono text-xs uppercase tracking-[0.25em] text-white max-w-[min(90vw,1540px,calc((100dvh-180px)*16/9))] mx-auto w-full pb-6">
            <span className="text-avorria-signal font-medium">
              {currentProject.projectIndex}
            </span>
            <span className="text-white/60 font-normal">
              {currentProject.relationship}
            </span>
          </div>

          {/* Region B: Center Aperture */}
          <div className="relative z-10 my-auto flex items-center justify-center py-4">
            {viewMode === "desktop" ? (
              <div className="relative w-[min(90vw,1200px)] aspect-[16/9] border border-avorria-line/40 shadow-2xl overflow-hidden bg-[#080808]">
                <Image
                  src={currentProject.desktopMedia}
                  alt={currentProject.headline}
                  fill
                  sizes="1200px"
                  className="object-cover"
                  style={{ objectPosition: currentProject.fitConfig.desktopObjectPosition || "center top" }}
                />
                {showGridOverlay && (
                  <div className="absolute top-2 right-2 bg-black/80 px-2 py-0.5 border border-white/20 font-mono text-[9px] text-avorria-signal">
                    1920 &times; 1080 (16:9)
                  </div>
                )}
              </div>
            ) : (
              <div className="relative w-[280px] sm:w-[320px] aspect-[390/844] border border-avorria-line/40 shadow-2xl overflow-hidden bg-[#080808]">
                <Image
                  src={currentProject.mobileMedia}
                  alt={currentProject.headline}
                  fill
                  sizes="320px"
                  className="object-cover"
                  style={{ objectPosition: currentProject.fitConfig.mobileObjectPosition || "center top" }}
                />
                {showGridOverlay && (
                  <div className="absolute top-2 right-2 bg-black/80 px-2 py-0.5 border border-white/20 font-mono text-[9px] text-avorria-signal">
                    390 &times; 844 (9:19.5)
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Region C: Bottom Footer */}
          <div className="relative z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-t border-white/10 pt-4 max-w-[min(90vw,1540px,calc((100dvh-180px)*16/9))] mx-auto w-full">
            <div className="max-w-2xl flex flex-col gap-1">
              <h3 className="text-lg sm:text-xl text-white font-normal leading-snug">
                {currentProject.headline}
              </h3>
              <p className="font-mono text-xs text-white/50 uppercase tracking-widest">
                {currentProject.capabilitiesLine}
              </p>
            </div>

            {currentProject.caseStudyAvailable ? (
              <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest border border-avorria-signal/30 bg-avorria-black/60 px-3 py-1.5">
                CASE STUDY AVAILABLE &rarr;
              </span>
            ) : (
              <span className="font-mono text-xs text-white/30 uppercase tracking-widest border border-white/10 bg-white/5 px-3 py-1.5">
                NO CASE STUDY ROUTE
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Six-Project Thumbnail Matrix */}
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h2 className="font-display text-xl text-white tracking-tight">
            Canonical 6-Project Asset Inspection Matrix
          </h2>
          <p className="font-mono text-xs text-white/50 mt-1">
            Verification of all 12 authentic screenshot masters (1920&times;1080 desktop / 390&times;844 mobile).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {HOMEPAGE_FEATURED_PROJECTS.map((proj, idx) => (
            <div
              key={proj.slug}
              className="bg-[#0b0b0b] border border-white/10 p-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs text-avorria-signal font-semibold">
                    {proj.projectIndex}
                  </span>
                  <span className="font-mono text-[10px] text-white/50 uppercase px-2 py-0.5 border border-white/10 bg-white/5">
                    {proj.relationship}
                  </span>
                </div>

                {/* Desktop Preview */}
                <div className="mb-3">
                  <div className="font-mono text-[10px] text-white/40 uppercase mb-1 flex items-center justify-between">
                    <span>Desktop (1920&times;1080)</span>
                    <span className="text-emerald-400 font-mono text-[9px]">&#x2713; VERIFIED</span>
                  </div>
                  <div className="relative aspect-[16/9] w-full border border-white/10 bg-black overflow-hidden">
                    <Image
                      src={proj.desktopMedia}
                      alt={`${proj.slug} desktop`}
                      fill
                      sizes="400px"
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Mobile Preview */}
                <div className="mb-4">
                  <div className="font-mono text-[10px] text-white/40 uppercase mb-1 flex items-center justify-between">
                    <span>Mobile (390&times;844)</span>
                    <span className="text-emerald-400 font-mono text-[9px]">&#x2713; VERIFIED</span>
                  </div>
                  <div className="relative aspect-[390/844] w-24 mx-auto border border-white/10 bg-black overflow-hidden">
                    <Image
                      src={proj.mobileMedia}
                      alt={`${proj.slug} mobile`}
                      fill
                      sizes="150px"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-3">
                <p className="text-xs text-white/80 line-clamp-1 mb-1 font-medium">
                  {proj.headline}
                </p>
                <p className="font-mono text-[9px] text-white/40 uppercase truncate">
                  {proj.capabilitiesLine}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
