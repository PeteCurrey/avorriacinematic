import React from "react";
import Image from "next/image";
import { Z } from "@/lib/scene-z";

interface AlkotaProductStageProps {
  containerRef?: React.RefObject<HTMLDivElement | null>;
  imageRef?: React.RefObject<HTMLDivElement | null>;
  copyRef?: React.RefObject<HTMLDivElement | null>;
}

export function AlkotaProductStage({
  containerRef,
  imageRef,
  copyRef,
}: AlkotaProductStageProps) {
  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full flex flex-col justify-between p-6 sm:p-12 lg:p-16 pointer-events-none opacity-0"
      style={{ zIndex: Z.media }}
      aria-hidden="true"
    >
      {/* Full Product Hero Image */}
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-full"
      >
        <Image
          src="/media/projects/alkota/product/naked-carbon-hero.jpg"
          alt="Alkota Project 01 Naked Carbon Flagship"
          fill
          className="object-cover"
        />
      </div>

      {/* Top Header */}
      <div
        className="flex items-center justify-between font-mono text-[10px] sm:text-xs uppercase tracking-widest text-avorria-quiet"
        style={{ zIndex: Z.instrumentation }}
      >
        <span className="text-avorria-signal">001 / THE OBJECT</span>
        <span className="text-avorria-white">NAKED CARBON // CHASSIS</span>
      </div>

      {/* Monumental Editorial Brand Statement */}
      <div
        ref={copyRef}
        className="max-w-3xl my-auto pl-2 sm:pl-8"
        style={{ zIndex: Z.copy }}
      >
        <div className="display-xl text-avorria-white mb-3">
          A product deserves a digital world built with the same intent.
        </div>
        <div className="font-mono text-xs text-avorria-signal uppercase tracking-widest">
          STRATEGY / BRAND / EXPERIENCE / DEVELOPMENT
        </div>
      </div>

      {/* Bottom Specs Marker */}
      <div
        className="flex items-center justify-between border-t border-avorria-line/40 pt-4 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-avorria-quiet"
        style={{ zIndex: Z.instrumentation }}
      >
        <span>PRE-PRODUCTION CARBON DEVELOPMENT</span>
        <span className="text-avorria-white">001 // ALKOTA BIKES</span>
      </div>
    </div>
  );
}
