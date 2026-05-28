import { describe, expect, it } from "vitest";

import { getPublicEnvStatus, getServerEnvStatus } from "@/config/env";

describe("env status helpers", () => {
  it("reports missing public variables without throwing", () => {
    const previousEnv: NodeJS.ProcessEnv = { ...process.env };
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    const status = getPublicEnvStatus();

    expect(status.configured).toBe(false);
    expect(status.missing).toContain("NEXT_PUBLIC_SUPABASE_URL");
    process.env = previousEnv;
  });

  it("reports missing server variables without throwing", () => {
    const previousEnv: NodeJS.ProcessEnv = { ...process.env };
    delete process.env.STRIPE_SECRET_KEY;
    delete process.env.STRIPE_WEBHOOK_SECRET;
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;

    const status = getServerEnvStatus();

    expect(status.configured).toBe(false);
    expect(status.missing).toContain("STRIPE_SECRET_KEY");
    process.env = previousEnv;
  });
});
