"use client";

import React, { useEffect, useState } from "react";
import { HOMEPAGE_SCENES } from "@/components/scenes/registry";
import { VIEWPORT_ANCHORS } from "@/lib/motion/viewport-anchors";

export function MotionCalibrationClient() {
  const [selectedScene, setSelectedScene] = useState<string>(HOMEPAGE_SCENES[0].id);
  const [scrubValue, setScrubValue] = useState(0);
  const [activeStage, setActiveStage] = useState("ENTRY");
  const [showOverlays, setShowOverlays] = useState(true);

  return (
    <div className="min-h-screen bg-avorria-black text-avorria-white font-mono p-6 sm:p-12 relative overflow-hidden">
      {/* Visual Focal & Safe Zone Guide Overlay Lines */}
      {showOverlays && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div
            className="absolute inset-x-0 border-t border-dashed border-red-500/60"
            style={{ top: `${VIEWPORT_ANCHORS.TOP_SAFE.fraction * 100}%` }}
          >
            <span className="absolute right-4 -top-5 text-[10px] text-red-400">
              TOP SAFE (10%)
            </span>
          </div>

          <div
            className="absolute inset-x-0 border-t border-dashed border-blue-400/60"
            style={{ top: `${VIEWPORT_ANCHORS.UPPER_FOCAL.fraction * 100}%` }}
          >
            <span className="absolute right-4 -top-5 text-[10px] text-blue-400">
              UPPER FOCAL (34%)
            </span>
          </div>

          <div
            className="absolute inset-x-0 border-t border-avorria-signal/80"
            style={{ top: `${VIEWPORT_ANCHORS.CENTRE.fraction * 100}%` }}
          >
            <span className="absolute right-4 -top-5 text-[10px] text-avorria-signal">
              CENTRE FOCAL (50%)
            </span>
          </div>

          <div
            className="absolute inset-x-0 border-t border-dashed border-blue-400/60"
            style={{ top: `${VIEWPORT_ANCHORS.LOWER_FOCAL.fraction * 100}%` }}
          >
            <span className="absolute right-4 -top-5 text-[10px] text-blue-400">
              LOWER FOCAL (66%)
            </span>
          </div>

          <div
            className="absolute inset-x-0 border-t border-dashed border-red-500/60"
            style={{ top: `${VIEWPORT_ANCHORS.BOTTOM_SAFE.fraction * 100}%` }}
          >
            <span className="absolute right-4 -top-5 text-[10px] text-red-400">
              BOTTOM SAFE (90%)
            </span>
          </div>
        </div>
      )}

      {/* Dev Control Panel */}
      <div className="max-w-4xl mx-auto flex flex-col gap-6 relative z-40 bg-avorria-surface/80 border border-avorria-line p-6 backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-avorria-line/40 pb-4">
          <div className="text-avorria-signal text-xs uppercase tracking-widest">
            AVORRIA DEV // MOTION CALIBRATION &amp; VIEWPORT LOCK
          </div>
          <button
            onClick={() => setShowOverlays((p) => !p)}
            className="text-xs uppercase px-3 py-1 bg-avorria-surface border border-avorria-line hover:border-avorria-signal"
          >
            {showOverlays ? "Hide Guide Lines" : "Show Guide Lines"}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-avorria-quiet block mb-2">
              SELECT SCENE TO CALIBRATE
            </label>
            <select
              value={selectedScene}
              onChange={(e) => setSelectedScene(e.target.value as any)}
              className="w-full bg-avorria-black border border-avorria-line p-2 text-xs text-avorria-white"
            >
              {HOMEPAGE_SCENES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.id} ({s.minHeight})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs text-avorria-quiet block mb-2">
              PROGRESS SCRUBBER: {(scrubValue * 100).toFixed(1)}%
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.005"
              value={scrubValue}
              onChange={(e) => {
                const v = parseFloat(e.target.value);
                setScrubValue(v);
                if (v < 0.2) setActiveStage("ENTER / MOVE");
                else if (v < 0.4) setActiveStage("LAND / SETTLE");
                else if (v < 0.75) setActiveStage("HOLD (STATIONARY)");
                else setActiveStage("EXIT / HANDOFF");
              }}
              className="w-full"
            />
          </div>
        </div>

        {/* Stage Step Jump Buttons */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-avorria-line/40">
          <button
            onClick={() => setScrubValue(0.0)}
            className="px-3 py-1 text-xs border border-avorria-line hover:border-avorria-signal"
          >
            ENTER (0.00)
          </button>
          <button
            onClick={() => setScrubValue(0.12)}
            className="px-3 py-1 text-xs border border-avorria-line hover:border-avorria-signal"
          >
            SETTLE (0.12)
          </button>
          <button
            onClick={() => setScrubValue(0.50)}
            className="px-3 py-1 text-xs border border-avorria-line hover:border-avorria-signal"
          >
            HOLD MID (0.50)
          </button>
          <button
            onClick={() => setScrubValue(0.85)}
            className="px-3 py-1 text-xs border border-avorria-line hover:border-avorria-signal"
          >
            EXIT START (0.85)
          </button>
          <button
            onClick={() => setScrubValue(1.0)}
            className="px-3 py-1 text-xs border border-avorria-line hover:border-avorria-signal"
          >
            HANDOFF (1.00)
          </button>
        </div>

        {/* Real-time Diagnostics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-avorria-line/40 text-xs">
          <div>
            <div className="text-avorria-quiet text-[10px]">CURRENT STAGE</div>
            <div className="text-avorria-signal">{activeStage}</div>
          </div>
          <div>
            <div className="text-avorria-quiet text-[10px]">GSAP SCRUB</div>
            <div className="text-avorria-white">scrub: true</div>
          </div>
          <div>
            <div className="text-avorria-quiet text-[10px]">LENIS DURATION</div>
            <div className="text-avorria-white">0.75s (weighted)</div>
          </div>
          <div>
            <div className="text-avorria-quiet text-[10px]">TIMELINE DURATION</div>
            <div className="text-avorria-white">1.000 EXACT</div>
          </div>
        </div>
      </div>
    </div>
  );
}
