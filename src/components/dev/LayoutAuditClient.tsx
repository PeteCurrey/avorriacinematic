"use client";
import React, { useEffect, useState } from "react";
import { HOMEPAGE_SCENES } from "@/components/scenes/registry";

interface SceneAuditData {
  id: string;
  registryHeight: string;
  domHeight: number;
  difference: number;
  hasPinSpacing: boolean;
}

export function LayoutAuditClient() {
  const [auditData, setAuditData] = useState<SceneAuditData[]>([]);

  useEffect(() => {
    const results: SceneAuditData[] = HOMEPAGE_SCENES.map((config) => {
      const el = document.getElementById(config.id);
      const domHeight = el?.getBoundingClientRect().height ?? 0;
      const registryHeight = config.minHeight || "auto";

      // Parse registry height to px equivalent for comparison
      let expectedPx = 0;
      if (registryHeight !== "auto" && registryHeight !== "natural") {
        const vhMatch = registryHeight.match(/([\d.]+)vh/);
        if (vhMatch) expectedPx = (parseFloat(vhMatch[1]) / 100) * window.innerHeight;
      }

      // Check for pinSpacing spacer divs
      const hasPinSpacing =
        !!el?.querySelector(".pin-spacer") ||
        !!document.querySelector(`[data-scene-id="${config.id}"] .pin-spacer`);

      return {
        id: config.id,
        registryHeight,
        domHeight: Math.round(domHeight),
        difference: Math.round(domHeight - expectedPx),
        hasPinSpacing,
      };
    });
    setAuditData(results);
  }, []);

  return (
    <div className="min-h-screen bg-avorria-black text-avorria-white font-mono p-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-avorria-signal text-xs uppercase tracking-widest mb-8">
          AVORRIA DEV // LAYOUT AUDIT
        </div>
        <h1 className="text-2xl font-bold mb-8">Scene Geometry &amp; Scroll Height Audit</h1>

        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="border-b border-avorria-line text-avorria-quiet">
              <th className="text-left py-3 pr-6">Scene</th>
              <th className="text-left py-3 pr-6">Registry Height</th>
              <th className="text-left py-3 pr-6">DOM Height (px)</th>
              <th className="text-left py-3 pr-6">Difference</th>
              <th className="text-left py-3 pr-6">Pin Spacer?</th>
              <th className="text-left py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {auditData.map((row) => {
              const isWarning = Math.abs(row.difference) > 50 || row.hasPinSpacing;
              return (
                <tr
                  key={row.id}
                  className={`border-b border-avorria-line/40 ${
                    isWarning ? "text-yellow-400" : "text-avorria-white"
                  }`}
                >
                  <td className="py-3 pr-6">{row.id}</td>
                  <td className="py-3 pr-6">{row.registryHeight}</td>
                  <td className="py-3 pr-6">{row.domHeight.toLocaleString()}</td>
                  <td className="py-3 pr-6">
                    {row.difference > 50 ? (
                      <span className="text-red-400">+{row.difference}px</span>
                    ) : row.difference < -50 ? (
                      <span className="text-orange-400">{row.difference}px</span>
                    ) : (
                      <span className="text-emerald-400">{row.difference}px</span>
                    )}
                  </td>
                  <td className="py-3 pr-6">
                    {row.hasPinSpacing ? (
                      <span className="text-red-400">YES ⚠️</span>
                    ) : (
                      <span className="text-emerald-400">No</span>
                    )}
                  </td>
                  <td className="py-3">
                    {isWarning ? (
                      <span className="text-yellow-400">WARN</span>
                    ) : (
                      <span className="text-emerald-400">OK</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="mt-12 text-avorria-quiet text-[10px]">
          This page is dev-only. Not indexed. Refresh to re-audit.
        </div>
      </div>
    </div>
  );
}
