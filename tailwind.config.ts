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
        "avorria-black": "var(--avorria-black)",
        "avorria-surface": "var(--avorria-surface)",
        "avorria-surface-subtle": "var(--avorria-surface-subtle)",
        "avorria-white": "var(--avorria-white)",
        "avorria-muted": "var(--avorria-muted)",
        "avorria-line": "var(--avorria-line)",
        "avorria-signal": "var(--avorria-signal)"
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"]
      }
    }
  },
  plugins: []
};

export default config;
