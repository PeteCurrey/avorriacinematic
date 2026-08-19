import { SystemLeadRecord, SystemsDeliverable } from "@/types/systems-scene";

export const SYSTEMS_LEADS: SystemLeadRecord[] = [
  {
    id: "lead-014",
    label: "LEAD 014 (PARTNER OPERATIONS)",
    status: "OPEN // NO CONTACT 18 DAYS",
    inactiveDays: 18,
    ruleMatch: "FOLLOW-UP DUE (LAST CONTACT > 14 DAYS)"
  },
  {
    id: "lead-027",
    label: "LEAD 027 (INSTITUTIONAL CLIENT)",
    status: "PROPOSAL SENT // INACTIVE 12 DAYS",
    inactiveDays: 12,
    ruleMatch: "ACTIVE NURTURE PIPELINE"
  },
  {
    id: "lead-041",
    label: "LEAD 041 (DIGITAL COMMERCE)",
    status: "HIGH-INTENT RETURN TO WORK PAGE",
    inactiveDays: 2,
    ruleMatch: "PRIORITY INTENT TRIGGER"
  }
];

export const SYSTEMS_DELIVERABLES: SystemsDeliverable[] = [
  { code: "01", title: "OPERATIONAL WORKFLOW ARCHITECTURE" },
  { code: "02", title: "DETERMINISTIC RULES & AI INTEGRATION" },
  { code: "03", title: "HUMAN-IN-THE-LOOP APPROVAL GATES" },
  { code: "04", title: "CLOSED-LOOP CRM & DATA SYNCHRONISATION" },
  { code: "05", title: "INTERNAL TOOLS & AUTOMATION ENGINEERING" }
];

export const SYSTEMS_PROPOSITION = {
  label: "05 / DISCIPLINE",
  title: "SYSTEMS.",
  proposition: "MAKE IT THINK.",
  capabilities: "AI / AUTOMATION / DATA / WORKFLOWS / INTEGRATION",
  ctaText: "EXPLORE AI & AUTOMATION",
  ctaHref: "/services/ai-automation"
};
