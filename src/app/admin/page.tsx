import { Header } from "@/components/layout/Header";
import { formatCurrencyFromCents } from "@/lib/dashboard/metrics";
import { getAdminMetrics } from "@/lib/dashboard/server";
import { requireAdmin } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  await requireAdmin();
  const metrics = await getAdminMetrics();

  return (
    <main className="min-h-screen bg-slate-50">
      <Header />
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div>
          <p className="font-mono text-sm font-bold uppercase text-cobalt">Admin dashboard</p>
          <h1 className="mt-3 font-mono text-4xl font-black text-ink">Revenue by source</h1>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-line bg-white p-6 shadow-sm">
            <p className="font-mono text-sm text-muted">Total revenue</p>
            <p className="mt-3 font-mono text-3xl font-black text-ink">
              {formatCurrencyFromCents(metrics.totalRevenue)}
            </p>
          </div>
          <div className="rounded-lg border border-line bg-white p-6 shadow-sm">
            <p className="font-mono text-sm text-muted">Paid users</p>
            <p className="mt-3 font-mono text-3xl font-black text-ink">{metrics.totalPaidUsers}</p>
          </div>
          <div className="rounded-lg border border-line bg-white p-6 shadow-sm">
            <p className="font-mono text-sm text-muted">Signups</p>
            <p className="mt-3 font-mono text-3xl font-black text-ink">{metrics.totalSignups}</p>
          </div>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_420px]">
          <section className="rounded-lg border border-line bg-white p-6 shadow-sm">
            <h2 className="font-mono text-xl font-black text-ink">Source performance</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead className="border-b border-line font-mono text-muted">
                  <tr>
                    <th className="py-3">Source</th>
                    <th className="py-3">Revenue</th>
                    <th className="py-3">Payments</th>
                  </tr>
                </thead>
                <tbody>
                  {metrics.revenueBySource.map((row) => (
                    <tr className="border-b border-line last:border-b-0" key={row.source}>
                      <td className="py-4 font-mono font-bold text-ink">{row.source}</td>
                      <td className="py-4 text-muted">{formatCurrencyFromCents(row.revenue)}</td>
                      <td className="py-4 text-muted">{row.payments}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <aside className="rounded-lg border border-line bg-white p-6 shadow-sm">
            <h2 className="font-mono text-xl font-black text-ink">Recent payments</h2>
            <div className="mt-5 space-y-4">
              {metrics.recentPayments.map((payment) => (
                <div className="rounded-md border border-line p-4" key={payment.id}>
                  <p className="font-mono font-bold text-ink">{formatCurrencyFromCents(payment.amount)}</p>
                  <p className="mt-1 text-sm text-muted">
                    {payment.source} / {new Date(payment.created_at).toLocaleDateString("en-US")}
                  </p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
