# Auth Block

The Auth Block gives the starter one predictable authentication path: Supabase magic links.

## Files

- `src/lib/auth/server.ts`: server-side user guards.
- `src/lib/auth/actions.ts`: magic-link sign-in and sign-out actions.
- `src/app/auth/callback/route.ts`: exchanges Supabase magic-link codes for sessions.
- `src/app/login/page.tsx`: login UI.

## Agent Contract

When an AI agent extends auth, keep these rules:

- Keep protected routes behind `requireUser()`.
- Keep admin routes behind `requireAdmin()`.
- Do not read trusted user state from client storage.
- Keep session exchange in `/auth/callback`.
- Add new auth providers through Supabase before changing app route guards.

## Verification

1. Set Supabase URL and anon key in `.env.local`.
2. Start the app.
3. Visit `/login`.
4. Request a magic link.
5. Confirm the callback lands on `/dashboard`.
