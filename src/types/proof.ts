export interface ProofItem {
  id: string;
  projectSlug: string;
  projectName: string;
  type: string;
  scope: string;
  status: "LIVE" | "DEPLOYED" | "DELIVERED" | "IN ACTIVE DEVELOPMENT";
  relationship: "CLIENT" | "VENTURE" | "PARTNERSHIP";
  imagePath: string;
  evidenceSummary: string;
  href: string;
}
