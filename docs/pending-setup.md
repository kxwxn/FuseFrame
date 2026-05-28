# Pending Setup

These items are intentionally deferred and must be completed before a real checkout or production launch.

## Stripe

- Create a Stripe product named `FuseFrame Early Access`.
- Create a one-time Stripe price for the product, for example `$99`.
- Add the generated `price_...` value to `NEXT_PUBLIC_STRIPE_PRICE_STARTER`.
- Create or forward a Stripe webhook endpoint for `/api/stripe/webhook`.
- Add the generated `whsec_...` value to `STRIPE_WEBHOOK_SECRET`.

## Admin

- Choose the founder/admin email address.
- Add it to `FUSE_FRAME_ADMIN_EMAILS`.

## Notes

- Supabase URL, publishable key, secret key, and Stripe test secret key are already configured locally in `.env.local`.
- `.env.local` is intentionally ignored by Git and must not be committed.
- Checkout cannot fully work until `NEXT_PUBLIC_STRIPE_PRICE_STARTER` is set.
- Stripe webhook processing cannot be verified until `STRIPE_WEBHOOK_SECRET` is set.
- `/admin` access requires `FUSE_FRAME_ADMIN_EMAILS`.
