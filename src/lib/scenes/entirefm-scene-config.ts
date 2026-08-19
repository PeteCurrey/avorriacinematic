import { EntireFMWorkOrderFixture, EntireFMDeliverable } from "@/types/entirefm-scene";

export const ENTIREFM_FIXTURE: EntireFMWorkOrderFixture = {
  id: "WO-1042",
  assetId: "AHU-03",
  assetName: "Air Handling Unit 03",
  location: "Building A // Level 03 // Plant Room 02",
  faultSummary: "Unit stopped during normal operational hours. Airflow reduced.",
  priority: "P2 / STANDARD",
  slaStatus: "ON TRACK",
  assignee: "Engineer 04 (HVAC Specialist)",
  resolution: "Unit returned to service following filter check and sensor reset."
};

export const ENTIREFM_DELIVERABLES: EntireFMDeliverable[] = [
  { code: "01", title: "FACILITIES PLATFORM STRATEGY & UX" },
  { code: "02", title: "MULTI-TIER ASSET & LOCATION HIERARCHY" },
  { code: "03", title: "DISPATCH, WORK ORDER & SLA ENGINE" },
  { code: "04", title: "FIELD TECHNICIAN RESPONSIVE INTERFACE" },
  { code: "05", title: "CLOSED-LOOP ASSET MAINTENANCE AUDIT" }
];

export const ENTIREFM_PRINCIPLE = {
  label: "011 / ENTIREFM",
  subLabel: "FACILITIES OPERATIONS PLATFORM",
  statement: "OPERATIONS\nSHOULD FLOW.",
  description: "EntireFM proves that complex facilities and physical operations become calm, manageable workflows through disciplined software architecture.",
  ctaText: "VIEW ENTIREFM CASE STUDY",
  ctaHref: "/work/entirefm"
};
