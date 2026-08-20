"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let isRegistered = false;

export function initGsap() {
  if (typeof window === "undefined" || isRegistered) return gsap;
  
  gsap.registerPlugin(ScrollTrigger);
  
  // Default configuration for precision and performance
  gsap.config({
    autoSleep: 60,
    force3D: true,
    nullTargetWarn: false
  });

  // `resize` MUST stay in autoRefreshEvents. Every cinematic scene derives its
  // scroll distance from viewport height (100dvh sticky inside a Nvh section);
  // without a refresh on resize those measurements go stale and every pinned
  // scene desynchronises from its trigger as soon as the window is resized.
  // `ignoreMobileResize` still suppresses the mobile URL-bar show/hide, which
  // is the resize we actually want to ignore.
  ScrollTrigger.config({
    ignoreMobileResize: true,
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize"
  });

  isRegistered = true;
  return gsap;
}

export { gsap, ScrollTrigger };
