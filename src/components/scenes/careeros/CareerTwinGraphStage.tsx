import React from "react";
import { CAREER_TWIN_NODES } from "@/lib/scenes/careeros-scene-config";

interface CareerTwinGraphStageProps {
  progress: number; // 0.0 to 1.0
}

export function CareerTwinGraphStage({ progress }: CareerTwinGraphStageProps) {
  // Active between 0.28 and 0.55
  if (progress < 0.27 || progress > 0.56) return null;

  const opacity = progress < 0.35 ? (progress - 0.27) / 0.08 : progress < 0.48 ? 1.0 : Math.max(0, 1.0 - (progress - 0.48) / 0.07);
  const lineDrawProgress = Math.min(1, Math.max(0, (progress - 0.30) / 0.12));

  return (
    <div
      className="absolute inset-0 w-full h-full flex items-center justify-center p-6 sm:p-12 z-20 pointer-events-none"
      style={{ opacity }}
      aria-hidden="true"
    >
      <div className="w-full max-w-[1400px] h-[70vh] relative border border-avorria-line bg-avorria-black/70 backdrop-blur-sm p-6 overflow-hidden">
        {/* Stage Header */}
        <div className="absolute top-6 left-8 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-avorria-quiet z-30">
          <span className="w-2 h-2 rounded-full bg-avorria-signal animate-pulse" />
          <span className="text-avorria-signal">005 / CAREER TWIN</span>
          <span className="text-avorria-line-strong">{"//"}</span>
          <span className="text-avorria-white">DYNAMIC INFORMATION GRAPH</span>
        </div>

        {/* SVG Kinematic Linkages */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="linkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C8F135" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          {/* Connection Lines */}
          <line x1="25%" y1="35%" x2="40%" y2="28%" stroke="url(#linkGrad)" strokeWidth="1.5" strokeDasharray="4 4" strokeOpacity={lineDrawProgress} />
          <line x1="40%" y1="28%" x2="60%" y2="32%" stroke="url(#linkGrad)" strokeWidth="1.5" strokeDasharray="4 4" strokeOpacity={lineDrawProgress} />
          <line x1="60%" y1="32%" x2="75%" y2="45%" stroke="url(#linkGrad)" strokeWidth="1.5" strokeDasharray="4 4" strokeOpacity={lineDrawProgress} />
          <line x1="25%" y1="35%" x2="35%" y2="62%" stroke="url(#linkGrad)" strokeWidth="1.5" strokeDasharray="4 4" strokeOpacity={lineDrawProgress} />
          <line x1="60%" y1="32%" x2="65%" y2="65%" stroke="url(#linkGrad)" strokeWidth="1.5" strokeDasharray="4 4" strokeOpacity={lineDrawProgress} />
        </svg>

        {/* Graph Nodes */}
        {CAREER_TWIN_NODES.map((node) => (
          <div
            key={node.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 bg-avorria-surface border border-avorria-line shadow-lg font-mono text-[10px] sm:text-xs uppercase tracking-wider text-avorria-white flex flex-col gap-0.5 z-20"
            style={{ left: `${node.xPercent}%`, top: `${node.yPercent}%` }}
          >
            <span className="text-[8px] text-avorria-signal font-bold">{node.category.toUpperCase()}</span>
            <span>{node.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
