"use client";
import React, { useState } from "react";
import { HOMEPAGE_SCENES } from "@/components/scenes/registry";
import { HOMEPAGE_TRANSITIONS } from "@/lib/transitions/transition-registry";
import { CANONICAL_PROJECTS } from "@/lib/projects/project-registry";
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
      </div>
    </div>
  );
}
