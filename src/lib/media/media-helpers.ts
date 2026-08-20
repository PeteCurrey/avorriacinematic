import type { CinematicMediaMetadata } from "@/types/media";

export function getProjectMediaPath(projectSlug: string, assetType: string, filename: string): string {
  return `/media/projects/${projectSlug}/${assetType}/${filename}`;
}

export function createMediaMetadata(
  id: string,
  title: string,
  source: string,
  options: Partial<CinematicMediaMetadata> = {}
): CinematicMediaMetadata {
  return {
    id,
    title,
    source,
    type: options.type || "image",
    alt: options.alt || title,
    preloadPriority: options.preloadPriority || "normal",
    aspectRatio: options.aspectRatio || "16/9",
    width: options.width,
    height: options.height,
    poster: options.poster,
    mobileVariant: options.mobileVariant,
    reducedDataVariant: options.reducedDataVariant
  };
}
