export interface MediaSourceVariant {
  src: string;
  mediaQuery?: string;
  type?: string;
}

export interface CinematicMediaMetadata {
  id: string;
  title: string;
  source: string;
  type: "video" | "image" | "canvas";
  width?: number;
  height?: number;
  aspectRatio?: string;
  poster?: string;
  alt: string;
  preloadPriority: "high" | "normal" | "low" | "lazy";
  mobileVariant?: string;
  reducedDataVariant?: string;
}
