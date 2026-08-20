"use client";

import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "@/providers/ReducedMotionProvider";
import { useWebGLCapabilities } from "@/providers/WebGLCapabilityProvider";

/**
 * PRECISION FIELD
 *
 * Ambient depth layer for hero sections. A slow survey field — measurement
 * nodes drifting on a hairline grid, with proximity links forming and
 * dissolving between them, and a small number of live signal nodes.
 *
 * It is deliberately quiet. The brief is depth behind the type, not a light
 * show: at these opacities the field reads as atmosphere and the headline
 * stays the only thing with contrast. If you can "see the animation" rather
 * than feel it, it is turned up too far.
 *
 * 2D canvas, not WebGL. The field is a few hundred points and some lines —
 * a canvas costs a fraction of a three.js scene, works everywhere, and adds
 * nothing to the bundle. WebGL capability is still consulted, but only to
 * decide density and pixel ratio.
 *
 * PERFORMANCE
 * - Pauses entirely when scrolled out of view (IntersectionObserver) and when
 *   the tab is hidden. An ambient layer must never burn cycles nobody sees.
 * - Device pixel ratio is capped, and node count scales with viewport area and
 *   device power.
 * - Link lookups run on a spatial grid rather than comparing every pair, so
 *   cost stays roughly linear as density rises.
 *
 * REDUCED MOTION
 * Renders one static frame and stops. The composition is still there; nothing
 * moves.
 */

interface PrecisionFieldProps {
  /** Overall strength. 1 = the tuned default; lower for busier sections. */
  intensity?: number;
  /** Draw the hairline measurement grid behind the nodes. */
  grid?: boolean;
  className?: string;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  /** Signal nodes carry the accent colour and a slow pulse. */
  signal: boolean;
  phase: number;
}

const INK = "243, 243, 240";
const SIGNAL = "200, 241, 53";

