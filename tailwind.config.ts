import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "#FAFAF9",
          elevated: "#F5F5F4",
          border: "#E7E5E4",
        },
        ink: {
          DEFAULT: "#0A0A0A",
          muted: "#57534E",
          subtle: "#78716C",
        },
        trust: {
          DEFAULT: "#0F172A",
          light: "#1E293B",
          mute: "#334155",
        },
        accent: {
          DEFAULT: "#9A7C4E",
          light: "#B69664",
          mute: "#F2E8D7",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "var(--font-mono)",
          "ui-monospace",
          "monospace",
        ],
      },
      fontSize: {
        "display": ["clamp(2.5rem, 6vw, 4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "headline": ["clamp(1.5rem, 3vw, 2.25rem)", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
        "title": ["1.25rem", { lineHeight: "1.3" }],
        "body": ["1rem", { lineHeight: "1.6" }],
        "caption": ["0.875rem", { lineHeight: "1.5" }],
        "label": ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.05em" }],
        "micro": ["0.6875rem", { lineHeight: "1.45" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
      },
      maxWidth: {
        "prose": "65ch",
        "narrow": "45ch",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      backgroundImage: {
        "gradient-bounded": "radial-gradient(ellipse 80% 60% at 50% 40%, var(--tw-gradient-from), transparent 60%)",
      },
    },
  },
  plugins: [],
};

export default config;
