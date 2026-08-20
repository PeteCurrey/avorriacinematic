"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { useSceneEntrance } from "@/lib/motion/hooks";
import { gsap } from "@/lib/motion/gsap-config";
import { useReducedMotion } from "@/providers/ReducedMotionProvider";
import { FINALE_CONFIG } from "@/lib/scenes/finale-config";
import { FinaleFallback } from "./finale/FinaleFallback";
import { CinematicSceneViewport } from "./CinematicSceneViewport";
import { SceneSafeFrame } from "./SceneSafeFrame";
import { getSceneConfig } from "./registry";

/**
 * SCENE 08 — FINALE
 *
 * A single composition inside the SceneSafeFrame: marker row, centre block,
 * action row. Every part is a flow child, so the frame's insets govern the
 * whole scene and nothing can collide with the fixed header.
 *
 * Display sizing note: Syne gets substantially wider at its heavy weights
 * (~1.14em per uppercase character at 800, against ~0.70em at 700). The
 * proposition clamp is calibrated against the longest line, "SOMETHING" —
 * 9 characters — so it always fits the safe frame's inner width.
 *
 * TIMING
 * The entrance is on-enter (see useSceneEntrance), not scroll-scrubbed, so the
 * finale is composed by the time it pins rather than fading up from a black
 * frame. Once entered it holds stable for the scene's full scroll distance.
 */
export function Scene18Finale() {
  const config = getSceneConfig("scene-18-finale")!;

  const sceneRef = useRef<HTMLDivElement>(null);
  const signalLineRef = useRef<HTMLDivElement>(null);
  const questionRef = useRef<HTMLDivElement>(null);
  const propositionRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  const { effectiveReducedMotion } = useReducedMotion();

  // Entrance fires as the finale comes into view, so the scene is composed
  // rather than blank the moment it pins to the viewport.
  useSceneEntrance(
    (tl) => {
      tl.fromTo(
        signalLineRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.9, ease: "expo.out" },
        0
      )
        .fromTo(
          questionRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          0.15
        )
        .fromTo(
          propositionRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.9, ease: "expo.out" },
          0.3
        )
        .fromTo(
          actionsRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          0.6
        );
    },
    sceneRef,
    {
      reducedMotion: effectiveReducedMotion,
      start: "top 75%",
      onReducedMotion: () => {
        gsap.set(
          [
            signalLineRef.current,
            questionRef.current,
            propositionRef.current,
            actionsRef.current,
          ].filter(Boolean),
          { opacity: 1, y: 0, scaleX: 1 }
        );
      },
    }
  );

  // Scrubbed timeline intentionally left empty: the finale is the last chapter
  // and holds stable for its full scroll distance. Entrance is on-enter above.
  const buildTimeline = (_timeline: gsap.core.Timeline) => {};

  return (
    <CinematicSceneViewport
      config={config}
      sceneIndex={8}
      fallback={<FinaleFallback />}
      buildTimeline={buildTimeline}
    >
      <SceneSafeFrame ref={sceneRef}>
        <h2 className="sr-only">
          Start a Project — Connect with Avorria Engineering Studio
        </h2>

        {/* Marker row */}
        <div className="w-full flex items-center justify-between font-mono text-[10px] sm:text-xs uppercase tracking-widest">
          <span className="text-avorria-signal">08 / FINALE</span>
          <span className="text-avorria-white">ENGAGEMENT</span>
        </div>

        {/* Centre block — question, signal rule, proposition */}
        <div className="w-full my-auto flex flex-col gap-6 sm:gap-8 py-6">
          <div ref={questionRef} className="opacity-0">
            <span className="block font-mono text-[10px] sm:text-xs text-avorria-signal uppercase tracking-widest mb-3">
              {"// "}HAVE SOMETHING AMBITIOUS IN MIND?
            </span>
          </div>

          {/* Signal rule — draws outward from the left */}
          <div
            ref={signalLineRef}
            className="w-full h-[1px] bg-avorria-signal origin-left opacity-0 shadow-[0_0_8px_rgba(200,241,53,0.45)]"
            style={{ willChange: "transform, opacity" }}
            aria-hidden="true"
          />

          <div ref={propositionRef} className="opacity-0">
            <p
              className="font-display font-extrabold uppercase tracking-tight leading-[0.88] text-avorria-white"
              style={{ fontSize: "clamp(2rem, 8.5vw, 9.5rem)" }}
            >
              BUILD<br />
              SOMETHING<br />
              <span className="text-avorria-signal">{FINALE_CONFIG.emphasisText}</span>
            </p>
          </div>
        </div>

        {/* Action row */}
        <div ref={actionsRef} className="w-full opacity-0">
          <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-6 border-t border-avorria-line pt-6 sm:pt-8">
            <Link
              href={FINALE_CONFIG.primaryCtaHref}
              className="group inline-flex items-center gap-4 font-display font-extrabold uppercase tracking-tight text-avorria-white hover:text-avorria-signal transition-colors text-xl sm:text-3xl lg:text-4xl"
            >
              <span>{FINALE_CONFIG.primaryCtaText}</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-3 text-avorria-signal">
                →
              </span>
            </Link>

            <div className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-avorria-muted flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>OR EMAIL DIRECTLY //</span>
              <a
                href={`mailto:${FINALE_CONFIG.contactEmail}`}
                className="text-avorria-white hover:text-avorria-signal border-b border-avorria-line hover:border-avorria-signal pb-0.5 transition-colors normal-case"
              >
                {FINALE_CONFIG.contactEmail}
              </a>
            </div>
          </div>
        </div>
      </SceneSafeFrame>
    </CinematicSceneViewport>
  );
}
