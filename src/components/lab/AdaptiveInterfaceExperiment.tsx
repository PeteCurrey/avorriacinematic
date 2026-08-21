"use client";

import React, { useState } from "react";

type IntentMode = "ARCHITECT" | "EXECUTIVE" | "DESIGNER" | "OPERATOR";

interface ContentBlock {
  id: string;
  category: string;
  title: string;
  content: string;
  metric?: string;
  metricLabel?: string;
  priorityByIntent: Record<IntentMode, number>; // 1 = highest
  badge: string;
}

const CONTENT_BLOCKS: ContentBlock[] = [
  {
    id: "tech-architecture",
    category: "ENGINEERING",
    title: "Server-Side Rendering & Zero-Template Footprint",
    content: "Next.js App Router streaming HTML directly on edge CDNs. Zero runtime CSS overhead, strict TypeScript interfaces, and deterministic memory reclamation.",
    metric: "< 0.8s",
    metricLabel: "EDGE TIME-TO-FIRST-BYTE",
    priorityByIntent: {
      ARCHITECT: 1,
      OPERATOR: 3,
      DESIGNER: 4,
      EXECUTIVE: 5,
    },
    badge: "CORE_ARCHITECTURE"
  },
  {
    id: "commercial-roi",
    category: "BUSINESS",
    title: "High-Intent Customer Conversion Velocity",
    content: "Eliminating friction points in product configuration and direct enquiry funnels. Built for clear commercial ROI without vanity design overhead.",
    metric: "100%",
    metricLabel: "QUALIFIED COMMERCIAL TRAFFIC",
    priorityByIntent: {
      EXECUTIVE: 1,
      OPERATOR: 2,
      ARCHITECT: 5,
      DESIGNER: 4,
    },
    badge: "COMMERCIAL_VALUE"
  },
  {
    id: "spatial-typography",
    category: "DESIGN",
    title: "Surgical Typographic Hierarchy & Optical Kerning",
    content: "Mono-spaced data telemetry paired with authoritative black-weighted display headers. Every pixel calculated for high-contrast legible authority.",
    metric: "60 FPS",
    metricLabel: "GPU INTERACTION CHOREOGRAPHY",
    priorityByIntent: {
      DESIGNER: 1,
      ARCHITECT: 4,
      EXECUTIVE: 4,
      OPERATOR: 5,
    },
    badge: "VISUAL_SYSTEM"
  },
  {
    id: "operational-resilience",
    category: "OPERATIONS",
    title: "Offline-Ready Data Sync & Field State Machine",
    content: "Fail-safe caching, deterministic background queue sync, and durable audit logs designed for mission-critical dispatch and field mobility.",
    metric: "0kb",
    metricLabel: "DATA LOSS IN OFFLINE STATE",
    priorityByIntent: {
      OPERATOR: 1,
      ARCHITECT: 2,
      EXECUTIVE: 3,
      DESIGNER: 6,
    },
    badge: "FIELD_RELIABILITY"
  },
  {
    id: "accessibility-standards",
    category: "STANDARDS",
    title: "WCAG 2.2 AA Compliance & Keyboard Traversal",
    content: "Full screen-reader landmark navigation, high-contrast ratios, semantic DOM trees, and focus state management engineered as default constraints.",
    metric: "100%",
    metricLabel: "KEYBOARD NAVIGABILITY",
    priorityByIntent: {
      DESIGNER: 2,
      ARCHITECT: 3,
      EXECUTIVE: 6,
      OPERATOR: 4,
    },
    badge: "COMPLIANCE"
  },
  {
    id: "economic-efficiency",
    category: "FINANCIAL",
    title: "Zero-Maintenance Long-Term Software Durability",
    content: "Standard web primitives over ephemeral third-party SaaS plugins. Eliminates technical debt and runaway licensing overhead across multi-year lifecycles.",
    metric: "$0",
    metricLabel: "THIRD-PARTY PLUGIN LICENSES",
    priorityByIntent: {
      EXECUTIVE: 2,
      OPERATOR: 6,
      ARCHITECT: 6,
      DESIGNER: 5,
    },
    badge: "CAPITAL_EFFICIENCY"
  }
];

const INTENT_DESCRIPTIONS: Record<IntentMode, { role: string; focus: string }> = {
  ARCHITECT: {
    role: "Technical Architect & CTO",
    focus: "Prioritizes SSR performance, clean crawl trees, TypeScript rigor, and zero framework bloat."
  },
  EXECUTIVE: {
    role: "Founder & Commercial Leader",
    focus: "Prioritizes conversion rates, capital efficiency, market positioning, and revenue leverage."
  },
  DESIGNER: {
    role: "Design Lead & Creative Director",
    focus: "Prioritizes surgical typography, spatial balance, micro-interactions, and accessibility standards."
  },
  OPERATOR: {
    role: "Head of Operations & Logistics",
    focus: "Prioritizes field reliability, deterministic state machines, offline capabilities, and audit trails."
  }
};

