import React from "react";
import Image from "next/image";
import { DRAWDOWN_MODULES } from "@/lib/scenes/drawdown-scene-config";

interface DrawdownInterfaceStageProps {
  progress: number; // 0.0 to 1.0
}

export function DrawdownInterfaceStage({ progress }: DrawdownInterfaceStageProps) {
  // Active between 0.28 and 0.88
  if (progress < 0.26 || progress > 0.89) return null;

  const opacity = progress < 0.34 ? (progress - 0.26) / 0.08 : progress < 0.82 ? 1.0 : Math.max(0, 1.0 - (progress - 0.82) / 0.07);
  
  // Separation progress from unified UI to separated 3D layers (0.43 -> 0.65)
  // Reassembly back into one product (0.75 -> 0.85)
  const separationT = progress < 0.43 ? 0 : progress < 0.65 ? (progress - 0.43) / 0.22 : progress < 0.75 ? 1.0 : Math.max(0, 1.0 - (progress - 0.75) / 0.10);

  return (
    <div
      className="absolute inset-0 w-full h-full flex items-center justify-center p-4 sm:p-10 z-20 pointer-events-none"
      style={{ opacity, perspective: "1400px" }}
      aria-hidden="true"
    >
      {separationT < 0.1 ? (
        // Full Unified Interface View
        <div className="w-full max-w-[1600px] h-[80vh] relative border border-avorria-line bg-avorria-surface shadow-2xl overflow-hidden">
          <Image
            src="/media/projects/drawdown/drawdown-full-ui.svg"
            alt="Drawdown Platform Interface"
            fill
            className="object-cover"
          />
        </div>
      ) : (
        // Separated 3D Functional Layers
        <div className="w-full max-w-[1600px] h-[80vh] relative flex items-center justify-center">
          {DRAWDOWN_MODULES.map((mod) => {
            const z = mod.zDepth * separationT;
            const yaw = mod.yawDeg * separationT;

            return (
              <div
                key={mod.id}
                className="absolute w-[80%] h-[75%] border border-avorria-line bg-avorria-black/95 shadow-2xl overflow-hidden transition-transform duration-75"
                style={{
                  transform: `translateZ(${z}px) rotateY(${yaw}deg)`,
                  opacity: mod.id === "market" ? 1.0 : 0.9
                }}
              >
                <Image
                  src={mod.svgPath}
                  alt={mod.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-avorria-black/90 border border-avorria-line px-3 py-1.5 font-mono text-[10px] uppercase text-avorria-quiet flex items-center gap-2">
                  <span className="text-avorria-signal">{mod.code}</span>
                  <span className="text-avorria-white">{mod.title}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
