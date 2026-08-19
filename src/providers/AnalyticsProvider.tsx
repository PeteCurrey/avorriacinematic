"use client";

import React, { createContext, useContext, useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics/track";

interface AnalyticsContextValue {
  track: typeof trackEvent;
}

const AnalyticsContext = createContext<AnalyticsContextValue>({
  track: trackEvent
});

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Track non-intrusive route change
    trackEvent("scene_enter", {
      path: pathname,
      timestamp: Date.now()
    });
  }, [pathname]);

  return (
    <AnalyticsContext.Provider value={{ track: trackEvent }}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics() {
  return useContext(AnalyticsContext);
}
