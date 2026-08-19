"use client";

import React from "react";
import { ThemeProvider } from "./ThemeContext";
import { HeaderProvider } from "./HeaderContext";
import { CursorProvider } from "./CursorContext";
import { ReducedMotionProvider } from "./ReducedMotionProvider";
import { WebGLCapabilityProvider } from "./WebGLCapabilityProvider";
import { MotionProvider } from "./MotionProvider";
import { MediaPreloadManager } from "./MediaPreloadManager";
import { AnalyticsProvider } from "./AnalyticsProvider";

export function RootProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <HeaderProvider>
        <CursorProvider>
          <ReducedMotionProvider>
            <WebGLCapabilityProvider>
              <MotionProvider>
                <MediaPreloadManager>
                  <AnalyticsProvider>{children}</AnalyticsProvider>
                </MediaPreloadManager>
              </MotionProvider>
            </WebGLCapabilityProvider>
          </ReducedMotionProvider>
        </CursorProvider>
      </HeaderProvider>
    </ThemeProvider>
  );
}
