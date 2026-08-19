import React from "react";
import { STUDIO_INFO } from "@/content/studio";
import { generatePageMetadata } from "@/lib/seo/metadata";

export const metadata = generatePageMetadata({
  title: "Studio & Philosophy",
  description: STUDIO_INFO.descriptor,
  path: "/studio"
});

export default function StudioPage() {
  return (
    <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 pt-32 pb-24">
      <div className="border-b border-avorria-line pb-12 mb-16">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs text-avorria-signal">04</span>
          <span className="text-avorria-line-strong">/</span>
          <span className="font-mono text-xs uppercase tracking-widest text-avorria-muted">Philosophy</span>
        </div>
        <h1 className="display-lg uppercase text-avorria-white">Studio</h1>
        <p className="font-mono text-sm text-avorria-muted uppercase tracking-wider mt-4 max-w-xl">
          {STUDIO_INFO.descriptor}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
        <div className="lg:col-span-5 font-mono text-xs text-avorria-signal uppercase tracking-widest">
          The Avorria Manifesto
        </div>
        <div className="lg:col-span-7 space-y-6">
          {STUDIO_INFO.manifesto.map((paragraph, i) => (
            <p key={i} className="font-display text-2xl lg:text-3xl text-avorria-white font-medium leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 border-t border-avorria-line">
        {STUDIO_INFO.principles.map((item, i) => (
          <div key={i} className="p-8 border border-avorria-line bg-avorria-surface/30">
            <span className="font-mono text-xs text-avorria-signal">0{i + 1}</span>
            <h3 className="font-display font-bold text-xl uppercase text-avorria-white mt-4 mb-2">
              {item.title}
            </h3>
            <p className="font-body text-sm text-avorria-muted leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
