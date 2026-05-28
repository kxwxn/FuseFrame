# AI Agent Rules

SourceLaunch is designed for AI coding agents. Treat each block as a stable contract, not loose starter code.

## Rules

- Use TypeScript only.
- Do not create `.js` or `.jsx` React files.
- Do not use `any`; use `unknown` and narrow when needed.
- Add new SaaS plumbing as a block with docs, tests, and a clear public interface.
- Keep auth, billing, attribution, and dashboard logic in separate modules.
- Prefer small focused files over large mixed-responsibility files.
- Run `npm run typecheck`, `npm run test`, and `npm run build` before claiming a block works.

## Standard Prompt

Use this prompt when extending the starter:

```text
You are editing SourceLaunch, an AI-native SaaS block system.
Install or extend one block at a time.
Keep the public interface documented.
Write tests for pure logic.
Do not change unrelated blocks.
Do not use any.
Run typecheck, tests, and build before completion.
```

## Block Checklist

- Public route or function is documented.
- Environment variables are listed in `.env.example`.
- Database table or migration is added when needed.
- Error handling is explicit.
- A focused unit test covers the core behavior.
