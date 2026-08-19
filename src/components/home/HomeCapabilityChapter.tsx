"use client";

import React from "react";
import Link from "next/link";
import { CapabilityDefinition } from "@/lib/home/home-capabilities";

interface HomeCapabilityChapterProps {
  capability: CapabilityDefinition;
  containerRef?: React.RefObject<HTMLDivElement | null>;
  visual?: React.ReactNode;
}

/**
 * Visual Primitive for 01 / BUILD
 * Responsive structural blueprint / 12-column grid schematics
 */
export function BuildBlueprintVisual() {
  return (
    <div className="relative w-full max-w-[540px] aspect-[4/3] border border-avorria-line/40 bg-avorria-black/60 p-5 overflow-hidden flex flex-col justify-between select-none">
      {/* Top Telemetry */}
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-avorria-quiet border-b border-avorria-line/30 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-avorria-signal animate-pulse" />
          <span className="text-avorria-signal">VIEWPORT_CANONICAL // 16:9</span>
        </div>
        <span className="text-white/60">GRID: 12-COLUMN</span>
      </div>

      {/* Center Wireframe Composition */}
      <div className="relative flex-1 my-3 border border-dashed border-white/15 bg-white/[0.02] p-3 flex flex-col justify-between">
        {/* Top Wireframe Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <div className="w-20 h-2 bg-white/20" />
          <div className="flex gap-2">
            <div className="w-10 h-2 bg-white/10" />
            <div className="w-10 h-2 bg-white/10" />
            <div className="w-12 h-2 bg-avorria-signal/30" />
          </div>
        </div>

        {/* 12-Column Blueprint Grid Lines */}
        <div className="grid grid-cols-12 gap-1.5 my-3 h-24">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className={`h-full border-x border-white/5 ${
                i === 0 || i === 11 ? "bg-white/[0.04]" : ""
              } ${i >= 2 && i <= 7 ? "bg-avorria-signal/[0.03]" : ""}`}
            />
          ))}
        </div>

        {/* Bottom Nested Components */}
        <div className="grid grid-cols-3 gap-2">
          <div className="border border-white/10 bg-white/[0.03] p-2 flex flex-col gap-1">
            <div className="w-12 h-1.5 bg-avorria-signal/50" />
            <div className="w-full h-1 bg-white/10" />
          </div>
          <div className="border border-white/10 bg-white/[0.03] p-2 flex flex-col gap-1">
            <div className="w-14 h-1.5 bg-white/30" />
            <div className="w-full h-1 bg-white/10" />
          </div>
          <div className="border border-white/10 bg-white/[0.03] p-2 flex flex-col gap-1">
            <div className="w-10 h-1.5 bg-white/30" />
            <div className="w-full h-1 bg-white/10" />
          </div>
        </div>
      </div>

      {/* Bottom Instrumentation */}
      <div className="flex items-center justify-between font-mono text-[9px] text-avorria-quiet uppercase tracking-wider border-t border-avorria-line/30 pt-2">
        <span>MAX-WIDTH: 1760PX</span>
        <span className="text-avorria-signal font-medium">STATUS: READY_FOR_DEPLOY</span>
      </div>
    </div>
  );
}

/**
 * Visual Primitive for 02 / SEARCH
 * Architecture topology graph / entity discovery network
 */
