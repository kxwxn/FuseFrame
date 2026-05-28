"use server";

import { redirect } from "next/navigation";

import { siteConfig } from "@/config/site";
import { createSupabaseServerClient } from "@/lib/db/supabase";

export type LoginActionState = {
  message: string;
  status: "idle" | "error" | "success";
};

export async function signInWithMagicLink(
  _previousState: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();

  if (!email || !email.includes("@")) {
    return {
      message: "Enter a valid email address.",
      status: "error",
    };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${siteConfig.url}/dashboard`,
    },
  });

  if (error) {
    return {
      message: error.message,
      status: "error",
    };
  }

  return {
    message: "Check your email for a SourceLaunch magic link.",
    status: "success",
  };
}

export async function signOut(): Promise<void> {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/");
}
