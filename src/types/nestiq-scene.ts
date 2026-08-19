export type NestIQChapter =
  | "handoff"
  | "property"
  | "context"
  | "map"
  | "landscape"
  | "decision"
  | "contribution"
  | "release";

export interface NestIQChapterConfig {
  id: NestIQChapter;
  label: string;
  startProgress: number;
  endProgress: number;
}
