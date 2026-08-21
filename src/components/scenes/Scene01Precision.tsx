"use client";

import React, { useRef } from "react";
import { useReducedMotion } from "@/providers/ReducedMotionProvider";
import { useHeaderActions } from "@/providers/HeaderContext";
import { useGsapContext } from "@/lib/motion/hooks";
import { gsap } from "@/lib/motion/gsap-config";
import Link from "next/link";
import { PrecisionField } from "@/components/cinematic/PrecisionField";
import { CinematicSceneViewport } from "./CinematicSceneViewport";
import { SceneSafeFrame } from "./SceneSafeFrame";
import { getSceneConfig } from "./registry";

/**
 * SCENE 01 — PRECISION AS POWER
 *
 * THE OPENING SEQUENCE.
 *
 * The visitor lands on black. The only thing on screen is a scroll
 * invitation. Scrolling draws the signal rule outward from the centre, and
 * the wordmark emerges from that rule — PRECISION rising out of it, AS POWER
 * dropping out of it — as though the line cut the type out of the dark.
 *
 * A note on the empty first frame: an empty landing viewport is normally the
 * worst thing a site can do, and earlier in this build it WAS a defect — the
 * hero was blank with nothing to indicate that scrolling would do anything.
 * The difference here is deliberate. The scroll cue is present, legible and
 * animated from the moment the page settles, so the black reads as a held
 * curtain rather than a failed render. It is the same opening Immersive
 * Garden, Lusion and Refokus all use.
 *
 * MOTION CONTRACT
 *   ON MOUNT (autonomous)   ambient field, signal point, scroll cue
 *   SCROLL 0.02 – 0.12      signal rule draws outward from centre
 *   SCROLL 0.08 – 0.30      PRECISION and AS POWER emerge from the rule
 *   SCROLL 0.26 – 0.44      supporting copy and the discipline row resolve
 *   SCROLL 0.44 – 0.68      readable hold, nothing moves
 *   SCROLL 0.68 – 1.00      the type parts back through the rule
 */

/**
 * Hero display size.
 *
 * Calibrated for Syne Extrabold, which is far wider than the body face —
 * roughly 1.02em per character for this string at weight 800, against ~0.62em
 * for DM Sans. The longest line, "AS POWER.", is 9 characters, so the size has
 * to clear 9 x 1.02 x fontSize inside the safe frame's inner width at every
 * breakpoint. The lower bound is what mobile can hold, not what looks big.
 */
const HERO_TYPE_SIZE = "clamp(2.15rem, 8.2vw, 9.5rem)";

/**
 * The three disciplines. They resolve after the wordmark, so the visitor gets
 * the posture first and the substance immediately after — without having to
 * reach chapter four to learn what the studio actually does.
 */
const HERO_CAPABILITIES = [
  { id: "build", label: "BUILD", line: "Websites, digital flagships & commerce", href: "/services/websites" },
  { id: "search", label: "SEARCH", line: "Technical SEO & entity architecture", href: "/services/seo" },
  { id: "systems", label: "SYSTEMS", line: "AI systems, automation & internal tools", href: "/services/ai-automation" },
] as const;

