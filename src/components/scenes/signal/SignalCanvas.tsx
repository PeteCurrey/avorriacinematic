"use client";
import React, { useEffect, useRef } from "react";
import { SignalSpatialWorld } from "./SignalSpatialWorld";
import { useReducedMotion } from "@/providers/ReducedMotionProvider";
import { useWebGLCapabilities } from "@/providers/WebGLCapabilityProvider";

interface SignalCanvasProps {
  progress: number;
  onActiveProjectChange?: (index: number) => void;
}

export function SignalCanvas({ progress, onActiveProjectChange }: SignalCanvasProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const worldRef = useRef<SignalSpatialWorld | null>(null);
  const { effectiveReducedMotion } = useReducedMotion();
  const { capabilities, forceDisabled } = useWebGLCapabilities();

  useEffect(() => {
    if (effectiveReducedMotion || forceDisabled || !containerRef.current) return;

    const world = new SignalSpatialWorld(containerRef.current, capabilities.maxDpr);
    worldRef.current = world;

    const onPointerMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      world.setPointer(normX, normY);
    };

    const onResize = () => {
      if (containerRef.current) {
        world.resize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      }
    };

    window.addEventListener("mousemove", onPointerMove, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("resize", onResize);
      world.dispose();
      worldRef.current = null;
    };
  }, [effectiveReducedMotion, forceDisabled, capabilities.maxDpr]);

  useEffect(() => {
    if (worldRef.current) {
      worldRef.current.setProgress(progress);
    }

    if (onActiveProjectChange) {
      if (progress < 0.28) onActiveProjectChange(0);
      else if (progress < 0.46) onActiveProjectChange(1);
      else if (progress < 0.64) onActiveProjectChange(2);
      else if (progress < 0.80) onActiveProjectChange(3);
      else onActiveProjectChange(4);
    }
  }, [progress, onActiveProjectChange]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
