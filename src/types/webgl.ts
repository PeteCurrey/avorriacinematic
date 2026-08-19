export interface WebGLCapabilities {
  supported: boolean;
  webgl2: boolean;
  maxTextureSize: number;
  hardwareConcurrency: number;
  lowPowerDevice: boolean;
  maxDpr: number;
  vendor?: string;
  renderer?: string;
}
