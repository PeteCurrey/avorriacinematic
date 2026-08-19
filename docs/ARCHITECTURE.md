# Avorria V2 — Technical Architecture & Scene Framework

## 1. Overview
Avorria V2 is an international digital design, engineering, search architecture and AI systems studio platform.
Engineered using Next.js App Router (React 19, TypeScript strict mode), GSAP motion engine, WebGL lazy loading capability, and a tokenized design system.

---

## 2. Homepage Scene Framework

The homepage is composed of 19 typed scenes registered in `src/components/scenes/registry.ts`:

```typescript
export const HOMEPAGE_SCENES: SceneConfig[] = [
  { id: "scene-00-void", index: 0, label: "VOID", ... },
  { id: "scene-01-precision", index: 1, label: "PRECISION AS POWER", ... },
  { id: "scene-02-signal", index: 2, label: "PROJECT SIGNAL", ... },
  // ... through scene-18-finale
];
```

### Adding or Registering a New Scene
1. Add the scene definition and configuration to `src/components/scenes/registry.ts`.
2. Ensure the `SceneId` union type in `src/types/scene.ts` contains the permanent scene ID.
3. Implement the scene component in `src/components/scenes/SceneXXName.tsx` using `<CinematicScene config={config}>`.
4. Import and mount the scene in `src/app/page.tsx`.

---

## 3. Motion & Scrolltrigger Rules

1. **Context Lifecycle**: Every GSAP timeline and ScrollTrigger must be encapsulated using `useGsapContext()` from `@/lib/motion/hooks`. This ensures full revert and cleanup upon unmount or route change.
2. **Progressive Smooth Scroll**: Smooth scrolling is provided via Lenis and synced to `ScrollTrigger.update`. It is automatically disabled when `prefers-reduced-motion: reduce` is detected.
3. **No Mixed Engines**: GSAP is the dedicated animation engine for choreographed sequences. CSS transitions are reserved for micro UI states (hover, focus).

---

## 4. WebGL / 3D Scene Architecture

1. **Selective Lazy Loading**: WebGL canvases are wrapped with `<WebGLSceneContainer sceneId="...">`.
2. **Viewport Proximity**: 3D canvases are only mounted when within viewport range (via `IntersectionObserver`) and unmounted when scrolling far away to conserve GPU resources.
3. **Capability Detection**: `WebGLCapabilityProvider` assesses GPU support, max texture size, hardware concurrency, and caps device pixel ratio (DPR <= 1.5 on low power / mobile, <= 2.0 on desktop).
4. **Graceful Fallbacks**: If WebGL is unavailable, fails via `<SceneErrorBoundary>`, or reduced motion is active, a structured DOM/poster fallback renders seamlessly.

---

## 5. Media & Video Architecture

1. **Media Schema**: Strict typing for images, video, and posters defined in `src/types/media.ts`.
2. **Cinematic Video**: `<CinematicVideo>` auto-pauses when offscreen and swaps to a static poster when reduced motion is preferred.
3. **Directory Convention**: `public/media/projects/[project-slug]/[category]/` (where category is `hero`, `film`, `macro`, `interface`, `mobile`, `still`, `texture`, `3d`, `poster`).

---

## 6. Accessibility & Reduced Motion

1. **Central Preference Context**: `ReducedMotionProvider` listens to `(prefers-reduced-motion: reduce)` media queries and provides overrides for testing.
2. **Keyboard Navigation & Landmarks**: All pages maintain strict semantic HTML (`<h1>`, `<main id="main-content">`, `<header>`, `<footer>`, `<nav>`), visible focus rings, and skip-to-content links.
3. **DOM Truth**: DOM elements are the authoritative semantic content. Visual canvases never hide core text from assistive technologies.

---

## 7. Developer Tooling: Dev Scene Lab

Visit `/dev/scenes` in non-production environments to isolate and preview any of the 19 scenes across mobile, tablet, and desktop viewports, with toggles for debug grids, reduced motion simulation, and WebGL toggling.
