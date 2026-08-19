export interface EntireFMWorkOrderFixture {
  id: string;
  assetId: string;
  assetName: string;
  location: string;
  faultSummary: string;
  priority: string;
  slaStatus: string;
  assignee: string;
  resolution: string;
}

export interface EntireFMDeliverable {
  code: string;
  title: string;
}
