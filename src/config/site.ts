export const siteConfig = {
  name: "SourceLaunch",
  tagline: "AI-native SaaS blocks for indie founders.",
  description:
    "Stop rebuilding SaaS plumbing with your AI agent. Plug in tested blocks for auth, payments, dashboards, and revenue attribution.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  nav: [
    { label: "Blocks", href: "#blocks" },
    { label: "Pricing", href: "#pricing" },
    { label: "Docs", href: "/docs" },
    { label: "Login", href: "/login" },
  ],
  agentTools: ["Cursor", "Codex", "Claude Code"],
} as const;

export type NavItem = (typeof siteConfig.nav)[number];
