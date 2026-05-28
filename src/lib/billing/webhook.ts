import Stripe from "stripe";

import { findSourceForUser } from "@/lib/attribution/server";
import { createSupabaseAdminClient } from "@/lib/db/supabase";

export type RevenueSummary = {
  stripeEventId: string;
  stripeCustomerId: string | null;
  userId: string | null;
  amount: number;
  currency: string;
  source: string;
};

function getStringMetadata(metadata: Stripe.Metadata | null | undefined, key: string): string | null {
  const value = metadata?.[key];
  return value && value.length > 0 ? value : null;
}

export async function hasProcessedWebhook(stripeEventId: string): Promise<boolean> {
  const supabase = createSupabaseAdminClient();
  const { data } = await supabase
    .from("webhook_events")
    .select("provider_event_id")
    .eq("provider", "stripe")
    .eq("provider_event_id", stripeEventId)
    .maybeSingle();

  return Boolean(data);
}

export function shouldProcessWebhook(alreadyProcessed: boolean): boolean {
  return !alreadyProcessed;
}

export async function markWebhookProcessed(stripeEventId: string): Promise<void> {
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("webhook_events").insert({
    provider: "stripe",
    provider_event_id: stripeEventId,
  });

  if (error && error.code !== "23505") {
    throw new Error(`Failed to mark webhook processed: ${error.message}`);
  }
}

export async function createRevenueEventFromCheckoutSession(
  stripeEventId: string,
  session: Stripe.Checkout.Session,
): Promise<RevenueSummary | null> {
  const amount = session.amount_total;

  if (!amount || amount <= 0) {
    return null;
  }

  const stripeCustomerId = typeof session.customer === "string" ? session.customer : null;
  const userId = getStringMetadata(session.metadata, "userId");
  const anonymousId = getStringMetadata(session.metadata, "anonymousId");
  const source = await findSourceForUser({
    userId,
    stripeCustomerId,
    anonymousId,
  });
  const currency = session.currency ?? "usd";
  const supabase = createSupabaseAdminClient();

  const { error } = await supabase.from("revenue_events").insert({
    stripe_event_id: stripeEventId,
    stripe_customer_id: stripeCustomerId,
    user_id: userId,
    amount,
    currency,
    source,
  });

  if (error && error.code !== "23505") {
    throw new Error(`Failed to create revenue event: ${error.message}`);
  }

  return {
    stripeEventId,
    stripeCustomerId,
    userId,
    amount,
    currency,
    source,
  };
}

export async function processStripeWebhookEvent(event: Stripe.Event): Promise<{ processed: boolean }> {
  if (!shouldProcessWebhook(await hasProcessedWebhook(event.id))) {
    return { processed: false };
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    await createRevenueEventFromCheckoutSession(event.id, session);
  }

  await markWebhookProcessed(event.id);
  return { processed: true };
}
