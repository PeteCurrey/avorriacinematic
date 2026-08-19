import React from "react";
import Image from "next/image";

interface AlkotaHandoffLayerProps {
  opacity: number;
}

export function AlkotaHandoffLayer({ opacity }: AlkotaHandoffLayerProps) {
  if (opacity <= 0.01) return null;

  return (
    <div
      className="absolute inset-0 w-full h-full z-30 pointer-events-none"
      style={{ opacity }}
      aria-hidden="true"
    >
      <Image
        src="/media/projects/alkota/product/naked-carbon-hero.jpg"
        alt="Alkota Bikes Naked Carbon Platform"
        fill
        priority
        className="object-cover"
      />
    </div>
  );
}
