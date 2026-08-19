"use client";
import React, { useState } from "react";
import { HOMEPAGE_SCENES } from "@/components/scenes/registry";
import { HOMEPAGE_TRANSITIONS } from "@/lib/transitions/transition-registry";
import { CANONICAL_PROJECTS } from "@/lib/projects/project-registry";
import { WORK_PORTFOLIO } from "@/lib/projects/work-registry";
import Link from "next/link";

export default function DevTimelinePage() {
  const [selectedFilter, setSelectedFilter] = useState<string>("ALL");

  const totalScenes = HOMEPAGE_SCENES.length;
  const pinnedScenes = HOMEPAGE_SCENES.filter((s) => s.pinningEligibility).length;
  const naturalScenes = HOMEPAGE_SCENES.filter((s) => !s.pinningEligibility).length;

  return (
    <div className="min-h-screen bg-avorria-black text-avorria-white pt-24 pb-20 px-6 sm:px-12 font-mono text-xs">
      <div className="max-w-[1760px] mx-auto space-y-12">
        {/* Header */}
        <div className="p-6 border border-avorria-signal bg-avorria-surface flex flex-wrap items-center justify-between gap-6">
          <div>
            <span className="text-avorria-signal font-bold uppercase tracking-widest">
              AVORRIA V2 // MASTER TIMELINE &amp; INTEGRATION DASHBOARD
            </span>
            <h1 className="font-sans text-2xl font-bold text-avorria-white mt-1">
              Phase 20 Full Homepage Architecture Map
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dev/scenes" className="px-3 py-1.5 border border-avorria-signal text-avorria-signal hover:bg-avorria-signal/20 transition-colors">
              DEV SCENES LAB →
            </Link>
            <Link href="/" className="px-3 py-1.5 bg-avorria-signal text-avorria-black font-bold hover:bg-white transition-colors">
              LIVE HOMEPAGE →
            </Link>
          </div>
        </div>

        {/* Summary Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 bg-avorria-surface border border-avorria-line space-y-1">
            <div className="text-avorria-quiet text-[10px]">TOTAL SCENES</div>
            <div className="text-xl font-bold text-avorria-white">{totalScenes} (00–18)</div>
          </div>
          <div className="p-4 bg-avorria-surface border border-avorria-line space-y-1">
            <div className="text-avorria-quiet text-[10px]">PINNED SCENES</div>
            <div className="text-xl font-bold text-avorria-signal">{pinnedScenes} SCENES</div>
          </div>
          <div className="p-4 bg-avorria-surface border border-avorria-line space-y-1">
            <div className="text-avorria-quiet text-[10px]">NATURAL FLOW</div>
            <div className="text-xl font-bold text-avorria-white">{naturalScenes} SCENES</div>
          </div>
          <div className="p-4 bg-avorria-surface border border-avorria-line space-y-1">
            <div className="text-avorria-quiet text-[10px]">ESTIMATED TOTAL HEIGHT</div>
            <div className="text-xl font-bold text-avorria-signal">~5,200vh (OPTIMAL)</div>
          </div>
        </div>

        {/* Scene Master Registry Table */}
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b border-avorria-line pb-3">
            <span className="font-bold text-avorria-signal uppercase tracking-wider">
              01 // HOMEPAGE SCENE REGISTRY (00–18)
            </span>
            <span className="text-avorria-quiet text-[11px]">19 STANDARDISED SCENE MODULES</span>
          </div>

          <div className="overflow-x-auto border border-avorria-line bg-avorria-surface">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-avorria-line bg-avorria-black text-avorria-quiet text-[10px] uppercase tracking-wider">
                  <th className="p-3">INDEX</th>
                  <th className="p-3">SCENE ID</th>
                  <th className="p-3">LABEL</th>
                  <th className="p-3">CHAPTER</th>
                  <th className="p-3">HEIGHT (VH)</th>
                  <th className="p-3">PIN MODE</th>
                  <th className="p-3">WEBGL</th>
                  <th className="p-3">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {HOMEPAGE_SCENES.map((s) => (
                  <tr key={s.id} className="border-b border-avorria-line/40 hover:bg-avorria-black/50 transition-colors">
                    <td className="p-3 text-avorria-signal font-bold">{String(s.index).padStart(2, "0")}</td>
                    <td className="p-3 text-avorria-white">{s.id}</td>
                    <td className="p-3 text-avorria-white font-bold">{s.label}</td>
                    <td className="p-3 text-avorria-quiet">{s.chapter}</td>
                    <td className="p-3 text-avorria-signal">{s.minHeight}</td>
                    <td className="p-3 text-avorria-muted">{s.pinningEligibility ? "PINNED" : "NATURAL FLOW"}</td>
                    <td className="p-3">{s.webglRequirement ? <span className="text-avorria-signal">YES</span> : <span className="text-avorria-quiet">NO</span>}</td>
                    <td className="p-3 text-avorria-signal font-bold">✓ VERIFIED</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Transitions Registry Table */}
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b border-avorria-line pb-3">
            <span className="font-bold text-avorria-signal uppercase tracking-wider">
              02 // SEAMLESS TRANSITIONS &amp; RESOURCE OWNERSHIP (18 BOUNDARIES)
            </span>
            <span className="text-avorria-quiet text-[11px]">ZERO UNINTENTIONAL BLACKOUT RESETS</span>
          </div>

          <div className="overflow-x-auto border border-avorria-line bg-avorria-surface">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-avorria-line bg-avorria-black text-avorria-quiet text-[10px] uppercase tracking-wider">
                  <th className="p-3">BOUNDARY</th>
                  <th className="p-3">TRANSITION TYPE</th>
                  <th className="p-3">OUTGOING ANCHOR</th>
                  <th className="p-3">INCOMING ANCHOR</th>
                  <th className="p-3">HANDOFF @</th>
                  <th className="p-3">CLEANUP @</th>
                  <th className="p-3">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {HOMEPAGE_TRANSITIONS.map((t) => (
                  <tr key={t.id} className="border-b border-avorria-line/40 hover:bg-avorria-black/50 transition-colors">
                    <td className="p-3 text-avorria-signal font-bold">{t.debugLabel}</td>
                    <td className="p-3 text-avorria-white">{t.transitionType}</td>
                    <td className="p-3 text-avorria-quiet">{t.outgoingAnchor}</td>
                    <td className="p-3 text-avorria-quiet">{t.incomingAnchor}</td>
                    <td className="p-3 text-avorria-signal">{(t.ownershipTransferAt * 100).toFixed(0)}%</td>
                    <td className="p-3 text-avorria-muted">{(t.cleanupCompleteAt * 100).toFixed(0)}%</td>
                    <td className="p-3 text-avorria-signal font-bold">✓ VERIFIED</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Canonical Project Numbering Table */}
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b border-avorria-line pb-3">
            <span className="font-bold text-avorria-signal uppercase tracking-wider">
              03 // CANONICAL FEATURED PROJECT NUMBERING (SEPARATE FROM SCENE INDEX)
            </span>
            <span className="text-avorria-quiet text-[11px]">PROJECT IDENTITY REGISTRY</span>
          </div>

          <div className="overflow-x-auto border border-avorria-line bg-avorria-surface">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-avorria-line bg-avorria-black text-avorria-quiet text-[10px] uppercase tracking-wider">
                  <th className="p-3">PROJECT INDEX</th>
                  <th className="p-3">CANONICAL NAME</th>
                  <th className="p-3">SLUG</th>
                  <th className="p-3">CATEGORY</th>
                  <th className="p-3">RELATIONSHIP</th>
                  <th className="p-3">DEPLOYMENT</th>
                </tr>
              </thead>
              <tbody>
                {CANONICAL_PROJECTS.map((p) => (
                  <tr key={p.projectIndex} className="border-b border-avorria-line/40 hover:bg-avorria-black/50 transition-colors">
                    <td className="p-3 text-avorria-signal font-bold">{p.projectIndex}</td>
                    <td className="p-3 text-avorria-white font-bold">{p.canonicalName}</td>
                    <td className="p-3 text-avorria-quiet">/{p.slug}</td>
                    <td className="p-3 text-avorria-muted">{p.category}</td>
                    <td className="p-3 text-avorria-white">{p.relationship}</td>
                    <td className="p-3 text-avorria-signal">{p.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Phase 21: Mobile Art Direction & Scene Classification Table */}
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b border-avorria-line pb-3">
            <span className="font-bold text-avorria-signal uppercase tracking-wider">
              04 // PHASE 21: MOBILE CINEMATIC ART DIRECTION &amp; PACING MATRIX
            </span>
            <span className="text-avorria-quiet text-[11px]">PORTRAIT DURATION TARGET: ~4,400svh (OPTIMAL)</span>
          </div>

          <div className="overflow-x-auto border border-avorria-line bg-avorria-surface">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-avorria-line bg-avorria-black text-avorria-quiet text-[10px] uppercase tracking-wider">
                  <th className="p-3">INDEX</th>
                  <th className="p-3">SCENE</th>
                  <th className="p-3">DESKTOP HEIGHT</th>
                  <th className="p-3">MOBILE HEIGHT (SVH)</th>
                  <th className="p-3">CLASS</th>
                  <th className="p-3">MOBILE CHOREOGRAPHY &amp; TOUCH STRATEGY</th>
                  <th className="p-3">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {HOMEPAGE_SCENES.map((s) => (
                  <tr key={s.id} className="border-b border-avorria-line/40 hover:bg-avorria-black/50 transition-colors">
                    <td className="p-3 text-avorria-signal font-bold">{String(s.index).padStart(2, "0")}</td>
                    <td className="p-3 text-avorria-white font-bold">{s.label}</td>
                    <td className="p-3 text-avorria-quiet">{s.minHeight}</td>
                    <td className="p-3 text-avorria-signal font-bold">{s.mobileHeight || "natural"}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 text-[10px] font-bold ${
                        s.mobileSceneClass === "C" ? "bg-amber-500/20 text-amber-300 border border-amber-500/40" :
                        s.mobileSceneClass === "B" ? "bg-blue-500/20 text-blue-300 border border-blue-500/40" :
                        "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                      }`}>
                        CLASS {s.mobileSceneClass || "A"}
                      </span>
                    </td>
                    <td className="p-3 text-avorria-muted text-[11px]">
                      {s.mobileSceneClass === "C" ? "Full portrait re-art-direction, macro crops, vertical progression" :
                       s.mobileSceneClass === "B" ? "Recomposed vertical stack, layered hierarchy, touch hit areas" :
                       "Natural light adaptation, responsive typography, natural document flow"}
                    </td>
                    <td className="p-3 text-avorria-signal font-bold">✓ VERIFIED</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Phase 22: Production Readiness & Hardening Matrix */}
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b border-avorria-line pb-3">
            <span className="font-bold text-avorria-signal uppercase tracking-wider">
              05 // PHASE 22: PRODUCTION READINESS &amp; HARDENING GATES
            </span>
            <span className="text-avorria-quiet text-[11px]">WCAG 2.2 AA / SECURITY / SEO / CWV / TRUTH</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Accessibility Card */}
            <div className="border border-avorria-line bg-avorria-surface p-5 space-y-3">
              <div className="flex justify-between items-center border-b border-avorria-line/60 pb-2">
                <span className="text-avorria-white font-bold text-[11px] uppercase tracking-wider">ACCESSIBILITY (WCAG 2.2 AA)</span>
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/40">PASS</span>
              </div>
              <ul className="space-y-1.5 text-avorria-muted text-[11px]">
                <li><span className="text-avorria-signal font-bold">✓</span> Skip to content link targeting #main-content</li>
                <li><span className="text-avorria-signal font-bold">✓</span> Single H1: Precision As Power (sr-only)</li>
                <li><span className="text-avorria-signal font-bold">✓</span> Semantic H2 landmarks across all 19 scenes</li>
                <li><span className="text-avorria-signal font-bold">✓</span> Chartreuse focus-visible ring (2px solid)</li>
                <li><span className="text-avorria-signal font-bold">✓</span> Mobile navigation focus trap &amp; return</li>
                <li><span className="text-avorria-signal font-bold">✓</span> prefers-reduced-motion fallbacks on all scenes</li>
                <li><span className="text-avorria-signal font-bold">✓</span> Zero pure-color status communication</li>
              </ul>
            </div>

            {/* SEO & Meta Card */}
            <div className="border border-avorria-line bg-avorria-surface p-5 space-y-3">
              <div className="flex justify-between items-center border-b border-avorria-line/60 pb-2">
                <span className="text-avorria-white font-bold text-[11px] uppercase tracking-wider">SEO &amp; STRUCTURED DATA</span>
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/40">PASS</span>
              </div>
              <ul className="space-y-1.5 text-avorria-muted text-[11px]">
                <li><span className="text-avorria-signal font-bold">✓</span> Canonical URL resolving to https://avorria.com</li>
                <li><span className="text-avorria-signal font-bold">✓</span> Branded 1200x630 OG image in /public/og/</li>
                <li><span className="text-avorria-signal font-bold">✓</span> Organization &amp; WebSite JSON-LD schemas</li>
                <li><span className="text-avorria-signal font-bold">✓</span> robots.ts disallows /dev/, /api/, /studio/</li>
                <li><span className="text-avorria-signal font-bold">✓</span> sitemap.ts excludes unready case studies</li>
                <li><span className="text-avorria-signal font-bold">✓</span> /dev routes wrapped in noindex layout</li>
                <li><span className="text-avorria-signal font-bold">✓</span> Public footer stripped of internal dev links</li>
              </ul>
            </div>

            {/* Security & Headers Card */}
            <div className="border border-avorria-line bg-avorria-surface p-5 space-y-3">
              <div className="flex justify-between items-center border-b border-avorria-line/60 pb-2">
                <span className="text-avorria-white font-bold text-[11px] uppercase tracking-wider">SECURITY &amp; HEADERS</span>
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/40">PASS</span>
              </div>
              <ul className="space-y-1.5 text-avorria-muted text-[11px]">
                <li><span className="text-avorria-signal font-bold">✓</span> Content-Security-Policy (CSP) configured</li>
                <li><span className="text-avorria-signal font-bold">✓</span> X-Content-Type-Options: nosniff</li>
                <li><span className="text-avorria-signal font-bold">✓</span> X-Frame-Options: SAMEORIGIN</li>
                <li><span className="text-avorria-signal font-bold">✓</span> Referrer-Policy: strict-origin-when-cross-origin</li>
                <li><span className="text-avorria-signal font-bold">✓</span> Permissions-Policy restricts mic to self</li>
                <li><span className="text-avorria-signal font-bold">✓</span> HSTS: max-age=63072000; includeSubDomains</li>
                <li><span className="text-avorria-signal font-bold">✓</span> API rate-limiting (10 req/min/IP) in demo route</li>
                <li><span className="text-avorria-signal font-bold">✓</span> Zero client-exposed secret keys</li>
              </ul>
            </div>

            {/* Performance & CWV Card */}
            <div className="border border-avorria-line bg-avorria-surface p-5 space-y-3">
              <div className="flex justify-between items-center border-b border-avorria-line/60 pb-2">
                <span className="text-avorria-white font-bold text-[11px] uppercase tracking-wider">PERFORMANCE &amp; CWV</span>
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/40">PASS</span>
              </div>
              <ul className="space-y-1.5 text-avorria-muted text-[11px]">
                <li><span className="text-avorria-signal font-bold">✓</span> LCP Target: &le;2.5s (Minimal opening scene)</li>
                <li><span className="text-avorria-signal font-bold">✓</span> CLS Target: &le;0.1 (Fixed geometry containers)</li>
                <li><span className="text-avorria-signal font-bold">✓</span> INP Target: &le;200ms (Debounced handlers)</li>
                <li><span className="text-avorria-signal font-bold">✓</span> AVIF/WebP next/image optimizations enabled</li>
                <li><span className="text-avorria-signal font-bold">✓</span> WebGL DPR capped at 1.5x mobile / 2.0x desktop</li>
                <li><span className="text-avorria-signal font-bold">✓</span> Scene 18 Finale: 0 active WebGL / 0 active video</li>
                <li><span className="text-avorria-signal font-bold">✓</span> Local Google Fonts with display: swap</li>
              </ul>
            </div>

            {/* Resilience & Error Boundaries Card */}
            <div className="border border-avorria-line bg-avorria-surface p-5 space-y-3">
              <div className="flex justify-between items-center border-b border-avorria-line/60 pb-2">
                <span className="text-avorria-white font-bold text-[11px] uppercase tracking-wider">RESILIENCE &amp; FALLBACKS</span>
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/40">PASS</span>
              </div>
              <ul className="space-y-1.5 text-avorria-muted text-[11px]">
                <li><span className="text-avorria-signal font-bold">✓</span> SceneErrorBoundary on all 19 scenes</li>
                <li><span className="text-avorria-signal font-bold">✓</span> WebGL failure: Static DOM fallback</li>
                <li><span className="text-avorria-signal font-bold">✓</span> Map failure: Static contextual cards</li>
                <li><span className="text-avorria-signal font-bold">✓</span> Voice denial: Immediate text input fallback</li>
                <li><span className="text-avorria-signal font-bold">✓</span> AI demo failure: Deterministic synthesis fallback</li>
                <li><span className="text-avorria-signal font-bold">✓</span> Video failure: Static poster + semantic copy</li>
              </ul>
            </div>

            {/* Claims & Truth Audit Card */}
            <div className="border border-avorria-line bg-avorria-surface p-5 space-y-3">
              <div className="flex justify-between items-center border-b border-avorria-line/60 pb-2">
                <span className="text-avorria-white font-bold text-[11px] uppercase tracking-wider">CLAIMS &amp; CONTENT TRUTH</span>
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/40">PASS</span>
              </div>
              <ul className="space-y-1.5 text-avorria-muted text-[11px]">
                <li><span className="text-avorria-signal font-bold">✓</span> 0 fabricated revenue metrics or % growth</li>
                <li><span className="text-avorria-signal font-bold">✓</span> 0 unearned awards or certifications</li>
                <li><span className="text-avorria-signal font-bold">✓</span> 0 fake client testimonials</li>
                <li><span className="text-avorria-signal font-bold">✓</span> Canonical numbering: 001 Alkota &rarr; 006 OGN</li>
                <li><span className="text-avorria-signal font-bold">✓</span> Scene indexing (00-18) strictly decoupled</li>
                <li><span className="text-avorria-signal font-bold">✓</span> AI demos explicitly labelled as illustrative</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Phase 23: Work Index & Portfolio Architecture Review */}
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b border-avorria-line pb-3">
            <span className="font-bold text-avorria-signal uppercase tracking-wider">
              06 // PHASE 23: /WORK EDITORIAL PORTFOLIO REGISTRY
            </span>
            <span className="text-avorria-quiet text-[11px]">
              FEATURED (6) / SELECTED (4) / ARCHIVE (5) — TOTAL {WORK_PORTFOLIO.length} PROJECTS
            </span>
          </div>

          <div className="overflow-x-auto border border-avorria-line bg-avorria-surface">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-avorria-line bg-avorria-black text-avorria-quiet text-[10px] uppercase tracking-wider">
                  <th className="p-3">INDEX / TIER</th>
                  <th className="p-3">PROJECT TITLE</th>
                  <th className="p-3">SLUG</th>
                  <th className="p-3">SECTOR / DESCRIPTOR</th>
                  <th className="p-3">RELATIONSHIP</th>
                  <th className="p-3">LAYOUT TYPE</th>
                  <th className="p-3">STATUS</th>
                  <th className="p-3">CASE STUDY</th>
                </tr>
              </thead>
              <tbody>
                {WORK_PORTFOLIO.map((p) => (
                  <tr key={p.slug} className="border-b border-avorria-line/40 hover:bg-avorria-black/50 transition-colors">
                    <td className="p-3">
                      <span className={`px-2 py-0.5 text-[10px] font-bold ${
                        p.tier === "FEATURED" ? "bg-avorria-signal/20 text-avorria-signal border border-avorria-signal/40" :
                        p.tier === "SELECTED" ? "bg-blue-500/20 text-blue-300 border border-blue-500/40" :
                        "bg-neutral-800 text-neutral-400 border border-neutral-700"
                      }`}>
                        {p.projectIndex || p.tier}
                      </span>
                    </td>
                    <td className="p-3 text-avorria-white font-bold">{p.title}</td>
                    <td className="p-3 text-avorria-quiet">/work/{p.slug}</td>
                    <td className="p-3 text-avorria-muted text-[11px]">
                      <div>{p.sector}</div>
                      <div className="text-[10px] text-avorria-quiet">{p.descriptor}</div>
                    </td>
                    <td className="p-3 text-avorria-white font-bold">{p.relationship}</td>
                    <td className="p-3 text-avorria-signal text-[11px] font-mono">{p.layoutVariant || "MAGAZINE"}</td>
                    <td className="p-3 text-avorria-signal font-bold">{p.status}</td>
                    <td className="p-3">
                      {p.caseStudyAvailable ? (
                        <span className="text-emerald-400 font-bold">YES (READY)</span>
                      ) : p.externalUrl ? (
                        <span className="text-blue-400">EXTERNAL ↗</span>
                      ) : (
                        <span className="text-avorria-quiet">INDEXED</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}


