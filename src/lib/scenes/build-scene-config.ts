import { BuildFragmentConfig } from "@/types/build-scene";

export const BUILD_FRAGMENTS: BuildFragmentConfig[] = [
  {
    id: "frag-careeros",
    projectSlug: "careeros",
    title: "CareerOS",
    category: "AI Platform",
    svgPath: "/media/projects/build/build-fragment-careeros.svg",
    initialX: 60,
    initialY: 40,
    assembledX: 5,
    assembledY: 10,
    assembledWidth: 44,
    assembledHeight: 42
  },
  {
    id: "frag-nestiq",
    projectSlug: "nestiq",
    title: "NestIQ",
    category: "Spatial Property",
    svgPath: "/media/projects/build/build-fragment-nestiq.svg",
    initialX: 110,
    initialY: 10,
    assembledX: 51,
    assembledY: 10,
    assembledWidth: 44,
    assembledHeight: 42
  },
  {
    id: "frag-drawdown",
    projectSlug: "drawdown",
    title: "Drawdown.Trading",
    category: "Financial Risk",
    svgPath: "/media/projects/build/build-fragment-drawdown.svg",
    initialX: -40,
    initialY: 60,
    assembledX: 5,
    assembledY: 54,
    assembledWidth: 28,
    assembledHeight: 38
  },
  {
    id: "frag-entirefm",
    projectSlug: "entirefm",
    title: "EntireFM",
    category: "Enterprise Ops",
    svgPath: "/media/projects/build/build-fragment-entirefm.svg",
    initialX: 110,
    initialY: 70,
    assembledX: 35,
    assembledY: 54,
    assembledWidth: 32,
    assembledHeight: 38
  },
  {
    id: "frag-alkota",
    projectSlug: "alkota-bikes",
    title: "Alkota Bikes",
    category: "Commerce 3D",
    svgPath: "/media/projects/build/build-fragment-alkota.svg",
    initialX: 50,
    initialY: 120,
    assembledX: 69,
    assembledY: 54,
    assembledWidth: 26,
    assembledHeight: 38
  }
];

export const BUILD_PROPOSITION = {
  label: "01 / CAPABILITY",
  title: "BUILD.",
  proposition: "DIGITAL PRODUCTS PEOPLE WANT TO USE.",
  capabilities: "WEB / PRODUCT / UX / DEVELOPMENT / COMMERCE",
  ctaText: "EXPLORE BUILD",
  ctaHref: "/capabilities/build"
};
