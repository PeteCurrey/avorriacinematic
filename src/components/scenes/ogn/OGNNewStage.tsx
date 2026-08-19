import React from "react";
import Image from "next/image";

interface OGNNewStageProps {
  opacity: number;
}

export function OGNNewStage({ opacity }: OGNNewStageProps) {
  if (opacity <= 0.01) return null;
  return (
    <div
      className="absolute inset-0 flex items-center justify-center p-4 sm:p-12 z-30 transition-opacity duration-300"
      style={{ opacity }}
    >
      <div className="relative w-full max-w-[1320px] aspect-[16/10] bg-avorria-surface border border-avorria-line overflow-hidden shadow-2xl flex items-center justify-center">
        <Image
          src="/media/projects/ogn/ogn-new-desktop.svg"
          alt="One Great Northern modern digital experience"
          fill
          className="object-contain"
        />

        {/* Floating Mobile Responsive Proof */}
        <div className="hidden lg:block absolute right-8 bottom-8 w-[200px] h-[340px] bg-avorria-black border border-avorria-signal shadow-2xl overflow-hidden animate-fadeIn">
          <Image
            src="/media/projects/ogn/ogn-new-mobile.svg"
            alt="Mobile responsive proof"
            fill
            className="object-cover"
          />
          <div className="absolute top-2 left-2 bg-avorria-black/90 px-1.5 py-0.5 font-mono text-[8px] text-avorria-signal uppercase tracking-widest border border-avorria-line">
            RESPONSIVE
          </div>
        </div>
      </div>
    </div>
  );
}
