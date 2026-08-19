import { DrawdownModuleConfig } from "@/types/drawdown-scene";

export const DRAWDOWN_MODULES: DrawdownModuleConfig[] = [
  {
    id: "market",
    title: "MARKET INTELLIGENCE",
    code: "01",
    statement: "DYNAMIC TIME-SERIES & RISK CURVES",
    svgPath: "/media/projects/drawdown/drawdown-chart-hero.svg",
    zDepth: 40,
    yawDeg: 0
  },
  {
    id: "plan",
    title: "PLAYBOOK & PLAN",
    code: "02",
    statement: "TURN INTENT INTO A PROCESS",
    svgPath: "/media/projects/drawdown/drawdown-module-plan.svg",
    zDepth: -20,
    yawDeg: -4
  },
  {
    id: "risk",
    title: "RISK BOUNDARY",
    code: "03",
    statement: "KNOW THE BOUNDARY BEFORE THE DECISION",
    svgPath: "/media/projects/drawdown/drawdown-module-risk.svg",
    zDepth: -40,
    yawDeg: 4
  }
];

export const DRAWDOWN_DELIVERABLES = [
  { code: "01", title: "FINANCIAL PRODUCT STRATEGY & UX" },
  { code: "02", title: "HIGH-DENSITY DATA VISUALISATION" },
  { code: "03", title: "RISK ENGINE & BOUNDARY ARCHITECTURE" },
  { code: "04", title: "FULL-STACK TRADING PLATFORM DEVELOPMENT" }
];

export const DRAWDOWN_PRINCIPLE = {
  label: "009 // DRAWDOWN.TRADING",
  title: "Complex systems\nshould feel simple.",
  description: "Avorria engineered Drawdown.Trading to turn dense operational and financial information into a calm, disciplined product experience.",
  ctaText: "VIEW DRAWDOWN CASE STUDY",
  ctaHref: "/work/drawdown"
};
