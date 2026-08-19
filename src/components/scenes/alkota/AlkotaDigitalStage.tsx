"use client";
import React, { useState } from "react";
import Image from "next/image";
import { CursorTrigger } from "@/providers/CursorContext";

interface AlkotaDigitalStageProps {
  progress: number; // 0.0 to 1.0
}

export function AlkotaDigitalStage({ progress }: AlkotaDigitalStageProps) {
  const [selectedFinish, setSelectedFinish] = useState<"carbon" | "glacier">("carbon");

  // Active between 0.63 and 0.84
  if (progress < 0.62 || progress > 0.85) return null;

  // Scan line progress crossing the screen (0.64 -> 0.72)
  const scanT = Math.min(1, Math.max(0, (progress - 0.64) / 0.08));
  const opacity = progress < 0.70 ? (progress - 0.62) / 0.08 : progress < 0.80 ? 1.0 : Math.max(0, 1.0 - (progress - 0.80) / 0.04);

  return (
    <div
      className="absolute inset-0 w-full h-full flex flex-col justify-center items-center p-4 sm:p-12 z-20"
      style={{ opacity }}
    >
      {/* Digital Flagship UI Container */}
      <div className="w-full max-w-[1560px] h-[85vh] relative overflow-hidden bg-avorria-surface border border-avorria-line shadow-2xl flex flex-col justify-between">
        <Image
          src={selectedFinish === "carbon" ? "/media/projects/alkota/product/naked-carbon-studio.png" : "/media/projects/alkota/product/glacier-white-showroom.jpg"}
          alt="Alkota Digital Flagship Interface"
          fill
          className="object-contain"
        />

        {/* Live Interactive Spec Selection Overlay */}
        <div className="absolute top-36 left-8 sm:left-16 z-30 flex flex-col gap-3 max-w-xs pointer-events-auto">
          <span className="font-mono text-[10px] text-avorria-quiet uppercase tracking-wider">
            Interactive Finish Demonstration
          </span>
          <div className="flex items-center gap-2 font-mono text-xs">
            <CursorTrigger state="try" label="TRY">
              <button
                onClick={() => setSelectedFinish("carbon")}
                className={`px-3 py-1.5 border uppercase transition-colors ${selectedFinish === "carbon" ? "border-avorria-signal bg-avorria-signal/20 text-avorria-signal" : "border-avorria-line text-avorria-muted hover:text-avorria-white"}`}
              >
                Naked Carbon
              </button>
            </CursorTrigger>
            <CursorTrigger state="try" label="TRY">
              <button
                onClick={() => setSelectedFinish("glacier")}
                className={`px-3 py-1.5 border uppercase transition-colors ${selectedFinish === "glacier" ? "border-avorria-signal bg-avorria-signal/20 text-avorria-signal" : "border-avorria-line text-avorria-muted hover:text-avorria-white"}`}
              >
                Glacier White
              </button>
            </CursorTrigger>
          </div>
        </div>

        {/* Scanning Engineering Transformation Line */}
        {scanT > 0 && scanT < 1 && (
          <div
            className="absolute top-0 bottom-0 w-[2px] bg-avorria-signal shadow-[0_0_12px_#C8F135] pointer-events-none"
            style={{ left: `${scanT * 100}%` }}
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  );
}
