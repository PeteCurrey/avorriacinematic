"use client";
import React from "react";
import Link from "next/link";
import { useReducedMotion } from "@/providers/ReducedMotionProvider";
import { getSceneConfig } from "./registry";
import { INTELLIGENCE_ARTICLES } from "@/lib/scenes/intelligence-config";
import { IntelligenceIntro } from "./intelligence/IntelligenceIntro";
import { IntelligenceFeature } from "./intelligence/IntelligenceFeature";
import { IntelligenceFallback } from "./intelligence/IntelligenceFallback";
import { CursorTrigger } from "@/providers/CursorContext";

export function Scene17Intelligence() {
  const { effectiveReducedMotion } = useReducedMotion();
  const config = getSceneConfig("scene-17-intelligence")!;

  if (effectiveReducedMotion) {
    return (
      <section id={config.id} data-scene-id={config.id} data-scene-index="17">
        <IntelligenceFallback />
      </section>
    );
  }

  const dominantArticle = INTELLIGENCE_ARTICLES[0];
  const secondaryArticles = INTELLIGENCE_ARTICLES.slice(1);

  return (
    <section
      id={config.id}
      data-scene-id={config.id}
      data-scene-index="17"
      className="relative w-full bg-avorria-black select-none border-t border-avorria-line"
    >
      {/* Semantic Accessibility Heading */}
      <h2 className="sr-only">
        Intelligence — Editorial Insights on Search, AI Systems and Digital Strategy
      </h2>

      {/* Section Intro */}
      <IntelligenceIntro />

      {/* Editorial Grid (1 Dominant + 2 Secondary) */}
      <div className="max-w-[1760px] mx-auto px-6 sm:px-12 py-16 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {dominantArticle && (
          <IntelligenceFeature article={dominantArticle} isDominant={true} />
        )}
        <div className="lg:col-span-4 flex flex-col gap-8">
          {secondaryArticles.map((art) => (
            <IntelligenceFeature key={art.id} article={art} isDominant={false} />
          ))}
        </div>
      </div>

      {/* Section Footer & Explore Action */}
      <div className="w-full max-w-[1760px] mx-auto px-6 sm:px-12 py-12 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-avorria-line">
        <div className="font-mono text-xs text-avorria-quiet uppercase tracking-widest">
          03 PUBLISHED ESSAYS // INTELLIGENCE REGISTRY
        </div>
        <CursorTrigger state="view" label="INDEX">
          <Link
            href="/intelligence"
            className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-avorria-signal hover:text-avorria-white border-b border-avorria-signal pb-1 transition-colors"
          >
            <span>EXPLORE INTELLIGENCE</span>
            <span>→</span>
          </Link>
        </CursorTrigger>
      </div>

      {/* Finale Signal Line Handoff Anchor (Scene 18 Callback) */}
      <div className="w-full max-w-[1760px] mx-auto px-6 sm:px-12 pt-8 pb-16 flex justify-between items-center font-mono text-xs text-avorria-quiet uppercase tracking-widest border-b border-avorria-line">
        <span>THINKING COMPLETE</span>
        <span className="text-avorria-signal">18 / FINALE // NEXT PHASE</span>
      </div>
    </section>
  );
}
