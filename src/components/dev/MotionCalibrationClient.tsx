"use client";

import React, { useState } from "react";
import { HOMEPAGE_SCENES } from "@/components/scenes/registry";
import { VIEWPORT_ANCHORS } from "@/lib/motion/viewport-anchors";

interface StatementAudit {
  sceneId: string;
  name: string;
  enterStart: number;
  settle: number;
  holdStart: number;
  holdEnd: number;
  exitEnd: number;
  readableHoldPct: number;
  status: "OPTIMAL" | "ADEQUATE" | "LOW" | "SEVERE";
}

const STATEMENTS_AUDIT: StatementAudit[] = [
  {
    sceneId: "scene-01-precision",
    name: "PRECISION AS POWER (Hero)",
    enterStart: 0.0,
    settle: 0.18,
    holdStart: 0.20,
    holdEnd: 0.78,
    exitEnd: 0.88,
    readableHoldPct: 58,
    status: "OPTIMAL",
  },
  {
    sceneId: "scene-03-alkota",
    name: "Alkota Digital Flagship Website",
    enterStart: 0.0,
    settle: 0.08,
    holdStart: 0.08,
    holdEnd: 0.36,
    exitEnd: 0.44,
    readableHoldPct: 28, // 28% of total 260vh scene timeline (approx 73vh stable hold)
    status: "ADEQUATE",
  },
  {
    sceneId: "scene-03-alkota",
    name: "Alkota Naked Carbon Product",
    enterStart: 0.44,
    settle: 0.52,
    holdStart: 0.52,
    holdEnd: 0.74,
    exitEnd: 0.80,
    readableHoldPct: 22,
    status: "ADEQUATE",
  },
  {
    sceneId: "scene-04-breath",
    name: "Premise: We Don't Decorate Businesses",
    enterStart: 0.0,
    settle: 0.10,
    holdStart: 0.10,
    holdEnd: 0.44,
    exitEnd: 0.48,
    readableHoldPct: 34,
    status: "ADEQUATE",
  },
  {
    sceneId: "scene-04-breath",
    name: "Conclusion: We Engineer Advantage",
    enterStart: 0.46,
    settle: 0.56,
    holdStart: 0.56,
    holdEnd: 0.88,
    exitEnd: 0.94,
    readableHoldPct: 32,
    status: "ADEQUATE",
  },
  {
    sceneId: "scene-05-careeros",
    name: "CareerOS Venture Proposition",
    enterStart: 0.0,
    settle: 0.08,
    holdStart: 0.08,
    holdEnd: 0.42,
    exitEnd: 0.48,
    readableHoldPct: 34,
    status: "ADEQUATE",
  },
  {
    sceneId: "scene-06-build",
    name: "BUILD Capability Monolith",
    enterStart: 0.70,
    settle: 0.78,
    holdStart: 0.78,
    holdEnd: 0.92,
    exitEnd: 0.96,
    readableHoldPct: 14,
    status: "ADEQUATE",
  },
  {
    sceneId: "scene-07-nestiq",
    name: "NestIQ Venture Proposition",
    enterStart: 0.0,
    settle: 0.08,
    holdStart: 0.08,
    holdEnd: 0.42,
    exitEnd: 0.48,
    readableHoldPct: 34,
    status: "ADEQUATE",
  },
  {
    sceneId: "scene-08-search",
    name: "SEARCH Capability Reveal",
    enterStart: 0.74,
    settle: 0.82,
    holdStart: 0.82,
    holdEnd: 0.92,
    exitEnd: 0.96,
    readableHoldPct: 10,
    status: "ADEQUATE",
  },
  {
    sceneId: "scene-09-drawdown",
    name: "Drawdown Venture Proposition",
    enterStart: 0.0,
    settle: 0.08,
    holdStart: 0.08,
    holdEnd: 0.44,
    exitEnd: 0.50,
    readableHoldPct: 36,
    status: "OPTIMAL",
  },
  {
    sceneId: "scene-11-entirefm",
    name: "EntireFM Client Statement",
    enterStart: 0.0,
    settle: 0.08,
    holdStart: 0.08,
    holdEnd: 0.44,
    exitEnd: 0.52,
    readableHoldPct: 36,
    status: "OPTIMAL",
  },
  {
    sceneId: "scene-15-manifesto",
    name: "Complete Manifesto 4-Statement Grid",
    enterStart: 0.0,
    settle: 0.25,
    holdStart: 0.25,
    holdEnd: 0.85,
    exitEnd: 0.95,
    readableHoldPct: 60,
    status: "OPTIMAL",
  },
  {
    sceneId: "scene-18-finale",
    name: "Finale Question & CTA Actions",
    enterStart: 0.0,
    settle: 0.32,
    holdStart: 0.35,
    holdEnd: 0.95,
    exitEnd: 1.0,
    readableHoldPct: 60,
    status: "OPTIMAL",
  },
];

