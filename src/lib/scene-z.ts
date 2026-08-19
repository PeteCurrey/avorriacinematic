/**
 * AVORRIA — SEMANTIC SCENE Z-INDEX CONSTANTS
 *
 * Every scene layer must use these constants.
 * No arbitrary Tailwind z-10/z-20/z-30 on scene layers.
 * Values mirror the CSS custom properties defined in tokens.css.
 */

export const Z = {
  /** Full-screen background media layers (images, video) */
  background: 0,

  /** Primary media content (project images, interface captures) */
  media: 10,

  /** Editorial copy — headlines, body, metadata above media */
  copy: 20,

  /** Instrumentation — scene markers, chapter labels, progress indicators */
  instrumentation: 30,

  /** Temporary overlay — transition layers, scan lines, handoff layers */
  overlay: 40,
} as const;

export type ZKey = keyof typeof Z;
