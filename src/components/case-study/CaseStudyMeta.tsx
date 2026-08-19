import React from "react";
import { CaseStudyConfig } from "@/types/case-study";

interface CaseStudyMetaProps {
  config: CaseStudyConfig;
}

export function CaseStudyMeta({ config }: CaseStudyMetaProps) {
  return (
    <section aria-label="Project Scope & Technical Metadata" className="border-b border-avorria-line py-16 sm:py-24">
      <div className="max-w-[1760px] mx-auto px-6 sm:px-12 lg:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 font-mono text-xs border-t border-b border-avorria-line/40 py-8">
          <div>
            <span className="text-avorria-quiet uppercase tracking-wider block mb-1">RELATIONSHIP</span>
            <span className="text-avorria-white font-bold">{config.relationship}</span>
          </div>

          <div>
            <span className="text-avorria-quiet uppercase tracking-wider block mb-1">STATUS</span>
            <span className="text-avorria-signal font-bold">{config.status}</span>
          </div>

          <div>
            <span className="text-avorria-quiet uppercase tracking-wider block mb-1">DELIVERY YEAR</span>
            <span className="text-avorria-white font-bold">{config.year}</span>
          </div>

          <div>
            <span className="text-avorria-quiet uppercase tracking-wider block mb-1">CAPABILITIES</span>
            <span className="text-avorria-white font-bold">{config.capabilities.join(" / ")}</span>
          </div>

          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <span className="text-avorria-quiet uppercase tracking-wider block mb-1">DELIVERED ROLES</span>
            <span className="text-avorria-muted">{config.roles.join(", ")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
