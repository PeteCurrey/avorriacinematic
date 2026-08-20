"use client";

import React from "react";
import Link from "next/link";
import type { ServiceSlug } from "@/types/content";

interface RelatedServiceItem {
  slug: ServiceSlug;
  code: string;
  title: string;
  reason: string;
}

interface ServiceRelatedGridProps {
  currentServiceCode: string;
  relatedServices: RelatedServiceItem[];
}

export function ServiceRelatedGrid({
  currentServiceCode,
  relatedServices
}: ServiceRelatedGridProps) {
  return (
    <section className="w-full border-b border-avorria-line bg-avorria-black py-16 sm:py-24">
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-avorria-line pb-8 mb-12">
          <div>
            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-avorria-signal mb-3">
              <span>05 // CONNECTED DISCIPLINES</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-avorria-white">
              INTEGRATED DISCIPLINES
            </h2>
          </div>
          <p className="font-mono text-xs text-avorria-muted uppercase tracking-wider max-w-md">
            Digital architecture functions best when disciplines connect seamlessly.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {relatedServices.map((rel) => (
            <Link
              key={rel.slug}
              href={`/services/${rel.slug}`}
              className="group p-8 border border-avorria-line bg-avorria-surface/30 hover:border-avorria-signal hover:bg-avorria-surface/60 transition-all duration-300 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest border-b border-avorria-line/40 pb-3">
                  <span className="text-avorria-signal font-bold">{rel.code}</span>
                  <span className="text-avorria-muted">Connected to {currentServiceCode}</span>
                </div>

                <h3 className="font-display font-bold text-2xl uppercase tracking-tight text-avorria-white group-hover:text-avorria-signal transition-colors">
                  {rel.title}
                </h3>

                <p className="font-body text-sm sm:text-base text-avorria-white/80 leading-relaxed">
                  {rel.reason}
                </p>
              </div>

              <div className="pt-4 border-t border-avorria-line/40 font-mono text-xs text-avorria-signal flex items-center justify-between font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                <span>Explore {rel.title}</span>
                <span>→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
