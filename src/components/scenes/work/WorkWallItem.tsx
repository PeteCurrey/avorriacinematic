"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { WorkWallProject } from "@/types/work-wall";
import { CursorTrigger } from "@/providers/CursorContext";

interface WorkWallItemProps {
  project: WorkWallProject;
}

export function WorkWallItem({ project }: WorkWallItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  const aspectClasses: Record<string, string> = {
    "16/10": "aspect-[16/10]",
    "4/3": "aspect-[4/3]",
    "3/4": "aspect-[3/4]",
    "1/1": "aspect-square",
    "16/9": "aspect-video",
    "2/1": "aspect-[2/1]"
  };

  const colClasses: Record<number, string> = {
    1: "lg:col-start-1",
    2: "lg:col-start-2",
    3: "lg:col-start-3",
    4: "lg:col-start-4",
    5: "lg:col-start-5",
    6: "lg:col-start-6",
    7: "lg:col-start-7",
    8: "lg:col-start-8",
    9: "lg:col-start-9"
  };

  const spanClasses: Record<number, string> = {
    4: "lg:col-span-4",
    5: "lg:col-span-5",
    6: "lg:col-span-6",
    7: "lg:col-span-7",
    8: "lg:col-span-8",
    12: "lg:col-span-12"
  };

  const content = (
    <article
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group flex flex-col gap-4 col-span-12 ${colClasses[project.colStart] || ""} ${spanClasses[project.colSpan] || ""}`}
    >
      {/* Media Frame */}
      <div className={`relative w-full ${aspectClasses[project.aspectRatio] || "aspect-video"} bg-avorria-surface border border-avorria-line overflow-hidden transition-all duration-300 ${isHovered ? "border-avorria-signal/60 scale-[1.015]" : ""}`}>

        <Image
          src={project.imagePath}
          alt={`${project.title} - ${project.sector}`}
          fill
          loading="lazy"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Caption */}
      <div className="flex items-start justify-between gap-4 font-mono text-xs">
        <div className="flex flex-col gap-1">
          <h3 className="font-sans font-bold text-base sm:text-lg text-avorria-white group-hover:text-avorria-signal transition-colors">
            {project.title}
          </h3>
          <span className="text-avorria-quiet text-[11px] uppercase tracking-wider">
            {project.sector} <span>{"//"}</span> {project.capability}
          </span>
        </div>
        <span className="text-avorria-muted group-hover:text-avorria-signal transition-colors">
          {project.number}
        </span>
      </div>
    </article>
  );

  if (project.caseStudyAvailable) {
    return (
      <CursorTrigger state="view" label="VIEW">
        <Link href={`/work/${project.slug}`} className="block outline-none focus-visible:ring-1 focus-visible:ring-avorria-signal">
          {content}
        </Link>
      </CursorTrigger>
    );
  }

  return content;
}
