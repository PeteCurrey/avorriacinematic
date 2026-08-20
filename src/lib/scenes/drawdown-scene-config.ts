import type { DrawdownModuleConfig } from "@/types/drawdown-scene";

export const DRAWDOWN_MODULES: DrawdownModuleConfig[] = [
  {
    id: "market",
    title: "MARKET INTELLIGENCE & TERMINAL",
    code: "01",
    statement: "DYNAMIC TIME-SERIES & EXECUTION",
    svgPath: "/media/projects/drawdown/interface/terminal.png",
    zDepth: 40,
    yawDeg: 0
  },
  {
    id: "risk",
    title: "RISK CALCULATOR & BOUNDARY",
    code: "02",
    statement: "EXPLICIT POSITION & EXPOSURE LIMITS",
    svgPath: "/media/projects/drawdown/interface/risk-calculator.png",
    zDepth: -20,
    yawDeg: -4
  },
  {
    id: "backtest",
    title: "STRATEGY BACKTESTER",
    code: "03",
    statement: "QUANTITATIVE PLAYBOOK VALIDATION",
    svgPath: "/media/projects/drawdown/interface/backtester.png",
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
