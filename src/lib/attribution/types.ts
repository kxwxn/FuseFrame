export type AttributionEventType = "visit" | "signup" | "payment";

export type AttributionPayload = {
  anonymousId: string;
  eventType: AttributionEventType;
  userId?: string | null;
  stripeCustomerId?: string | null;
  url?: string | null;
  referrer?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
};

export type ResolvedAttribution = {
  source: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  referrer: string | null;
  landing_page: string | null;
};
