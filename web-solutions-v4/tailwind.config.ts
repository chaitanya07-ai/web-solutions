import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#FCFCFA",
        mist: "#F4F3EE",
        ink: {
          DEFAULT: "#0E0D0B",
          soft: "#3D3A33",
          faint: "#7A766B",
        },
        line: "#E7E4DB",
        gold: {
          DEFAULT: "#D4AF37",
          deep: "#A8862B",
          tint: "#F7F1DE",
        },
      },
      fontFamily: {
        sans: ["'Manrope Variable'", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["'Fraunces Variable'", "ui-serif", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(14,13,11,0.04), 0 24px 60px -24px rgba(14,13,11,0.14)",
        lift: "0 2px 4px rgba(14,13,11,0.05), 0 32px 80px -24px rgba(14,13,11,0.22)",
        glass: "inset 0 1px 0 rgba(255,255,255,0.6), 0 16px 48px -16px rgba(14,13,11,0.18)",
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.45", transform: "scale(0.8)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.3s cubic-bezier(0.22,1,0.36,1)",
        "accordion-up": "accordion-up 0.3s cubic-bezier(0.22,1,0.36,1)",
        marquee: "marquee 32s linear infinite",
        pulseDot: "pulseDot 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
