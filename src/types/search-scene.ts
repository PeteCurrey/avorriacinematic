export interface SearchNode {
  id: string;
  label: string;
  route: string;
  x: number; // percentage 0-100
  y: number;
  type: "hub" | "page" | "case-study" | "entity";
  problem?: "orphan" | "duplicate" | "depth";
}

export interface SearchEdge {
  id: string;
  from: string;
  to: string;
  activeOnOptimized?: boolean;
}

export interface SearchQueryItem {
  id: string;
  query: string;
  targetNodeId: string;
  fromX: number;
  fromY: number;
}