export function Scene01Precision() {
  const signalDotRef = useRef<HTMLDivElement | null>(null);
  const signalLineRef = useRef<HTMLDivElement | null>(null);
  const slitHandoffRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLDivElement | null>(null);
  const precisionRef = useRef<HTMLDivElement | null>(null);
  const powerRef = useRef<HTMLDivElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const desktopServiceLineRef = useRef<HTMLDivElement | null>(null);
  const mobileServiceLineRef = useRef<HTMLDivElement | null>(null);
  const scrollCueRef = useRef<HTMLDivElement | null>(null);
  const capabilitiesRef = useRef<HTMLDivElement | null>(null);
  const fieldRef = useRef<HTMLDivElement | null>(null);
  const introScopeRef = useRef<HTMLDivElement | null>(null);

  const lastHeaderStateRef = useRef<string>("standard");

  const { effectiveReducedMotion } = useReducedMotion();
  const { setNavVisible, setWordmarkOpacity, setHeaderState } = useHeaderActions();
  const config = getSceneConfig("scene-01-precision")!;

  /**
   * ON MOUNT — the curtain.
   *
   * Only the ambient field, the signal point and the scroll cue resolve.
   * Everything else waits for scroll, which is what makes the reveal land.
   */
  useGsapContext(
    () => {
      const revealTargets = [
        labelRef.current,
        desktopServiceLineRef.current,
        mobileServiceLineRef.current,
        precisionRef.current,
        powerRef.current,
        bodyRef.current,
        capabilitiesRef.current,
        signalLineRef.current,
      ].filter(Boolean);

      // Reduced motion: no curtain, no reveal. Resolve to the settled state so
      // the page is immediately complete and nothing depends on scrolling.
      if (effectiveReducedMotion) {
        gsap.set(revealTargets, { opacity: 1, y: 0, yPercent: 0, scaleX: 1 });
        gsap.set(scrollCueRef.current, { opacity: 1 });
        gsap.set(fieldRef.current, { opacity: 1 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // The ambient field breathes up out of the black first — the room
      // lights coming up before anything is said.
      tl.fromTo(fieldRef.current, { opacity: 0 }, { opacity: 1, duration: 1.6 }, 0.15);

      // A single point of life on an otherwise dead screen.
      tl.fromTo(
        signalDotRef.current,
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" },
        0.35
      );

      // The invitation.
      tl.fromTo(
        scrollCueRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.9 },
        0.7
      );
    },
    introScopeRef,
    [effectiveReducedMotion]
  );

  /** SCROLL — the reveal, the hold, and the handoff. */
  const buildTimeline = (timeline: gsap.core.Timeline) => {
    timeline.addLabel("curtain", 0);
    timeline.addLabel("rule", 0.02);
    timeline.addLabel("wordmark", 0.08);
    timeline.addLabel("substance", 0.26);
    timeline.addLabel("hold", 0.44);
    timeline.addLabel("exit", 0.68);

    setNavVisible(true);
    setWordmarkOpacity(1.0);
    setHeaderState("standard");

    timeline.eventCallback("onUpdate", () => {
      if (lastHeaderStateRef.current !== "standard") {
        lastHeaderStateRef.current = "standard";
        setNavVisible(true);
        setWordmarkOpacity(1.0);
        setHeaderState("standard");
      }
    });

    // ── The cue steps aside the instant its job is done ──────────────────
    if (scrollCueRef.current) {
      timeline.to(scrollCueRef.current, { opacity: 0, y: 12, duration: 0.05 }, 0);
    }

    // ── 1. The rule draws outward from the centre ────────────────────────
    if (signalDotRef.current) {
      timeline.to(signalDotRef.current, { opacity: 0, scale: 0.4, duration: 0.04 }, 0.02);
    }
    if (signalLineRef.current) {
      timeline.fromTo(
        signalLineRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.1, ease: "expo.out" },
        0.02
      );
    }

    // ── 2. The wordmark emerges FROM the rule ────────────────────────────
    // PRECISION sits in a clipped box above the line and rises out of it;
    // AS POWER sits in a clipped box below and drops out of it. The line is
    // the aperture the type is cut from.
    if (precisionRef.current) {
      timeline.fromTo(
        precisionRef.current,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.2, ease: "expo.out" },
        0.08
      );
    }
    if (powerRef.current) {
      timeline.fromTo(
        powerRef.current,
        { yPercent: -100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.2, ease: "expo.out" },
        0.1
      );
    }

    // ── 3. Substance follows the statement ───────────────────────────────
    if (labelRef.current) {
      timeline.fromTo(labelRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.08 }, 0.26);
    }
    if (desktopServiceLineRef.current) {
      timeline.fromTo(desktopServiceLineRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.08 }, 0.28);
    }
    if (mobileServiceLineRef.current) {
      timeline.fromTo(mobileServiceLineRef.current, { opacity: 0 }, { opacity: 1, duration: 0.08 }, 0.28);
    }
    if (bodyRef.current) {
      timeline.fromTo(bodyRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.08 }, 0.3);
    }
    if (capabilitiesRef.current) {
      timeline.fromTo(capabilitiesRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.1 }, 0.34);
    }

    // ── 4. Hold: 0.44 → 0.68, nothing moves ──────────────────────────────

    // ── 5. Exit — the type parts back through the rule ───────────────────
    if (bodyRef.current) {
      timeline.to(bodyRef.current, { opacity: 0, y: -10, duration: 0.12 }, 0.68);
    }
    if (labelRef.current) {
      timeline.to(labelRef.current, { opacity: 0, y: -8, duration: 0.12 }, 0.68);
    }
    if (desktopServiceLineRef.current) {
      timeline.to(desktopServiceLineRef.current, { opacity: 0, duration: 0.12 }, 0.68);
    }
    if (mobileServiceLineRef.current) {
      timeline.to(mobileServiceLineRef.current, { opacity: 0, duration: 0.12 }, 0.68);
    }
    if (capabilitiesRef.current) {
      timeline.to(capabilitiesRef.current, { opacity: 0, y: 14, duration: 0.12 }, 0.66);
    }
    if (precisionRef.current) {
      timeline.to(precisionRef.current, { yPercent: 100, opacity: 0, duration: 0.2, ease: "power2.in" }, 0.74);
    }
    if (powerRef.current) {
      timeline.to(powerRef.current, { yPercent: -100, opacity: 0, duration: 0.2, ease: "power2.in" }, 0.74);
    }
    if (signalLineRef.current) {
      timeline.to(signalLineRef.current, { scaleX: 0, opacity: 0, duration: 0.14, ease: "power2.inOut" }, 0.86);
    }
    if (slitHandoffRef.current) {
      timeline.fromTo(
        slitHandoffRef.current,
        { scaleY: 0, opacity: 0 },
        { scaleY: 1, opacity: 1, duration: 0.1 },
        0.9
      );
    }
  };

  return (
    <CinematicSceneViewport config={config} sceneIndex={1} buildTimeline={buildTimeline}>
      <div ref={fieldRef} className="absolute inset-0 opacity-0">
        <PrecisionField intensity={1} />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 78% 62% at 42% 52%, rgba(8,8,8,0.94) 0%, rgba(8,8,8,0.72) 45%, rgba(8,8,8,0) 100%)",
        }}
      />

      <SceneSafeFrame>
        <div ref={introScopeRef} className="contents">
          {/* The full statement stays in the accessibility tree from the first
              frame, so the reveal is presentation only and a screen reader
              never depends on scroll. */}
          <h1 className="sr-only">
            Precision as Power. Avorria — Digital Marketing, Web Design, SEO and AI Systems Studio.
          </h1>

          <div className="flex items-start justify-between w-full">
            <div
              ref={labelRef}
              className="font-mono text-xs sm:text-sm uppercase tracking-widest text-avorria-signal opacity-0 font-medium"
              aria-hidden="true"
            >
              DIGITAL MARKETING / WEB / AI STUDIO
            </div>

            <div
              ref={desktopServiceLineRef}
              className="hidden sm:block font-mono text-[10px] sm:text-xs uppercase tracking-widest text-avorria-muted opacity-0 text-right"
              aria-hidden="true"
            >
              WEB DESIGN / DEVELOPMENT<br />SEO / AI SYSTEMS
            </div>
          </div>

          {/* Central composition — the rule is the aperture */}
          <div className="flex flex-col justify-center my-auto py-4 sm:py-6" aria-hidden="true">
            <div className="overflow-hidden pb-1 sm:pb-2">
              <div
                ref={precisionRef}
                className="font-display font-extrabold select-none tracking-tight leading-none text-avorria-white opacity-0"
                style={{ fontSize: HERO_TYPE_SIZE, willChange: "transform, opacity" }}
              >
                PRECISION
              </div>
            </div>

            <div className="relative w-full my-2 sm:my-4 flex items-center justify-center">
              <div
                ref={signalDotRef}
                className="absolute w-1.5 h-1.5 rounded-full bg-avorria-signal opacity-0 z-10 shadow-[0_0_12px_rgba(200,241,53,0.9)]"
                style={{ willChange: "transform, opacity" }}
              />
              <div
                ref={signalLineRef}
                className="w-full h-[1px] bg-avorria-signal origin-center opacity-0 shadow-[0_0_10px_rgba(200,241,53,0.5)]"
                style={{ willChange: "transform, opacity" }}
              />
              <div
                ref={slitHandoffRef}
                className="absolute w-[1px] h-16 sm:h-20 bg-avorria-signal origin-center opacity-0"
                style={{ willChange: "transform, opacity" }}
              />
            </div>

            <div className="overflow-hidden pt-1 sm:pt-2">
              <div
                ref={powerRef}
                className="font-display font-extrabold select-none tracking-tight leading-none text-avorria-signal opacity-0 whitespace-nowrap"
                style={{ fontSize: HERO_TYPE_SIZE, willChange: "transform, opacity" }}
              >
                AS POWER<span className="text-avorria-signal">.</span>
              </div>
            </div>

            <div ref={bodyRef} className="mt-6 sm:mt-8 max-w-[680px] opacity-0">
              <p className="font-body text-base sm:text-lg text-avorria-white/90 font-light leading-relaxed uppercase tracking-wide">
                We design and build websites, grow search visibility and engineer AI systems for ambitious businesses.
              </p>
            </div>
          </div>

          {/* Bottom: disciplines, and the scroll invitation that holds the
              black frame before any of the above exists. */}
          <div className="w-full flex flex-col gap-5">
            <div ref={mobileServiceLineRef} className="sr-only" aria-hidden="true">
              WEB DESIGN / DEVELOPMENT / SEO / AI SYSTEMS
            </div>

            <div
              ref={capabilitiesRef}
              className="w-full grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-4 border-t border-avorria-line pt-5 opacity-0"
            >
              {HERO_CAPABILITIES.map((cap) => (
                <Link
                  key={cap.id}
                  href={cap.href}
                  className="group flex flex-col gap-1.5 outline-none focus-visible:ring-1 focus-visible:ring-avorria-signal"
                >
                  <span className="flex items-center gap-2.5">
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-avorria-signal opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                    <span className="font-display font-extrabold uppercase tracking-tight text-base sm:text-lg text-avorria-white transition-colors duration-300 group-hover:text-avorria-signal">
                      {cap.label}
                    </span>
                  </span>
                  <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-avorria-quiet transition-colors duration-300 group-hover:text-avorria-muted">
                    {cap.line}
                  </span>
                </Link>
              ))}
            </div>

            <div
              ref={scrollCueRef}
              className="w-full flex flex-col items-center gap-3 opacity-0"
              aria-hidden="true"
            >
              <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.42em] font-light text-avorria-signal">
                Scroll
              </span>
              <span
                className="block w-[1px] h-10 sm:h-14 bg-gradient-to-b from-avorria-signal to-transparent origin-top"
                style={{ animation: "avorria-cue-drop 2.6s var(--ease-avorria-in-out) infinite" }}
              />
            </div>
          </div>
        </div>
      </SceneSafeFrame>
    </CinematicSceneViewport>
  );
}
