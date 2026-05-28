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
        muted: "#596170",
        line: "#d8dee9",
        panel: "#f7f9fc",
        cyan: "#10cdbd",
        cobalt: "#2357ff",
        volt: "#b8ff2c",
        ember: "#ff5c35",
      },
      boxShadow: {
        block: "0 18px 44px rgba(5, 6, 8, 0.09)",
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
