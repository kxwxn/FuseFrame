# Billing Block

The Billing Block wires Stripe Checkout into the starter.

## Files

- `src/config/pricing.ts`: plans and Stripe price env keys.
- `src/lib/billing/checkout.ts`: Checkout Session creation.
- `src/lib/billing/stripe.ts`: Stripe client and webhook secret.
- `src/app/api/stripe/checkout/route.ts`: authenticated checkout endpoint.
- `src/app/api/stripe/webhook/route.ts`: webhook endpoint.
- `src/lib/billing/webhook.ts`: idempotent webhook processing.

## Agent Contract

When an AI agent extends billing, keep these rules:

- Add plan metadata in `src/config/pricing.ts` first.
- Use Stripe price IDs from environment variables.
- Never trust plan price or user ID from the browser without checking the signed-in user.
- Keep webhook handlers idempotent through `webhook_events`.
- Store money amounts in cents.

## Verification

1. Create a Stripe price.
2. Set `NEXT_PUBLIC_STRIPE_PRICE_STARTER`.
3. Run the app locally.
4. Sign in and click checkout from `/dashboard`.
5. Use Stripe CLI to forward webhooks to `/api/stripe/webhook`.
