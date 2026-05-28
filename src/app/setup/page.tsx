import { Header } from "@/components/layout/Header";
import { SetupRequired } from "@/components/setup/SetupRequired";
import { getServerEnvStatus } from "@/config/env";

export default function SetupPage() {
  const status = getServerEnvStatus();

  return (
    <main className="min-h-screen bg-slate-50">
      <Header />
      <SetupRequired
        description="Copy .env.example to .env.local, add Supabase and Stripe credentials, then restart the dev server."
        missing={status.missing}
        title={status.configured ? "FuseFrame is configured." : "Connect Supabase and Stripe to unlock app routes."}
      />
    </main>
  );
}
