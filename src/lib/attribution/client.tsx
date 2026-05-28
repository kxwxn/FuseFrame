"use client";

import { useEffect } from "react";

import type { ResolvedAttribution } from "@/lib/attribution/types";
import { parseAttribution, preserveFirstTouch } from "@/lib/attribution/source";

const ANONYMOUS_ID_KEY = "source_launch_anonymous_id";
const FIRST_TOUCH_KEY = "source_launch_first_touch";
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

function createAnonymousId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `anon_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

function writeCookie(name: string, value: string): void {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${ONE_YEAR_SECONDS}; SameSite=Lax`;
}

function readStoredAttribution(): ResolvedAttribution | null {
  const stored = window.localStorage.getItem(FIRST_TOUCH_KEY);

  if (!stored) {
    return null;
  }

  try {
    return JSON.parse(stored) as ResolvedAttribution;
  } catch {
    return null;
  }
}

export function AttributionCapture() {
  useEffect(() => {
    const anonymousId = window.localStorage.getItem(ANONYMOUS_ID_KEY) ?? createAnonymousId();
    window.localStorage.setItem(ANONYMOUS_ID_KEY, anonymousId);
    writeCookie(ANONYMOUS_ID_KEY, anonymousId);

    const next = parseAttribution({
      anonymousId,
      eventType: "visit",
      url: window.location.href,
      referrer: document.referrer,
    });
    const firstTouch = preserveFirstTouch(readStoredAttribution(), next);

    window.localStorage.setItem(FIRST_TOUCH_KEY, JSON.stringify(firstTouch));
    writeCookie(FIRST_TOUCH_KEY, JSON.stringify(firstTouch));

    void fetch("/api/attribution/track", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        anonymousId,
        eventType: "visit",
        url: firstTouch.landing_page,
        referrer: firstTouch.referrer,
        utm_source: firstTouch.utm_source,
        utm_medium: firstTouch.utm_medium,
        utm_campaign: firstTouch.utm_campaign,
        utm_content: firstTouch.utm_content,
      }),
      keepalive: true,
    });
  }, []);

  return null;
}
