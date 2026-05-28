"use client";

import { useState } from "react";

function readError(data: unknown): string {
  if (typeof data === "object" && data !== null && "error" in data && typeof data.error === "string") {
    return data.error;
  }

  return "Checkout failed.";
}

export function CheckoutButton({ planId }: { planId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function startCheckout() {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ planId }),
    });

    const data: unknown = await response.json();

    if (!response.ok) {
      setError(readError(data));
      setIsLoading(false);
      return;
    }

    if (typeof data === "object" && data !== null && "url" in data && typeof data.url === "string") {
      window.location.assign(data.url);
      return;
    }

    setError("Checkout did not return a redirect URL.");
    setIsLoading(false);
  }

  return (
    <div className="space-y-2">
      <button className="primary-button w-full" disabled={isLoading} onClick={startCheckout} type="button">
        {isLoading ? "Opening checkout..." : "Start checkout"}
      </button>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
