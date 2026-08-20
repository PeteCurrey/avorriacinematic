"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HOMEPAGE_SCENES } from "@/components/scenes/registry";
import type { SceneId } from "@/types/scene";
import { CinematicScene } from "@/components/cinematic/CinematicScene";
import { Scene00Void } from "@/components/scenes/Scene00Void";
import { Scene01Precision } from "@/components/scenes/Scene01Precision";
import { Scene02Signal } from "@/components/scenes/Scene02Signal";
import { Scene03Alkota } from "@/components/scenes/Scene03Alkota";
import { Scene04Breath } from "@/components/scenes/Scene04Breath";
import { Scene05CareerOS } from "@/components/scenes/Scene05CareerOS";
import { Scene06Build } from "@/components/scenes/Scene06Build";
import { Scene07NestIQ } from "@/components/scenes/Scene07NestIQ";
import { Scene08Search } from "@/components/scenes/Scene08Search";
import { Scene09Drawdown } from "@/components/scenes/Scene09Drawdown";
import { Scene10Systems } from "@/components/scenes/Scene10Systems";
import { Scene11EntireFM } from "@/components/scenes/Scene11EntireFM";
import { Scene12Work } from "@/components/scenes/Scene12Work";
import { Scene13OGN } from "@/components/scenes/Scene13OGN";
import { Scene14Lab } from "@/components/scenes/Scene14Lab";
import { Scene15Manifesto } from "@/components/scenes/Scene15Manifesto";
import { Scene16Proof } from "@/components/scenes/Scene16Proof";
import { Scene17Intelligence } from "@/components/scenes/Scene17Intelligence";
import { Scene18Finale } from "@/components/scenes/Scene18Finale";
import { useReducedMotion } from "@/providers/ReducedMotionProvider";
import { useWebGLCapabilities } from "@/providers/WebGLCapabilityProvider";
import { useTheme } from "@/providers/ThemeContext";

