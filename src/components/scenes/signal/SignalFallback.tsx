import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SIGNAL_GALLERY_PROJECTS } from "@/lib/scenes/signal-gallery-config";

export function SignalFallback() {
  return (
    <div className="w-full min-h-screen bg-avorria-black px-6 sm:px-12 py-24 flex flex-col gap-24 max-w-[1760px] mx-auto">
      <div className="border-b border-avorria-line pb-8">
        <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest">
          02 / SIGNAL
        </span>
        <h2 className="display-lg uppercase text-avorria-white mt-2">
          Selected Project Archive
        </h2>
      </div>

      <div className="flex flex-col gap-32">
        {SIGNAL_GALLERY_PROJECTS.map((project) => (
          <article
            key={project.slug}
            className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start border-b border-avorria-line pb-16"
          >
            <div className="w-full lg:w-2/3 aspect-video relative overflow-hidden bg-avorria-surface border border-avorria-line">
              <Image
                src={project.mediaSrc}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="w-full lg:w-1/3 flex flex-col justify-between">
              <div>
                <div className="font-mono text-xs text-avorria-signal uppercase tracking-widest mb-2">
                  {project.sequenceNumber} {"//"} {project.category}
                </div>
                <h3 className="font-display font-bold text-3xl uppercase tracking-tight text-avorria-white mb-4">
                  {project.title}
                </h3>
                <p className="font-body text-sm text-avorria-muted leading-relaxed mb-8">
                  {project.descriptor}
                </p>
              </div>

              <Link
                href={"/work/" + project.slug}
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-avorria-signal hover:text-avorria-white border-b border-avorria-signal pb-1"
              >
                <span>Explore Case Study</span>
                <span>→</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
