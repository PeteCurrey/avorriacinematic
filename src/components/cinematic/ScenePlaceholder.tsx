import React from "react";
import type { SceneConfig } from "@/types/scene";

interface ScenePlaceholderProps {
  config: SceneConfig;
}

export function ScenePlaceholder({ config }: ScenePlaceholderProps) {
  const indexFormatted = String(config.index).padStart(2, "0");

  return (
    <div className="w-full h-full flex flex-col justify-between p-8 sm:p-12 lg:p-16 border border-avorria-line/60 relative overflow-hidden bg-avorria-black/60">
      {/* Top Metadata Header */}
      <div className="flex items-center justify-between border-b border-avorria-line pb-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-avorria-signal">
            {indexFormatted}
          </span>
          <span className="text-avorria-line-strong">/</span>
          <span className="font-mono text-xs uppercase tracking-widest text-avorria-white">
            {config.label}
          </span>
        </div>
        {config.chapter && (
          <span className="font-mono text-[10px] uppercase tracking-widest text-avorria-quiet px-2 py-0.5 border border-avorria-line">
            {config.chapter}
          </span>
        )}
      </div>

      {/* Main Structural Center */}
      <div className="my-auto py-12 flex flex-col gap-3">
        <div className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-avorria-white/90">
          {config.label}
        </div>
        <p className="font-mono text-xs text-avorria-quiet uppercase tracking-wider max-w-md">
          Permanent Anchor: <span className="text-avorria-white">{config.id}</span>
        </p>
      </div>

      {/* Technical Spec Footer */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-avorria-line font-mono text-[10px] text-avorria-quiet uppercase tracking-wider">
        <div>
          <span className="text-avorria-line-strong block">Pinning</span>
          <span className={config.pinningEligibility ? "text-avorria-signal" : "text-avorria-white"}>
            {config.pinningEligibility ? "Eligible" : "Standard"}
          </span>
        </div>
        <div>
          <span className="text-avorria-line-strong block">WebGL</span>
          <span className={config.webglRequirement ? "text-avorria-signal" : "text-avorria-white"}>
            {config.webglRequirement ? "Required" : "None"}
          </span>
        </div>
        <div>
          <span className="text-avorria-line-strong block">Mobile Mode</span>
          <span className="text-avorria-white">{config.mobileStrategy}</span>
        </div>
        <div>
          <span className="text-avorria-line-strong block">Reduced Motion</span>
          <span className="text-avorria-white">{config.reducedMotionStrategy}</span>
        </div>
      </div>
    </div>
  );
}
