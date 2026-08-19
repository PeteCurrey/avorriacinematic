import React from "react";
import Link from "next/link";
import { getCapabilityBySlug } from "@/content/capabilities";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { notFound } from "next/navigation";

export async function generateMetadata() {
  const cap = getCapabilityBySlug("search");
  if (!cap) return {};
  return generatePageMetadata({
    title: cap.title + " — " + cap.subtitle,
    description: cap.description,
    path: "/capabilities/search"
  });
}

export default function CapabilityDetailPage() {
  const cap = getCapabilityBySlug("search");
  if (!cap) notFound();

  return (
    <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 pt-32 pb-24">
      <div className="flex items-center gap-3 mb-8 font-mono text-xs">
        <Link href="/capabilities" className="text-avorria-muted hover:text-avorria-white transition-colors">
          Capabilities
        </Link>
        <span className="text-avorria-line-strong">/</span>
        <span className="text-avorria-signal uppercase">{cap.title}</span>
      </div>

      <div className="border-b border-avorria-line pb-16 mb-16">
        <h1 className="display-xl uppercase text-avorria-white">{cap.title}</h1>
        <p className="font-mono text-base text-avorria-signal uppercase tracking-wider mt-4">
          {cap.subtitle}
        </p>
        <p className="font-body text-xl text-avorria-white/80 max-w-3xl mt-6 leading-relaxed">
          {cap.description}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-6 space-y-6">
          <h2 className="font-mono text-xs uppercase tracking-widest text-avorria-muted pb-3 border-b border-avorria-line">
            Engineered Outcomes
          </h2>
          <ul className="space-y-4 font-mono text-xs">
            {cap.outcomes.map((outcome, i) => (
              <li key={i} className="flex items-start gap-3 p-4 border border-avorria-line bg-avorria-surface">
                <span className="text-avorria-signal">0{i + 1}</span>
                <span className="text-avorria-white">{outcome}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-6 space-y-6">
          <h2 className="font-mono text-xs uppercase tracking-widest text-avorria-muted pb-3 border-b border-avorria-line">
            Core Deliverables
          </h2>
          <div className="space-y-4">
            {cap.deliverablesList.map((item, i) => (
              <div key={i} className="p-6 border border-avorria-line bg-avorria-surface/40">
                <h3 className="font-display font-semibold text-lg uppercase text-avorria-white mb-2">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-avorria-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
