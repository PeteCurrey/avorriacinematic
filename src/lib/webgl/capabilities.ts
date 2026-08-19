import { WebGLCapabilities } from "@/types/webgl";

export function detectWebGLCapabilities(): WebGLCapabilities {
  if (typeof window === "undefined") {
    return {
      supported: false,
      webgl2: false,
      maxTextureSize: 2048,
      hardwareConcurrency: 4,
      lowPowerDevice: false,
      maxDpr: 1
    };
  }

  const hardwareConcurrency = navigator.hardwareConcurrency || 4;
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  let webglSupported = false;
  let webgl2Supported = false;
  let maxTextureSize = 2048;
  let vendor: string | undefined;
  let renderer: string | undefined;

  try {
    const canvas = document.createElement("canvas");
    const gl2 = canvas.getContext("webgl2");
    if (gl2) {
      webglSupported = true;
      webgl2Supported = true;
      maxTextureSize = gl2.getParameter(gl2.MAX_TEXTURE_SIZE);
      const dbgRenderInfo = gl2.getExtension("WEBGL_debug_renderer_info");
      if (dbgRenderInfo) {
        vendor = gl2.getParameter(dbgRenderInfo.UNMASKED_VENDOR_WEBGL);
        renderer = gl2.getParameter(dbgRenderInfo.UNMASKED_RENDERER_WEBGL);
      }
    } else {
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (gl) {
        webglSupported = true;
        maxTextureSize = (gl as WebGLRenderingContext).getParameter((gl as WebGLRenderingContext).MAX_TEXTURE_SIZE);
      }
    }
  } catch {
    webglSupported = false;
  }

  const lowPowerDevice = isMobile || hardwareConcurrency <= 4;
  const maxDpr = lowPowerDevice ? 1.5 : Math.min(window.devicePixelRatio || 1, 2.0);

  return {
    supported: webglSupported,
    webgl2: webgl2Supported,
    maxTextureSize,
    hardwareConcurrency,
    lowPowerDevice,
    maxDpr,
    vendor,
    renderer
  };
}
