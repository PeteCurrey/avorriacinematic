import React from "react";
import { PrecisionField } from "@/components/cinematic/PrecisionField";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { INTELLIGENCE_ARTICLES } from "@/lib/intelligence/articles";

export const metadata = generatePageMetadata({
  title: "Intelligence — Strategic Perspectives & Technical Essays | Avorria",
  description: "Insights that earn their keep. In-depth technical essays on search architecture, AI system design, and durable digital strategy from Avorria.",
  path: "/intelligence"
});

export default function IntelligencePage() {
  const featuredArticle = INTELLIGENCE_ARTICLES[0];
  const secondaryArticles = INTELLIGENCE_ARTICLES.slice(1);

  return (
    <main className="w-full min-h-screen bg-avorria-black text-avorria-white pt-24 sm:pt-32 pb-24">
      {/* ── Hero ─────────────────────────────────────────── */}
      <section aria-label="Intelligence Publication Overview" className="relative overflow-hidden border-b border-avorria-line pb-16 sm:pb-24">
        {/* Ambient depth, matching the homepage hero. Pointer-transparent and
            self-pausing when off-screen. */}
        <PrecisionField intensity={0.75} />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 70% at 30% 45%, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.6) 50%, rgba(8,8,8,0) 100%)",
          }}
        />
        <div className="relative z-10 max-w-[1760px] mx-auto px-6 sm:px-12 lg:px-16 space-y-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-avorria-quiet border-b border-avorria-line/40 pb-4">
            <span className="text-avorria-signal font-bold">04</span>
            <span className="text-avorria-line-strong" aria-hidden="true">/</span>
            <span className="text-avorria-white font-bold" aria-current="page">INTELLIGENCE</span>
            <span className="text-avorria-line-strong" aria-hidden="true">/</span>
            <span className="text-avorria-muted">TECHNICAL ESSAYS & STRATEGY</span>
          </div>

          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 bg-avorria-surface border border-avorria-signal/30 px-3.5 py-1.5 font-mono text-xs uppercase tracking-widest text-avorria-signal">
              <span className="w-2 h-2 rounded-full bg-avorria-signal" aria-hidden="true" />
              <span>EDITORIAL PUBLICATION // 3 TERRITORIES</span>
            </div>

            <h1 className="display-xxl display-xxl-long font-display font-black uppercase tracking-tight text-avorria-white leading-none">
              INTELLIGENCE
            </h1>

            <p className="display-sm font-display font-black uppercase tracking-tight text-avorria-signal leading-tight">
              INSIGHTS THAT EARN THEIR KEEP.
            </p>

            <p className="font-body text-lg sm:text-xl text-avorria-white/80 max-w-3xl leading-relaxed">
              We do not write generic agency listicles or AI-generated filler. Intelligence publishes original technical essays, architectural analyses, and strategic perspectives drawn from real commercial software delivery.
            </p>
          </div>

          {/* Territory Pills */}
          <div className="flex flex-wrap gap-3 pt-2 font-mono text-xs">
            {["SEARCH ARCHITECTURE", "AI SYSTEMS & GOVERNANCE", "DIGITAL PLATFORM STRATEGY"].map((territory) => (
              <span
                key={territory}
                className="bg-avorria-surface border border-avorria-line px-4 py-2 text-avorria-muted uppercase tracking-wider"
              >
                TERRITORY // {territory}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Thesis / Lead Article ──────────────── */}
      <section aria-label="Featured Intelligence Essay" className="border-b border-avorria-line py-20 sm:py-28 bg-avorria-surface/20">
        <div className="max-w-[1760px] mx-auto px-6 sm:px-12 lg:px-16 space-y-10">
          <div className="flex items-center justify-between font-mono text-xs text-avorria-signal border-b border-avorria-line/40 pb-3">
            <span className="font-bold">01 // FEATURED THESIS</span>
            <span className="text-[10px] text-avorria-quiet uppercase">LEAD EDITORIAL</span>
          </div>

          <div className="p-8 sm:p-12 lg:p-16 bg-avorria-surface border border-avorria-line hover:border-avorria-signal/40 transition-colors space-y-8">
            <div className="flex flex-wrap items-center gap-4 font-mono text-xs">
              <span className="bg-avorria-signal text-avorria-black px-2.5 py-1 font-bold uppercase">
                {featuredArticle.territory}
              </span>
              <span className="text-avorria-muted">{featuredArticle.publishedAt}</span>
              <span className="text-avorria-line-strong">/</span>
              <span className="text-avorria-quiet">{featuredArticle.readTime}</span>
              <span className="text-avorria-line-strong">/</span>
              <span className="text-avorria-muted">BY {featuredArticle.author.name.toUpperCase()}</span>
            </div>

            <div className="space-y-4 max-w-4xl">
              <h2 className="display-lg font-display font-black uppercase tracking-tight text-avorria-white hover:text-avorria-signal transition-colors">
                <Link href={featuredArticle.href}>
                  {featuredArticle.title}
                </Link>
              </h2>

              <p className="font-body text-lg sm:text-xl text-avorria-white/85 leading-relaxed">
                {featuredArticle.thesis}
              </p>
            </div>

            <div className="pt-4 border-t border-avorria-line/40 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-avorria-muted">
                <span>RELATED CAPABILITY: <strong className="text-avorria-signal">{featuredArticle.relatedCapability.name}</strong></span>
              </div>

              <Link
                href={featuredArticle.href}
                className="inline-flex items-center gap-3 bg-avorria-white text-avorria-black font-mono text-xs uppercase font-bold px-8 py-4 hover:bg-avorria-signal transition-colors"
              >
                <span>READ FULL ESSAY</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Secondary Articles Index ────────────────────── */}
      <section aria-label="Intelligence Article Archive" className="py-20 sm:py-28">
        <div className="max-w-[1760px] mx-auto px-6 sm:px-12 lg:px-16 space-y-12">
          <div className="flex items-center justify-between font-mono text-xs text-avorria-muted border-b border-avorria-line/40 pb-3">
            <span className="text-avorria-signal font-bold">02 // ESSAYS & PERSPECTIVES</span>
            <span>{INTELLIGENCE_ARTICLES.length} PUBLISHED ESSAYS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            {secondaryArticles.map((article) => (
              <article
                key={article.id}
                className="p-8 sm:p-10 bg-avorria-surface border border-avorria-line hover:border-avorria-signal/40 transition-colors flex flex-col justify-between space-y-8"
              >
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] text-avorria-muted uppercase border-b border-avorria-line/30 pb-3">
                    <span className="text-avorria-signal font-bold">{article.territory}</span>
                    <span>•</span>
                    <span>{article.publishedAt}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="heading-lg text-avorria-white hover:text-avorria-signal transition-colors">
                    <Link href={article.href}>
                      {article.title}
                    </Link>
                  </h3>

                  <p className="font-body text-sm text-avorria-white/80 leading-relaxed">
                    {article.thesis}
                  </p>
                </div>

                <div className="pt-6 border-t border-avorria-line/40 flex items-center justify-between font-mono text-xs">
                  <span className="text-avorria-quiet text-[10px]">
                    BY {article.author.name.toUpperCase()}
                  </span>

                  <Link
                    href={article.href}
                    className="inline-flex items-center gap-2 text-avorria-white hover:text-avorria-signal transition-colors uppercase font-bold tracking-wider"
                  >
                    <span>READ ESSAY</span>
                    <span className="text-avorria-signal">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Commercial Bridge CTA ───────────────────────── */}
      <section aria-label="Commercial Action" className="border-t border-avorria-line py-20 bg-avorria-surface/10">
        <div className="max-w-[1760px] mx-auto px-6 sm:px-12 lg:px-16 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-2 max-w-2xl">
            <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest block">
              APPLY THESE PRINCIPLES TO YOUR PLATFORM
            </span>
            <h2 className="display-md font-display font-black uppercase tracking-tight text-avorria-white">
              NEED STRATEGIC DIGITAL ARCHITECTURE?
            </h2>
            <p className="font-body text-sm text-avorria-white/80 leading-relaxed">
              We help founders and executive teams engineer high-performance platforms, preserve search equity during migrations, and build bounded AI systems.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/start-project"
              className="inline-flex items-center gap-3 bg-avorria-signal text-avorria-black font-display font-extrabold text-xs uppercase tracking-wider px-8 py-4 hover:bg-avorria-white transition-colors"
            >
              <span>START A PROJECT</span>
              <span>→</span>
            </Link>
            <Link
              href="/work"
              className="font-mono text-xs uppercase tracking-widest text-avorria-muted hover:text-avorria-white border-b border-avorria-line pb-1 transition-colors"
            >
              VIEW PROVEN WORK
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
