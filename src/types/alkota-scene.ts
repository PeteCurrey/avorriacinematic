export type AlkotaChapter =
  | "handoff"
  | "material"
  | "engineering"
  | "product"
  | "digital"
  | "contribution"
  | "release";

export interface AlkotaChapterConfig {
  id: AlkotaChapter;
  label: string;
  startProgress: number;
  endProgress: number;
}
