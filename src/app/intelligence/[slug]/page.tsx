import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { INTELLIGENCE_ARTICLES, getArticleBySlug } from "@/lib/intelligence/articles";

export async function generateStaticParams() {
  const canonicalSlugs = INTELLIGENCE_ARTICLES.map((art) => ({ slug: art.slug }));
  const aliasSlugs: { slug: string }[] = [];
  INTELLIGENCE_ARTICLES.forEach((art) => {
    if (art.aliases) {
      art.aliases.forEach((alias) => aliasSlugs.push({ slug: alias }));
    }
  });
  return [...canonicalSlugs, ...aliasSlugs];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) return {};

  // Always canonical to the article's own slug, never an alias
  return generatePageMetadata({
    title: `${article.title} — Avorria Intelligence`,
    description: article.thesis,
    path: `/intelligence/${article.slug}`
  });
}

export default async function IntelligenceArticlePage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  // Find next article in sequence
  const currentIndex = INTELLIGENCE_ARTICLES.findIndex(
    (a) => a.slug === article.slug || (a.aliases && a.aliases.includes(article.slug))
  );
  const nextArticle =
    INTELLIGENCE_ARTICLES[(currentIndex + 1) % INTELLIGENCE_ARTICLES.length];

  // Derive ISO date from article publishedAt string e.g. "AUG 2026" → "2026-08-01"
  const publishedIso = (() => {
    const monthMap: Record<string, string> = {
      JAN: "01", FEB: "02", MAR: "03", APR: "04", MAY: "05", JUN: "06",
      JUL: "07", AUG: "08", SEP: "09", OCT: "10", NOV: "11", DEC: "12"
    };
    const parts = (article.publishedAt || "").toUpperCase().split(" ");
    if (parts.length === 2) {
      const month = monthMap[parts[0]] || "01";
      return `${parts[1]}-${month}-01`;
    }
    return new Date().toISOString().split("T")[0];
  })();

  // Structured Data Schema for Article
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: article.title,
    description: article.thesis,
    author: {
      "@type": "Person",
      name: article.author.name,
      jobTitle: article.author.role
    },
    publisher: {
      "@type": "Organization",
      name: "Avorria",
      url: "https://avorria.com"
    },
    datePublished: publishedIso,
    inLanguage: "en-GB"
  };

  return (
    <main className="w-full min-h-screen bg-avorria-black text-avorria-white pt-24 sm:pt-32 pb-24">
      {/* Inject JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="max-w-[1760px] mx-auto px-6 sm:px-12 lg:px-16 space-y-16">
        {/* ── Breadcrumb ─────────────────────────────────────── */}
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-avorria-quiet border-b border-avorria-line/40 pb-4">
          <Link
            href="/intelligence"
            className="text-avorria-muted hover:text-avorria-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-avorria-signal"
          >
            INTELLIGENCE
          </Link>
          <span className="text-avorria-line-strong" aria-hidden="true">/</span>
          <span className="text-avorria-signal font-bold">{article.territory}</span>
          <span className="text-avorria-line-strong" aria-hidden="true">/</span>
          <span className="text-avorria-white font-bold truncate max-w-xs sm:max-w-md" aria-current="page">
            {article.title}
          </span>
        </div>

        {/* ── Article Header ─────────────────────────────────── */}
        <header className="max-w-4xl space-y-6">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <span className="bg-avorria-signal text-avorria-black px-2.5 py-1 font-bold uppercase">
              {article.territory}
            </span>
            <span className="text-avorria-muted">{article.publishedAt}</span>
            <span className="text-avorria-line-strong">/</span>
            <span className="text-avorria-quiet">{article.readTime}</span>
          </div>

          <h1 className="display-xl sm:display-xxl font-display font-black uppercase tracking-tight text-avorria-white leading-tight">
            {article.title}
          </h1>

          <p className="font-body text-xl sm:text-2xl text-avorria-white/85 leading-relaxed">
            {article.thesis}
          </p>

          <div className="pt-4 border-t border-avorria-line/40 flex items-center gap-4 font-mono text-xs text-avorria-muted">
            <span>AUTHOR: <strong className="text-avorria-white">{article.author.name}</strong></span>
            <span className="text-avorria-line-strong">/</span>
            <span>{article.author.role}</span>
          </div>
        </header>

        {/* ── Summary Box ────────────────────────────────────── */}
        <div className="max-w-4xl p-8 bg-avorria-surface border border-avorria-signal/40 space-y-4">
          <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest block">
            EXECUTIVE SUMMARY
          </span>
          <div className="space-y-3 font-body text-base text-avorria-white/90 leading-relaxed">
            {article.summary.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        </div>

        {/* ── Main Body Content ──────────────────────────────── */}
        <div className="max-w-4xl space-y-16">
          {article.sections.map((section, sIdx) => (
            <section key={sIdx} className="space-y-6">
              <div className="border-b border-avorria-line/40 pb-3">
                <h2 className="display-sm font-display font-black uppercase tracking-tight text-avorria-white">
                  {section.heading}
                </h2>
                {section.subheading && (
                  <p className="font-mono text-xs text-avorria-signal uppercase tracking-wider mt-1">
                    {section.subheading}
                  </p>
                )}
              </div>

              <div className="space-y-6 font-body text-base sm:text-lg text-avorria-white/80 leading-relaxed">
                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>

              {section.callout && (
                <div className="p-6 bg-avorria-surface/80 border-l-2 border-avorria-signal font-mono text-xs text-avorria-white space-y-2">
                  <span className="text-avorria-signal font-bold uppercase block">
                    {section.callout.label}
                  </span>
                  <p className="font-body text-sm text-avorria-white/90 leading-relaxed">
                    {section.callout.text}
                  </p>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* ── Key Takeaways ──────────────────────────────────── */}
        <div className="max-w-4xl p-8 sm:p-10 bg-avorria-surface border border-avorria-line space-y-6">
          <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest block border-b border-avorria-line/40 pb-3">
            KEY ARCHITECTURAL TAKEAWAYS
          </span>
          <ul className="space-y-3 font-mono text-xs text-avorria-white/90 list-none p-0 m-0">
            {article.takeaways.map((takeaway, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-avorria-signal font-bold">0{idx + 1}</span>
                <span className="leading-relaxed">{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Sourced Citations ──────────────────────────────── */}
        <div className="max-w-4xl p-6 bg-avorria-black/60 border border-avorria-line/60 space-y-4">
          <span className="font-mono text-[10px] text-avorria-quiet uppercase tracking-widest block">
            VERIFIED SOURCES & RESEARCH CITATIONS
          </span>
          <div className="space-y-3">
            {article.sources.map((src, idx) => (
              <div key={idx} className="font-mono text-xs space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-avorria-signal text-[10px]">[{idx + 1}]</span>
                  <span className="text-avorria-white font-bold">{src.title}</span>
                </div>
                <p className="text-avorria-muted text-[11px] pl-5">{src.citation}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Related Capability & Project Proof ────────────── */}
        <div className="max-w-4xl border-t border-avorria-line pt-12 space-y-8">
          <div className="flex items-center justify-between font-mono text-xs text-avorria-muted border-b border-avorria-line/40 pb-3">
            <span>PROVEN IN PRODUCTION</span>
            <span>CAPABILITY // {article.relatedCapability.name}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {article.relatedProjects.map((proj) => (
              <Link
                key={proj.slug}
                href={`/work/${proj.slug}`}
                className="group p-6 bg-avorria-surface border border-avorria-line hover:border-avorria-signal/40 transition-colors flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <span className="font-mono text-[10px] text-avorria-signal uppercase tracking-wider block">
                    {proj.category}
                  </span>
                  <h3 className="font-display font-black text-lg uppercase text-avorria-white group-hover:text-avorria-signal transition-colors">
                    {proj.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2 font-mono text-xs text-avorria-muted group-hover:text-avorria-white">
                  <span>VIEW CASE STUDY</span>
                  <span className="text-avorria-signal">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Next Article Navigation & Conversion ───────────── */}
        <div className="max-w-4xl border-t border-avorria-line pt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="font-mono text-[10px] text-avorria-quiet uppercase tracking-widest block">
              NEXT INTELLIGENCE ESSAY
            </span>
            <Link
              href={nextArticle.href}
              className="display-sm font-display font-black uppercase text-avorria-white hover:text-avorria-signal transition-colors"
            >
              {nextArticle.title} →
            </Link>
          </div>

          <Link
            href="/start-project"
            className="inline-flex items-center gap-3 bg-avorria-signal text-avorria-black font-display font-extrabold text-xs uppercase tracking-wider px-8 py-4 hover:bg-avorria-white transition-colors shrink-0"
          >
            <span>START A PROJECT</span>
            <span>→</span>
          </Link>
        </div>
      </article>
    </main>
  );
}
