import React from "react";
import Image from "next/image";

interface AlkotaMaterialStageProps {
  progress: number; // Global scene progress 0.0 to 1.0
}

export function AlkotaMaterialStage({ progress }: AlkotaMaterialStageProps) {
  // Active between 0.00 and 0.48
  if (progress > 0.5) return null;

  // Chapter A: Material Macro (0.08 -> 0.26)
  const macroOpacity = progress < 0.08 ? 0 : progress < 0.26 ? (progress - 0.08) / 0.1 : progress < 0.42 ? 1 : Math.max(0, 1 - (progress - 0.42) / 0.08);
  const macroScale = 1.0 + (progress * 0.25);

  // Chapter B: Engineering Linework (0.26 -> 0.46)
  const engOpacity = progress < 0.26 ? 0 : progress < 0.36 ? (progress - 0.26) / 0.1 : progress < 0.44 ? 1 : Math.max(0, 1 - (progress - 0.44) / 0.04);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Material Macro Layer - Carbon Fiber Layup */}
      <div
        className="absolute inset-0 w-full h-full transition-transform duration-75 ease-out"
        style={{ opacity: macroOpacity, transform: `scale(${macroScale})` }}
      >
        <Image
          src="/media/projects/alkota/engineering/carbon-layup.jpg"
          alt="Alkota Carbon Fiber Layup Development"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Engineering Kinematics Layer */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{ opacity: engOpacity }}
      >
        <Image
          src="/media/projects/alkota/engineering/kinematics.jpg"
          alt="Alkota Kinematic Dynamics Analysis"
          fill
          className="object-cover"
        />
      </div>

      {/* Precision Annotation Callouts */}
      {progress >= 0.12 && progress < 0.46 && (
        <div className="absolute top-24 left-6 sm:left-16 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-avorria-quiet z-10">
          <span className="text-avorria-signal">001 / ALKOTA BIKES</span>
          <span className="mx-2 text-avorria-line-strong">{"//"}</span>
          <span className="text-avorria-white">{progress < 0.26 ? "MATERIAL & FINISH" : "STRUCTURAL KINEMATICS"}</span>
        </div>
      )}
    </div>
  );
}
