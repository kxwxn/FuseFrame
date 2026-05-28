import { aggregateRevenueBySource } from "@/lib/dashboard/metrics";
import { createSupabaseAdminClient } from "@/lib/db/supabase";

export type AdminMetrics = {
  totalRevenue: number;
  totalPaidUsers: number;
  totalSignups: number;
  revenueBySource: ReturnType<typeof aggregateRevenueBySource>;
  recentPayments: {
    id: string;
    amount: number;
    currency: string;
    source: string;
    created_at: string;
  }[];
};

export async function getAdminMetrics(): Promise<AdminMetrics> {
  const supabase = createSupabaseAdminClient();

  const [revenueResponse, signupResponse] = await Promise.all([
    supabase
      .from("revenue_events")
      .select("id, user_id, amount, currency, source, created_at")
      .order("created_at", { ascending: false })
      .limit(25),
    supabase.from("profiles").select("id", { count: "exact", head: true }),
  ]);

  if (revenueResponse.error) {
    throw new Error(`Failed to load revenue metrics: ${revenueResponse.error.message}`);
  }

  if (signupResponse.error) {
    throw new Error(`Failed to load signup metrics: ${signupResponse.error.message}`);
  }

  const revenueEvents = revenueResponse.data ?? [];
  const revenueBySource = aggregateRevenueBySource(revenueEvents);
  const totalRevenue = revenueEvents.reduce((sum, event) => sum + event.amount, 0);

  return {
    totalRevenue,
    totalPaidUsers: new Set(revenueEvents.map((event) => event.user_id).filter(Boolean)).size,
    totalSignups: signupResponse.count ?? 0,
    revenueBySource,
    recentPayments: revenueEvents,
  };
}
