export type IntelligenceTerritory = "SEARCH" | "AI SYSTEMS" | "DIGITAL STRATEGY";

export interface IntelligenceArticle {
  id: string;
  slug: string;
  title: string;
  territory: IntelligenceTerritory;
  thesis: string;
  publishedAt: string;
  status: "PUBLISHED" | "DRAFT";
  homepagePriority: number;
  href: string;
}
