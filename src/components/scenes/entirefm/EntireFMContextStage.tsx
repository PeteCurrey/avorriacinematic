import React from "react";
import Image from "next/image";
import { Z } from "@/lib/scene-z";

interface EntireFMContextStageProps {
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

export function EntireFMContextStage({
  containerRef,
}: EntireFMContextStageProps) {
  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full flex items-center justify-center p-6 sm:p-16 opacity-0"
      style={{ zIndex: Z.media }}
      aria-hidden="true"
    >
      <div className="relative w-full h-[65vh] max-w-5xl overflow-hidden">
        <Image
          src="/media/projects/entirefm/entirefm-operational.svg"
          alt="EntireFM Operations Backbone Infrastructure"
          fill
          className="object-contain object-center"
        />
      </div>
    </div>
  );
}
