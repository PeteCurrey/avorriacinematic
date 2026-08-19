"use client";

import React, { useRef } from "react";
import { useGsapContext } from "@/lib/motion/hooks";
import { useReducedMotion } from "@/providers/ReducedMotionProvider";
import { useHeader } from "@/providers/HeaderContext";
import { gsap, ScrollTrigger } from "@/lib/motion/gsap-config";

export function Scene00Void() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const signalDotRef = useRef<HTMLDivElement | null>(null);
  const scrollInviteRef = useRef<HTMLDivElement | null>(null);
  const { effectiveReducedMotion } = useReducedMotion();
  const { setNavVisible, setWordmarkOpacity } = useHeader();

  useGsapContext((ctx) => {
    if (effectiveReducedMotion || !containerRef.current || !signalDotRef.current) return;

    // 1. Initial single subtle pulse on load (0.45 -> 1.0 -> 0.75)
    gsap.fromTo(
      signalDotRef.current,
      { opacity: 0.45, scale: 1 },
      { opacity: 0.85, scale: 1.25, duration: 1.1, ease: "power2.inOut", yoyo: true, repeat: 1 }
    );

    // 2. ScrollTrigger timeline: Scroll fades invitation & elongates dot to horizontal rule
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          if (self.progress > 0.05) {
            setWordmarkOpacity(0.75);
            setNavVisible(false);
          }
        }
      }
    });

    // Fade scroll invitation quickly
    if (scrollInviteRef.current) {
      tl.to(scrollInviteRef.current, { opacity: 0, y: 15, duration: 0.2 }, 0);
    }

    // Transform 4px dot into horizontal line across center
    tl.to(
      signalDotRef.current,
      {
        width: "120px",
        borderRadius: "0px",
        height: "1px",
        opacity: 1,
        duration: 0.15
      },
      0.15
    );
  }, containerRef, [effectiveReducedMotion]);

  return (
    <section
      ref={containerRef}
      id="scene-00-void"
      data-scene-id="scene-00-void"
      data-scene-index="0"
      className="relative w-full h-[100dvh] flex flex-col items-center justify-center bg-avorria-black select-none"
    >
      {/* Central Chartreuse Signal Dot (Transforms to Line) */}
      <div className="relative flex items-center justify-center pointer-events-none">
        <div
          ref={signalDotRef}
          className="w-1 h-1 bg-avorria-signal rounded-full"
          style={{ willChange: "width, transform, opacity" }}
          aria-hidden="true"
        />
      </div>

      {/* Minimal Scroll Invitation */}
      <div
        ref={scrollInviteRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        aria-hidden="true"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-avorria-quiet">
          SCROLL
        </span>
        <div className="w-[1px] h-4 bg-avorria-line-strong" />
      </div>
    </section>
  );
}
