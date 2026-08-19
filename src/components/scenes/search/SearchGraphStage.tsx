"use client";
import React, { useState } from "react";
import Link from "next/link";
import { SEARCH_NODES, SEARCH_EDGES, SEARCH_QUERIES } from "@/lib/scenes/search-scene-config";
import { CursorTrigger } from "@/providers/CursorContext";
import { Z } from "@/lib/scene-z";

interface SearchGraphStageProps {
  progress: number; // 0.0 to 1.0
}

export function SearchGraphStage({ progress }: SearchGraphStageProps) {
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  // Active between 0.24 and 0.88
  if (progress < 0.23 || progress > 0.89) return null;

  const opacity = progress < 0.30 ? (progress - 0.23) / 0.07 : progress < 0.82 ? 1.0 : Math.max(0, 1.0 - (progress - 0.82) / 0.06);
  const isOptimized = progress >= 0.65;

  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-auto overflow-hidden p-6 sm:p-12 lg:p-16 flex flex-col justify-between"
      style={{ opacity, zIndex: Z.media }}
      aria-hidden={progress > 0.86 ? "true" : "false"}
    >
      {/* Top Marker */}
      <div
        className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-avorria-quiet border-b border-avorria-line/40 pb-3"
        style={{ zIndex: Z.instrumentation }}
      >
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-avorria-signal animate-pulse" />
          <span className="text-avorria-signal">AVORRIA V2 // SITE TOPOLOGY</span>
        </div>
        <div className="text-avorria-white">
          {isOptimized ? "OPTIMISED DISCOVERY GRAPH" : "TOPOLOGICAL EXPANSION"}
        </div>
      </div>

      {/* SVG Internal Link Edges */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: Z.media }}>
        {SEARCH_EDGES.map((edge) => {
          const fromNode = SEARCH_NODES.find((n) => n.id === edge.from);
          const toNode = SEARCH_NODES.find((n) => n.id === edge.to);
          if (!fromNode || !toNode) return null;

          const isHighlighted = hoveredNodeId === fromNode.id || hoveredNodeId === toNode.id;

          return (
            <line
              key={edge.id}
              x1={`${fromNode.x}%`}
              y1={`${fromNode.y}%`}
              x2={`${toNode.x}%`}
              y2={`${toNode.y}%`}
              stroke={isHighlighted ? "#C8F135" : isOptimized ? "#38BDF8" : "#334155"}
              strokeWidth={isHighlighted ? "2" : "1"}
              strokeDasharray={isOptimized ? "none" : "4 4"}
              opacity={isHighlighted ? 1.0 : isOptimized ? 0.8 : 0.4}
              className="transition-all duration-150"
            />
          );
        })}
      </svg>

      {/* Architecture Page / Hub Nodes */}
      <div className="relative w-full h-full flex-1">
        {SEARCH_NODES.map((node) => {
          const isHovered = hoveredNodeId === node.id;
          const isHub = node.type === "hub";

          return (
            <div
              key={node.id}
              onMouseEnter={() => setHoveredNodeId(node.id)}
              onMouseLeave={() => setHoveredNodeId(null)}
              className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-150 ${isHovered ? "scale-105" : ""}`}
              style={{ left: `${node.x}%`, top: `${node.y}%`, zIndex: Z.copy }}
            >
              <CursorTrigger state="view" label="VIEW">
                <Link
                  href={node.route}
                  className={`block px-3 py-2 border font-mono text-[10px] sm:text-xs uppercase tracking-wider transition-colors ${
                    isHovered
                      ? "border-avorria-signal bg-avorria-signal/20 text-avorria-white shadow-[0_0_15px_#C8F135]"
                      : isHub
                      ? "border-avorria-signal/60 bg-avorria-surface text-avorria-signal"
                      : "border-avorria-line bg-avorria-black text-avorria-muted hover:text-avorria-white"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${isHub ? "bg-avorria-signal" : "bg-avorria-quiet"}`} />
                    <span>{node.label}</span>
                  </div>
                </Link>
              </CursorTrigger>
            </div>
          );
        })}

        {/* Search Intent Queries Arriving from Edges */}
        {progress >= 0.50 && (
          <div className="pointer-events-none">
            {SEARCH_QUERIES.map((q) => (
              <div
                key={q.id}
                className="absolute font-mono text-[10px] text-avorria-signal uppercase tracking-widest bg-avorria-black/80 px-2 py-1 border border-avorria-signal/40 -translate-x-1/2 -translate-y-1/2 animate-pulse"
                style={{ left: `${q.fromX}%`, top: `${q.fromY}%`, zIndex: Z.instrumentation }}
              >
                QUERY: &quot;{q.query}&quot; →
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
