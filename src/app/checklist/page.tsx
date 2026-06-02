import Link from "next/link";

import { Header } from "@/components/layout/Header";
import { siteConfig } from "@/config/site";

type ChecklistSection = {
  title: string;
  description: string;
  items: string[];
};

const checklistSections: ChecklistSection[] = [
  {
    title: "Auth",
    description: "The parts that usually break after the first login screen works.",
    items: [
      "Magic link or OAuth callback lands on the right route.",
      "Protected dashboard redirects unauthenticated visitors.",
      "Profile rows are created when a new user signs up.",
      "Admin-only routes do not trust client-side state.",
    ],
  },
  {
    title: "Billing",
    description: "Stripe setup that is easy to generate and easy to get subtly wrong.",
    items: [
      "Checkout sessions use server-side plan IDs and trusted user data.",
      "Price IDs live in environment variables, not hardcoded UI copy.",
      "Success and cancel URLs match local and production domains.",
      "Customer IDs are mapped back to your user profile.",
    ],
  },
  {
    title: "Webhooks",
    description: "The difference between a demo checkout and reliable revenue data.",
    items: [
      "Stripe webhook signatures are verified before processing.",
      "Duplicate webhook deliveries do not create duplicate revenue events.",
      "Webhook events are stored before or alongside downstream writes.",
      "Failed handlers return clear errors and can be retried safely.",
    ],
  },
  {
    title: "Database",
    description: "The safety layer AI agents often miss when they only see UI tasks.",
    items: [
      "Public tables have row-level security enabled.",
      "User-owned rows are scoped with ownership policies.",
      "Server-only tables are blocked from browser clients.",
      "Foreign keys and high-traffic lookup columns are indexed.",
    ],
  },
  {
    title: "Attribution",
    description: "The context founders need after the first customer pays.",
    items: [
      "UTM source and referrer are captured before signup.",
      "First-touch source is preserved through signup and checkout.",
      "Revenue events include source data for admin reporting.",
      "Direct traffic has a predictable fallback instead of null data.",
    ],
  },
  {
    title: "Launch",
    description: "The operational checks before asking strangers to try the product.",
    items: [
      "Production env vars match the local setup.",
      "Supabase redirect URLs include the production callback.",
      "Vercel build passes with typecheck and tests.",
      "A real test purchase reaches the dashboard and admin metrics.",
    ],
  },
];

export default function ChecklistPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <section className="border-t border-line px-6 py-14 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <h1 className="max-w-2xl font-mono text-4xl font-black leading-tight text-ink sm:text-5xl">
              AI SaaS Launch Checklist
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
              A practical pre-launch pass for founders building SaaS with Cursor, Codex, Claude Code, or any
              AI coding agent.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link className="primary-button" href={siteConfig.xProfile}>
                Request early access -&gt;
              </Link>
              <Link className="secondary-button" href="/">
                See FuseFrame -&gt;
              </Link>
            </div>
            <div className="mt-10 border-l-4 border-ember bg-panel p-5">
              <p className="font-mono text-sm font-bold uppercase text-ink">Why this exists</p>
              <p className="mt-3 text-sm leading-7 text-muted">
                AI agents can generate screens quickly. SaaS products still fail around auth, billing,
                webhooks, RLS, deployment, and attribution. FuseFrame turns those repeated checks into a
                reusable starter repo.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {checklistSections.map((section, sectionIndex) => (
              <article className="rounded-lg border border-line bg-white p-5 shadow-sm" key={section.title}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-xs font-bold uppercase text-cobalt">
                      {String(sectionIndex + 1).padStart(2, "0")}
                    </p>
                    <h2 className="mt-2 font-mono text-xl font-black text-ink">{section.title}</h2>
                  </div>
                  <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-ink font-mono text-sm font-black text-white">
                    {section.title.slice(0, 1)}
                  </span>
                </div>
                <p className="mt-3 min-h-12 text-sm leading-6 text-muted">{section.description}</p>
                <ul className="mt-5 space-y-3">
                  {section.items.map((item) => (
                    <li className="flex gap-3 text-sm leading-6 text-ink" key={item}>
                      <span className="mt-0.5 font-mono font-black text-cyan">+</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-ink px-6 py-14 text-white lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-mono text-2xl font-black">Want the repo behind this checklist?</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
              FuseFrame packages these checks into a Next.js, Supabase, Stripe, dashboard, webhook, and
              attribution starter built for AI coding agents.
            </p>
          </div>
          <Link
            className="inline-flex min-h-14 items-center justify-center rounded-md bg-white px-6 font-mono text-sm font-bold text-ink transition hover:bg-slate-100"
            href={siteConfig.xProfile}
          >
            DM for early access -&gt;
          </Link>
        </div>
      </section>
    </main>
  );
}
