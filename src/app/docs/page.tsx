import Link from "next/link";

import { Header } from "@/components/layout/Header";

const docs = [
  {
    title: "Auth Block",
    description: "Supabase magic links, protected route guards, and profile creation.",
    href: "docs/blocks/auth.md",
  },
  {
    title: "Billing Block",
    description: "Stripe Checkout, pricing config, and idempotent webhook handling.",
    href: "docs/blocks/billing.md",
  },
  {
    title: "Attribution Block",
    description: "First-touch UTM/referrer capture and revenue source attribution.",
    href: "docs/blocks/attribution.md",
  },
  {
    title: "AI Agent Rules",
    description: "Rules and prompts for extending SourceLaunch one block at a time.",
    href: "docs/ai-agent-rules.md",
  },
  {
    title: "Deploy to Vercel",
    description: "Supabase, Stripe, environment variables, and deployment checks.",
    href: "docs/deploy-vercel.md",
  },
];

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Header />
      <section className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <Link className="font-mono text-sm font-bold text-cobalt" href="/">
          &lt;- Back to home
        </Link>
        <div className="mt-10 max-w-3xl">
          <h1 className="font-mono text-5xl font-black leading-tight text-ink">Block documentation</h1>
          <p className="mt-6 text-lg leading-8 text-muted">
            SourceLaunch docs are designed for humans and AI agents. Each block has a stable contract, files to
            inspect, and verification steps.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {docs.map((doc) => (
            <article className="rounded-lg border border-line bg-white p-6 shadow-sm" key={doc.title}>
              <h2 className="font-mono text-xl font-black text-ink">{doc.title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted">{doc.description}</p>
              <p className="mt-6 font-mono text-sm text-cobalt">{doc.href}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
