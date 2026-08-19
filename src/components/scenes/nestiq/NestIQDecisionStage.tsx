import React from "react";
import Image from "next/image";

interface NestIQDecisionStageProps {
  progress: number; // 0.0 to 1.0
}

export function NestIQDecisionStage({ progress }: NestIQDecisionStageProps) {
  // Active between 0.72 and 0.92
  if (progress < 0.70 || progress > 0.93) return null;

  const opacity = progress < 0.78 ? (progress - 0.70) / 0.08 : progress < 0.88 ? 1.0 : Math.max(0, 1.0 - (progress - 0.88) / 0.04);

  return (
    <div
      className="absolute inset-0 w-full h-full flex items-center justify-center p-4 sm:p-12 z-20 pointer-events-none"
      style={{ opacity }}
      aria-hidden="true"
    >
      <div className="w-full max-w-[1560px] h-[82vh] relative border border-avorria-line bg-avorria-surface shadow-2xl overflow-hidden">
        <Image
          src="/media/projects/nestiq/interface/agent-dashboard-preview.png"
          alt="NestIQ Decision Platform UI"
          fill
          className="object-cover object-bottom"
        />
      </div>
    </div>
  );
}
