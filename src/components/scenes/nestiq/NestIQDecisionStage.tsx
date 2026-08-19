import React from "react";
import Image from "next/image";
import { Z } from "@/lib/scene-z";

interface NestIQDecisionStageProps {
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

export function NestIQDecisionStage({
  containerRef,
}: NestIQDecisionStageProps) {
  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden opacity-0"
      style={{ zIndex: Z.media }}
      aria-hidden="true"
    >
      <Image
        src="/media/projects/nestiq/interface/agent-dashboard-preview.png"
        alt="NestIQ Decision Platform UI"
        fill
        className="object-cover object-bottom"
      />
    </div>
  );
}
