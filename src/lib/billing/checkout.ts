import { pricingPlans, type PricingPlan } from "@/config/pricing";
import { siteConfig } from "@/config/site";
import { getPublicEnv } from "@/config/env";
import { getStripe } from "@/lib/billing/stripe";
import { createSupabaseAdminClient } from "@/lib/db/supabase";

export function findPlan(planId: string): PricingPlan | null {
  return pricingPlans.find((plan) => plan.id === planId) ?? null;
}

export async function createCheckoutSession(input: {
  planId: string;
  userId: string;
  email: string;
  anonymousId: string | null;
}) {
  const plan = findPlan(input.planId);

  if (!plan) {
    throw new Error(`Unknown pricing plan: ${input.planId}`);
  }

  const env = getPublicEnv();
  const priceId = env[plan.stripePriceEnvKey];
  const stripe = getStripe();
  const supabase = createSupabaseAdminClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("stripe_customer_id")
    .eq("id", input.userId)
    .maybeSingle();

  const session = await stripe.checkout.sessions.create({
    mode: plan.interval === "monthly" ? "subscription" : "payment",
    customer: profile?.stripe_customer_id ?? undefined,
    customer_email: profile?.stripe_customer_id ? undefined : input.email,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${siteConfig.url}/dashboard?checkout=success`,
    cancel_url: `${siteConfig.url}/pricing?checkout=cancelled`,
    metadata: {
      planId: plan.id,
      userId: input.userId,
      anonymousId: input.anonymousId ?? "",
    },
  });

  return session;
}
