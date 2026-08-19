import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BUILD_FRAGMENTS } from "@/lib/scenes/build-scene-config";
import { CursorTrigger } from "@/providers/CursorContext";
import { Z } from "@/lib/scene-z";

interface BuildAssemblyStageProps {
  progress: number; // 0.0 to 1.0
}

export function BuildAssemblyStage({ progress }: BuildAssemblyStageProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Active between 0.00 and 0.82
  if (progress > 0.82) return null;

  // Assembly progress from independent positions to locked grid (0.12 -> 0.58)
  const assembleT = Math.min(1, Math.max(0, (progress - 0.12) / 0.46));
  // Deconstruction / fade (0.74 -> 0.82)
  const stageOpacity = progress < 0.74 ? 1.0 : Math.max(0, 1.0 - (progress - 0.74) / 0.08);

  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-auto overflow-hidden"
      style={{ opacity: stageOpacity, perspective: "1200px", zIndex: Z.media }}
      aria-hidden={progress > 0.78 ? "true" : "false"}
    >
      {/* Subtle 12-Column Alignment Grid Lines */}
      <div className="absolute inset-0 grid grid-cols-12 pointer-events-none opacity-20">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="border-r border-avorria-line/30 h-full" />
        ))}
      </div>

      {/* Assembling UI Fragments */}
      {BUILD_FRAGMENTS.map((frag) => {
        const curX = frag.initialX + (frag.assembledX - frag.initialX) * assembleT;
        const curY = frag.initialY + (frag.assembledY - frag.initialY) * assembleT;
        const isHovered = hoveredId === frag.id;
        const isLocked = assembleT >= 0.95;

        return (
          <div
            key={frag.id}
            onMouseEnter={() => setHoveredId(frag.id)}
            onMouseLeave={() => setHoveredId(null)}
            className={`absolute transition-all duration-200 ${isHovered ? "z-30 scale-[1.02]" : isLocked ? "z-20" : "z-10"}`}
            style={{
              left: `${curX}%`,
              top: `${curY}%`,
              width: `${frag.assembledWidth}%`,
              height: `${frag.assembledHeight}%`,
              transform: `translateZ(${isHovered ? 20 : 0}px)`
            }}
          >
            <Image
              src={frag.svgPath}
              alt={frag.title}
              fill
              className="object-cover"
            />

            {/* Interactive Hover / Focus Action */}
            {isLocked && (
              <div className={`absolute inset-0 bg-avorria-black/75 p-4 flex flex-col justify-between transition-opacity duration-200 ${isHovered ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                <div className="flex items-center justify-between font-mono text-[10px] uppercase text-avorria-quiet">
                  <span className="text-avorria-signal">{frag.category}</span>
                  <span className="text-avorria-white">VERIFIED WORK</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-display font-bold text-lg text-avorria-white uppercase">{frag.title}</span>
                  <CursorTrigger state="view" label="VIEW">
                    <Link
                      href={`/work/${frag.projectSlug}`}
                      className="font-mono text-xs uppercase tracking-widest text-avorria-signal hover:underline"
                    >
                      <span>VIEW PROJECT</span>
                      <span className="ml-1">→</span>
                    </Link>
                  </CursorTrigger>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
