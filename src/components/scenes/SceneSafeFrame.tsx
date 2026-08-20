import React from "react";

interface SceneSafeFrameProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * SCENE SAFE FRAME
 *
 * Guarantees primary cinematic content renders strictly within the safe content
 * zone without colliding with the global fixed header or bottom scene
 * instrumentation. Insets come from the --safe-* tokens so every scene — and
 * every absolutely-positioned scene overlay — shares one definition.
 */
export const SceneSafeFrame = React.forwardRef<HTMLDivElement, SceneSafeFrameProps>(
  function SceneSafeFrame({ children, className = "" }, ref) {
    return (
      <div
        ref={ref}
        className={`w-full h-full flex flex-col justify-between pt-[var(--safe-top)] pb-[var(--safe-bottom)] px-[var(--safe-x)] max-w-[1760px] mx-auto overflow-hidden relative ${className}`}
      >
        {children}
      </div>
    );
  }
);

/**
 * SCENE SAFE OVERLAY
 *
 * For scene layers that must stack on top of one another inside a
 * SceneSafeFrame (cross-fading chapters, alternating stages).
 *
 * `position: absolute; inset: 0` resolves against the containing block's
 * PADDING BOX, so such a layer would otherwise span edge-to-edge and cancel
 * the frame's insets entirely. This re-applies them on the layer itself.
 */
export function SceneSafeOverlay({
  children,
  className = "",
  ...rest
}: React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode }) {
  return (
    <div
      className={`absolute inset-0 w-full h-full pt-[var(--safe-top)] pb-[var(--safe-bottom)] px-[var(--safe-x)] ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
