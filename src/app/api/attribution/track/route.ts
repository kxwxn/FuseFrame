import { NextResponse } from "next/server";
import { z } from "zod";

import { recordAttributionEvent } from "@/lib/attribution/server";

const trackSchema = z.object({
  anonymousId: z.string().min(1),
  eventType: z.enum(["visit", "signup", "payment"]).default("visit"),
  userId: z.string().nullable().optional(),
  stripeCustomerId: z.string().nullable().optional(),
  url: z.string().nullable().optional(),
  referrer: z.string().nullable().optional(),
  utm_source: z.string().nullable().optional(),
  utm_medium: z.string().nullable().optional(),
  utm_campaign: z.string().nullable().optional(),
  utm_content: z.string().nullable().optional(),
});

export async function POST(request: Request) {
  const json: unknown = await request.json();
  const parsed = trackSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid attribution payload",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  try {
    await recordAttributionEvent(parsed.data);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to record attribution",
      },
      { status: 500 },
    );
  }
}