export function AdaptiveInterfaceExperiment() {
  const [activeIntent, setActiveIntent] = useState<IntentMode>("ARCHITECT");

  const sortedBlocks = [...CONTENT_BLOCKS].sort(
    (a, b) => a.priorityByIntent[activeIntent] - b.priorityByIntent[activeIntent]
  );

  return (
    <div className="space-y-12">
      {/* Intent Controls */}
      <div className="p-6 sm:p-8 bg-avorria-surface border border-avorria-line space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-avorria-line/40 pb-4">
          <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest">
            01 // DECLARE YOUR INTENT
          </span>
          <span className="font-mono text-[10px] text-avorria-muted uppercase">
            DETERMINISTIC RULE-BASED ADAPTATION (NO FAKE AI)
          </span>
        </div>

        {/* Intent Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {(["ARCHITECT", "EXECUTIVE", "DESIGNER", "OPERATOR"] as IntentMode[]).map((intent) => {
            const isActive = activeIntent === intent;
            return (
              <button
                key={intent}
                onClick={() => setActiveIntent(intent)}
                className={`p-4 text-left border font-mono text-xs uppercase tracking-wider transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-avorria-signal ${
                  isActive
                    ? "bg-avorria-signal text-avorria-black font-bold border-avorria-signal shadow-lg"
                    : "bg-avorria-black/60 text-avorria-muted border-avorria-line hover:border-avorria-white hover:text-avorria-white"
                }`}
              >
                <span className="block text-[10px] opacity-70">INTENT MODE</span>
                <span className="text-sm font-display font-black block mt-1">{intent}</span>
              </button>
            );
          })}
        </div>

        {/* Active Intent Summary */}
        <div className="p-4 bg-avorria-black/70 border border-avorria-line/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="font-mono text-[10px] text-avorria-signal uppercase tracking-widest block">
              ADAPTED PERSPECTIVE: {INTENT_DESCRIPTIONS[activeIntent].role}
            </span>
            <p className="font-body text-xs text-avorria-white/80">
              {INTENT_DESCRIPTIONS[activeIntent].focus}
            </p>
          </div>
          <span className="font-mono text-[10px] text-avorria-quiet uppercase tracking-wider whitespace-nowrap">
            LAYOUT RE-ORDERED INSTANTLY
          </span>
        </div>
      </div>

      {/* Reorganised Content Stream */}
      <div className="space-y-4">
        <div className="flex items-center justify-between font-mono text-xs text-avorria-muted border-b border-avorria-line/40 pb-2">
          <span>REAL-TIME ADAPTED INFORMATION STREAM</span>
          <span>RANKED 01–06 FOR {activeIntent}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedBlocks.map((block, index) => {
            const isTopRank = index === 0;
            return (
              <div
                key={block.id}
                className={`p-6 sm:p-8 bg-avorria-surface border transition-all duration-300 flex flex-col justify-between space-y-6 ${
                  isTopRank
                    ? "border-avorria-signal shadow-[0_0_20px_rgba(77, 159, 255,0.1)] bg-avorria-surface/90"
                    : "border-avorria-line hover:border-avorria-white/40"
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between font-mono text-[10px] border-b border-avorria-line/30 pb-2">
                    <span className="text-avorria-signal font-bold">
                      #{index + 1} PRIORITY // {block.category}
                    </span>
                    <span className="text-avorria-quiet uppercase">{block.badge}</span>
                  </div>

                  <h3 className="font-display font-black text-lg uppercase tracking-tight text-avorria-white">
                    {block.title}
                  </h3>

                  <p className="font-body text-xs text-avorria-white/75 leading-relaxed">
                    {block.content}
                  </p>
                </div>

                {block.metric && (
                  <div className="pt-4 border-t border-avorria-line/30 flex items-baseline justify-between">
                    <div>
                      <div className="font-display font-black text-xl text-avorria-signal">
                        {block.metric}
                      </div>
                      <span className="font-mono text-[9px] text-avorria-muted uppercase">
                        {block.metricLabel}
                      </span>
                    </div>
                    {isTopRank && (
                      <span className="font-mono text-[9px] bg-avorria-signal text-avorria-black px-2 py-0.5 font-bold uppercase">
                        PRIMARY
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
