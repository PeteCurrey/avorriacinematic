export interface SystemLeadRecord {
  id: string;
  label: string;
  status: string;
  inactiveDays: number;
  ruleMatch: string;
}

export interface SystemsDeliverable {
  code: string;
  title: string;
}
