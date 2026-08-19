import React from "react";
import Image from "next/image";

interface EntireFMContextStageProps {
  progress: number; // 0.0 to 1.0
}

export function EntireFMContextStage({ progress }: EntireFMContextStageProps) {
  // Active between 0.00 and 0.32
  if (progress > 0.34) return null;

  const opacity = progress < 0.08 ? progress / 0.08 : progress < 0.24 ? 1.0 : Math.max(0, 1.0 - (progress - 0.24) / 0.08);
  const scale = 1.0 + (progress * 0.05);

  return (
    <div
      className="absolute inset-0 w-full h-full flex items-center justify-center p-4 sm:p-12 z-10 pointer-events-none transition-opacity duration-150"
      style={{ opacity }}
      aria-hidden="true"
    >
      <div
        className="relative w-full max-w-[1100px] h-[65vh] border border-avorria-line bg-avorria-surface shadow-2xl overflow-hidden"
        style={{ transform: `scale(${scale})` }}
      >
        <Image
          src="/media/projects/entirefm/entirefm-operational.svg"
          alt="EntireFM Asset Hierarchy Context"
          fill
          priority
          className="object-cover"
        />
      </div>
    </div>
  );
}
