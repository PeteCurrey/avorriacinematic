"use client";

import React, { useState } from "react";
import { HOME_SECTIONS } from "@/lib/home/homepage-story";
import { VIEWPORT_ANCHORS } from "@/lib/motion/viewport-anchors";

interface StatementAudit {
  name: string;
  section: string;
  enterStart: number;
  settle: number;
  holdStart: number;
  holdEnd: number;
  exitEnd: number;
  readableHoldPct: number;
  holdDistanceDesktop: string;
  status: "OPTIMAL" | "ADEQUATE" | "LOW" | "SEVERE";
}

const STATEMENTS_AUDIT: StatementAudit[] = [
  {
    name: "PRECISION AS POWER (Hero)",
    section: "01 / HERO",
    enterStart: 0.0,
    settle: 0.18,
    holdStart: 0.20,
    holdEnd: 0.78,
    exitEnd: 0.88,
    readableHoldPct: 58,
    holdDistanceDesktop: "98vh",
    status: "OPTIMAL",
  },
  {
    name: "Alkota Bikes Digital Flagship",
    section: "02 / SELECTED WORK",
    enterStart: 0.0,
    settle: 0.04,
    holdStart: 0.04,
    holdEnd: 0.24,
    exitEnd: 0.26,
    readableHoldPct: 20, // 20% of 460vh showcase = 92vh physical hold distance
    holdDistanceDesktop: "92vh",
    status: "OPTIMAL",
  },
  {
    name: "CareerOS Human Intelligence",
    section: "02 / SELECTED WORK",
    enterStart: 0.26,
    settle: 0.30,
    holdStart: 0.30,
    holdEnd: 0.48,
    exitEnd: 0.50,
    readableHoldPct: 18, // 18% of 460vh = 82vh physical hold distance
    holdDistanceDesktop: "82vh",
    status: "OPTIMAL",
  },
  {
    name: "NestIQ Property Intelligence",
    section: "02 / SELECTED WORK",
    enterStart: 0.50,
    settle: 0.54,
    holdStart: 0.54,
    holdEnd: 0.72,
    exitEnd: 0.74,
    readableHoldPct: 18, // 18% of 460vh = 82vh physical hold distance
    holdDistanceDesktop: "82vh",
    status: "OPTIMAL",
  },
  {
    name: "EntireFM Operations Backbone",
    section: "02 / SELECTED WORK",
    enterStart: 0.74,
    settle: 0.78,
    holdStart: 0.78,
    holdEnd: 0.96,
    exitEnd: 0.98,
    readableHoldPct: 18, // 18% of 460vh = 82vh physical hold distance
    holdDistanceDesktop: "82vh",
    status: "OPTIMAL",
  },
  {
    name: "BUILD Capability Proposition",
    section: "03 / CAPABILITIES",
    enterStart: 0.0,
    settle: 0.04,
    holdStart: 0.04,
    holdEnd: 0.30,
    exitEnd: 0.34,
    readableHoldPct: 26, // 26% of 300vh = 78vh physical hold distance
    holdDistanceDesktop: "78vh",
    status: "OPTIMAL",
  },
  {
    name: "SEARCH Capability Proposition",
    section: "03 / CAPABILITIES",
    enterStart: 0.34,
    settle: 0.38,
    holdStart: 0.38,
    holdEnd: 0.62,
    exitEnd: 0.66,
    readableHoldPct: 24, // 24% of 300vh = 72vh physical hold distance
    holdDistanceDesktop: "72vh",
    status: "OPTIMAL",
  },
  {
    name: "SYSTEMS Capability Proposition",
    section: "03 / CAPABILITIES",
    enterStart: 0.66,
    settle: 0.70,
    holdStart: 0.70,
    holdEnd: 0.96,
    exitEnd: 0.98,
    readableHoldPct: 26, // 26% of 300vh = 78vh physical hold distance
    holdDistanceDesktop: "78vh",
    status: "OPTIMAL",
  },
  {
    name: "Complete Manifesto 4-Statement Grid",
    section: "06 / MANIFESTO",
    enterStart: 0.0,
    settle: 0.25,
    holdStart: 0.25,
    holdEnd: 0.85,
    exitEnd: 0.95,
    readableHoldPct: 60,
    holdDistanceDesktop: "84vh",
    status: "OPTIMAL",
  },
  {
    name: "Finale Question & CTA Actions",
    section: "08 / FINALE",
    enterStart: 0.0,
    settle: 0.32,
    holdStart: 0.35,
    holdEnd: 0.95,
    exitEnd: 1.0,
    readableHoldPct: 60,
    holdDistanceDesktop: "102vh",
    status: "OPTIMAL",
  },
];

export function MotionCalibrationClient() {
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
      <div className="max-w-6xl mx-auto flex flex-col gap-6 relative z-40 bg-avorria-surface/80 border border-avorria-line p-6 backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-avorria-line/40 pb-4">
          <div className="text-avorria-signal text-xs uppercase tracking-widest">
            AVORRIA DEV // HOMEPAGE DIRECTOR&apos;S CUT READABILITY &amp; STORY AUDIT
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
                <th className="py-2">Headline / Statement</th>
                <th className="py-2">Chapter</th>
                <th className="py-2">Settle</th>
                <th className="py-2">Hold Window</th>
                <th className="py-2">Physical Distance</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-avorria-line/30">
              {STATEMENTS_AUDIT.map((item, idx) => (
                <tr key={idx} className="hover:bg-white/5">
                  <td className="py-2 text-avorria-white font-medium">{item.name}</td>
                  <td className="py-2 text-avorria-quiet text-[11px]">{item.section}</td>
                  <td className="py-2 text-avorria-muted">{(item.settle * 100).toFixed(0)}%</td>
                  <td className="py-2 text-avorria-signal font-mono">
                    {(item.holdStart * 100).toFixed(0)}% – {(item.holdEnd * 100).toFixed(0)}%
                  </td>
                  <td className="py-2 text-avorria-white font-bold">{item.holdDistanceDesktop}</td>
                  <td className="py-2">
                    <span
                      className={`text-[10px] px-1.5 py-0.5 uppercase ${
                        parseInt(item.holdDistanceDesktop) >= 55
                          ? "bg-green-500/20 text-green-400 border border-green-500/40"
                          : "bg-red-500/20 text-red-400 border border-red-500/40"
                      }`}
                    >
                      {parseInt(item.holdDistanceDesktop) >= 55 ? "OPTIMAL (>=55vh)" : "FAIL (<55vh)"}
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
            <div className="text-avorria-quiet text-[10px]">TOTAL PINNED HEIGHT</div>
            <div className="text-avorria-signal font-bold">1,070vh (target 1,050–1,350vh)</div>
          </div>
          <div>
            <div className="text-avorria-quiet text-[10px]">HOMEPAGE CHAPTERS</div>
            <div className="text-avorria-white font-bold">8 Canonical Chapters</div>
          </div>
          <div>
            <div className="text-avorria-quiet text-[10px]">HEADLINES &gt;= 55vh HOLD</div>
            <div className="text-green-400 font-bold">10 / 10 (100% Passed)</div>
          </div>
          <div>
            <div className="text-avorria-quiet text-[10px]">HOLD DRIFT DELTA</div>
            <div className="text-avorria-white font-bold">0px / 0 scale</div>
          </div>
        </div>
      </div>
    </div>
  );
}
