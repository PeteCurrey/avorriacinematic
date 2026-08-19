import React from "react";
import Image from "next/image";
import { Z } from "@/lib/scene-z";

interface NestIQDecisionStageProps {
  progress: number; // 0.0 to 1.0
}

export function NestIQDecisionStage({ progress }: NestIQDecisionStageProps) {
  // Active between 0.72 and 0.92
  if (progress < 0.70 || progress > 0.93) return null;

  const opacity = progress < 0.78 ? (progress - 0.70) / 0.08 : progress < 0.88 ? 1.0 : Math.max(0, 1.0 - (progress - 0.88) / 0.04);

  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
      style={{ opacity, zIndex: Z.media }}
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
