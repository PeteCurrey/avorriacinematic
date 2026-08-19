import React from "react";
import Image from "next/image";
import { ProjectMedia } from "@/types/content";

interface ResponsiveMediaProps {
  media?: ProjectMedia;
  className?: string;
}

export function ResponsiveMedia({ media, className = "" }: ResponsiveMediaProps) {
  if (!media) {
    return (
      <div className={`w-full aspect-video bg-avorria-surface flex items-center justify-center border border-avorria-line ${className}`}>
        <span className="font-mono text-xs uppercase tracking-widest text-avorria-muted">
          Asset Pending
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-avorria-surface ${className}`}>
      <Image
        src={media.src}
        alt={media.alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}
