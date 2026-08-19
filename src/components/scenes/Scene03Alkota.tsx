"use client";
import React from "react";
import Image from "next/image";
import { AlkotaMaterialStage } from "./alkota/AlkotaMaterialStage";
import { AlkotaProductStage } from "./alkota/AlkotaProductStage";
import { AlkotaDigitalStage } from "./alkota/AlkotaDigitalStage";
import { AlkotaContributionStage } from "./alkota/AlkotaContributionStage";
import { AlkotaFallback } from "./alkota/AlkotaFallback";
import { CinematicSceneViewport } from "./CinematicSceneViewport";
import { getSceneConfig } from "./registry";

export function Scene03Alkota() {
  const config = getSceneConfig("scene-03-alkota")!;

  return (
    <CinematicSceneViewport
      config={config}
      sceneIndex={3}
      fallback={<AlkotaFallback />}
    >
      {(scrollProgress) => {
        // Continuous Handoff Layer from Scene 02 (0.00 to 0.12)
        const handoffOpacity = scrollProgress < 0.08 ? 1.0 : Math.max(0, 1.0 - (scrollProgress - 0.08) / 0.06);

        return (
          <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
            {/* Semantic Accessibility Heading */}
            <h2 className="sr-only">Alkota Bikes — Product, Brand and Digital Engineering by Avorria</h2>

            {/* Chapter 0: Continuous Handoff from Scene 02 */}
            {handoffOpacity > 0 && (
              <div
                className="absolute inset-0 w-full h-full z-0 pointer-events-none"
                style={{ opacity: handoffOpacity }}
                aria-hidden="true"
              >
                <Image
                  src="/media/projects/alkota/product/naked-carbon-hero.jpg"
                  alt="Alkota Naked Carbon Master Entry"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            )}

            {/* Chapter A & B: Material Macro & Engineering Kinematics */}
            <AlkotaMaterialStage progress={scrollProgress} />

            {/* Chapter C: The Object / Product Hero */}
            <AlkotaProductStage progress={scrollProgress} />

            {/* Chapter D: Physical to Digital Transformation */}
            <AlkotaDigitalStage progress={scrollProgress} />

            {/* Chapter E: Avorria Contribution & Case Study Link */}
            <AlkotaContributionStage progress={scrollProgress} />

            {/* Bottom Handoff Anchor for Scene 04 (Active during 0.94 - 1.00) */}
            {scrollProgress >= 0.94 && (
              <div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 font-mono text-[11px] text-avorria-quiet uppercase tracking-widest z-30 transition-opacity duration-300"
                aria-hidden="true"
              >
                <span>PHILOSOPHY // 04</span>
              </div>
            )}
          </div>
        );
      }}
    </CinematicSceneViewport>
  );
}
