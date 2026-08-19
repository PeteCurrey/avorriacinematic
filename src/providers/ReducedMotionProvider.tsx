"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface ReducedMotionContextValue {
  prefersReducedMotion: boolean;
  overrideReducedMotion: boolean | null;
  effectiveReducedMotion: boolean;
  setOverrideReducedMotion: (override: boolean | null) => void;
}

const ReducedMotionContext = createContext<ReducedMotionContextValue>({
  prefersReducedMotion: false,
  overrideReducedMotion: null,
  effectiveReducedMotion: false,
  setOverrideReducedMotion: () => {}
});

export function ReducedMotionProvider({ children }: { children: React.ReactNode }) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  const [overrideReducedMotion, setOverrideReducedMotion] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const effectiveReducedMotion = overrideReducedMotion !== null ? overrideReducedMotion : prefersReducedMotion;

  return (
    <ReducedMotionContext.Provider
      value={{
        prefersReducedMotion,
        overrideReducedMotion,
        effectiveReducedMotion,
        setOverrideReducedMotion
      }}
    >
      {children}
    </ReducedMotionContext.Provider>
  );
}

export function useReducedMotion() {
  return useContext(ReducedMotionContext);
}
