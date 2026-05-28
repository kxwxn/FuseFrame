import type { AttributionPayload, ResolvedAttribution } from "@/lib/attribution/types";

type UtmKey = "utm_source" | "utm_medium" | "utm_campaign" | "utm_content";

function normalizeValue(value: string | null | undefined): string | null {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function readUrlParam(url: string | null | undefined, key: UtmKey): string | null {
  if (!url) {
    return null;
  }

  try {
    const parsed = new URL(url);
    return normalizeValue(parsed.searchParams.get(key));
  } catch {
    return null;
  }
}

function resolveReferrerHost(referrer: string | null): string | null {
  if (!referrer) {
    return null;
  }

  try {
    return new URL(referrer).hostname.replace(/^www\./, "");
  } catch {
    return referrer;
  }
}

export function parseAttribution(payload: AttributionPayload): ResolvedAttribution {
  const referrer = normalizeValue(payload.referrer);
  const landingPage = normalizeValue(payload.url);
  const explicitSource = normalizeValue(payload.utm_source) ?? readUrlParam(payload.url, "utm_source");
  const source = explicitSource ?? resolveReferrerHost(referrer) ?? "direct";

  return {
    source,
    utm_source: explicitSource,
    utm_medium: normalizeValue(payload.utm_medium) ?? readUrlParam(payload.url, "utm_medium"),
    utm_campaign: normalizeValue(payload.utm_campaign) ?? readUrlParam(payload.url, "utm_campaign"),
    utm_content: normalizeValue(payload.utm_content) ?? readUrlParam(payload.url, "utm_content"),
    referrer,
    landing_page: landingPage,
  };
}

export function preserveFirstTouch(
  existing: ResolvedAttribution | null,
  next: ResolvedAttribution,
): ResolvedAttribution {
  return existing ?? next;
}
