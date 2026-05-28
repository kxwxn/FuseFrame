import { cookies } from "next/headers";
import Link from "next/link";

import { CheckoutButton } from "@/components/billing/CheckoutButton";
import { Header } from "@/components/layout/Header";
import { SetupRequired } from "@/components/setup/SetupRequired";
import { getServerEnvStatus } from "@/config/env";
import { pricingPlans } from "@/config/pricing";
import { requireUser } from "@/lib/auth/server";
import { recordAttributionEvent } from "@/lib/attribution/server";
import type { ResolvedAttribution } from "@/lib/attribution/types";

export const dynamic = "force-dynamic";

function readFirstTouch(value: string | undefined): ResolvedAttribution | null {
  if (!value) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(decodeURIComponent(value));

    if (typeof parsed !== "object" || parsed === null || !("source" in parsed)) {
      return null;
    }

    const candidate = parsed as Partial<ResolvedAttribution>;

    return {
      source: typeof candidate.source === "string" ? candidate.source : "direct",
      utm_source: typeof candidate.utm_source === "string" ? candidate.utm_source : null,
      utm_medium: typeof candidate.utm_medium === "string" ? candidate.utm_medium : null,
      utm_campaign: typeof candidate.utm_campaign === "string" ? candidate.utm_campaign : null,
      utm_content: typeof candidate.utm_content === "string" ? candidate.utm_content : null,
      referrer: typeof candidate.referrer === "string" ? candidate.referrer : null,
      landing_page: typeof candidate.landing_page === "string" ? candidate.landing_page : null,
    };
  } catch {
    return null;
  }
}

export default async function DashboardPage() {
  const envStatus = getServerEnvStatus();

  if (!envStatus.configured) {
    return (
      <main className="min-h-screen bg-slate-50">
        <Header />
        <SetupRequired
          description="The dashboard depends on Supabase Auth, Supabase Postgres, and Stripe. Add the missing keys in .env.local, then restart the dev server."
          missing={envStatus.missing}
          title="Connect Supabase and Stripe before opening the dashboard."
        />
      </main>
    );
  }

  const user = await requireUser();
  const cookieStore = await cookies();
  const anonymousId = cookieStore.get("source_launch_anonymous_id")?.value;
  const firstTouch = readFirstTouch(cookieStore.get("source_launch_first_touch")?.value);

  if (anonymousId) {
    await recordAttributionEvent({
      anonymousId,
      eventType: "signup",
      userId: user.id,
      url: firstTouch?.landing_page,
      referrer: firstTouch?.referrer,
      utm_source: firstTouch?.utm_source,
      utm_medium: firstTouch?.utm_medium,
      utm_campaign: firstTouch?.utm_campaign,
      utm_content: firstTouch?.utm_content,
    });
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <Header />
      <section className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
        <div className="rounded-lg border border-line bg-white p-8 shadow-sm">
          <p className="font-mono text-sm text-muted">Signed in as {user.email}</p>
          <h1 className="mt-4 font-mono text-4xl font-black text-ink">Your SourceLaunch workspace</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
            This dashboard is the protected surface your buyers start from. Replace the starter checklist with your
            product workflow when your core feature is ready.
          </p>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_360px]">
          <section className="rounded-lg border border-line bg-white p-6 shadow-sm">
            <h2 className="font-mono text-xl font-black text-ink">Installed blocks</h2>
            <div className="mt-5 grid gap-3">
              {["Auth", "Stripe Billing", "Webhook", "Dashboard", "Revenue Attribution"].map((block) => (
                <div className="flex items-center justify-between rounded-md border border-line p-4" key={block}>
                  <span className="font-mono font-bold text-ink">{block} Block</span>
                  <span className="font-mono text-sm text-cyan">ready</span>
                </div>
              ))}
            </div>
          </section>

          <aside className="rounded-lg border border-line bg-white p-6 shadow-sm">
            <h2 className="font-mono text-xl font-black text-ink">Upgrade path</h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              Use checkout to verify Stripe, webhooks, and revenue attribution end to end.
            </p>
            <div className="mt-6">
              <CheckoutButton planId={pricingPlans[0].id} />
            </div>
            <Link className="mt-5 block font-mono text-sm font-bold text-cobalt" href="/admin">
              View admin analytics -&gt;
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}
