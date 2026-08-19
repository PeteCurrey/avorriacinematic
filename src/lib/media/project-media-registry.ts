export type ProjectMediaType =
  | "IMAGE"
  | "VIDEO"
  | "UI_CAPTURE"
  | "PRODUCT_MASTER"
  | "ENGINEERING"
  | "PORTRAIT";

export type MediaSourceStatus =
  | "APPROVED_MASTER"
  | "APPROVED_SECONDARY"
  | "SOURCE_VERIFIED"
  | "CANDIDATE"
  | "MISSING_SOURCE";

export interface ProjectMediaAsset {
  id: string;
  projectSlug: string;
  localPath: string;
  sourceRepo: string;
  sourcePath: string;
  sourceRoute?: string;
  sourceCommit?: string;
  mediaType: ProjectMediaType;
  sourceStatus: MediaSourceStatus;
  productionApproved: boolean;
  notes?: string;
}

export const PROJECT_MEDIA_REGISTRY: ProjectMediaAsset[] = [
  // ── ALKOTA (PeteCurrey/alkotabikes.ag.v001) ──────────────────────────
  {
    id: "alkota-homepage-desktop",
    projectSlug: "alkota-bikes",
    localPath: "/media/projects/alkota/interface/homepage-desktop.png",
    sourceRepo: "PeteCurrey/alkotabikes.ag.v001",
    sourcePath: "src/app/[region]/page.tsx",
    sourceRoute: "/uk",
    sourceCommit: "cd46be5",
    mediaType: "UI_CAPTURE",
    sourceStatus: "SOURCE_VERIFIED",
    productionApproved: true,
    notes: "Authentic desktop homepage capture (1920x1080) of Alkota digital flagship."
  },
  {
    id: "alkota-homepage-mobile",
    projectSlug: "alkota-bikes",
    localPath: "/media/projects/alkota/interface/homepage-mobile.png",
    sourceRepo: "PeteCurrey/alkotabikes.ag.v001",
    sourcePath: "src/app/[region]/page.tsx",
    sourceRoute: "/uk",
    sourceCommit: "cd46be5",
    mediaType: "UI_CAPTURE",
    sourceStatus: "SOURCE_VERIFIED",
    productionApproved: true,
    notes: "Authentic mobile homepage capture (390x844) of Alkota digital flagship."
  },
  {
    id: "alkota-naked-carbon-hero",
    projectSlug: "alkota-bikes",
    localPath: "/media/projects/alkota/product/naked-carbon-hero.jpg",
    sourceRepo: "PeteCurrey/alkotabikes.ag.v001",
    sourcePath: "public/images/project01-naked-carbon-hero.jpg",
    mediaType: "PRODUCT_MASTER",
    sourceStatus: "APPROVED_MASTER",
    productionApproved: true,
    notes: "Naked Carbon flagship hero shot. Project 01 product truth."
  },
  {
    id: "alkota-naked-carbon-studio",
    projectSlug: "alkota-bikes",
    localPath: "/media/projects/alkota/product/naked-carbon-studio.png",
    sourceRepo: "PeteCurrey/alkotabikes.ag.v001",
    sourcePath: "public/images/story/project01-naked-carbon-studio.png",
    mediaType: "PRODUCT_MASTER",
    sourceStatus: "APPROVED_MASTER",
    productionApproved: true,
    notes: "Naked Carbon studio master profile."
  },
  {
    id: "alkota-glacier-white-hero",
    projectSlug: "alkota-bikes",
    localPath: "/media/projects/alkota/product/glacier-white-hero.jpg",
    sourceRepo: "PeteCurrey/alkotabikes.ag.v001",
    sourcePath: "public/images/project01-glacier-white-hero.jpg",
    mediaType: "PRODUCT_MASTER",
    sourceStatus: "APPROVED_SECONDARY",
    productionApproved: true,
    notes: "Glacier White studio presentation."
  },
  {
    id: "alkota-glacier-white-showroom",
    projectSlug: "alkota-bikes",
    localPath: "/media/projects/alkota/product/glacier-white-showroom.jpg",
    sourceRepo: "PeteCurrey/alkotabikes.ag.v001",
    sourcePath: "public/images/project01-glacier-white.jpg",
    mediaType: "PRODUCT_MASTER",
    sourceStatus: "APPROVED_SECONDARY",
    productionApproved: true,
    notes: "Glacier White showroom machine."
  },
  {
    id: "alkota-complete-machine",
    projectSlug: "alkota-bikes",
    localPath: "/media/projects/alkota/product/complete-machine.jpg",
    sourceRepo: "PeteCurrey/alkotabikes.ag.v001",
    sourcePath: "public/images/story/complete-machine-integration.jpg",
    mediaType: "PRODUCT_MASTER",
    sourceStatus: "APPROVED_SECONDARY",
    productionApproved: true,
    notes: "Complete machine integration in workshop."
  },
  {
    id: "alkota-carbon-layup",
    projectSlug: "alkota-bikes",
    localPath: "/media/projects/alkota/engineering/carbon-layup.jpg",
    sourceRepo: "PeteCurrey/alkotabikes.ag.v001",
    sourcePath: "public/images/story/carbon-fiber-layup-development.jpg",
    mediaType: "ENGINEERING",
    sourceStatus: "APPROVED_MASTER",
    productionApproved: true,
    notes: "Carbon fiber layup engineering and development."
  },
  {
    id: "alkota-cad-engineering",
    projectSlug: "alkota-bikes",
    localPath: "/media/projects/alkota/engineering/cad-engineering.jpg",
    sourceRepo: "PeteCurrey/alkotabikes.ag.v001",
    sourcePath: "public/images/story/technical-cad-engineering-material.jpg",
    mediaType: "ENGINEERING",
    sourceStatus: "APPROVED_MASTER",
    productionApproved: true,
    notes: "CAD engineering drawing and frame geometry."
  },
  {
    id: "alkota-kinematics",
    projectSlug: "alkota-bikes",
    localPath: "/media/projects/alkota/engineering/kinematics.jpg",
    sourceRepo: "PeteCurrey/alkotabikes.ag.v001",
    sourcePath: "public/images/story/kinematic-dynamics-analysis.jpg",
    mediaType: "ENGINEERING",
    sourceStatus: "APPROVED_MASTER",
    productionApproved: true,
    notes: "Suspension and frame kinematics analysis."
  },
  {
    id: "alkota-telemetry",
    projectSlug: "alkota-bikes",
    localPath: "/media/projects/alkota/engineering/telemetry.jpg",
    sourceRepo: "PeteCurrey/alkotabikes.ag.v001",
    sourcePath: "public/images/story/reverse-engineering-telemetry.jpg",
    mediaType: "ENGINEERING",
    sourceStatus: "APPROVED_SECONDARY",
    productionApproved: true,
    notes: "Ride dynamics telemetry screen."
  },
  {
    id: "alkota-workshop-assembly",
    projectSlug: "alkota-bikes",
    localPath: "/media/projects/alkota/engineering/workshop-assembly.jpg",
    sourceRepo: "PeteCurrey/alkotabikes.ag.v001",
    sourcePath: "public/images/story/workshop-chassis-assembly.jpg",
    mediaType: "ENGINEERING",
    sourceStatus: "APPROVED_SECONDARY",
    productionApproved: true,
    notes: "Workshop chassis jig and assembly."
  },
  {
    id: "alkota-fatigue-bench",
    projectSlug: "alkota-bikes",
    localPath: "/media/projects/alkota/engineering/fatigue-bench.jpg",
    sourceRepo: "PeteCurrey/alkotabikes.ag.v001",
    sourcePath: "public/images/story/laboratory-stress-fatigue-bench.jpg",
    mediaType: "ENGINEERING",
    sourceStatus: "APPROVED_SECONDARY",
    productionApproved: true,
    notes: "Laboratory stress and fatigue bench test."
  },

  // ── FORECOURIQ (PeteCurrey/forecourIQ.ag.v002) ─────────────────────
  {
    id: "forecour-iq-homepage-desktop",
    projectSlug: "forecour-iq",
    localPath: "/media/projects/forecour-iq/interface/homepage-desktop.png",
    sourceRepo: "PeteCurrey/forecourIQ.ag.v002",
    sourcePath: "src/app/page.tsx",
    sourceRoute: "/",
    mediaType: "UI_CAPTURE",
    sourceStatus: "SOURCE_VERIFIED",
    productionApproved: true,
    notes: "Authentic desktop homepage capture (1920x1080) of ForecourIQ dealer valuation platform."
  },
  {
    id: "forecour-iq-homepage-mobile",
    projectSlug: "forecour-iq",
    localPath: "/media/projects/forecour-iq/interface/homepage-mobile.png",
    sourceRepo: "PeteCurrey/forecourIQ.ag.v002",
    sourcePath: "src/app/page.tsx",
    sourceRoute: "/",
    mediaType: "UI_CAPTURE",
    sourceStatus: "SOURCE_VERIFIED",
    productionApproved: true,
    notes: "Authentic mobile homepage capture (390x844) of ForecourIQ dealer valuation platform."
  },

  // ── AMPLIOS (https://amplios.co.uk/) ────────────────────────────────
  {
    id: "amplios-homepage-desktop",
    projectSlug: "amplios",
    localPath: "/media/projects/amplios/interface/homepage-desktop.png",
    sourceRepo: "amplios.co.uk",
    sourcePath: "src/app/page.tsx",
    sourceRoute: "/",
    mediaType: "UI_CAPTURE",
    sourceStatus: "SOURCE_VERIFIED",
    productionApproved: true,
    notes: "Authentic desktop homepage capture (1920x1080) of Amplios campervan engineering platform."
  },
  {
    id: "amplios-homepage-mobile",
    projectSlug: "amplios",
    localPath: "/media/projects/amplios/interface/homepage-mobile.png",
    sourceRepo: "amplios.co.uk",
    sourcePath: "src/app/page.tsx",
    sourceRoute: "/",
    mediaType: "UI_CAPTURE",
    sourceStatus: "SOURCE_VERIFIED",
    productionApproved: true,
    notes: "Authentic mobile homepage capture (390x844) of Amplios campervan engineering platform."
  },

  // ── CAREEROS (PeteCurrey/careeros) ───────────────────────────────────
  {
    id: "careeros-homepage-desktop",
    projectSlug: "careeros",
    localPath: "/media/projects/careeros/interface/homepage-desktop.png",
    sourceRepo: "PeteCurrey/careeros",
    sourcePath: "src/app/(marketing)/page.tsx",
    sourceRoute: "/",
    mediaType: "UI_CAPTURE",
    sourceStatus: "SOURCE_VERIFIED",
    productionApproved: true,
    notes: "Authentic desktop homepage capture (1920x1080) of CareerOS public marketing site."
  },
  {
    id: "careeros-homepage-mobile",
    projectSlug: "careeros",
    localPath: "/media/projects/careeros/interface/homepage-mobile.png",
    sourceRepo: "PeteCurrey/careeros",
    sourcePath: "src/app/(marketing)/page.tsx",
    sourceRoute: "/",
    mediaType: "UI_CAPTURE",
    sourceStatus: "SOURCE_VERIFIED",
    productionApproved: true,
    notes: "Authentic mobile homepage capture (390x844) of CareerOS public marketing site."
  },
  {
    id: "careeros-portrait-hero",
    projectSlug: "careeros",
    localPath: "/media/projects/careeros/hero/woman_looking_into_camera_lens.jpeg",
    sourceRepo: "PeteCurrey/careeros",
    sourcePath: "public/media/hero/woman_looking_into_camera_lens.jpeg",
    mediaType: "PORTRAIT",
    sourceStatus: "APPROVED_MASTER",
    productionApproved: true,
    notes: "Authentic human user portrait for CareerOS opening."
  },
  {
    id: "careeros-mentor-team",
    projectSlug: "careeros",
    localPath: "/media/projects/careeros/hero/mentor_team_hero.jpg",
    sourceRepo: "PeteCurrey/careeros",
    sourcePath: "public/media/hero/mentor_team_hero.jpg",
    mediaType: "IMAGE",
    sourceStatus: "APPROVED_SECONDARY",
    productionApproved: true,
    notes: "CareerOS mentor intelligence collective."
  },
  {
    id: "careeros-world-desktop",
    projectSlug: "careeros",
    localPath: "/media/projects/careeros/hero/hero_career_world_desktop.jpg",
    sourceRepo: "PeteCurrey/careeros",
    sourcePath: "public/media/hero/hero_career_world_desktop.jpg",
    mediaType: "IMAGE",
    sourceStatus: "APPROVED_SECONDARY",
    productionApproved: true,
    notes: "CareerOS product world canvas."
  },
  {
    id: "careeros-mentor-amara",
    projectSlug: "careeros",
    localPath: "/media/projects/careeros/mentors/mentor_amara.jpg",
    sourceRepo: "PeteCurrey/careeros",
    sourcePath: "public/media/mentors/mentor_amara.jpg",
    mediaType: "PORTRAIT",
    sourceStatus: "APPROVED_SECONDARY",
    productionApproved: true,
    notes: "CareerOS Mentor - Amara."
  },
  {
    id: "careeros-mentor-callum",
    projectSlug: "careeros",
    localPath: "/media/projects/careeros/mentors/mentor_callum.jpg",
    sourceRepo: "PeteCurrey/careeros",
    sourcePath: "public/media/mentors/mentor_callum.jpg",
    mediaType: "PORTRAIT",
    sourceStatus: "APPROVED_SECONDARY",
    productionApproved: true,
    notes: "CareerOS Mentor - Callum."
  },
  {
    id: "careeros-ai-city",
    projectSlug: "careeros",
    localPath: "/media/projects/careeros/product/ai_mentor_hero_city.jpg",
    sourceRepo: "PeteCurrey/careeros",
    sourcePath: "public/media/product/ai_mentor_hero_city.jpg",
    mediaType: "IMAGE",
    sourceStatus: "APPROVED_SECONDARY",
    productionApproved: true,
    notes: "AI mentor spatial context."
  },
  {
    id: "careeros-graph-hero",
    projectSlug: "careeros",
    localPath: "/media/projects/careeros/product/career_graph_hero.jpg",
    sourceRepo: "PeteCurrey/careeros",
    sourcePath: "public/media/product/career_graph_hero.jpg",
    mediaType: "IMAGE",
    sourceStatus: "APPROVED_SECONDARY",
    productionApproved: true,
    notes: "Career vector graph visualization."
  },

  // ── NESTIQ (PeteCurrey/nestiq.ag.v001) ───────────────────────────────
  {
    id: "nestiq-homepage-desktop",
    projectSlug: "nestiq",
    localPath: "/media/projects/nestiq/interface/homepage-desktop.png",
    sourceRepo: "PeteCurrey/nestiq.ag.v001",
    sourcePath: "src/app/page.tsx",
    sourceRoute: "/",
    mediaType: "UI_CAPTURE",
    sourceStatus: "SOURCE_VERIFIED",
    productionApproved: true,
    notes: "Authentic desktop homepage capture (1920x1080) of NestIQ property intelligence platform."
  },
  {
    id: "nestiq-homepage-mobile",
    projectSlug: "nestiq",
    localPath: "/media/projects/nestiq/interface/homepage-mobile.png",
    sourceRepo: "PeteCurrey/nestiq.ag.v001",
    sourcePath: "src/app/page.tsx",
    sourceRoute: "/",
    mediaType: "UI_CAPTURE",
    sourceStatus: "SOURCE_VERIFIED",
    productionApproved: true,
    notes: "Authentic mobile homepage capture (390x844) of NestIQ property intelligence platform."
  },
  {
    id: "nestiq-agent-dashboard",
    projectSlug: "nestiq",
    localPath: "/media/projects/nestiq/interface/agent-dashboard-preview.png",
    sourceRepo: "PeteCurrey/nestiq.ag.v001",
    sourcePath: "public/agent-dashboard-preview.png",
    mediaType: "UI_CAPTURE",
    sourceStatus: "APPROVED_SECONDARY",
    productionApproved: true,
    notes: "Authentic NestIQ agent intelligence dashboard."
  },

  // ── DRAWDOWN.TRADING (PeteCurrey/drawdown) ───────────────────────────
  {
    id: "drawdown-dashboard",
    projectSlug: "drawdown-trading",
    localPath: "/media/projects/drawdown/interface/dashboard.png",
    sourceRepo: "PeteCurrey/drawdown",
    sourcePath: "public/images/dashboard-preview.png",
    mediaType: "UI_CAPTURE",
    sourceStatus: "APPROVED_MASTER",
    productionApproved: true,
    notes: "Full Drawdown.Trading product dashboard master capture."
  },
  {
    id: "drawdown-terminal",
    projectSlug: "drawdown-trading",
    localPath: "/media/projects/drawdown/interface/terminal.png",
    sourceRepo: "PeteCurrey/drawdown",
    sourcePath: "public/images/tools/terminal.png",
    mediaType: "UI_CAPTURE",
    sourceStatus: "APPROVED_MASTER",
    productionApproved: true,
    notes: "Drawdown execution terminal UI."
  },
  {
    id: "drawdown-scanner",
    projectSlug: "drawdown-trading",
    localPath: "/media/projects/drawdown/interface/scanner.png",
    sourceRepo: "PeteCurrey/drawdown",
    sourcePath: "public/images/tools/scanner.png",
    mediaType: "UI_CAPTURE",
    sourceStatus: "APPROVED_SECONDARY",
    productionApproved: true,
    notes: "Drawdown market scanner tool."
  },
  {
    id: "drawdown-risk-calculator",
    projectSlug: "drawdown-trading",
    localPath: "/media/projects/drawdown/interface/risk-calculator.png",
    sourceRepo: "PeteCurrey/drawdown",
    sourcePath: "public/images/tools/risk-calculator.png",
    mediaType: "UI_CAPTURE",
    sourceStatus: "APPROVED_SECONDARY",
    productionApproved: true,
    notes: "Drawdown risk calculator module."
  },
  {
    id: "drawdown-backtester",
    projectSlug: "drawdown-trading",
    localPath: "/media/projects/drawdown/interface/backtester.png",
    sourceRepo: "PeteCurrey/drawdown",
    sourcePath: "public/images/tools/strategy-backtester.png",
    mediaType: "UI_CAPTURE",
    sourceStatus: "APPROVED_SECONDARY",
    productionApproved: true,
    notes: "Drawdown strategy backtester tool."
  },
  {
    id: "drawdown-daily-briefing",
    projectSlug: "drawdown-trading",
    localPath: "/media/projects/drawdown/interface/daily-briefing.png",
    sourceRepo: "PeteCurrey/drawdown",
    sourcePath: "public/images/tools/ai-daily-briefing.png",
    mediaType: "UI_CAPTURE",
    sourceStatus: "APPROVED_SECONDARY",
    productionApproved: true,
    notes: "Drawdown AI daily briefing view."
  },
  {
    id: "drawdown-market-scanner",
    projectSlug: "drawdown-trading",
    localPath: "/media/projects/drawdown/interface/market-scanner.png",
    sourceRepo: "PeteCurrey/drawdown",
    sourcePath: "public/images/tools/ai-market-scanner.png",
    mediaType: "UI_CAPTURE",
    sourceStatus: "APPROVED_SECONDARY",
    productionApproved: true,
    notes: "Drawdown AI market scanner view."
  },
  {
    id: "drawdown-trade-journal",
    projectSlug: "drawdown-trading",
    localPath: "/media/projects/drawdown/interface/trade-journal.png",
    sourceRepo: "PeteCurrey/drawdown",
    sourcePath: "public/images/tools/ai-trade-journal.png",
    mediaType: "UI_CAPTURE",
    sourceStatus: "APPROVED_SECONDARY",
    productionApproved: true,
    notes: "Drawdown trade journal view."
  },

  // ── ENTIREFM (PeteCurrey/entirefm.v002) ──────────────────────────────
  {
    id: "entirefm-homepage-desktop",
    projectSlug: "entirefm",
    localPath: "/media/projects/entirefm/interface/homepage-desktop.png",
    sourceRepo: "PeteCurrey/entirefm.v002",
    sourcePath: "src/app/page.tsx",
    sourceRoute: "/",
    mediaType: "UI_CAPTURE",
    sourceStatus: "SOURCE_VERIFIED",
    productionApproved: true,
    notes: "Authentic desktop homepage capture (1920x1080) of EntireFM facilities management platform."
  },
  {
    id: "entirefm-homepage-mobile",
    projectSlug: "entirefm",
    localPath: "/media/projects/entirefm/interface/homepage-mobile.png",
    sourceRepo: "PeteCurrey/entirefm.v002",
    sourcePath: "src/app/page.tsx",
    sourceRoute: "/",
    mediaType: "UI_CAPTURE",
    sourceStatus: "SOURCE_VERIFIED",
    productionApproved: true,
    notes: "Authentic mobile homepage capture (390x844) of EntireFM facilities management platform."
  },
  {
    id: "entirefm-operational-environment",
    projectSlug: "entirefm",
    localPath: "/media/projects/entirefm/entirefm-operational.svg",
    sourceRepo: "PeteCurrey/entirefm.v002",
    sourcePath: "public/images/hero-background.jpg",
    mediaType: "IMAGE",
    sourceStatus: "APPROVED_SECONDARY",
    productionApproved: true,
    notes: "EntireFM operational facilities context vector asset."
  },

  // ── ONE GREAT NORTHERN ──────────────────────────────────────────────
  {
    id: "ogn-master",
    projectSlug: "one-great-northern",
    localPath: "/media/projects/ogn/ogn-industrial.svg",
    sourceRepo: "UNVERIFIED",
    sourcePath: "NONE",
    mediaType: "IMAGE",
    sourceStatus: "MISSING_SOURCE",
    productionApproved: false,
    notes: "No verified source repository for OGN media yet. Fictional commercial property assets purged."
  }
];

export function getProjectMedia(projectSlug: string): ProjectMediaAsset[] {
  return PROJECT_MEDIA_REGISTRY.filter((a) => a.projectSlug === projectSlug);
}

export function getApprovedMasterMedia(projectSlug: string): ProjectMediaAsset | undefined {
  return PROJECT_MEDIA_REGISTRY.find(
    (a) => a.projectSlug === projectSlug && a.sourceStatus === "APPROVED_MASTER" && a.productionApproved
  );
}
