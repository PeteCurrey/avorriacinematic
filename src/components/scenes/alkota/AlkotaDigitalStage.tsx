"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Z } from "@/lib/scene-z";

interface AlkotaDigitalStageProps {
  progress: number; // 0.0 to 1.0
}

export function AlkotaDigitalStage({ progress }: AlkotaDigitalStageProps) {
  const [selectedFinish, setSelectedFinish] = useState<"carbon" | "glacier">("carbon");

  // Active between 0.62 and 0.85
  if (progress < 0.62 || progress > 0.85) return null;

  // Scan line progress crossing the screen (0.64 -> 0.72)
  const scanT = Math.min(1, Math.max(0, (progress - 0.64) / 0.08));
  const opacity = progress < 0.70 ? (progress - 0.62) / 0.08 : progress < 0.80 ? 1.0 : Math.max(0, 1.0 - (progress - 0.80) / 0.04);

  return (
    <div
      className="absolute inset-0 w-full h-full"
      style={{ opacity, zIndex: Z.media }}
    >
      {/* Full-bleed right composition: image owns the field without box wrapper */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={selectedFinish === "carbon" ? "/media/projects/alkota/product/naked-carbon-studio.png" : "/media/projects/alkota/product/glacier-white-showroom.jpg"}
          alt="Alkota Digital Flagship Interface"
          fill
          className="object-cover object-right sm:object-center"
        />
        {/* Left gradient for text safety */}
        <div className="absolute inset-y-0 left-0 w-full sm:w-1/2 bg-gradient-to-r from-avorria-black via-avorria-black/85 to-transparent" />
      </div>

      {/* Left editorial column */}
      <div
        className="absolute inset-y-0 left-0 w-full max-w-[580px] flex flex-col justify-center px-6 sm:px-12 lg:px-16 gap-6 pointer-events-auto"
        style={{ zIndex: Z.copy }}
      >
        <div className="font-mono text-[10px] sm:text-xs text-avorria-signal uppercase tracking-widest">
          001 / ALKOTA // DIGITAL FLAGSHIP
        </div>
        <div className="font-display font-bold text-3xl sm:text-5xl uppercase tracking-tight text-avorria-white leading-tight">
          The website is part of the product.
        </div>
        <p className="font-body text-sm sm:text-base text-avorria-muted leading-relaxed">
          Product configuration, precision fit architecture, and pre-order reservation engineered around the carbon chassis.
        </p>

        {/* Live Finish Selector */}
        <div className="flex flex-col gap-2 pt-2">
          <span className="font-mono text-[10px] text-avorria-quiet uppercase tracking-wider">
            FINISH SPECIFICATION
          </span>
          <div className="flex items-center gap-2 font-mono text-xs">
            <button
              onClick={() => setSelectedFinish("carbon")}
              className={`px-4 py-2 border uppercase transition-colors ${selectedFinish === "carbon" ? "border-avorria-signal bg-avorria-signal/15 text-avorria-signal" : "border-avorria-line/60 text-avorria-muted hover:text-avorria-white hover:border-avorria-line"}`}
            >
              Naked Carbon
            </button>
            <button
              onClick={() => setSelectedFinish("glacier")}
              className={`px-4 py-2 border uppercase transition-colors ${selectedFinish === "glacier" ? "border-avorria-signal bg-avorria-signal/15 text-avorria-signal" : "border-avorria-line/60 text-avorria-muted hover:text-avorria-white hover:border-avorria-line"}`}
            >
              Glacier White
            </button>
          </div>
        </div>
      </div>

      {/* Scanning Engineering Line */}
      {scanT > 0 && scanT < 1 && (
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-avorria-signal shadow-[0_0_12px_#C8F135] pointer-events-none"
          style={{ left: `${scanT * 100}%`, zIndex: Z.overlay }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
