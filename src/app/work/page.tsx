import React from "react";
import Link from "next/link";
import { PROJECTS } from "@/content/projects";
import { generatePageMetadata } from "@/lib/seo/metadata";

export const metadata = generatePageMetadata({
  title: "Selected Work",
  description: "Bespoke digital flagships, high-throughput search architectures, and intelligent enterprise systems.",
  path: "/work"
});

export default function WorkPage() {
  return (
    <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 pt-32 pb-24">
      <div className="border-b border-avorria-line pb-12 mb-16">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs text-avorria-signal">01</span>
          <span className="text-avorria-line-strong">/</span>
          <span className="font-mono text-xs uppercase tracking-widest text-avorria-muted">Archive</span>
        </div>
        <h1 className="display-lg uppercase text-avorria-white">Selected Work</h1>
        <p className="font-mono text-sm text-avorria-muted uppercase tracking-wider mt-4 max-w-xl">
          Factual inventory of commissioned client platforms, experimental systems, and digital flagships.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS.map((project) => (
          <Link
            key={project.slug}
            href={"/work/" + project.slug}
            className="group flex flex-col justify-between p-8 border border-avorria-line hover:border-avorria-signal bg-avorria-surface/30 hover:bg-avorria-surface transition-all duration-300 min-h-[340px]"
          >
            <div>
              <div className="flex items-center justify-between border-b border-avorria-line pb-4 mb-6">
                <span className="font-mono text-xs text-avorria-signal">{project.sequenceNumber}</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-avorria-muted">
                  {project.year}
                </span>
              </div>
              <h2 className="font-display font-bold text-2xl uppercase tracking-tight text-avorria-white group-hover:text-avorria-signal transition-colors duration-200">
                {project.title}
              </h2>
              <p className="font-mono text-xs text-avorria-muted uppercase tracking-wider mt-2">
                {project.sector}
              </p>
              <p className="font-body text-sm text-avorria-white/80 mt-4 leading-relaxed line-clamp-3">
                {project.shortDescription}
              </p>
            </div>

            <div className="pt-6 border-t border-avorria-line flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-avorria-muted group-hover:text-avorria-white">
              <span>Capabilities: {project.capabilities.join(", ")}</span>
              <span className="text-avorria-signal">View →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
