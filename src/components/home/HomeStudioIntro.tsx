"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { CinematicSceneViewport } from "@/components/scenes/CinematicSceneViewport";
import { SceneSafeFrame } from "@/components/scenes/SceneSafeFrame";
import { PrecisionField } from "@/components/cinematic/PrecisionField";
import { useReducedMotion } from "@/providers/ReducedMotionProvider";
import type { SceneConfig } from "@/types/scene";

/**
 * HOME CHAPTER 02 — THE STUDIO
 *
 * The bridge the homepage was missing. The page previously cut from the hero
 * straight into a full-screen screenshot of a client's website, so a visitor
 * met the evidence before they had any idea who was presenting it or how the
 * studio works. Assertion, then proof, with nothing in between.
 *
 * This chapter answers the question the work reel assumes has already been
 * answered: what kind of studio is this, and why should the work that follows
 * carry weight.
 *
 * Two beats, cross-faded on scroll:
 *   01  The operating model — design, build, operate, under one roof
 *   02  What that means in practice, then the handoff into the work
 *
 * Every claim here is drawn from existing studio copy. Nothing is invented.
 */

const STUDIO_CONFIG: SceneConfig = {
  id: "scene-studio-intro" as SceneConfig["id"],
  index: 2,
  label: "02 / THE STUDIO",
  chapter: "STUDIO",
  minHeight: "260vh",
  mobileHeight: "240svh",
  mobileSceneClass: "B",
  bgMode: "black",
  pinningEligibility: true,
  webglRequirement: false,
  mediaPriority: "normal",
  reducedMotionStrategy: "static",
  mobileStrategy: "mobileCinematic",
  analyticsName: "home_studio_intro",
};

const STAGES = [
  {
    n: "01",
    label: "Design",
    line: "Strategy, art direction and interface design. The thinking happens before anything is built.",
  },
  {
    n: "02",
    label: "Build",
    line: "Engineering in-house. No outsourced development, no handoff between the people who designed it and the people who ship it.",
  },
  {
    n: "03",
    label: "Operate",
    line: "Search, performance and AI systems after launch. A site that is never revisited is a site that decays.",
  },
] as const;

const STATEMENT_LINES = [
  { text: "We design it.", accent: false },
  { text: "We build it.", accent: false },
  { text: "We keep it working.", accent: true },
] as const;

const FACTS = [
  { k: "Model", v: "Independent studio" },
  { k: "Disciplines", v: "Five, in-house" },
  { k: "Practice", v: "Client work & our own ventures" },
  { k: "Engagements", v: "Retained & project-based" },
] as const;

export function HomeStudioIntro() {
  const { effectiveReducedMotion } = useReducedMotion();
  const beat1Ref = useRef<HTMLDivElement>(null);
  const beat2Ref = useRef<HTMLDivElement>(null);

  const buildTimeline = (timeline: gsap.core.Timeline) => {
    timeline.addLabel("model", 0);
    timeline.addLabel("practice", 0.5);

    // Beat 1 is composed at progress 0 — the scene pins with `start: "top top"`,
    // so fading it in from there would show a black frame at the exact moment
    // the chapter takes the viewport.
    if (beat1Ref.current) {
      timeline.set(beat1Ref.current, { autoAlpha: 1, y: 0 }, 0);

      // Each line rises out of its own mask, staggered. The lines are the
      // beat — they should not arrive as one block.
      const lines = beat1Ref.current.querySelectorAll("[data-studio-line]");
      if (lines.length) {
        timeline.fromTo(
          lines,
          { yPercent: 105, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.11, ease: "expo.out", stagger: 0.05 },
          0.02
        );
      }

      const stages = beat1Ref.current.querySelectorAll("[data-studio-stage]");
      if (stages.length) {
        timeline.fromTo(
          stages,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.09, ease: "power3.out", stagger: 0.035 },
          0.2
        );
      }

      timeline.to(
        beat1Ref.current,
        { autoAlpha: 0, y: -24, duration: 0.08, ease: "power2.in" },
        0.44
      );
    }

    if (beat2Ref.current) {
      timeline.fromTo(
        beat2Ref.current,
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.08, ease: "power2.out" },
        0.48
      );
    }
  };

  // Reduced motion: both beats stack and read as one static section.
  if (effectiveReducedMotion) {
    return (
      <section
        id="scene-studio-intro"
        className="relative w-full border-t border-avorria-line bg-avorria-black py-24"
      >
        <div className="max-w-[1760px] mx-auto px-[var(--safe-x)] flex flex-col gap-20">
          <StudioBeatOne startHidden={false} />
          <StudioBeatTwo />
        </div>
      </section>
    );
  }

  return (
    <CinematicSceneViewport config={STUDIO_CONFIG} sceneIndex={2} buildTimeline={buildTimeline}>
      <PrecisionField intensity={0.7} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 74% 66% at 40% 50%, rgba(8,8,8,0.93) 0%, rgba(8,8,8,0.66) 48%, rgba(8,8,8,0) 100%)",
        }}
      />

      <SceneSafeFrame>
        <h2 className="sr-only">The Avorria studio — how we work</h2>

        {/* Marker row, shared by both beats */}
        <div className="w-full flex items-center justify-between font-mono text-[10px] sm:text-xs uppercase tracking-widest">
          <span className="text-avorria-signal">02 / THE STUDIO</span>
          <span className="text-avorria-white">HOW WE WORK</span>
        </div>

        <div className="relative w-full flex-1">
          <div
            ref={beat1Ref}
            className="absolute inset-0 flex flex-col justify-center opacity-100"
          >
            <StudioBeatOne />
          </div>
          <div
            ref={beat2Ref}
            className="absolute inset-0 flex flex-col justify-center opacity-0 invisible"
          >
            <StudioBeatTwo />
          </div>
        </div>

        {/* Spacer keeps the safe frame's three-part rhythm */}
        <div aria-hidden="true" className="h-px w-full" />
      </SceneSafeFrame>
    </CinematicSceneViewport>
  );
}

