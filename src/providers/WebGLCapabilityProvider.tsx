"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { WebGLCapabilities } from "@/types/webgl";
import { detectWebGLCapabilities } from "@/lib/webgl/capabilities";

interface WebGLContextValue {
  capabilities: WebGLCapabilities;
  forceDisabled: boolean;
  effectiveSupported: boolean;
  setForceDisabled: (disabled: boolean) => void;
}

const defaultCaps: WebGLCapabilities = {
  supported: false,
  webgl2: false,
  maxTextureSize: 2048,
  hardwareConcurrency: 4,
  lowPowerDevice: false,
  maxDpr: 1
};

const WebGLContext = createContext<WebGLContextValue>({
  capabilities: defaultCaps,
  forceDisabled: false,
  effectiveSupported: false,
  setForceDisabled: () => {}
});

export function WebGLCapabilityProvider({ children }: { children: React.ReactNode }) {
  const [capabilities, setCapabilities] = useState<WebGLCapabilities>(defaultCaps);
  const [forceDisabled, setForceDisabled] = useState<boolean>(false);

  useEffect(() => {
    const caps = detectWebGLCapabilities();
    setCapabilities(caps);
  }, []);

  const effectiveSupported = !forceDisabled && capabilities.supported;

  return (
    <WebGLContext.Provider
      value={{
        capabilities,
        forceDisabled,
        effectiveSupported,
        setForceDisabled
      }}
    >
      {children}
    </WebGLContext.Provider>
  );
}

export function useWebGLCapabilities() {
  return useContext(WebGLContext);
}
