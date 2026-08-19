import React from "react";

interface CapabilityArchitectureProps {
  sectionEyebrow: string;
  sectionTitle: string;
  principles: {
    number: string;
    title: string;
    description: string;
    metric: string;
    metricLabel: string;
  }[];
}

export function CapabilityArchitecture({
  sectionEyebrow,
  sectionTitle,
  principles,
}: CapabilityArchitectureProps) {
  return (
    <section aria-label="Technical Discipline & Architecture" className="border-b border-avorria-line py-20 sm:py-32 bg-avorria-black">
      <div className="max-w-[1760px] mx-auto px-6 sm:px-12 lg:px-16 space-y-16">
        <div className="max-w-4xl space-y-4">
          <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest block">
            {sectionEyebrow}
          </span>
          <h2 className="display-xl font-display font-black uppercase tracking-tight text-avorria-white">
            {sectionTitle}
          </h2>
          <p className="font-body text-lg text-avorria-white/80 leading-relaxed max-w-3xl">
            Generic agency templates introduce thousands of lines of unused JavaScript, broken accessibility, and fragile layouts. Avorria constructs software from foundational primitives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {principles.map((p) => (
            <div
              key={p.number}
              className="p-8 bg-avorria-surface border border-avorria-line space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-xs text-avorria-signal font-bold border-b border-avorria-line/40 pb-2">
                  <span>{p.number}</span>
                  <span className="text-[10px] text-avorria-quiet uppercase">STANDARD</span>
                </div>
                <h3 className="font-display font-black text-xl uppercase tracking-tight text-avorria-white">
                  {p.title}
                </h3>
                <p className="font-body text-sm text-avorria-white/80 leading-relaxed">
                  {p.description}
                </p>
              </div>

              <div className="pt-4 border-t border-avorria-line/40">
                <div className="display-md font-display font-black text-avorria-signal">
                  {p.metric}
                </div>
                <span className="font-mono text-[10px] text-avorria-muted uppercase tracking-wider block">
                  {p.metricLabel}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
