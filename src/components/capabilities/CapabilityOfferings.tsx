import React from "react";

export interface CapabilityOfferingItem {
  id: string;
  code: string;
  title: string;
  description: string;
  whoItIsFor: string;
  problemsSolved: string[];
  deliverables: string[];
}

interface CapabilityOfferingsProps {
  sectionEyebrow: string;
  sectionTitle: string;
  sectionDescription: string;
  offerings: CapabilityOfferingItem[];
}

export function CapabilityOfferings({
  sectionEyebrow,
  sectionTitle,
  sectionDescription,
  offerings,
}: CapabilityOfferingsProps) {
  return (
    <section aria-label="Commercial Offerings & Solutions" className="border-b border-avorria-line py-20 sm:py-32">
      <div className="max-w-[1760px] mx-auto px-6 sm:px-12 lg:px-16 space-y-16">
        {/* Section Header */}
        <div className="max-w-4xl space-y-4">
          <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest block">
            {sectionEyebrow}
          </span>
          <h2 className="display-xl font-display font-black uppercase tracking-tight text-avorria-white">
            {sectionTitle}
          </h2>
          <p className="font-body text-lg text-avorria-white/80 leading-relaxed max-w-3xl">
            {sectionDescription}
          </p>
        </div>

        {/* Offerings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offerings.map((item) => (
            <div
              key={item.id}
              className="p-8 sm:p-10 bg-avorria-surface border border-avorria-line hover:border-avorria-signal/40 transition-colors flex flex-col justify-between space-y-8"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-avorria-quiet border-b border-avorria-line/40 pb-3">
                  <span className="text-avorria-signal font-bold">{item.code}</span>
                  <span>DELIVERABLE SPECIFICATION</span>
                </div>

                <h3 className="display-sm font-display font-black uppercase tracking-tight text-avorria-white">
                  {item.title}
                </h3>

                <p className="font-body text-sm text-avorria-white/80 leading-relaxed">
                  {item.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-avorria-line/30">
                  <span className="font-mono text-[10px] text-avorria-signal uppercase tracking-widest block">
                    WHO IT IS FOR
                  </span>
                  <p className="font-mono text-xs text-avorria-muted uppercase leading-relaxed">
                    {item.whoItIsFor}
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="font-mono text-[10px] text-avorria-quiet uppercase tracking-widest block">
                    PROBLEMS ELIMINATED
                  </span>
                  <ul className="space-y-1.5 font-mono text-xs text-avorria-white/90 list-none p-0 m-0">
                    {item.problemsSolved.map((prob, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-avorria-signal" aria-hidden="true">✕</span>
                        <span>{prob}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 border-t border-avorria-line/40 space-y-2">
                <span className="font-mono text-[10px] text-avorria-quiet uppercase tracking-widest block">
                  CORE DELIVERABLES
                </span>
                <div className="flex flex-wrap gap-2">
                  {item.deliverables.map((del, idx) => (
                    <span
                      key={idx}
                      className="font-mono text-[10px] uppercase tracking-wider bg-avorria-black/60 px-2.5 py-1 border border-avorria-line text-avorria-muted"
                    >
                      {del}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
