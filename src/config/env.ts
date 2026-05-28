import { z } from "zod";

const publicEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  NEXT_PUBLIC_STRIPE_PRICE_STARTER: z.string().min(1),
});

const serverEnvSchema = publicEnvSchema.extend({
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  STRIPE_SECRET_KEY: z.string().min(1),
  STRIPE_WEBHOOK_SECRET: z.string().min(1),
  SOURCE_LAUNCH_ADMIN_EMAILS: z.string().default(""),
});

export type PublicEnv = z.infer<typeof publicEnvSchema>;
export type ServerEnv = z.infer<typeof serverEnvSchema>;

function formatEnvError(error: z.ZodError): string {
  return error.issues
    .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
    .join("; ");
}

export function getPublicEnv(): PublicEnv {
  const parsed = publicEnvSchema.safeParse(process.env);

  if (!parsed.success) {
    throw new Error(`Missing SourceLaunch public environment variables: ${formatEnvError(parsed.error)}`);
  }

  return parsed.data;
}

export function getServerEnv(): ServerEnv {
  const parsed = serverEnvSchema.safeParse(process.env);

  if (!parsed.success) {
    throw new Error(`Missing SourceLaunch server environment variables: ${formatEnvError(parsed.error)}`);
  }

  return parsed.data;
}

export function getAdminEmails(): string[] {
  const env = getServerEnv();

  return env.SOURCE_LAUNCH_ADMIN_EMAILS.split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}
