"use client";

import React, { useState } from "react";
import Link from "next/link";
import type { HeroMode, CaseStudyConfig } from "@/types/case-study";
import { DEV_SYNTHETIC_FIXTURE } from "@/lib/case-studies/fixture";
import { CASE_STUDIES } from "@/lib/case-studies/registry";
import { CaseStudyShell } from "@/components/case-study/CaseStudyShell";
import { CaseStudyHero } from "@/components/case-study/CaseStudyHero";
import { CaseStudyMeta } from "@/components/case-study/CaseStudyMeta";
import { CaseStudyChapterRenderer } from "@/components/case-study/CaseStudyChapterRenderer";
import { CaseStudyNextProject } from "@/components/case-study/CaseStudyNextProject";
import { CaseStudyFooter } from "@/components/case-study/CaseStudyFooter";

const HERO_MODES: HeroMode[] = [
  "PRODUCT",
  "HUMAN",
  "SPATIAL",
  "INTERFACE",
  "DATA_DENSE",
  "TRANSFORMATION",
  "TYPOGRAPHIC"
];

const THEME_PRESETS = [
  { label: "Avorria Dark", accent: "#C8F135", bg: "#080808", fg: "#F3F3F0" },
  { label: "CareerOS Blue", accent: "#38BDF8", bg: "#090D14", fg: "#F0F6FC" },
  { label: "NestIQ Emerald", accent: "#34D399", bg: "#081018", fg: "#F0FDF4" },
  { label: "Drawdown Amber", accent: "#F59E0B", bg: "#0A0A0B", fg: "#FAFAFA" },
  { label: "EntireFM Cobalt", accent: "#60A5FA", bg: "#080C14", fg: "#F8FAFC" },
  { label: "OGN Slate", accent: "#E2E8F0", bg: "#0D0F12", fg: "#F8FAFC" }
];

export default function DevCaseStudyPage() {
  const [activeHeroMode, setActiveHeroMode] = useState<HeroMode>("PRODUCT");
  const [activeTheme, setActiveTheme] = useState(THEME_PRESETS[0]);
  const [selectedProjectKey, setSelectedProjectKey] = useState<string>("fixture");

  // Determine base config
  const baseConfig: CaseStudyConfig =
    selectedProjectKey === "fixture"
      ? DEV_SYNTHETIC_FIXTURE
      : CASE_STUDIES[selectedProjectKey] || DEV_SYNTHETIC_FIXTURE;

  // Clone with overrides for interactive testing
  const activeConfig: CaseStudyConfig = {
    ...baseConfig,
    heroMode: activeHeroMode,
    theme: {
      ...baseConfig.theme,
      background: activeTheme.bg,
      foreground: activeTheme.fg,
      accent: activeTheme.accent,
      signalColour: activeTheme.accent
    }
  };

  return (
    <div className="min-h-screen bg-avorria-black text-avorria-white pt-24 font-mono text-xs">
      {/* Dev Lab Control Bar */}
      <div className="sticky top-0 z-[100] bg-neutral-900 border-b border-avorria-signal p-4 space-y-4 shadow-2xl">
        <div className="max-w-[1760px] mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="bg-avorria-signal text-avorria-black px-2 py-0.5 font-bold uppercase text-[10px]">
              DEV LAB
            </span>
            <span className="font-bold text-avorria-white uppercase">
              PHASE 24 // CASE STUDY FRAMEWORK TEST HARNESS
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/dev/timeline"
              className="text-avorria-signal hover:underline uppercase text-[11px]"
            >
              ← MASTER TIMELINE
            </Link>
            <Link
              href="/work"
              className="text-avorria-white hover:underline uppercase text-[11px]"
            >
              /WORK INDEX →
            </Link>
          </div>
        </div>

        {/* Interactive Controls */}
        <div className="max-w-[1760px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-neutral-800 text-[11px]">
          {/* 01 // Project Preset */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-neutral-400">PROJECT:</span>
            <button
              onClick={() => {
                setSelectedProjectKey("fixture");
                setActiveHeroMode("PRODUCT");
                setActiveTheme(THEME_PRESETS[0]);
              }}
              className={`px-2 py-1 border ${
                selectedProjectKey === "fixture"
                  ? "border-avorria-signal bg-avorria-signal/20 text-avorria-signal font-bold"
                  : "border-neutral-700 text-neutral-300 hover:border-neutral-500"
              }`}
            >
              SYNTHETIC FIXTURE
            </button>
            {Object.keys(CASE_STUDIES).map((k) => (
              <button
                key={k}
                onClick={() => {
                  setSelectedProjectKey(k);
                  const cs = CASE_STUDIES[k];
                  if (cs) {
                    setActiveHeroMode(cs.heroMode);
                    const matchingTheme = THEME_PRESETS.find((t) => t.accent.toLowerCase() === cs.theme.accent.toLowerCase());
                    if (matchingTheme) setActiveTheme(matchingTheme);
                  }
                }}
                className={`px-2 py-1 border ${
                  selectedProjectKey === k
                    ? "border-avorria-signal bg-avorria-signal/20 text-avorria-signal font-bold"
                    : "border-neutral-700 text-neutral-300 hover:border-neutral-500"
                }`}
              >
                {CASE_STUDIES[k].canonicalTitle}
              </button>
            ))}
          </div>

          {/* 02 // Hero Mode Switcher */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-neutral-400">HERO MODE:</span>
            {HERO_MODES.map((mode) => (
              <button
                key={mode}
                onClick={() => setActiveHeroMode(mode)}
                className={`px-2 py-1 border ${
                  activeHeroMode === mode
                    ? "border-blue-400 bg-blue-500/20 text-blue-300 font-bold"
                    : "border-neutral-700 text-neutral-300 hover:border-neutral-500"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* 03 // Theme Switcher */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-neutral-400">THEME:</span>
            {THEME_PRESETS.map((t) => (
              <button
                key={t.label}
                onClick={() => setActiveTheme(t)}
                className={`px-2 py-1 border flex items-center gap-1.5 ${
                  activeTheme.label === t.label
                    ? "border-emerald-400 bg-emerald-500/20 text-emerald-300 font-bold"
                    : "border-neutral-700 text-neutral-300 hover:border-neutral-500"
                }`}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: t.accent }} />
                <span>{t.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Live Case Study Preview */}
      <div className="w-full">
        <CaseStudyShell config={activeConfig}>
          <CaseStudyHero config={activeConfig} />
          <CaseStudyMeta config={activeConfig} />
          <CaseStudyChapterRenderer chapters={activeConfig.chapters} />
          <CaseStudyNextProject nextProject={activeConfig.nextProject} />
          <CaseStudyFooter projectTitle={activeConfig.canonicalTitle} />
        </CaseStudyShell>
      </div>
    </div>
  );
}
