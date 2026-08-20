import type { SearchNode, SearchEdge, SearchQueryItem } from "@/types/search-scene";

export const SEARCH_NODES: SearchNode[] = [
  // Hubs
  { id: "home", label: "HOME", route: "/", x: 50, y: 15, type: "hub" },
  { id: "cap-build", label: "WEB", route: "/services/websites", x: 22, y: 35, type: "hub" },
  { id: "cap-search", label: "SEO", route: "/services/seo", x: 50, y: 35, type: "hub" },
  { id: "cap-systems", label: "AI SYSTEMS", route: "/services/ai-automation", x: 78, y: 35, type: "hub" },

  // Case Studies
  { id: "work-alkota", label: "ALKOTA BIKES", route: "/work/alkota-bikes", x: 14, y: 60, type: "case-study" },
  { id: "work-careeros", label: "CAREEROS", route: "/work/careeros", x: 30, y: 60, type: "case-study" },
  { id: "work-nestiq", label: "NESTIQ", route: "/work/nestiq", x: 44, y: 60, type: "case-study" },
  { id: "work-drawdown", label: "DRAWDOWN", route: "/work/drawdown", x: 58, y: 60, type: "case-study" },
  { id: "work-entirefm", label: "ENTIREFM", route: "/work/entirefm", x: 72, y: 60, type: "case-study" },
  { id: "work-ogn", label: "ONE GREAT NORTHERN", route: "/work/one-great-northern", x: 86, y: 60, type: "case-study" },

  // Editorial & Supporting
  { id: "intel-seo", label: "DISCOVERABILITY", route: "/intelligence/engineered-discoverability", x: 36, y: 82, type: "page" },
  { id: "intel-ai", label: "AI SYSTEMS ARCHITECTURE", route: "/intelligence/ai-systems", x: 64, y: 82, type: "page" }
];

export const SEARCH_EDGES: SearchEdge[] = [
  { id: "e-home-build", from: "home", to: "cap-build" },
  { id: "e-home-search", from: "home", to: "cap-search" },
  { id: "e-home-systems", from: "home", to: "cap-systems" },
  { id: "e-build-alkota", from: "cap-build", to: "work-alkota" },
  { id: "e-build-careeros", from: "cap-build", to: "work-careeros" },
  { id: "e-search-nestiq", from: "cap-search", to: "work-nestiq" },
  { id: "e-search-drawdown", from: "cap-search", to: "work-drawdown" },
  { id: "e-systems-entirefm", from: "cap-systems", to: "work-entirefm" },
  { id: "e-systems-ogn", from: "cap-systems", to: "work-ogn" },
  { id: "e-search-intel-seo", from: "cap-search", to: "intel-seo", activeOnOptimized: true },
  { id: "e-systems-intel-ai", from: "cap-systems", to: "intel-ai", activeOnOptimized: true }
];

export const SEARCH_QUERIES: SearchQueryItem[] = [
  { id: "q1", query: "technical seo agency", targetNodeId: "cap-search", fromX: 5, fromY: 35 },
  { id: "q2", query: "ai systems development", targetNodeId: "cap-systems", fromX: 95, fromY: 35 },
  { id: "q3", query: "digital product engineering", targetNodeId: "cap-build", fromX: 5, fromY: 15 },
  { id: "q4", query: "spatial property intelligence", targetNodeId: "work-nestiq", fromX: 95, fromY: 60 }
];

export const SEARCH_PROPOSITION = {
  label: "03 / DISCIPLINE",
  title: "SEARCH.",
  proposition: "VISIBILITY IS ENGINEERED.",
  capabilities: "TECHNICAL SEO / CONTENT ARCHITECTURE / AUTHORITY / DISCOVERY",
  ctaText: "EXPLORE SEARCH",
  ctaHref: "/services/seo"
};
