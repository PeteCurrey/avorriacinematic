import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CLIENT_WORK_PROJECTS, VENTURE_PROJECTS } from "@/lib/scenes/work-wall-config";

export function WorkWallFallback() {
  const totalCount = CLIENT_WORK_PROJECTS.length + VENTURE_PROJECTS.length;

  return (
    <div className="w-full bg-avorria-black max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28 select-none space-y-20">
      {/* Header */}
      <div className="border-b border-avorria-line pb-8 space-y-2">
        <span className="font-mono text-xs text-avorria-signal uppercase tracking-[0.25em]">
          SELECTED WORK
        </span>
        <h2 className="display-xl uppercase text-avorria-white tracking-tight leading-none">
          Selected Work
        </h2>
        <p className="font-mono text-xs uppercase tracking-widest text-avorria-muted pt-2">
          DIFFERENT INDUSTRIES. SAME STANDARD.
        </p>
      </div>

      {/* Client Work */}
      <div className="space-y-12">
        <div className="flex items-center justify-between border-b border-avorria-line/40 pb-4 font-mono text-xs uppercase tracking-widest text-avorria-quiet">
          <span className="text-avorria-signal font-medium">SELECTED CLIENT WORK</span>
          <span className="text-avorria-white/80 font-normal">ENGINEERING &amp; DIGITAL PRODUCTS</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
          {CLIENT_WORK_PROJECTS.map((project) => (
            <div key={project.id} className="flex flex-col gap-4">
              <div
                className="aspect-[16/10] w-full relative border border-avorria-line overflow-hidden"
                style={{ backgroundColor: project.mediaBackground || "#080808" }}
              >
                <Image
                  src={project.imagePath}
                  alt={`${project.title} — ${project.sector}`}
                  fill
                  className={project.objectFit === "contain" ? "object-contain p-4" : "object-cover"}
                />
              </div>
              <div className="flex flex-col gap-1 font-mono text-xs">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-sans text-xl font-bold text-avorria-white">{project.title}</h3>
                  <span className="text-avorria-muted">{project.number}</span>
                </div>
                <span className="text-white/70 uppercase tracking-wider">{project.sector}</span>
                <span className="text-avorria-quiet uppercase tracking-wider text-[11px]">{project.capability}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ventures */}
      <div className="space-y-12 pt-12 border-t border-avorria-line/30">
        <div className="flex items-center justify-between border-b border-avorria-line/40 pb-4 font-mono text-xs uppercase tracking-widest text-avorria-quiet">
          <span className="text-avorria-signal font-medium">AVORRIA VENTURES</span>
          <span className="text-avorria-muted font-normal">BUILT &amp; OPERATED BY AVORRIA</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
          {VENTURE_PROJECTS.map((project) => (
            <div key={project.id} className="flex flex-col gap-4">
              <div
                className="aspect-[16/10] w-full relative border border-avorria-line overflow-hidden"
                style={{ backgroundColor: project.mediaBackground || "#080808" }}
              >
                <Image
                  src={project.imagePath}
                  alt={`${project.title} — ${project.sector}`}
                  fill
                  className={project.objectFit === "contain" ? "object-contain p-4" : "object-cover"}
                />
              </div>
              <div className="flex flex-col gap-1 font-mono text-xs">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-sans text-xl font-bold text-avorria-white">{project.title}</h3>
                  <span className="text-avorria-muted">{project.number}</span>
                </div>
                <span className="text-white/70 uppercase tracking-wider">{project.sector}</span>
                <span className="text-avorria-quiet uppercase tracking-wider text-[11px]">{project.capability}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="pt-12 border-t border-avorria-line flex items-center justify-between">
        <div className="font-mono text-xs text-avorria-quiet uppercase tracking-widest">
          {totalCount} SELECTED PROJECTS // ARCHIVE &amp; COMPLETE FOLIO
        </div>
        <Link href="/work" className="font-mono text-xs uppercase tracking-widest text-avorria-signal hover:text-avorria-white border-b border-avorria-signal pb-1">
          VIEW ALL WORK →
        </Link>
      </div>
    </div>
  );
}
