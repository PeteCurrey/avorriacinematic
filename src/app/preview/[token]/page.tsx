/**
 * AVORRIA — PROSPECT PREVIEW RUNTIME
 * Public URL: /preview/[token]
 * Serves the prospect website concept from stored configuration.
 * Security: noindex, no internal data exposed, token-gated.
 */

import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { getPreviewLinkByToken, getSiteProjectHydrated, incrementPreviewLinkView } from "@/lib/db/repository";
import type { Metadata } from "next";
import { PreviewSiteRenderer } from "@/components/preview/PreviewSiteRenderer";

interface Props {
  params: Promise<{ token: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { token } = await params;
  const link = await getPreviewLinkByToken(token);
  if (!link) return { title: "Preview Not Found", robots: { index: false, follow: false } };
  const project = await getSiteProjectHydrated(link.site_project_id);
  return {
    title: project?.title ?? "Website Concept",
    description: "A website concept created by Avorria",
    robots: { index: false, follow: false, nosnippet: true, noimageindex: true },
    other: { "X-Robots-Tag": "noindex, nofollow" },
  };
}

export default async function PreviewPage({ params }: Props) {
  const { token } = await params;
  const link = await getPreviewLinkByToken(token);

  if (!link || link.status !== "active") notFound();
  if (link.expires_at && new Date(link.expires_at) < new Date()) notFound();

  // Increment view count (best effort)
  void incrementPreviewLinkView(token).catch(() => {});

  const project = await getSiteProjectHydrated(link.site_project_id);
  if (!project || !project.current_version) notFound();

  return (
    <PreviewSiteRenderer
      project={project}
      version={project.current_version}
      presentationMode={link.presentation_mode}
      token={token}
    />
  );
}
