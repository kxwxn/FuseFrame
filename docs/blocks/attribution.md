# Attribution Block

The Attribution Block captures first-touch source data and links it to signups and revenue.

## Files

- `src/lib/attribution/client.tsx`: captures anonymous ID, UTM, referrer, and first-touch cookies.
- `src/lib/attribution/source.ts`: pure parsing and first-touch preservation logic.
- `src/lib/attribution/server.ts`: inserts attribution events and resolves source for revenue.
- `src/app/api/attribution/track/route.ts`: visit tracking endpoint.
- `src/lib/dashboard/metrics.ts`: revenue by source aggregation.

## Agent Contract

When an AI agent extends attribution, keep these rules:

- Preserve first-touch attribution once it is set.
- Use `utm_source` first, referrer host second, and `direct` as fallback.
- Keep anonymous IDs first-party.
- Do not add third-party tracking scripts to the starter by default.
- Keep analytics lite in v1; hosted analytics is future scope.

## Verification

1. Visit `/?utm_source=x&utm_medium=social`.
2. Confirm `fuse_frame_first_touch` exists in browser storage.
3. Sign in and complete checkout.
4. Confirm admin revenue shows source `x`.
