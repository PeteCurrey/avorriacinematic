"use client";
import React, { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import { SignalSpatialWorld } from "./SignalSpatialWorld";
import { useReducedMotion } from "@/providers/ReducedMotionProvider";
import { useWebGLCapabilities } from "@/providers/WebGLCapabilityProvider";

export interface SignalCanvasHandle {
  setProgress: (progress: number) => void;
  setPointer: (x: number, y: number) => void;
}

interface SignalCanvasProps {
  onActiveProjectChange?: (index: number) => void;
}

export const SignalCanvas = forwardRef<SignalCanvasHandle, SignalCanvasProps>(
  function SignalCanvas({ onActiveProjectChange }, ref) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const worldRef = useRef<SignalSpatialWorld | null>(null);
    const { effectiveReducedMotion } = useReducedMotion();
    const { capabilities, forceDisabled } = useWebGLCapabilities();

    useImperativeHandle(
      ref,
      () => ({
        setProgress: (progress: number) => {
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
        },
        setPointer: (x: number, y: number) => {
          if (worldRef.current) {
            worldRef.current.setPointer(x, y);
          }
        },
      }),
      [onActiveProjectChange]
    );

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

    return (
      <div
        ref={containerRef}
        className="w-full h-full absolute inset-0 pointer-events-none"
        aria-hidden="true"
      />
    );
  }
);
