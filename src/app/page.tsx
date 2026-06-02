import Link from "next/link";

import { Header } from "@/components/layout/Header";
import { BlockCanvas } from "@/components/landing/BlockCanvas";
import { BlockCard, type LandingBlock } from "@/components/landing/BlockCard";
import { TerminalPanel } from "@/components/landing/TerminalPanel";
import { AttributionCapture } from "@/lib/attribution/client";
import { pricingPlans } from "@/config/pricing";
import { siteConfig } from "@/config/site";

const blocks: LandingBlock[] = [
  {
    name: "Auth Block",
    version: "v1.3.2",
    description: "Supabase auth, protected routes, sessions, and profile creation.",
    tags: ["Next.js", "Supabase", "TS"],
    icon: "A",
    tone: "teal",
  },
  {
    name: "Stripe Block",
    version: "v1.4.1",
    description: "Checkout sessions, pricing config, customers, and plan metadata.",
    tags: ["Stripe", "API", "TS"],
    icon: "$",
    tone: "blue",
  },
  {
    name: "Webhook Block",
    version: "v1.2.0",
    description: "Signature checks, duplicate event guards, and revenue writes.",
    tags: ["Events", "Retries", "TS"],
    icon: "W",
    tone: "violet",
  },
  {
    name: "Dashboard Block",
    version: "v1.3.0",
    description: "User workspace and admin views for revenue and signups.",
    tags: ["Metrics", "Tables", "TS"],
    icon: "D",
    tone: "teal",
  },
  {
    name: "Attribution Block",
    version: "v1.1.0",
    description: "UTM capture, first-touch source, and revenue by channel.",
    tags: ["UTM", "Revenue", "TS"],
    icon: "N",
    tone: "blue",
  },
];

export default function HomePage() {
  return (
    <>
      <AttributionCapture />
      <main>
        <section className="min-h-screen bg-white">
          <Header />
          <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 pb-12 pt-16 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:pt-20">
            <div>
              <h1 className="max-w-xl font-mono text-5xl font-black leading-[1.13] tracking-normal text-ink sm:text-6xl lg:text-7xl">
                The AI-ready frame for shipping SaaS faster.
              </h1>
              <p className="mt-8 max-w-lg text-lg leading-8 text-muted">{siteConfig.description}</p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link className="primary-button" href="/checklist">
                  Get the checklist -&gt;
                </Link>
                <Link className="secondary-button" href="#pricing">
                  View early access -&gt;
                </Link>
              </div>
              <div className="mt-12">
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">Fused for</p>
                <div className="mt-5 flex flex-wrap gap-5 font-mono text-base font-bold text-ink">
                  {siteConfig.agentTools.map((tool) => (
                    <span className="border-r border-line pr-5 last:border-r-0" key={tool}>
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-10 max-w-xl">
                <TerminalPanel />
              </div>
            </div>
            <BlockCanvas />
          </div>
        </section>

        <section className="border-t border-line bg-slate-50 px-6 py-16 lg:px-8" id="blocks">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="font-mono text-sm font-bold uppercase tracking-normal text-cobalt">Fused blocks</p>
                <h2 className="mt-3 max-w-2xl font-mono text-3xl font-black leading-tight text-ink md:text-4xl">
                  A stable SaaS frame your AI agent can extend.
                </h2>
              </div>
              <Link className="font-mono text-sm font-bold text-cobalt" href="/docs">
                View all blocks -&gt;
              </Link>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              {blocks.map((block) => (
                <BlockCard block={block} key={block.name} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-6 py-20 lg:px-8" id="pricing">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <h2 className="font-mono text-3xl font-black text-ink md:text-4xl">Early access pricing</h2>
              <p className="mt-4 text-lg leading-8 text-muted">
                Buy the frame once, use it to launch your first revenue-ready SaaS, and keep v1 updates.
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {pricingPlans.map((plan) => (
                <article className="rounded-lg border border-line bg-white p-6 shadow-sm" key={plan.id}>
                  <h3 className="font-mono text-xl font-black text-ink">{plan.name}</h3>
                  <p className="mt-2 min-h-12 text-sm leading-6 text-muted">{plan.description}</p>
                  <p className="mt-6 font-mono text-4xl font-black text-ink">{plan.price}</p>
                  <ul className="mt-6 space-y-3 text-sm leading-6 text-muted">
                    {plan.features.map((feature) => (
                      <li className="flex gap-3" key={feature}>
                        <span className="font-mono text-cyan">+</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link className="primary-button mt-8 w-full" href="/login">
                    Start with {plan.name}
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
