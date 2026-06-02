export const siteConfig = {
  name: "FuseFrame",
  tagline: "The AI-ready frame for shipping SaaS faster.",
  description:
    "Fuse in tested blocks for auth, payments, webhooks, dashboards, and revenue attribution so your AI agent can build the product instead of the plumbing.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  xProfile: "https://x.com/kxwxn13",
  nav: [
    { label: "Blocks", href: "/#blocks" },
    { label: "Checklist", href: "/checklist" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Docs", href: "/docs" },
    { label: "Login", href: "/login" },
  ],
  agentTools: ["Cursor", "Codex", "Claude Code"],
} as const;

export type NavItem = (typeof siteConfig.nav)[number];
