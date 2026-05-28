# Revenue-Ready SaaS Launch Kit Design

## Summary

Build a global-first SaaS starter kit for indie founders and solo SaaS builders. The product helps users launch a paid SaaS quickly and includes lightweight revenue attribution from day one.

Positioning:

> Launch your SaaS and know where your revenue comes from.

The first product is a downloadable code starter kit, not a hosted SaaS. It combines the core value of a SaaS boilerplate with a small built-in analytics layer. Later, the analytics layer can become a hosted subscription product.

## Target Customer

Primary target:

- English-speaking indie founders and solo SaaS builders.
- Developers who want to launch a Stripe-powered SaaS quickly.
- Builders using AI coding tools such as Cursor, Codex, or Claude Code.

Secondary future target:

- Agencies and freelancers who repeatedly build paid SaaS products for clients.
- Korean founders who need Toss Payments or PortOne support.

## Product Scope

### MVP Includes

- Next.js app using TypeScript.
- Authentication.
- Stripe Checkout.
- Stripe webhook handling.
- Landing page.
- Pricing page.
- Protected user dashboard.
- Minimal admin dashboard.
- UTM and referrer capture.
- Signup attribution.
- Payment attribution.
- Revenue by source table.
- Vercel deployment guide.
- AI-coding-agent rules and project prompts.

### MVP Excludes

- Hosted analytics SaaS.
- TrustMRR-style revenue verification.
- Startup marketplace.
- Founder profile pages.
- Community or challenge product.
- Toss Payments and PortOne.
- Multiple payment providers.
- Advanced funnel analytics.
- Multi-tenant agency features.
- Full CMS or blog engine.

## Architecture

The MVP is a single Next.js codebase with clear modules:

- `app`: routes, layouts, public pages, dashboard pages, and API route handlers.
- `components`: reusable UI components.
- `lib/auth`: authentication helpers.
- `lib/billing`: Stripe checkout and webhook logic.
- `lib/attribution`: UTM/referrer capture and source resolution.
- `lib/db`: database client and typed query helpers.
- `lib/email`: transactional email placeholder integration.
- `docs`: setup, deployment, and customization guides.

The starter should be easy to clone, configure, and modify. The code should prioritize clarity over excessive abstraction.

## Data Model

Core entities:

- `users`: authenticated users.
- `subscriptions`: Stripe subscription or checkout state.
- `attribution_events`: page visits, signups, and payments with source metadata.
- `revenue_events`: successful payment events from Stripe webhooks.

Attribution fields:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `referrer`
- `landing_page`
- `anonymous_id`
- `user_id`
- `stripe_customer_id`

The MVP only needs first-touch attribution. Multi-touch attribution is future scope.

## User Flow

1. A visitor lands on the public site with UTM parameters or a referrer.
2. The app stores attribution data in a first-party cookie or local storage.
3. The visitor signs up.
4. The signup is linked to the stored attribution source.
5. The user purchases through Stripe Checkout.
6. Stripe sends a webhook to the app.
7. The payment is linked back to the user and original source.
8. The admin dashboard shows signups, payments, and revenue grouped by source.

## Dashboard

The MVP admin dashboard should show:

- Total signups.
- Total paid users.
- Total revenue.
- Revenue by source.
- Signups by source.
- Recent payment events.

The dashboard should be useful but intentionally simple. It should answer one question:

> Which channels are creating users and revenue?

## Pricing Strategy

Initial product:

- Early access: $49 to $99.
- Full launch: $149 to $249.
- Pro or Agency license: $499 to $999.

Future products:

- Hosted analytics: $9 to $29 per month.
- Verified revenue page: paid profile or listing model.
- Marketplace: transaction or listing fees.

## Marketing Strategy

The first launch should be global-first:

- English landing page.
- USD pricing.
- Stripe or Lemon Squeezy checkout.
- Build in public on X, Reddit, Indie Hackers, Hacker News, and Product Hunt.

Messaging should avoid generic boilerplate language. The product should be framed as revenue-ready:

- "Build your SaaS and track revenue sources from day one."
- "Auth, payments, dashboard, and revenue attribution in one starter."
- "Made for indie founders shipping with AI coding tools."

Korea support is future differentiation:

- Toss Payments add-on.
- PortOne add-on.
- Korean docs.
- Korean legal templates.

## Error Handling

The starter should include simple, explicit handling for:

- Missing environment variables.
- Failed Stripe Checkout session creation.
- Invalid Stripe webhook signatures.
- Duplicate webhook delivery.
- Missing attribution data.
- Unauthenticated dashboard access.

Webhook handlers must be idempotent so repeated Stripe events do not duplicate revenue.

## Testing Strategy

The MVP should include focused tests for:

- Attribution source parsing.
- First-touch attribution persistence.
- Stripe webhook idempotency.
- Revenue aggregation by source.
- Protected route behavior.

Manual verification should cover:

- Visitor with UTM signs up and pays.
- Visitor without UTM uses referrer/direct source fallback.
- Admin dashboard displays revenue by source.
- Missing environment variables fail with clear instructions.

## Future Expansion

Phase 2:

- Hosted analytics product.
- Multiple payment providers such as Lemon Squeezy, Polar, and Paddle.
- More advanced event tracking.
- Weekly revenue report email.

Phase 3:

- Verified revenue profile.
- Public founder/product pages.
- Revenue verification badge.
- Startup-for-sale listings.

Phase 4:

- Korea payment add-ons for Toss Payments and PortOne.
- Korean documentation and legal templates.

## Implementation Defaults

The MVP will use these defaults unless a later implementation constraint forces a change:

- Product name: FuseFrame.
- Database: Supabase Postgres.
- Auth provider: Supabase Auth.
- Payment processor inside the starter: Stripe Checkout.
- Payment processor for selling the starter itself: Lemon Squeezy, because it is better suited to global digital-product sales and tax handling.
- Deployment target: Vercel.
- First public launch language: English.
