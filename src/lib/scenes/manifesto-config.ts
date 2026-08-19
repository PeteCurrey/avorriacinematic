import { ManifestoStatementData } from "@/types/manifesto";

export const MANIFESTO_STATEMENTS: ManifestoStatementData[] = [
  {
    id: "statement-1",
    text: "DESIGN SHOULD\nHAVE A JOB.",
    colStart: 2,
    colSpan: 10,
    progressStart: 0.10,
    progressEnd: 0.28
  },
  {
    id: "statement-2",
    text: "TECHNOLOGY SHOULD\nCREATE LEVERAGE.",
    colStart: 3,
    colSpan: 10,
    progressStart: 0.28,
    progressEnd: 0.46
  },
  {
    id: "statement-3",
    text: "AI SHOULD DO MORE\nTHAN WRITE COPY.",
    colStart: 2,
    colSpan: 11,
    progressStart: 0.46,
    progressEnd: 0.65
  },
  {
    id: "statement-4",
    text: "WE BUILD\nDIGITAL ADVANTAGE.",
    emphasisText: "DIGITAL ADVANTAGE.",
    colStart: 2,
    colSpan: 11,
    progressStart: 0.65,
    progressEnd: 0.95
  }
];
