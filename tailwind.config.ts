import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/config/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#050608",
        muted: "#667085",
        line: "#d9dee8",
        panel: "#f8fafc",
        cyan: "#00a99d",
        cobalt: "#0b5cff",
      },
      boxShadow: {
        block: "0 16px 40px rgba(15, 23, 42, 0.08)",
        terminal: "0 24px 70px rgba(5, 6, 8, 0.28)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
