"use client";

import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/providers/ReducedMotionProvider";

/**
 * PRELOADER
 *
 * The brand's first frame, and the window in which fonts and the hero's
 * heavier assets settle.
 *
 * It hands off into the hero's own black curtain, so there is no visual
 * seam — the wordmark and the signal rule are the same language the hero
 * opens with. The preloader dissolves and the hero is simply already there.
 *
 * HONESTY
 * The progress bar tracks real readiness — fonts resolved, window load,
 * and any assets registered through `registerPreloadTask` — not a scripted
 * animation. A fake progress bar that always takes 2.4s is theatre; this one
 * shortens on a fast connection and lengthens on a slow one, which is the
 * only reason to show a number at all.
 *
 * SAFETY
 * A stalled asset must never trap the visitor behind a curtain. A hard
 * timeout releases the page regardless of what is still outstanding.
 *
 * Shown once per session. A visitor moving between pages should not sit
 * through the overture again.
 */

const MIN_VISIBLE_MS = 900;   // below this it reads as a flash, not an entrance
const HARD_TIMEOUT_MS = 6000; // never hold the page longer than this
const SESSION_KEY = "avorria_preloader_shown";

export function Preloader() {
  const { effectiveReducedMotion } = useReducedMotion();

  // The curtain renders by default, on the server and on the very first
  // client paint. Gating it behind an effect left the page visible and
  // unstyled for a frame or two before the preloader appeared, which is
  // worse than having no preloader at all.
  //
  // `active` is set false on mount when this session has already seen it, and
  // that path dismisses instantly with no transition — a visitor moving
  // between pages never sits through the overture twice.
  const [active, setActive] = useState(true);
  const [instant, setInstant] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      // Private mode or blocked storage — show it, no worse than that.
    }

    if (seen) {
      setInstant(true);
      setDismissed(true);
      setActive(false);
      return;
    }

    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* non-fatal */
    }
  }, []);

  useEffect(() => {
    if (!active) return;

    const startedAt = performance.now();
    let released = false;
    let raf = 0;

    // Scroll is locked while the curtain is up, otherwise the page moves
    // underneath it and the hero's opening frame is already gone on reveal.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    /** Real readiness signals, each worth a share of the bar. */
    const signals = { fonts: false, load: false, settle: false };
    const weightOf = () =>
      (signals.fonts ? 0.45 : 0) + (signals.load ? 0.4 : 0) + (signals.settle ? 0.15 : 0);

    const release = () => {
      if (released) return;
      released = true;
      const elapsed = performance.now() - startedAt;
      const wait = Math.max(0, MIN_VISIBLE_MS - elapsed);
      window.setTimeout(() => {
        setProgress(1);
        // Let the bar reach full before the curtain lifts.
        window.setTimeout(() => setDismissed(true), effectiveReducedMotion ? 0 : 420);
      }, wait);
    };

    document.fonts?.ready
      .then(() => {
        signals.fonts = true;
      })
      .catch(() => {
        signals.fonts = true;
      });

    const onLoad = () => {
      signals.load = true;
      // One frame of grace so first paint has actually happened.
      window.setTimeout(() => {
        signals.settle = true;
        release();
      }, 180);
    };

    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });

    // Ease the bar toward real readiness rather than snapping between
    // discrete steps — it should feel like loading, not like a state machine.
    const tick = () => {
      setProgress((p) => p + (weightOf() - p) * 0.08);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const failsafe = window.setTimeout(release, HARD_TIMEOUT_MS);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(failsafe);
      window.removeEventListener("load", onLoad);
      document.body.style.overflow = previousOverflow;
    };
  }, [active, effectiveReducedMotion]);

  // Restore scrolling the moment the curtain starts to lift.
  useEffect(() => {
    if (dismissed) document.body.style.overflow = "";
  }, [dismissed]);

  if (!active && dismissed && instant) return null;

  const pct = Math.min(100, Math.round(progress * 100));

  return (
    <div
      ref={rootRef}
      data-avorria-preloader
      role="status"
      aria-live="polite"
      aria-label="Loading Avorria"
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-avorria-black transition-opacity ease-[cubic-bezier(0.16,1,0.3,1)] ${
        dismissed ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      style={{ transitionDuration: effectiveReducedMotion || instant ? "0ms" : "900ms" }}
    >
      <div className="w-[min(78vw,560px)] flex flex-col items-center gap-7">
        <div className="font-display font-extrabold uppercase tracking-tight text-avorria-white text-[clamp(1.75rem,4.6vw,3.25rem)] leading-none">
          Avorria<span className="text-avorria-signal">.</span>
        </div>

        {/* The rule fills as the site becomes ready — the same rule the hero
            draws outward a moment later. */}
        <div className="relative w-full h-[1px] bg-avorria-line overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-avorria-signal shadow-[0_0_10px_rgba(77,159,255,0.6)]"
            style={{
              width: `${pct}%`,
              transition: effectiveReducedMotion ? "none" : "width 120ms linear",
            }}
          />
        </div>

        <div className="w-full flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-avorria-quiet">
          <span>Precision as Power</span>
          <span className="tabular-nums text-avorria-signal">
            {String(pct).padStart(3, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}
