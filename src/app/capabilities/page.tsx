import React from "react";
import Link from "next/link";
import { CAPABILITIES } from "@/content/capabilities";
import { generatePageMetadata } from "@/lib/seo/metadata";

export const metadata = generatePageMetadata({
  title: "Studio Capabilities",
  description: "High-end digital design, front-end engineering, technical search architecture, and autonomous AI systems.",
  path: "/capabilities"
});

export default function CapabilitiesPage() {
  return (
    <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 pt-32 pb-24">
      <div className="border-b border-avorria-line pb-12 mb-16">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs text-avorria-signal">02</span>
          <span className="text-avorria-line-strong">/</span>
          <span className="font-mono text-xs uppercase tracking-widest text-avorria-muted">Architecture</span>
        </div>
        <h1 className="display-lg uppercase text-avorria-white">Capabilities</h1>
        <p className="font-mono text-sm text-avorria-muted uppercase tracking-wider mt-4 max-w-xl">
          Three unified engineering disciplines: Build, Search, and Systems.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {CAPABILITIES.map((cap) => (
          <Link
            key={cap.slug}
            href={"/capabilities/" + cap.slug}
            className="group p-8 sm:p-10 border border-avorria-line hover:border-avorria-signal bg-avorria-surface/30 hover:bg-avorria-surface transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="font-mono text-xs text-avorria-signal uppercase tracking-widest mb-4">
                Capability // {cap.slug}
              </div>
              <h2 className="font-display font-bold text-3xl uppercase tracking-tight text-avorria-white group-hover:text-avorria-signal transition-colors mb-2">
                {cap.title}
              </h2>
              <p className="font-mono text-xs text-avorria-muted uppercase tracking-wider mb-6">
                {cap.subtitle}
              </p>
              <p className="font-body text-sm text-avorria-white/80 leading-relaxed mb-8">
                {cap.description}
              </p>
            </div>

            <div className="pt-6 border-t border-avorria-line font-mono text-xs text-avorria-signal flex items-center justify-between">
              <span>Explore Capability</span>
              <span>→</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
