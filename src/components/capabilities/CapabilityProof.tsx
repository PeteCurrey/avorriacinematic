import React from "react";
import Image from "next/image";
import Link from "next/link";

export interface CapabilityProofProject {
  slug: string;
  projectIndex: string;
  title: string;
  category: string;
  description: string;
  impactSummary: string;
  mediaSrc: string;
  mediaAlt: string;
  tags: string[];
}

interface CapabilityProofProps {
  sectionEyebrow: string;
  sectionTitle: string;
  projects: CapabilityProofProject[];
}

export function CapabilityProof({
  sectionEyebrow,
  sectionTitle,
  projects,
}: CapabilityProofProps) {
  return (
    <section aria-label="Curated Project Proof" className="border-b border-avorria-line py-20 sm:py-32 bg-avorria-surface/20">
      <div className="max-w-[1760px] mx-auto px-6 sm:px-12 lg:px-16 space-y-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-4xl space-y-4">
            <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest block">
              {sectionEyebrow}
            </span>
            <h2 className="display-xl font-display font-black uppercase tracking-tight text-avorria-white">
              {sectionTitle}
            </h2>
            <p className="font-body text-lg text-avorria-white/80 leading-relaxed max-w-2xl">
              We do not present conceptual moodboards. We demonstrate verified software systems deployed in production.
            </p>
          </div>

          <Link
            href="/work"
            className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-avorria-signal hover:text-avorria-white transition-colors"
          >
            <span>EXPLORE FULL PORTFOLIO INDEX</span>
            <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {projects.map((proj) => (
            <div
              key={proj.slug}
              className="group bg-avorria-surface border border-avorria-line hover:border-avorria-signal/40 transition-colors flex flex-col justify-between overflow-hidden"
            >
              {/* Media Preview */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-avorria-black border-b border-avorria-line">
                <Image
                  src={proj.mediaSrc}
                  alt={proj.mediaAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
                <div className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-widest bg-avorria-black/80 px-2.5 py-1 border border-avorria-line text-avorria-signal">
                  {proj.projectIndex}
                </div>
              </div>

              {/* Content Box */}
              <div className="p-8 sm:p-10 space-y-6 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between font-mono text-xs text-avorria-muted uppercase tracking-wider">
                    <span>{proj.category}</span>
                  </div>

                  <h3 className="display-md font-display font-black uppercase tracking-tight text-avorria-white group-hover:text-avorria-signal transition-colors">
                    {proj.title}
                  </h3>

                  <p className="font-body text-sm text-avorria-white/80 leading-relaxed">
                    {proj.description}
                  </p>

                  <div className="p-4 bg-avorria-black/50 border border-avorria-line/40 font-mono text-xs text-avorria-muted uppercase space-y-1">
                    <span className="text-[10px] text-avorria-signal block">ENGINEERED OUTCOME</span>
                    <p>{proj.impactSummary}</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-avorria-line/40 flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {proj.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="font-mono text-[10px] uppercase tracking-wider text-avorria-quiet"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/work/${proj.slug}`}
                    className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-avorria-white group-hover:text-avorria-signal transition-colors"
                  >
                    <span>VIEW CASE STUDY</span>
                    <span className="text-avorria-signal">→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
