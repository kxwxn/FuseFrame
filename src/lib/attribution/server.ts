import type { AttributionPayload } from "@/lib/attribution/types";
import { parseAttribution } from "@/lib/attribution/source";
import { createSupabaseAdminClient } from "@/lib/db/supabase";

export async function recordAttributionEvent(payload: AttributionPayload): Promise<void> {
  const attribution = parseAttribution(payload);
  const supabase = createSupabaseAdminClient();

  const { error } = await supabase.from("attribution_events").insert({
    anonymous_id: payload.anonymousId,
    event_type: payload.eventType,
    user_id: payload.userId ?? null,
    stripe_customer_id: payload.stripeCustomerId ?? null,
    source: attribution.source,
    utm_source: attribution.utm_source,
    utm_medium: attribution.utm_medium,
    utm_campaign: attribution.utm_campaign,
    utm_content: attribution.utm_content,
    referrer: attribution.referrer,
    landing_page: attribution.landing_page,
  });

  if (error) {
    throw new Error(`Failed to record attribution event: ${error.message}`);
  }
}

export async function findSourceForUser(input: {
  userId?: string | null;
  stripeCustomerId?: string | null;
  anonymousId?: string | null;
}): Promise<string> {
  const supabase = createSupabaseAdminClient();

  if (input.userId) {
    const { data } = await supabase
      .from("attribution_events")
      .select("source")
      .eq("user_id", input.userId)
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();

    if (data?.source) {
      return data.source;
    }
  }

  if (input.stripeCustomerId) {
    const { data } = await supabase
      .from("attribution_events")
      .select("source")
      .eq("stripe_customer_id", input.stripeCustomerId)
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();

    if (data?.source) {
      return data.source;
    }
  }

  if (input.anonymousId) {
    const { data } = await supabase
      .from("attribution_events")
      .select("source")
      .eq("anonymous_id", input.anonymousId)
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();

    if (data?.source) {
      return data.source;
    }
  }

  return "direct";
}
