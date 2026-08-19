"use client";

import React, { useRef } from "react";

interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "h1" | "h2" | "h3" | "p" | "span";
}

export function TextReveal({
  children,
  className = "",
  as: Component = "div"
}: TextRevealProps) {
  const maskRef = useRef<HTMLDivElement | null>(null);

  return (
    <Component className={`overflow-hidden block relative ${className}`}>
      <div ref={maskRef} className="reveal-content inline-block w-full">
        {children}
      </div>
    </Component>
  );
}