function StudioBeatOne({ startHidden = true }: { startHidden?: boolean }) {
  return (
    <div className="w-full flex flex-col gap-8 sm:gap-10">
      {/* Three lines, three clipped rows. Each rises out of its own mask on
          scroll, so the statement lands as three beats rather than a block
          of type appearing at once. */}
      <div className="flex flex-col">
        {STATEMENT_LINES.map((line, i) => (
          <span key={line.text} className="block overflow-hidden">
            <span
              data-studio-line
              className={`block font-display font-extrabold uppercase tracking-tight leading-[1.02] ${
                line.accent ? "text-avorria-signal" : "text-avorria-white"
              }`}
              /* Sized so the longest line, "We keep it working.", holds one line:
                 it runs ~18.7px of line per px of font size, against a 1325px
                 safe-frame width at 1440. */
              style={{ fontSize: "clamp(1.6rem, 4.6vw, 4.6rem)", willChange: "transform, opacity" }}
            >
              {line.text}
            </span>
          </span>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-6 border-t border-avorria-line pt-7">
        {STAGES.map((s) => (
          <div
            key={s.n}
            data-studio-stage
            className={`flex flex-col gap-2 ${startHidden ? "opacity-0" : ""}`}
          >
            <span className="flex items-center gap-2.5">
              <span className="font-mono text-[10px] text-avorria-quiet">{s.n}</span>
              <span className="font-display font-extrabold uppercase tracking-tight text-lg sm:text-xl text-avorria-white">
                {s.label}
              </span>
            </span>
            <span className="font-body text-sm text-avorria-white/70 leading-relaxed max-w-[38ch]">
              {s.line}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StudioBeatTwo() {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
      <div className="lg:col-span-7 flex flex-col gap-6">
        <p
          className="font-display font-extrabold uppercase tracking-tight leading-[0.94] text-avorria-white"
          style={{ fontSize: "clamp(1.6rem, 3.7vw, 3.4rem)" }}
        >
          We don&rsquo;t only build for clients.
          <br />
          <span className="text-avorria-signal">We run our own.</span>
        </p>
        <p className="font-body text-base sm:text-lg text-avorria-white/75 leading-relaxed max-w-[54ch]">
          Several of the products in the work that follows are ours — designed, built and
          operated by the same studio. We carry the consequences of our own decisions, which
          is a different discipline from shipping and walking away.
        </p>
        <Link
          href="/studio"
          className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-avorria-signal w-fit"
        >
          <span className="border-b border-avorria-signal/40 pb-0.5 group-hover:border-avorria-signal transition-colors">
            More about the studio
          </span>
          <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
            →
          </span>
        </Link>
      </div>

      <div className="lg:col-span-5 lg:border-l lg:border-avorria-line/60 lg:pl-10">
        <span className="block font-mono text-[11px] uppercase tracking-widest text-avorria-signal font-bold border-b border-avorria-line/60 pb-3">
          The studio
        </span>
        <dl className="divide-y divide-avorria-line/40">
          {FACTS.map((f) => (
            <div key={f.k} className="flex items-baseline justify-between gap-6 py-3.5">
              <dt className="font-mono text-[10px] uppercase tracking-widest text-avorria-quiet shrink-0">
                {f.k}
              </dt>
              <dd className="font-mono text-xs text-avorria-white text-right">{f.v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 font-mono text-[10px] uppercase tracking-widest text-avorria-quiet">
          What follows is what that produces &darr;
        </p>
      </div>
    </div>
  );
}
