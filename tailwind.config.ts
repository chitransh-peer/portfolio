import type { Config } from "tailwindcss";

/** Channel-only vars so `bg-signal/30` and hand-written rgb() agree. */
const channel = (name: string) => `rgb(var(${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        graphite: channel("--page-rgb"),
        surface: channel("--surface-rgb"),
        hairline: channel("--hairline-rgb"),
        paper: channel("--primary-rgb"),
        muted: channel("--muted-rgb"),
        signal: channel("--signal-rgb"),
        "on-signal": channel("--on-signal-rgb"),
        acid: channel("--acid-rgb"),
        magenta: channel("--magenta-rgb"),
        success: channel("--success-rgb"),
        progress: channel("--acid-rgb"),
        upcoming: channel("--upcoming-rgb"),
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      maxWidth: {
        content: "1180px",
      },
      borderRadius: {
        /* Cyberpunk panels read as cut metal, not soft cards. */
        card: "3px",
      },
    },
  },
  plugins: [],
};
export default config;
