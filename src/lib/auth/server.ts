import { redirect } from "next/navigation";

import { getAdminEmails } from "@/config/env";
import { createSupabaseServerClient } from "@/lib/db/supabase";

export type AuthUser = {
  id: string;
  email: string;
};

export async function getCurrentUser(): Promise<AuthUser | null> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
  };
}

export async function requireUser(): Promise<AuthUser> {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}

export async function requireAdmin(): Promise<AuthUser> {
  const user = await requireUser();
  const adminEmails = getAdminEmails();

  if (!adminEmails.includes(user.email.toLowerCase())) {
    redirect("/dashboard");
  }

  return user;
}
