import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/content/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        // Surfaces — mirrors every --avorria-* surface token in tokens.css.
        // Keep this list complete: a token used in a class name but missing
        // here compiles to nothing at all and fails silently.
        "avorria-black": "var(--avorria-black)",
        "avorria-obsidian": "var(--avorria-obsidian)",
        "avorria-graphite": "var(--avorria-graphite)",
        "avorria-surface": "var(--avorria-surface)",
        "avorria-surface-subtle": "var(--avorria-surface-subtle)",

        // Rules & hairlines
        "avorria-line": "var(--avorria-line)",
        "avorria-line-deep": "var(--avorria-line-deep)",
        "avorria-line-subtle": "var(--avorria-line-subtle)",
        "avorria-line-strong": "var(--avorria-line-strong)",

        // Typography
        "avorria-white": "var(--avorria-white)",
        "avorria-white-soft": "var(--avorria-white-soft)",
        "avorria-muted": "var(--avorria-muted)",
        "avorria-quiet": "var(--avorria-quiet)",

        // Signal
        "avorria-signal": "var(--avorria-signal)",
        "avorria-signal-muted": "var(--avorria-signal-muted)",
        "avorria-signal-glow": "var(--avorria-signal-glow)"
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"]
      },
      maxWidth: {
        grid: "var(--grid-max-width)",
        editorial: "var(--measure-editorial)"
      },
      spacing: {
        "safe-x": "var(--safe-x)",
        "safe-top": "var(--safe-top)",
        "safe-bottom": "var(--safe-bottom)",
        "header-h": "var(--header-h)"
      },
      transitionTimingFunction: {
        "avorria-out": "var(--ease-avorria-out)",
        "avorria-in-out": "var(--ease-avorria-in-out)",
        "avorria-cinematic": "var(--ease-avorria-cinematic)",
        "avorria-signal": "var(--ease-avorria-signal)"
      }
    }
  },
  plugins: []
};

export default config;
