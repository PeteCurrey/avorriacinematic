import React from "react";
import Image from "next/image";
import { Z } from "@/lib/scene-z";

interface SystemsActionStageProps {
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

export function SystemsActionStage({
  containerRef,
}: SystemsActionStageProps) {
  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden opacity-0"
      style={{ zIndex: Z.media }}
      aria-hidden="true"
    >
      <Image
        src="/media/projects/systems/systems-architecture.svg"
        alt="Systems Human Review and Action Dispatch"
        fill
        className="object-contain object-center scale-110"
      />
    </div>
  );
}
