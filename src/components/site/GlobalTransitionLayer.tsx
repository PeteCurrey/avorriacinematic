"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function GlobalTransitionLayer() {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 280);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div
      id="global-transition-layer"
      className={`fixed inset-0 pointer-events-none z-[80] bg-avorria-black transition-opacity duration-280 ease-out ${
        isTransitioning ? "opacity-30" : "opacity-0"
      }`}
      aria-hidden="true"
    />
  );
}
