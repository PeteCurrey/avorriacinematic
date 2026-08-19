export type IntelligenceTerritory = "SEARCH" | "AI SYSTEMS" | "DIGITAL STRATEGY";

export interface ArticleSection {
  heading: string;
  subheading?: string;
  paragraphs: string[];
  callout?: {
    label: string;
    text: string;
  };
}

export interface ArticleSource {
  title: string;
  citation: string;
  url?: string;
}

export interface IntelligenceArticle {
  id: string;
  slug: string;
  aliases?: string[];
  title: string;
  territory: IntelligenceTerritory;
  thesis: string;
  author: {
    name: string;
    role: string;
  };
  publishedAt: string;
  readTime: string;
  status: "PUBLISHED" | "DRAFT";
  homepagePriority: number;
  href: string;
  summary: string[];
  sections: ArticleSection[];
  takeaways: string[];
  sources: ArticleSource[];
  relatedCapability: {
    name: string;
    href: string;
  };
  relatedProjects: {
    slug: string;
    title: string;
    category: string;
  }[];
}
