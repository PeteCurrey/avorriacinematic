export interface DrawdownModuleConfig {
  id: string;
  title: string;
  code: string;
  statement: string;
  svgPath: string;
  zDepth: number; // For CSS 3D separation
  yawDeg: number;
}
