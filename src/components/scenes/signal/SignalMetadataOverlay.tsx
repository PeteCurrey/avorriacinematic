import React from "react";
import Link from "next/link";
import { SIGNAL_GALLERY_PROJECTS } from "@/lib/scenes/signal-gallery-config";
import { CursorTrigger } from "@/providers/CursorContext";
import { Z } from "@/lib/scene-z";

interface SignalMetadataOverlayProps {
  containerRef?: React.RefObject<HTMLDivElement | null>;
  activeIndex: number;
}

export function SignalMetadataOverlay({ containerRef, activeIndex }: SignalMetadataOverlayProps) {
  const currentProject = SIGNAL_GALLERY_PROJECTS[activeIndex] || SIGNAL_GALLERY_PROJECTS[0];

  return (
    <div
      ref={containerRef}
      className="absolute bottom-8 sm:bottom-12 left-6 sm:left-12 lg:left-16 pointer-events-auto max-w-lg opacity-0"
      style={{ zIndex: Z.interactive }}
      role="region"
      aria-label="Active Featured Project"
    >
      <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-avorria-quiet mb-2">
        <span className="text-avorria-signal">{currentProject.sequenceNumber}</span>
        <span className="text-avorria-line-strong">/</span>
        <span className="text-avorria-white">{currentProject.category}</span>
      </div>

      <h3 className="font-display font-bold text-2xl sm:text-3xl uppercase tracking-tight text-avorria-white mb-2">
        {currentProject.title}
      </h3>

      <p className="font-mono text-xs text-avorria-muted uppercase tracking-wider mb-4 max-w-md leading-relaxed hidden sm:block">
        {currentProject.descriptor}
      </p>

      {currentProject.caseStudyAvailable && (
        <CursorTrigger state="view" label="VIEW">
          <Link
            href={"/work/" + currentProject.slug}
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-avorria-signal hover:text-avorria-white transition-colors"
          >
            <span>VIEW PROJECT</span>
            <span>→</span>
          </Link>
        </CursorTrigger>
      )}
    </div>
  );
}