export default function DevScenesLabPage() {
  const [selectedSceneId, setSelectedSceneId] = useState<SceneId>(HOMEPAGE_SCENES[0].id);
  const [viewportWidth, setViewportWidth] = useState<string>("100%");
  const [showGrid, setShowGrid] = useState(false);
  const { overrideReducedMotion, setOverrideReducedMotion } = useReducedMotion();
  const { forceDisabled, setForceDisabled, capabilities } = useWebGLCapabilities();
  const { theme, setTheme } = useTheme();

  const currentScene = HOMEPAGE_SCENES.find((s) => s.id === selectedSceneId) || HOMEPAGE_SCENES[0];

  const jumpTo = (id: SceneId) => {
    setSelectedSceneId(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-avorria-black text-avorria-white pt-24 pb-16 px-6">
      {/* Dev Lab Control Bar */}
      <div className="max-w-[1760px] mx-auto p-4 border border-avorria-signal/40 bg-avorria-surface mb-8 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-avorria-signal animate-pulse" />
          <span className="font-bold text-avorria-signal uppercase tracking-wider">
            Scene Lab // Phase 20 Integration (All 19 Scenes)
          </span>
          <Link
            href="/dev/timeline"
            className="px-2 py-0.5 border border-avorria-signal bg-avorria-signal/20 text-avorria-signal hover:bg-avorria-signal hover:text-avorria-black transition-colors"
          >
            TIMELINE ARCHITECTURE →
          </Link>
          <span className="text-avorria-quiet border border-avorria-line px-2 py-0.5">
            DPR: {capabilities.maxDpr}x
          </span>
        </div>

        {/* Scene Selector */}
        <div className="flex items-center gap-2">
          <label className="text-avorria-quiet">Scene:</label>
          <select
            value={selectedSceneId}
            onChange={(e) => setSelectedSceneId(e.target.value as SceneId)}
            className="bg-avorria-black border border-avorria-line px-3 py-1.5 text-xs text-avorria-white focus:border-avorria-signal focus:outline-none"
          >
            {HOMEPAGE_SCENES.map((scene) => (
              <option key={scene.id} value={scene.id}>
                {String(scene.index).padStart(2, "0")} / {scene.label}
              </option>
            ))}
          </select>
        </div>

        {/* Shortcuts */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => jumpTo("scene-00-void")}
            className="px-2 py-1 border border-avorria-line hover:border-avorria-signal text-avorria-white"
          >
            00: Void
          </button>
          <button
            onClick={() => jumpTo("scene-01-precision")}
            className="px-2 py-1 border border-avorria-line hover:border-avorria-signal text-avorria-white"
          >
            01: Precision
          </button>
          <button
            onClick={() => jumpTo("scene-02-signal")}
            className="px-2 py-1 border border-avorria-line hover:border-avorria-signal text-avorria-white"
          >
            02: Signal
          </button>
          <button
            onClick={() => jumpTo("scene-03-alkota")}
            className="px-2 py-1 border border-avorria-line hover:border-avorria-signal text-avorria-white"
          >
            03: Alkota
          </button>
          <button
            onClick={() => jumpTo("scene-04-breath")}
            className="px-2 py-1 border border-avorria-line hover:border-avorria-signal text-avorria-white"
          >
            04: Breath
          </button>
          <button
            onClick={() => jumpTo("scene-05-careeros")}
            className="px-2 py-1 border border-avorria-line hover:border-avorria-signal text-avorria-white"
          >
            05: CareerOS
          </button>
          <button
            onClick={() => jumpTo("scene-06-build")}
            className="px-2 py-1 border border-avorria-line hover:border-avorria-signal text-avorria-white"
          >
            06: BUILD
          </button>
          <button
            onClick={() => jumpTo("scene-07-nestiq")}
            className="px-2 py-1 border border-avorria-line hover:border-avorria-signal text-avorria-white"
          >
            07: NestIQ
          </button>
          <button
            onClick={() => jumpTo("scene-08-search")}
            className="px-2 py-1 border border-avorria-line hover:border-avorria-signal text-avorria-white"
          >
            08: SEARCH
          </button>
          <button
            onClick={() => jumpTo("scene-09-drawdown")}
            className="px-2 py-1 border border-avorria-line hover:border-avorria-signal text-avorria-white"
          >
            09: Drawdown
          </button>
          <button
            onClick={() => jumpTo("scene-10-systems")}
            className="px-2 py-1 border border-avorria-line hover:border-avorria-signal text-avorria-white"
          >
            10: SYSTEMS
          </button>
          <button
            onClick={() => jumpTo("scene-11-entirefm")}
            className="px-2 py-1 border border-avorria-line hover:border-avorria-signal text-avorria-white"
          >
            11: EntireFM
          </button>
          <button
            onClick={() => jumpTo("scene-12-work")}
            className="px-2 py-1 border border-avorria-line hover:border-avorria-signal text-avorria-white"
          >
            12: Work
          </button>
          <button
            onClick={() => jumpTo("scene-13-ogn")}
            className="px-2 py-1 border border-avorria-line hover:border-avorria-signal text-avorria-white"
          >
            13: OGN
          </button>
          <button
            onClick={() => jumpTo("scene-14-lab")}
            className="px-2 py-1 border border-avorria-line hover:border-avorria-signal text-avorria-white"
          >
            14: Lab
          </button>
          <button
            onClick={() => jumpTo("scene-15-manifesto")}
            className="px-2 py-1 border border-avorria-line hover:border-avorria-signal text-avorria-white"
          >
            15: Manifesto
          </button>
          <button
            onClick={() => jumpTo("scene-16-proof")}
            className="px-2 py-1 border border-avorria-line hover:border-avorria-signal text-avorria-white"
          >
            16: Proof
          </button>
          <button
            onClick={() => jumpTo("scene-17-intelligence")}
            className="px-2 py-1 border border-avorria-line hover:border-avorria-signal text-avorria-white"
          >
            17: Intelligence
          </button>
          <button
            onClick={() => jumpTo("scene-18-finale")}
            className="px-2 py-1 border border-avorria-signal text-avorria-signal bg-avorria-signal/10"
          >
            18: Finale
          </button>
        </div>

        {/* Viewport Width */}
        <div className="flex items-center gap-2">
          <label className="text-avorria-quiet">Viewport:</label>
          <button
            onClick={() => setViewportWidth("390px")}
            className={`px-2 py-1 border ${viewportWidth === "390px" ? "border-avorria-signal text-avorria-signal" : "border-avorria-line text-avorria-muted"}`}
          >
            Mobile (390px)
          </button>
          <button
            onClick={() => setViewportWidth("768px")}
            className={`px-2 py-1 border ${viewportWidth === "768px" ? "border-avorria-signal text-avorria-signal" : "border-avorria-line text-avorria-muted"}`}
          >
            Tablet (768px)
          </button>
          <button
            onClick={() => setViewportWidth("100%")}
            className={`px-2 py-1 border ${viewportWidth === "100%" ? "border-avorria-signal text-avorria-signal" : "border-avorria-line text-avorria-muted"}`}
          >
            Full Width
          </button>
        </div>

        {/* WebGL & Motion Toggles */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setForceDisabled(!forceDisabled)}
            className={`px-2 py-1 border ${forceDisabled ? "border-red-500 text-red-400" : "border-avorria-signal text-avorria-signal"}`}
          >
            WebGL: {forceDisabled ? "DISABLED (Fallback)" : "ENABLED"}
          </button>

          <button
            onClick={() => setShowGrid(!showGrid)}
            className={`px-2 py-1 border ${showGrid ? "border-avorria-signal bg-avorria-signal/20 text-avorria-signal" : "border-avorria-line text-avorria-muted"}`}
          >
            Grid: {showGrid ? "ON" : "OFF"}
          </button>

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="px-2 py-1 border border-avorria-line text-avorria-muted hover:text-avorria-white"
          >
            Theme: {theme.toUpperCase()}
          </button>

          <button
            onClick={() => setOverrideReducedMotion(overrideReducedMotion ? null : true)}
            className={`px-2 py-1 border ${overrideReducedMotion ? "border-avorria-signal bg-avorria-signal/20 text-avorria-signal" : "border-avorria-line text-avorria-muted"}`}
          >
            Reduced Motion: {overrideReducedMotion ? "ON" : "OFF"}
          </button>
        </div>
      </div>

      {/* Viewport Frame */}
      <div className="max-w-[1760px] mx-auto flex justify-center">
        <div
          style={{ width: viewportWidth, maxWidth: "100%" }}
          className="border border-avorria-line bg-avorria-black min-h-[600px] transition-all duration-300 relative overflow-hidden"
        >
          {selectedSceneId === "scene-00-void" ? (
            <Scene00Void />
          ) : selectedSceneId === "scene-01-precision" ? (
            <Scene01Precision />
          ) : selectedSceneId === "scene-02-signal" ? (
            <Scene02Signal />
          ) : selectedSceneId === "scene-03-alkota" ? (
            <Scene03Alkota />
          ) : selectedSceneId === "scene-04-breath" ? (
            <Scene04Breath />
          ) : selectedSceneId === "scene-05-careeros" ? (
            <Scene05CareerOS />
          ) : selectedSceneId === "scene-06-build" ? (
            <Scene06Build />
          ) : selectedSceneId === "scene-07-nestiq" ? (
            <Scene07NestIQ />
          ) : selectedSceneId === "scene-08-search" ? (
            <Scene08Search />
          ) : selectedSceneId === "scene-09-drawdown" ? (
            <Scene09Drawdown />
          ) : selectedSceneId === "scene-10-systems" ? (
            <Scene10Systems />
          ) : selectedSceneId === "scene-11-entirefm" ? (
            <Scene11EntireFM />
          ) : selectedSceneId === "scene-12-work" ? (
            <Scene12Work />
          ) : selectedSceneId === "scene-13-ogn" ? (
            <Scene13OGN />
          ) : selectedSceneId === "scene-14-lab" ? (
            <Scene14Lab />
          ) : selectedSceneId === "scene-15-manifesto" ? (
            <Scene15Manifesto />
          ) : selectedSceneId === "scene-16-proof" ? (
            <Scene16Proof />
          ) : selectedSceneId === "scene-17-intelligence" ? (
            <Scene17Intelligence />
          ) : selectedSceneId === "scene-18-finale" ? (
            <Scene18Finale />
          ) : (
            <CinematicScene config={currentScene} />
          )}
        </div>
      </div>
    </div>
  );
}
