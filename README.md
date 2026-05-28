# SourceLaunch

AI-native SaaS blocks for indie founders building with coding agents.

SourceLaunch is a cloneable Next.js starter repo with tested blocks for auth, Stripe billing, webhook handling, dashboards, and revenue attribution.

## Blocks

- Auth Block: Supabase magic links and route guards.
- Stripe Billing Block: Checkout sessions and pricing config.
- Webhook Block: signature verification and idempotent processing.
- Attribution Block: UTM/referrer capture and first-touch revenue source.
- Dashboard Block: protected user dashboard and admin revenue by source.
- AI Agent Rules Block: prompts and conventions for extending the starter.

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Verification

```bash
npm run typecheck
npm run test
npm run build
```
