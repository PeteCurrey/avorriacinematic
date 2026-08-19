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

  ScrollTrigger.config({
    ignoreMobileResize: true,
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
  });

  isRegistered = true;
  return gsap;
}

export { gsap, ScrollTrigger };
