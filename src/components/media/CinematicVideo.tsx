"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "@/providers/ReducedMotionProvider";

interface CinematicVideoProps {
  src: string;
  poster?: string;
  alt: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
}

export function CinematicVideo({
  src,
  poster,
  alt,
  className = "",
  autoPlay = true,
  loop = true
}: CinematicVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isInView, setIsInView] = useState(false);
  const { effectiveReducedMotion } = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting && !effectiveReducedMotion && autoPlay) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [effectiveReducedMotion, autoPlay]);

  if (effectiveReducedMotion && poster) {
    return (
      <div className={`relative w-full h-full ${className}`}>
        <Image
          src={poster}
          alt={alt}
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>
    );
  }

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      muted
      playsInline
      loop={loop}
      aria-label={alt}
      className={`w-full h-full object-cover ${className}`}
    />
  );
}
