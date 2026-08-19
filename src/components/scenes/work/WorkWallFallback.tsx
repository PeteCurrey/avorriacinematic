import React from "react";
import Link from "next/link";
import Image from "next/image";
import { WORK_WALL_PROJECTS } from "@/lib/scenes/work-wall-config";

export function WorkWallFallback() {
  return (
    <div className="w-full bg-avorria-black px-6 sm:px-12 py-24 max-w-[1760px] mx-auto select-none space-y-16">
      <div className="border-b border-avorria-line pb-8 space-y-3">
        <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest">
          12 / SELECTED WORK
        </span>
        <h2 className="display-xl uppercase text-avorria-white">
          Selected Work
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {WORK_WALL_PROJECTS.map((project) => (
          <div key={project.id} className="flex flex-col gap-4">
            <div className="aspect-video w-full relative bg-avorria-surface border border-avorria-line overflow-hidden">
              <Image
                src={project.imagePath}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex justify-between items-start font-mono text-xs">
              <div>
                <h3 className="font-sans text-lg font-bold text-avorria-white">{project.title}</h3>
                <span className="text-avorria-muted">{project.sector} <span>{"//"}</span> {project.capability}</span>
              </div>
              <span className="text-avorria-signal">{project.number}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-8 border-t border-avorria-line">
        <Link href="/work" className="font-mono text-xs uppercase tracking-widest text-avorria-signal hover:text-avorria-white border-b border-avorria-signal pb-1">
          VIEW ALL WORK →
        </Link>
      </div>
    </div>
  );
}
