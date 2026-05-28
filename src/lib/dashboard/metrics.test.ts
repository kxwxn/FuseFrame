import { describe, expect, it } from "vitest";

import { aggregateRevenueBySource, formatCurrencyFromCents } from "@/lib/dashboard/metrics";

describe("aggregateRevenueBySource", () => {
  it("groups revenue and payment counts by source", () => {
    const result = aggregateRevenueBySource([
      { source: "x", amount: 9900, currency: "usd" },
      { source: "direct", amount: 4900, currency: "usd" },
      { source: "x", amount: 19900, currency: "usd" },
    ]);

    expect(result).toEqual([
      { source: "x", revenue: 29800, payments: 2 },
      { source: "direct", revenue: 4900, payments: 1 },
    ]);
  });
});

describe("formatCurrencyFromCents", () => {
  it("formats cents as currency", () => {
    expect(formatCurrencyFromCents(9900)).toBe("$99.00");
  });
});
