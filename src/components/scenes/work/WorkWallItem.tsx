"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { WorkWallProject } from "@/types/work-wall";
import { CursorTrigger } from "@/providers/CursorContext";

interface WorkWallItemProps {
  project: WorkWallProject;
}

function WorkWallItemContent({ project }: { project: WorkWallProject }) {
  const isContain = project.objectFit === "contain";

  return (
    <article className="w-full flex flex-col">
      {/* 1. Canonical Media Frame (Always 16:10, crisp border, zero frame scale) */}
      <div
        className="relative w-full aspect-[16/10] overflow-hidden border border-avorria-line group-hover:border-avorria-signal/40 transition-colors duration-300"
        style={{ backgroundColor: project.mediaBackground || "#080808" }}
      >
        <Image
          src={project.imagePath}
          alt={`${project.title} — ${project.sector}`}
          fill
          loading="lazy"
          sizes="(max-width: 850px) 100vw, (max-width: 1600px) 50vw, 800px"
          className={`${
            isContain
              ? "object-contain p-[clamp(12px,1.25vw,22px)]"
              : "object-cover"
          } transition-transform duration-500 ease-out group-hover:scale-[1.015]`}
          style={{ objectPosition: project.objectPosition || "center center" }}
        />
      </div>

      {/* 2. Canonical Editorial Caption */}
      <div className="mt-[clamp(18px,1.8vw,22px)] flex flex-col gap-1.5 select-none">
        {/* Row 1: Title (left) & Number (right) */}
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-sans font-bold text-lg sm:text-xl lg:text-2xl text-avorria-white group-hover:text-avorria-signal transition-colors leading-tight">
            {project.title}
          </h3>
          <span className="font-mono text-xs text-avorria-muted uppercase tracking-widest shrink-0">
            {project.number}
          </span>
        </div>

        {/* Row 2: Sector */}
        <div className="font-mono text-xs text-white/70 uppercase tracking-wider">
          {project.sector}
        </div>

        {/* Row 3: Capability */}
        <div className="font-mono text-[11px] text-avorria-quiet uppercase tracking-wider">
          {project.capability}
        </div>
      </div>
    </article>
  );
}

/**
 * WORK WALL ITEM
 *
 * Direct Grid Child:
 * The outer <div className="work-grid-item"> is ALWAYS the direct grid child
 * ensuring identical 1-column layout geometry whether caseStudyAvailable is true or false.
 */
export function WorkWallItem({ project }: WorkWallItemProps) {
  return (
    <div className="work-grid-item w-full">
      {project.caseStudyAvailable ? (
        <CursorTrigger state="view" label="VIEW" className="block w-full h-full">
          <Link
            href={`/work/${project.slug}`}
            className="group block w-full h-full outline-none focus-visible:ring-1 focus-visible:ring-avorria-signal"
          >
            <WorkWallItemContent project={project} />
          </Link>
        </CursorTrigger>
      ) : (
        <div className="group block w-full h-full">
          <WorkWallItemContent project={project} />
        </div>
      )}
    </div>
  );
}
