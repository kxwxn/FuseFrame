import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

import { createCheckoutSession } from "@/lib/billing/checkout";
import { getCurrentUser } from "@/lib/auth/server";

const checkoutSchema = z.object({
  planId: z.string().min(1),
});

export async function POST(request: Request) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "You must be signed in to start checkout." }, { status: 401 });
  }

  const json: unknown = await request.json();
  const parsed = checkoutSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid checkout payload" }, { status: 400 });
  }

  const cookieStore = await cookies();
  const anonymousId = cookieStore.get("source_launch_anonymous_id")?.value ?? null;

  try {
    const session = await createCheckoutSession({
      planId: parsed.data.planId,
      userId: user.id,
      email: user.email,
      anonymousId,
    });

    if (!session.url) {
      return NextResponse.json({ error: "Stripe did not return a checkout URL." }, { status: 500 });
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to create checkout session",
      },
      { status: 500 },
    );
  }
}
