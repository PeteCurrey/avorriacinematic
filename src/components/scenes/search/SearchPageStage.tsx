import React from "react";
import Image from "next/image";

interface SearchPageStageProps {
  progress: number; // 0.0 to 1.0
}

export function SearchPageStage({ progress }: SearchPageStageProps) {
  // Active between 0.00 and 0.32
  if (progress > 0.34) return null;

  const opacity = progress < 0.08 ? progress / 0.08 : progress < 0.24 ? 1.0 : Math.max(0, 1.0 - (progress - 0.24) / 0.08);
  const wireframeOpacity = progress > 0.12 ? Math.min(1.0, (progress - 0.12) / 0.08) : 0;

  return (
    <div
      className="absolute inset-0 w-full h-full flex items-center justify-center p-4 sm:p-12 z-10 pointer-events-none"
      style={{ opacity, perspective: "1200px" }}
      aria-hidden="true"
    >
      <div className="relative w-full max-w-[1100px] h-[70vh] border border-avorria-line bg-avorria-surface shadow-2xl overflow-hidden">
        {/* Base Real Webpage Visual */}
        <Image
          src="/media/projects/search/search-page-hero.svg"
          alt="Avorria Webpage Structure"
          fill
          priority
          className="object-cover transition-opacity duration-150"
          style={{ opacity: 1.0 - (wireframeOpacity * 0.3) }}
        />

        {/* Wireframe Semantic Breakdown Layer */}
        <div
          className="absolute inset-0 w-full h-full transition-opacity duration-150"
          style={{ opacity: wireframeOpacity }}
        >
          <Image
            src="/media/projects/search/search-wireframe-layer.svg"
            alt="Semantic Wireframe Breakdown"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
