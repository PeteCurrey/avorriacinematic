import React from "react";

interface CapabilityProcessProps {
  sectionEyebrow: string;
  sectionTitle: string;
  steps: {
    number: string;
    name: string;
    duration: string;
    description: string;
    deliverables: string[];
  }[];
}

export function CapabilityProcess({
  sectionEyebrow,
  sectionTitle,
  steps,
}: CapabilityProcessProps) {
  return (
    <section aria-label="Engagement & Delivery Methodology" className="border-b border-avorria-line py-20 sm:py-32 bg-avorria-black">
      <div className="max-w-[1760px] mx-auto px-6 sm:px-12 lg:px-16 space-y-16">
        <div className="max-w-4xl space-y-4">
          <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest block">
            {sectionEyebrow}
          </span>
          <h2 className="display-xl font-display font-black uppercase tracking-tight text-avorria-white">
            {sectionTitle}
          </h2>
          <p className="font-body text-lg text-avorria-white/80 leading-relaxed max-w-3xl">
            We work in transparent, sprint-based cycles with direct partner access. No middle-management bloat or theatrical handovers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="p-8 bg-avorria-surface border border-avorria-line flex flex-col justify-between space-y-8"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-xs border-b border-avorria-line/40 pb-3">
                  <span className="text-avorria-signal font-bold">{step.number}</span>
                  <span className="text-[10px] text-avorria-muted uppercase">{step.duration}</span>
                </div>

                <h3 className="display-sm font-display font-black uppercase tracking-tight text-avorria-white">
                  {step.name}
                </h3>

                <p className="font-body text-sm text-avorria-white/80 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-avorria-line/40">
                <span className="font-mono text-[10px] text-avorria-quiet uppercase tracking-widest block">
                  STAGE OUTPUTS
                </span>
                <ul className="space-y-1.5 font-mono text-xs text-avorria-muted list-none p-0 m-0">
                  {step.deliverables.map((del, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-avorria-signal">/</span>
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
