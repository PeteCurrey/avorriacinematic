import type { CaseStudyTheme } from "@/types/case-study";

/**
 * Maps a CaseStudyTheme into bounded CSS variables.
 * Preserves accessibility defaults if project theme properties are omitted.
 */
export function generateThemeStyles(theme?: Partial<CaseStudyTheme>): React.CSSProperties {
  if (!theme) return {};

  return {
    "--cs-bg": theme.background || "#080808",
    "--cs-fg": theme.foreground || "#F3F3F0",
    "--cs-muted": theme.muted || "#888884",
    "--cs-quiet": theme.quiet || "#555552",
    "--cs-accent": theme.accent || "#C8F135",
    "--cs-surface": theme.surface || "#111111",
    "--cs-surface-subtle": theme.surfaceSubtle || "#161616",
    "--cs-border": theme.mediaBorder || "rgba(255, 255, 255, 0.08)",
    "--cs-signal": theme.signalColour || "#C8F135",
  } as React.CSSProperties;
}

export const DEFAULT_AVORRIA_THEME: CaseStudyTheme = {
  background: "#080808",
  foreground: "#F3F3F0",
  muted: "#888884",
  quiet: "#555552",
  accent: "#C8F135",
  surface: "#111111",
  surfaceSubtle: "#161616",
  mediaBorder: "rgba(255, 255, 255, 0.08)",
  signalColour: "#C8F135",
  headerMode: "NORMAL"
};
