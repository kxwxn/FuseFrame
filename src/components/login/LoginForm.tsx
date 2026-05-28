"use client";

import { useActionState } from "react";

import { signInWithMagicLink, type LoginActionState } from "@/lib/auth/actions";

const initialState: LoginActionState = {
  message: "",
  status: "idle",
};

export function LoginForm() {
  const [state, action, isPending] = useActionState(signInWithMagicLink, initialState);

  return (
    <form action={action} className="space-y-5 rounded-lg border border-line bg-white p-6 shadow-block">
      <div>
        <label className="block font-mono text-sm font-bold text-ink" htmlFor="email">
          Email
        </label>
        <input
          autoComplete="email"
          className="mt-2 w-full rounded-md border border-line px-4 py-3 text-base outline-none transition focus:border-cobalt focus:ring-4 focus:ring-blue-100"
          id="email"
          name="email"
          placeholder="you@example.com"
          required
          type="email"
        />
      </div>
      <button className="primary-button w-full" disabled={isPending} type="submit">
        {isPending ? "Sending link..." : "Send magic link"}
      </button>
      {state.message ? (
        <p className={state.status === "error" ? "text-sm text-red-600" : "text-sm text-cyan"}>{state.message}</p>
      ) : null}
    </form>
  );
}