export function PrecisionField({
  intensity = 1,
  grid = true,
  className = "",
}: PrecisionFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { effectiveReducedMotion } = useReducedMotion();
  const { capabilities } = useWebGLCapabilities();

  const lowPower = capabilities?.lowPowerDevice ?? false;
  const maxDpr = capabilities?.maxDpr ?? 1.5;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    let raf = 0;
    let running = false;
    let visible = true;
    let inViewport = true;

    // Pointer influence, eased so the field never snaps to the cursor.
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

    const LINK_DIST = lowPower ? 108 : 132;
    const GRID_SPACING = 64;

    function build() {
      const rect = parent!.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, maxDpr);

      canvas!.width = Math.floor(width * dpr);
      canvas!.height = Math.floor(height * dpr);
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Density scales with area so a wide monitor is not sparse and a phone
      // is not overloaded.
      const area = width * height;
      const divisor = lowPower ? 26000 : 15000;
      const count = Math.round(Math.min(lowPower ? 60 : 170, area / divisor));

      nodes = Array.from({ length: count }, () => {
        const signal = Math.random() < 0.07;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.16,
          vy: (Math.random() - 0.5) * 0.16,
          r: signal ? 1.7 : Math.random() * 1.1 + 0.5,
          signal,
          phase: Math.random() * Math.PI * 2,
        };
      });
    }

    function drawGrid() {
      if (!grid) return;
      ctx!.strokeStyle = `rgba(${INK}, ${0.022 * intensity})`;
      ctx!.lineWidth = 1;
      ctx!.beginPath();
      for (let x = GRID_SPACING; x < width; x += GRID_SPACING) {
        ctx!.moveTo(Math.round(x) + 0.5, 0);
        ctx!.lineTo(Math.round(x) + 0.5, height);
      }
      for (let y = GRID_SPACING; y < height; y += GRID_SPACING) {
        ctx!.moveTo(0, Math.round(y) + 0.5);
        ctx!.lineTo(width, Math.round(y) + 0.5);
      }
      ctx!.stroke();
    }

    /**
     * Proximity links via a spatial hash. Comparing every pair would be
     * O(n²) — at 170 nodes that is ~14k distance checks every frame for a
     * decorative layer. Bucketing to the link radius keeps it near-linear.
     */
    function drawLinks() {
      const cell = LINK_DIST;
      const cols = Math.ceil(width / cell) + 1;
      const buckets = new Map<number, Node[]>();

      for (const n of nodes) {
        const key = Math.floor(n.y / cell) * cols + Math.floor(n.x / cell);
        const b = buckets.get(key);
        if (b) b.push(n);
        else buckets.set(key, [n]);
      }

      ctx!.lineWidth = 1;
      for (const n of nodes) {
        const cx = Math.floor(n.x / cell);
        const cy = Math.floor(n.y / cell);
        for (let ox = 0; ox <= 1; ox++) {
          for (let oy = -1; oy <= 1; oy++) {
            // Only scan forward neighbours so each pair is considered once.
            if (ox === 0 && oy < 0) continue;
            const b = buckets.get((cy + oy) * cols + (cx + ox));
            if (!b) continue;
            for (const m of b) {
              if (m === n) continue;
              const dx = m.x - n.x;
              const dy = m.y - n.y;
              const d2 = dx * dx + dy * dy;
              if (d2 > LINK_DIST * LINK_DIST) continue;
              const t = 1 - Math.sqrt(d2) / LINK_DIST;
              const accent = n.signal || m.signal;
              ctx!.strokeStyle = accent
                ? `rgba(${SIGNAL}, ${t * 0.16 * intensity})`
                : `rgba(${INK}, ${t * 0.075 * intensity})`;
              ctx!.beginPath();
              ctx!.moveTo(n.x, n.y);
              ctx!.lineTo(m.x, m.y);
              ctx!.stroke();
            }
          }
        }
      }
    }

    function drawNodes(time: number) {
      for (const n of nodes) {
        if (n.signal) {
          const pulse = 0.5 + 0.5 * Math.sin(time * 0.0011 + n.phase);
          ctx!.fillStyle = `rgba(${SIGNAL}, ${(0.28 + pulse * 0.42) * intensity})`;
          ctx!.beginPath();
          ctx!.arc(n.x, n.y, n.r + pulse * 0.7, 0, Math.PI * 2);
          ctx!.fill();
        } else {
          ctx!.fillStyle = `rgba(${INK}, ${0.3 * intensity})`;
          ctx!.beginPath();
          ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2);
          ctx!.fill();
        }
      }
    }

    function step(time: number) {
      ctx!.clearRect(0, 0, width, height);

      pointer.x += (pointer.tx - pointer.x) * 0.06;
      pointer.y += (pointer.ty - pointer.y) * 0.06;

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;

        // Wrap rather than bounce — a bounce reads as a boundary, a wrap
        // reads as a field that continues past the frame.
        if (n.x < -20) n.x = width + 20;
        else if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        else if (n.y > height + 20) n.y = -20;

        // Gentle drift away from the cursor. Displacement only — the node's
        // own velocity is untouched, so the field settles back on its own.
        const dx = n.x - pointer.x;
        const dy = n.y - pointer.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 26000 && d2 > 0.01) {
          const d = Math.sqrt(d2);
          const push = ((1 - d / 161) * 0.9) / d;
          n.x += dx * push;
          n.y += dy * push;
        }
      }

      drawGrid();
      drawLinks();
      drawNodes(time);

      if (running) raf = requestAnimationFrame(step);
    }

    function renderStatic() {
      ctx!.clearRect(0, 0, width, height);
      drawGrid();
      drawLinks();
      drawNodes(0);
    }

    function start() {
      if (running || effectiveReducedMotion) return;
      running = true;
      raf = requestAnimationFrame(step);
    }
    function stop() {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    }

    function syncRunning() {
      if (visible && inViewport && !effectiveReducedMotion) start();
      else stop();
    }

    build();
    if (effectiveReducedMotion) {
      renderStatic();
    }

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas!.getBoundingClientRect();
      pointer.tx = e.clientX - rect.left;
      pointer.ty = e.clientY - rect.top;
    };
    const onPointerLeave = () => {
      pointer.tx = -9999;
      pointer.ty = -9999;
    };
    const onVisibility = () => {
      visible = document.visibilityState === "visible";
      syncRunning();
    };

    const io = new IntersectionObserver(
      (entries) => {
        inViewport = entries[0]?.isIntersecting ?? true;
        syncRunning();
      },
      { rootMargin: "120px" }
    );
    io.observe(parent);

    const ro = new ResizeObserver(() => {
      build();
      if (effectiveReducedMotion) renderStatic();
    });
    ro.observe(parent);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    syncRunning();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [effectiveReducedMotion, lowPower, maxDpr, intensity, grid]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
