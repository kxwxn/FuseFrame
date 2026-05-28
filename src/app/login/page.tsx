import Link from "next/link";

import { Header } from "@/components/layout/Header";
import { LoginForm } from "@/components/login/LoginForm";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Header />
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-[1fr_420px] lg:px-8">
        <div>
          <Link className="font-mono text-sm font-bold text-cobalt" href="/">
            &lt;- Back to home
          </Link>
          <h1 className="mt-10 max-w-2xl font-mono text-5xl font-black leading-tight text-ink">
            Sign in to wire your SaaS frame.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
            Magic links keep the starter simple and let your AI agent build on top of one predictable auth flow.
          </p>
        </div>
        <LoginForm />
      </section>
    </main>
  );
}
