import React from "react";
import Image from "next/image";

interface CareerOSHumanStageProps {
  progress: number; // 0.0 to 1.0
}

export function CareerOSHumanStage({ progress }: CareerOSHumanStageProps) {
  // Active between 0.00 and 0.55
  if (progress > 0.55) return null;

  const opacity = progress < 0.08 ? progress / 0.08 : progress < 0.35 ? 1.0 : Math.max(0.2, 1.0 - (progress - 0.35) / 0.18 * 0.8);
  const scale = 1.0 + (progress * 0.05);

  return (
    <div
      className="absolute inset-0 w-full h-full flex justify-end items-center pointer-events-none z-10 transition-opacity duration-150"
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Human Portrait Layer (Right-Aligned 45-50% width on Desktop) */}
      <div
        className="w-full sm:w-[50vw] max-w-[850px] h-full relative flex items-center justify-center"
        style={{ transform: `scale(${scale})` }}
      >
        <Image
          src="/media/projects/careeros/hero/woman_looking_into_camera_lens.jpeg"
          alt="CareerOS Human Portrait"
          fill
          priority
          className="object-contain object-right sm:object-center"
        />
      </div>
    </div>
  );
}
