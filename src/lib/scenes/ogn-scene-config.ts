import { OGNAnalysisTag, OGNPrincipleData } from "@/types/ogn-scene";

export const OGN_ANALYSIS_TAGS: OGNAnalysisTag[] = [
  {
    id: "industrial",
    label: "OPERATIONS",
    description: "Mobile crane hire, contract lifting, and industrial plant logistics.",
    x: "20%",
    y: "30%"
  },
  {
    id: "infrastructure",
    label: "INFRASTRUCTURE",
    description: "Engineered digital infrastructure for industrial operations.",
    x: "70%",
    y: "60%"
  }
];

export const OGN_PRINCIPLE: OGNPrincipleData = {
  headline: "ONE GREAT NORTHERN\nINDUSTRIAL OPERATIONS.",
  supporting: "Mobile crane hire, contract lifting, plant equipment, and industrial infrastructure services.",
  roleLine: "006 / ONE GREAT NORTHERN // INDUSTRIAL INFRASTRUCTURE // PENDING VERIFIED MEDIA",
  ctaText: "EXPLORE WORK ARCHIVE",
  ctaHref: "/work"
};
