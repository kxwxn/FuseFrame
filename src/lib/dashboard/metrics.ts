export type RevenueEventForAggregation = {
  source: string;
  amount: number;
  currency: string;
};

export type RevenueBySource = {
  source: string;
  revenue: number;
  payments: number;
};

export function aggregateRevenueBySource(events: RevenueEventForAggregation[]): RevenueBySource[] {
  const grouped = new Map<string, RevenueBySource>();

  for (const event of events) {
    const existing = grouped.get(event.source) ?? {
      source: event.source,
      revenue: 0,
      payments: 0,
    };

    existing.revenue += event.amount;
    existing.payments += 1;
    grouped.set(event.source, existing);
  }

  return Array.from(grouped.values()).sort((left, right) => right.revenue - left.revenue);
}

export function formatCurrencyFromCents(amount: number, currency = "usd"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}
