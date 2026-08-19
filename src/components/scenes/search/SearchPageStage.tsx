import React from "react";
import Image from "next/image";
import { Z } from "@/lib/scene-z";

interface SearchPageStageProps {
  containerRef?: React.RefObject<HTMLDivElement | null>;
  wireframeRef?: React.RefObject<HTMLDivElement | null>;
}

export function SearchPageStage({
  containerRef,
  wireframeRef,
}: SearchPageStageProps) {
  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden opacity-0"
      style={{ perspective: "1200px", zIndex: Z.media }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 w-full h-full">
        {/* Base Real Webpage Visual */}
        <Image
          src="/media/projects/search/search-page-hero.svg"
          alt="Avorria Webpage Structure"
          fill
          priority
          className="object-cover"
        />

        {/* Wireframe Semantic Breakdown Layer */}
        <div
          ref={wireframeRef}
          className="absolute inset-0 w-full h-full opacity-0"
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
