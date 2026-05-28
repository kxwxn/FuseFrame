# Deploy to Vercel

## 1. Create Services

- Create a Supabase project.
- Run `supabase/schema.sql` in the SQL editor.
- Create a Stripe product and price.
- Add a Stripe webhook endpoint for `/api/stripe/webhook`.

## 2. Configure Environment

Copy `.env.example` to `.env.local` locally and add the same values to Vercel:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_STRIPE_PRICE_STARTER`
- `SOURCE_LAUNCH_ADMIN_EMAILS`

## 3. Deploy

```bash
npm install
npm run typecheck
npm run test
npm run build
```

Then import the repository in Vercel and deploy.

## 4. Verify

- Visit the production URL.
- Confirm attribution capture on a URL with `utm_source`.
- Sign in with a magic link.
- Complete a Stripe test checkout.
- Confirm `/admin` shows revenue grouped by source.
