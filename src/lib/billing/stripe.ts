import Stripe from "stripe";

import { getServerEnv } from "@/config/env";

let stripeClient: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripeClient) {
    const env = getServerEnv();
    stripeClient = new Stripe(env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-08-27.basil",
      typescript: true,
    });
  }

  return stripeClient;
}

export function getStripeWebhookSecret(): string {
  return getServerEnv().STRIPE_WEBHOOK_SECRET;
}
