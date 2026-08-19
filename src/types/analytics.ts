export type AnalyticsEventName =
  | "scene_enter"
  | "scene_complete"
  | "project_view"
  | "project_hover"
  | "project_open"
  | "capability_open"
  | "lab_interaction"
  | "start_project_click"
  | "start_project_submit"
  | "start_project_step_complete"
  | "start_project_error"
  | "start_project_submit_success"
  | "intelligence_open"
  | "video_play"
  | "interactive_demo_started";

export interface AnalyticsPayload {
  sceneId?: string;
  sceneName?: string;
  projectSlug?: string;
  capabilitySlug?: string;
  labSlug?: string;
  articleSlug?: string;
  progress?: number;
  timestamp?: number;
  [key: string]: unknown;
}
