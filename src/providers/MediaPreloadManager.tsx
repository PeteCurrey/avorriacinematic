"use client";

import React, { createContext, useContext, useCallback } from "react";

interface MediaPreloadContextValue {
  preloadImage: (src: string) => void;
  preloadVideo: (src: string) => void;
}

const MediaPreloadContext = createContext<MediaPreloadContextValue>({
  preloadImage: () => {},
  preloadVideo: () => {}
});

export function MediaPreloadManager({ children }: { children: React.ReactNode }) {
  const preloadedMap = React.useRef<Set<string>>(new Set());

  const preloadImage = useCallback((src: string) => {
    if (typeof window === "undefined" || !src || preloadedMap.current.has(src)) return;
    preloadedMap.current.add(src);
    const img = new Image();
    img.src = src;
  }, []);

  const preloadVideo = useCallback((src: string) => {
    if (typeof window === "undefined" || !src || preloadedMap.current.has(src)) return;
    preloadedMap.current.add(src);
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "video";
    link.href = src;
    document.head.appendChild(link);
  }, []);

  return (
    <MediaPreloadContext.Provider value={{ preloadImage, preloadVideo }}>
      {children}
    </MediaPreloadContext.Provider>
  );
}

export function useMediaPreload() {
  return useContext(MediaPreloadContext);
}
