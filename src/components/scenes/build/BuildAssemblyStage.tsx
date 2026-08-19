import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BUILD_FRAGMENTS } from "@/lib/scenes/build-scene-config";
import { CursorTrigger } from "@/providers/CursorContext";
import { Z } from "@/lib/scene-z";

interface BuildAssemblyStageProps {
  containerRef?: React.RefObject<HTMLDivElement | null>;
  fragmentRefs?: React.MutableRefObject<{ [id: string]: HTMLDivElement | null }>;
}

export function BuildAssemblyStage({
  containerRef,
  fragmentRefs,
}: BuildAssemblyStageProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-auto overflow-hidden opacity-0"
      style={{ perspective: "1200px", zIndex: Z.media }}
    >
      {/* Subtle 12-Column Alignment Grid Lines */}
      <div className="absolute inset-0 grid grid-cols-12 pointer-events-none opacity-20">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="border-r border-avorria-line/30 h-full" />
        ))}
      </div>

      {/* Assembling UI Fragments in their final layout positions */}
      {BUILD_FRAGMENTS.map((frag) => {
        const isHovered = hoveredId === frag.id;

        return (
          <div
            key={frag.id}
            ref={(el) => {
              if (fragmentRefs && fragmentRefs.current) {
                fragmentRefs.current[frag.id] = el;
              }
            }}
            onMouseEnter={() => setHoveredId(frag.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="absolute z-20"
            style={{
              left: `${frag.assembledX}%`,
              top: `${frag.assembledY}%`,
              width: `${frag.assembledWidth}%`,
              height: `${frag.assembledHeight}%`,
            }}
          >
            <Image
              src={frag.svgPath}
              alt={frag.title}
              fill
              className="object-cover"
            />

            {/* Interactive Hover / Focus Action */}
            <div
              className={`absolute inset-0 bg-avorria-black/75 p-4 flex flex-col justify-between transition-opacity duration-200 ${
                isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <div className="flex items-center justify-between font-mono text-[10px] uppercase text-avorria-quiet">
                <span className="text-avorria-signal">{frag.category}</span>
                <span className="text-avorria-white">VERIFIED WORK</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-display font-bold text-lg text-avorria-white uppercase">
                  {frag.title}
                </span>
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
          </div>
        );
      })}
    </div>
  );
}