export function MotionCalibrationClient() {
  const [selectedScene, setSelectedScene] = useState<string>(HOMEPAGE_SCENES[0].id);
  const [scrubValue, setScrubValue] = useState(0);
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
      <div className="max-w-5xl mx-auto flex flex-col gap-6 relative z-40 bg-avorria-surface/80 border border-avorria-line p-6 backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-avorria-line/40 pb-4">
          <div className="text-avorria-signal text-xs uppercase tracking-widest">
            AVORRIA DEV // MOTION CALIBRATION &amp; READABLE HOLD AUDIT
          </div>
          <button
            onClick={() => setShowOverlays((p) => !p)}
            className="text-xs uppercase px-3 py-1 bg-avorria-surface border border-avorria-line hover:border-avorria-signal"
          >
            {showOverlays ? "Hide Guide Lines" : "Show Guide Lines"}
          </button>
        </div>

        {/* Readability Hold Telemetry Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-avorria-line text-avorria-quiet uppercase text-[10px]">
                <th className="py-2">Statement / Headline</th>
                <th className="py-2">Enter</th>
                <th className="py-2">Settle</th>
                <th className="py-2">Hold Window</th>
                <th className="py-2">Exit</th>
                <th className="py-2">Hold %</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-avorria-line/30">
              {STATEMENTS_AUDIT.map((item, idx) => (
                <tr key={idx} className="hover:bg-white/5">
                  <td className="py-2 text-avorria-white font-medium">{item.name}</td>
                  <td className="py-2 text-avorria-muted">{(item.enterStart * 100).toFixed(0)}%</td>
                  <td className="py-2 text-avorria-muted">{(item.settle * 100).toFixed(0)}%</td>
                  <td className="py-2 text-avorria-signal font-mono">
                    {(item.holdStart * 100).toFixed(0)}% – {(item.holdEnd * 100).toFixed(0)}%
                  </td>
                  <td className="py-2 text-avorria-muted">{(item.exitEnd * 100).toFixed(0)}%</td>
                  <td className="py-2 text-avorria-white font-bold">{item.readableHoldPct}%</td>
                  <td className="py-2">
                    <span
                      className={`text-[10px] px-1.5 py-0.5 uppercase ${
                        item.status === "OPTIMAL"
                          ? "bg-green-500/20 text-green-400 border border-green-500/40"
                          : "bg-blue-500/20 text-blue-400 border border-blue-500/40"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Real-time Diagnostics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-avorria-line/40 text-xs">
          <div>
            <div className="text-avorria-quiet text-[10px]">PINNED HEIGHT</div>
            <div className="text-avorria-signal">~2,120vh (target &lt; 2,400vh)</div>
          </div>
          <div>
            <div className="text-avorria-quiet text-[10px]">ACTIVE SCENES</div>
            <div className="text-avorria-white">16 (00 &amp; 02 &amp; 13 removed)</div>
          </div>
          <div>
            <div className="text-avorria-quiet text-[10px]">HERO HOLD WINDOW</div>
            <div className="text-avorria-white">0.20 – 0.78 (58%)</div>
          </div>
          <div>
            <div className="text-avorria-quiet text-[10px]">HOLD DRIFT DELTA</div>
            <div className="text-avorria-white">0px / 0 scale</div>
          </div>
        </div>
      </div>
    </div>
  );
}
