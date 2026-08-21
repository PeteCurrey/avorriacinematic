"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Z } from "@/lib/scene-z";

interface AlkotaDigitalStageProps {
  containerRef?: React.RefObject<HTMLDivElement | null>;
  scanLineRef?: React.RefObject<HTMLDivElement | null>;
}

export function AlkotaDigitalStage({
  containerRef,
  scanLineRef,
}: AlkotaDigitalStageProps) {
  const [selectedFinish, setSelectedFinish] = useState<"carbon" | "glacier">("carbon");

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full opacity-0"
      style={{ zIndex: Z.media }}
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
      <div
        ref={scanLineRef}
        className="absolute top-0 bottom-0 w-[2px] bg-avorria-signal shadow-[0_0_12px_#4D9FFF] pointer-events-none opacity-0"
        style={{ left: "0%", zIndex: Z.overlay }}
        aria-hidden="true"
      />
    </div>
  );
}
