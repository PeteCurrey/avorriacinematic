export interface BuildFragmentConfig {
  id: string;
  projectSlug: string;
  title: string;
  category: string;
  svgPath: string;
  initialX: number; // Percentage offset during entry
  initialY: number;
  assembledX: number; // Final grid %
  assembledY: number;
  assembledWidth: number;
  assembledHeight: number;
}
