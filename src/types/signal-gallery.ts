export interface SpatialProjectConfig {
  slug: string;
  sequenceNumber: string;
  title: string;
  category: string;
  descriptor: string;
  mediaSrc: string;
  width: number;
  height: number;
  aspectRatio: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  heroZ: number;
  exitZ: number;
  rotationY: number;
  startProgress: number;
  heroProgress: number;
  exitProgress: number;
  caseStudyAvailable: boolean;
}

export interface ActiveProjectState {
  index: number;
  project: SpatialProjectConfig;
  opacity: number;
}
