import React from "react";
import Image from "next/image";

interface AlkotaProductStageProps {
  progress: number; // 0.0 to 1.0
}

export function AlkotaProductStage({ progress }: AlkotaProductStageProps) {
  // Active between 0.44 and 0.70
  if (progress < 0.42 || progress > 0.72) return null;

  // Reveal opacity (0.44 -> 0.52 -> 0.64 -> 0.70)
  const opacity = progress < 0.52 ? (progress - 0.42) / 0.10 : progress < 0.64 ? 1.0 : Math.max(0, 1.0 - (progress - 0.64) / 0.06);
  const scale = 0.96 + (progress - 0.44) * 0.1;

  return (
    <div
      className="absolute inset-0 w-full h-full flex flex-col justify-between p-6 sm:p-16 pointer-events-none z-10"
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Full Product Hero Image */}
      <div
        className="absolute inset-0 w-full h-full transition-transform duration-100 ease-out"
        style={{ transform: `scale(${scale})` }}
      >
        <Image
          src="/media/projects/alkota/product/naked-carbon-hero.jpg"
          alt="Alkota Project 01 Naked Carbon Flagship"
          fill
          className="object-cover"
        />
      </div>

      {/* Top Header */}
      <div className="flex items-center justify-between font-mono text-[10px] sm:text-xs uppercase tracking-widest text-avorria-quiet z-20">
        <span className="text-avorria-signal">001 / THE OBJECT</span>
        <span className="text-avorria-white">NAKED CARBON // CHASSIS</span>
      </div>

      {/* Monumental Editorial Brand Statement */}
      <div className="max-w-3xl z-20 my-auto pl-2 sm:pl-8">
        <div className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-avorria-white leading-tight mb-3">
          A product deserves a digital world built with the same intent.
        </div>
        <div className="font-mono text-xs text-avorria-signal uppercase tracking-widest">
          STRATEGY / BRAND / EXPERIENCE / DEVELOPMENT
        </div>
      </div>

      {/* Bottom Specs Marker */}
      <div className="flex items-center justify-between border-t border-avorria-line/40 pt-4 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-avorria-quiet z-20">
        <span>PRE-PRODUCTION CARBON DEVELOPMENT</span>
        <span className="text-avorria-white">03 / 18 // ALKOTA BIKES</span>
      </div>
    </div>
  );
}
