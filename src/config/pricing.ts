export type BillingInterval = "one_time" | "monthly";

export type PricingPlan = {
  id: "early" | "pro" | "agency";
  name: string;
  description: string;
  price: string;
  interval: BillingInterval;
  stripePriceEnvKey: "NEXT_PUBLIC_STRIPE_PRICE_STARTER";
  features: string[];
};

export const pricingPlans: PricingPlan[] = [
  {
    id: "early",
    name: "Early Access",
    description: "The v1 starter repo with every core SaaS block.",
    price: "$99",
    interval: "one_time",
    stripePriceEnvKey: "NEXT_PUBLIC_STRIPE_PRICE_STARTER",
    features: [
      "Auth, Stripe, webhook, dashboard, and attribution blocks",
      "AI agent rules for Cursor, Codex, and Claude Code",
      "Vercel and Supabase deployment guides",
      "Lifetime v1 updates",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    description: "For builders launching multiple experiments.",
    price: "$249",
    interval: "one_time",
    stripePriceEnvKey: "NEXT_PUBLIC_STRIPE_PRICE_STARTER",
    features: [
      "Everything in Early Access",
      "Extra launch page sections",
      "Advanced attribution examples",
      "Priority update notes",
    ],
  },
  {
    id: "agency",
    name: "Agency",
    description: "For teams reusing FuseFrame across client work.",
    price: "$799",
    interval: "one_time",
    stripePriceEnvKey: "NEXT_PUBLIC_STRIPE_PRICE_STARTER",
    features: [
      "Everything in Pro",
      "Multi-project usage rights",
      "Client handoff checklist",
      "Agency customization guide",
    ],
  },
];