export function SearchTopologyVisual() {
  return (
    <div className="relative w-full max-w-[540px] aspect-[4/3] border border-avorria-line/40 bg-avorria-black/60 p-5 overflow-hidden flex flex-col justify-between select-none">
      {/* Top Telemetry */}
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-avorria-quiet border-b border-avorria-line/30 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-avorria-signal animate-pulse" />
          <span className="text-avorria-signal">ENTITY_GRAPH // TOPOLOGY</span>
        </div>
        <span className="text-white/60">INDEX: 100% CRAWLED</span>
      </div>

      {/* Center Graph Canvas */}
      <div className="relative flex-1 my-3 border border-white/10 bg-white/[0.02] p-4 flex items-center justify-center">
        {/* SVG Edges */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 200">
          <line x1="200" y1="100" x2="100" y2="50" stroke="#C8F135" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
          <line x1="200" y1="100" x2="300" y2="50" stroke="#C8F135" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
          <line x1="200" y1="100" x2="100" y2="150" stroke="#38BDF8" strokeWidth="1.5" opacity="0.4" />
          <line x1="200" y1="100" x2="300" y2="150" stroke="#38BDF8" strokeWidth="1.5" opacity="0.4" />
          <line x1="100" y1="50" x2="100" y2="150" stroke="white" strokeWidth="1" opacity="0.15" />
          <line x1="300" y1="50" x2="300" y2="150" stroke="white" strokeWidth="1" opacity="0.15" />
        </svg>

        {/* Central Root Node */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="px-3 py-1.5 bg-avorria-black border border-avorria-signal shadow-lg flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-avorria-signal" />
            <span className="font-mono text-[10px] text-avorria-signal font-semibold tracking-wider">ROOT // /</span>
          </div>
        </div>

        {/* Hub Nodes */}
        <div className="absolute top-4 left-6 px-2 py-1 bg-avorria-black/90 border border-white/20 font-mono text-[9px] text-white">
          /WORK (CORE)
        </div>
        <div className="absolute top-4 right-6 px-2 py-1 bg-avorria-black/90 border border-white/20 font-mono text-[9px] text-white">
          /SERVICES (TIER 1)
        </div>
        <div className="absolute bottom-4 left-6 px-2 py-1 bg-avorria-black/90 border border-white/20 font-mono text-[9px] text-white/70">
          /INTELLIGENCE
        </div>
        <div className="absolute bottom-4 right-6 px-2 py-1 bg-avorria-black/90 border border-white/20 font-mono text-[9px] text-white/70">
          /STUDIO
        </div>
      </div>

      {/* Bottom Instrumentation */}
      <div className="flex items-center justify-between font-mono text-[9px] text-avorria-quiet uppercase tracking-wider border-t border-avorria-line/30 pt-2">
        <span>SCHEMA: JSON-LD VALID</span>
        <span className="text-avorria-signal font-medium">AUTHORITY: MAX</span>
      </div>
    </div>
  );
}

/**
 * Visual Primitive for 03 / SYSTEMS
 * Closed-loop autonomous pipeline flow
 */
export function SystemsPipelineVisual() {
  return (
    <div className="relative w-full max-w-[540px] aspect-[4/3] border border-avorria-line/40 bg-avorria-black/60 p-5 overflow-hidden flex flex-col justify-between select-none">
      {/* Top Telemetry */}
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-avorria-quiet border-b border-avorria-line/30 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-avorria-signal animate-pulse" />
          <span className="text-avorria-signal">AUTONOMOUS_PIPELINE // ACTIVE</span>
        </div>
        <span className="text-white/60">LATENCY: 14MS</span>
      </div>

      {/* Center Pipeline Blocks */}
      <div className="relative flex-1 my-3 border border-white/10 bg-white/[0.02] p-4 flex flex-col justify-center gap-3">
        {/* Stage 1: Ingestion */}
        <div className="flex items-center justify-between border border-white/10 bg-white/[0.02] px-3 py-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[9px] text-white/40">01</span>
            <span className="font-mono text-[10px] text-white font-medium">DATA_STREAM // INGEST</span>
          </div>
          <span className="font-mono text-[9px] text-emerald-400">SYNCED</span>
        </div>

        {/* Flow Indicator */}
        <div className="flex justify-center -my-1">
          <span className="font-mono text-[9px] text-avorria-signal">↓</span>
        </div>

        {/* Stage 2: AI Inference */}
        <div className="flex items-center justify-between border border-avorria-signal/40 bg-avorria-signal/[0.05] px-3 py-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[9px] text-avorria-signal">02</span>
            <span className="font-mono text-[10px] text-avorria-signal font-medium">NEURAL_INFERENCE // REASONING</span>
          </div>
          <span className="font-mono text-[9px] text-avorria-signal font-semibold">99.4% CONF</span>
        </div>

        {/* Flow Indicator */}
        <div className="flex justify-center -my-1">
          <span className="font-mono text-[9px] text-avorria-signal">↓</span>
        </div>

        {/* Stage 3: Closed-loop Action */}
        <div className="flex items-center justify-between border border-white/10 bg-white/[0.02] px-3 py-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[9px] text-white/40">03</span>
            <span className="font-mono text-[10px] text-white font-medium">EXECUTION // CLOSED_LOOP</span>
          </div>
          <span className="font-mono text-[9px] text-emerald-400">DISPATCHED</span>
        </div>
      </div>

      {/* Bottom Instrumentation */}
      <div className="flex items-center justify-between font-mono text-[9px] text-avorria-quiet uppercase tracking-wider border-t border-avorria-line/30 pt-2">
        <span>SUPERVISION: HUMAN-IN-LOOP</span>
        <span className="text-avorria-signal font-medium">CYCLE: CONTINUOUS</span>
      </div>
    </div>
  );
}

/**
 * HOME CAPABILITY CHAPTER
 *
 * Full-screen spatial composition spanning the complete SceneSafeFrame width.
 * Replaces the old centered-slide look with a commanding 12-column editorial layout.
 */
export function HomeCapabilityChapter({
  capability,
  containerRef,
  visual,
}: HomeCapabilityChapterProps) {
  return (
    <article
      ref={containerRef}
      className="absolute inset-0 w-full h-full flex flex-col justify-between pointer-events-none select-none opacity-0 invisible"
      aria-label={`${capability.chapterNumber} — ${capability.title}`}
    >
      {/* 1. Header Row (Full Safe-Frame Width) */}
      <div className="w-full flex items-center justify-between font-mono text-xs uppercase tracking-widest text-avorria-quiet border-b border-avorria-line/40 pb-4">
        <span className="text-avorria-signal font-medium">
          {capability.chapterNumber}
        </span>
        <span className="text-avorria-white font-medium">
          {capability.category}
        </span>
      </div>

      {/* 2. 12-Column Spatial Editorial Body */}
      <div className="w-full flex-1 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-6 lg:py-8">
        {/* Left Column (Columns 1–7): Title, Editorial Description, Services */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Large Capability Title */}
          <h3
            className="tracking-tight leading-none text-avorria-white font-bold"
            style={{ fontSize: "clamp(5rem, 11vw, 12rem)" }}
          >
            {capability.title}
            <span className="text-avorria-signal">.</span>
          </h3>

          {/* Primary Statement */}
          <p className="text-xl sm:text-2xl lg:text-3xl font-light text-avorria-white/90 leading-snug max-w-[760px] mt-6 sm:mt-8">
            {capability.description}
          </p>

          {/* Service Line */}
          <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-2 font-mono text-xs sm:text-sm text-avorria-signal uppercase tracking-widest mt-6 sm:mt-8">
            {capability.services.map((service, idx) => (
              <React.Fragment key={service}>
                <span>{service}</span>
                {idx < capability.services.length - 1 && (
                  <span className="text-white/30">•</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Right Column (Columns 8–12): High-Precision Visual Primitive */}
        <div className="lg:col-span-5 hidden lg:flex items-center justify-center">
          {visual}
        </div>
        </div>
      </div>

      {/* 3. Footer Row (Full Safe-Frame Width) */}
      <div className="w-full flex items-center justify-between border-t border-avorria-line/40 pt-4 font-mono text-xs">
        <span className="text-avorria-quiet uppercase tracking-wider hidden sm:inline-block">
          {capability.footerStatement}
        </span>
        <div className="pointer-events-auto ml-auto sm:ml-0">
          <Link
            href={capability.href}
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-avorria-signal uppercase tracking-widest hover:underline"
          >
            <span>{capability.ctaLabel}</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
