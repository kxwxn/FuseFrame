import { describe, expect, it } from "vitest";

import { shouldProcessWebhook } from "@/lib/billing/webhook";

describe("shouldProcessWebhook", () => {
  it("processes a new webhook event", () => {
    expect(shouldProcessWebhook(false)).toBe(true);
  });

  it("skips duplicate webhook events", () => {
    expect(shouldProcessWebhook(true)).toBe(false);
  });
});
