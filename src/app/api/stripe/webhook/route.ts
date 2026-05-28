import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { getStripe, getStripeWebhookSecret } from "@/lib/billing/stripe";
import { processStripeWebhookEvent } from "@/lib/billing/webhook";

export async function POST(request: Request) {
  const body = await request.text();
  const headerStore = await headers();
  const signature = headerStore.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing Stripe signature." }, { status: 400 });
  }

  try {
    const event = getStripe().webhooks.constructEvent(body, signature, getStripeWebhookSecret());
    const result = await processStripeWebhookEvent(event);

    return NextResponse.json({ received: true, processed: result.processed });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Invalid Stripe webhook",
      },
      { status: 400 },
    );
  }
}
