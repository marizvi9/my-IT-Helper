# Rules for AI assistants working on My IT Helper

## Who this is for
The owner is a computer science student learning Python, web development and
cybersecurity fundamentals. Always:
- Explain what you did in **plain language**.
- Keep code **simple and commented**. Prefer clear code over clever code.
- **Point out security practices** as you use them (mark them with `SECURITY:` in comments).

## How we work
- Build **one step at a time** (see NOTES.md). Stop after each step and wait for
  the owner's confirmation before starting the next.
- Do **not** build features from later steps early.
- Branch is `main`. **Commit small and often** with clear messages.
- Update **NOTES.md** at the end of every step (what was done, decisions, what's next).

## Naming
- Product name shown on the site: **"My IT Helper"** (with spaces).
- `my-IT-Helper` is only the folder / GitHub repo name.

## Tech rules
- Next.js (App Router) + TypeScript, plain CSS. Code lives in `src/`.
- **All colors come from CSS variables in `src/app/theme.css`.** Never hard-code a
  color anywhere else, so a school's real logo colors can be swapped in later.
- The logo lives only in `src/components/Logo.tsx` so it's easy to replace.
- Pages must work on phones (mobile-first, no horizontal scrolling).
- This Next.js version may differ from what you remember. Check
  `node_modules/next/dist/docs/` before using an API you're unsure about.

## Security rules (non-negotiable)
- **Never commit secrets** (API keys, passwords, tokens, `.env` files).
  Use `.env.local` (git-ignored) and commit only `.env.example` with empty values.
- Never put passwords in URLs, query strings, logs, or `console.log`.
- Password fields use `type="password"` and correct `autocomplete` values.
- Forms submit with POST (never GET) once they talk to a server.
- Don't store user data until the step that adds real, secure storage.
- Validate on the client for convenience, but **always re-validate on the server**
  (client checks can be bypassed).

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
