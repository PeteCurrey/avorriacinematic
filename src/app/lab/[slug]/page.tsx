import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { LAB_EXPERIMENTS, getExperimentBySlug } from "@/lib/scenes/lab-config";
import { AdaptiveInterfaceExperiment } from "@/components/lab/AdaptiveInterfaceExperiment";
import { VoiceInterfaceExperiment } from "@/components/lab/VoiceInterfaceExperiment";
import { VisionStudyExperiment } from "@/components/lab/VisionStudyExperiment";
import { ThreeDProductExperiment } from "@/components/lab/ThreeDProductExperiment";
import { AgentSystemExperiment } from "@/components/lab/AgentSystemExperiment";
import { DataReasoningExperiment } from "@/components/lab/DataReasoningExperiment";

const SLUG_ALIASES: Record<string, string> = {
  "generative-interface": "adaptive-interface",
  "visual-interpretation": "vision-study",
  "agent-workflow": "agent-system",
  "interactive-data": "data-reasoning"
};

export async function generateStaticParams() {
  const canonicalSlugs = LAB_EXPERIMENTS.map((exp) => ({ slug: exp.slug }));
  const aliasSlugs = Object.keys(SLUG_ALIASES).map((slug) => ({ slug }));
  return [...canonicalSlugs, ...aliasSlugs];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resolvedSlug = SLUG_ALIASES[slug] || slug;
  const experiment = getExperimentBySlug(resolvedSlug);

  if (!experiment) return {};

  return generatePageMetadata({
    title: `${experiment.title} — Avorria Lab Experiment ${experiment.number}`,
    description: `${experiment.hypothesis} ${experiment.descriptor}. Live interactive R&D experiment in Avorria Lab.`,
    path: `/lab/${slug}`
  });
}

export default async function LabExperimentDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resolvedSlug = SLUG_ALIASES[slug] || slug;
  const experiment = getExperimentBySlug(resolvedSlug);

  if (!experiment) notFound();

  return (
    <main className="w-full min-h-screen bg-avorria-black text-avorria-white pt-24 sm:pt-32 pb-24">
      <div className="max-w-[1760px] mx-auto px-6 sm:px-12 lg:px-16 space-y-12">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-avorria-quiet border-b border-avorria-line/40 pb-4">
          <Link
            href="/lab"
            className="text-avorria-muted hover:text-avorria-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-avorria-signal"
          >
            LAB
          </Link>
          <span className="text-avorria-line-strong" aria-hidden="true">/</span>
          <span className="text-avorria-signal font-bold">{experiment.number}</span>
          <span className="text-avorria-line-strong" aria-hidden="true">/</span>
          <span className="text-avorria-white font-bold" aria-current="page">{experiment.title}</span>
        </div>

        {/* Experiment Header */}
        <div className="max-w-5xl space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest">
              EXPERIMENT {experiment.number} {"//"} {experiment.status}
            </span>
            <span className="text-avorria-line-strong">/</span>
            <span className="font-mono text-xs text-avorria-muted uppercase">
              {experiment.descriptor}
            </span>
          </div>

          <h1 className="display-xl font-display font-black uppercase tracking-tight text-avorria-white">
            {experiment.title}
          </h1>

          <p className="font-body text-lg sm:text-2xl text-avorria-white/85 max-w-3xl leading-relaxed">
            {experiment.hypothesis}
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-2 font-mono text-xs text-avorria-muted">
            <span>INTERACTION: <strong className="text-avorria-white">{experiment.interactionType}</strong></span>
            <span>IMPLEMENTATION: <strong className="text-avorria-signal">{experiment.implementationNote}</strong></span>
            {experiment.privacyNote && (
              <span className="text-amber-400">PRIVACY: {experiment.privacyNote}</span>
            )}
          </div>
        </div>

        {/* Dynamic Interactive Experiment Component */}
        <div className="pt-4 border-t border-avorria-line">
          {resolvedSlug === "adaptive-interface" && <AdaptiveInterfaceExperiment />}
          {resolvedSlug === "voice-interface" && <VoiceInterfaceExperiment />}
          {resolvedSlug === "vision-study" && <VisionStudyExperiment />}
          {resolvedSlug === "3d-product" && <ThreeDProductExperiment />}
          {resolvedSlug === "agent-system" && <AgentSystemExperiment />}
          {resolvedSlug === "data-reasoning" && <DataReasoningExperiment />}
        </div>

        {/* Commercial Bridge CTA */}
        <div className="pt-16 border-t border-avorria-line flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest block">
              TRANSITION FROM LAB TO PRODUCTION
            </span>
            <p className="font-body text-sm text-avorria-white/80">
              Have an emerging product or interface requirement? We translate these prototypes into enterprise software.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/start-project"
              className="inline-flex items-center gap-3 bg-avorria-signal text-avorria-black font-display font-extrabold text-xs uppercase tracking-wider px-6 py-3.5 hover:bg-avorria-white transition-colors"
            >
              <span>COMMISSION A BUILD</span>
              <span>→</span>
            </Link>
            <Link
              href="/lab"
              className="font-mono text-xs uppercase tracking-widest text-avorria-muted hover:text-avorria-white border-b border-avorria-line pb-1 transition-colors"
            >
              RETURN TO LAB INDEX
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
