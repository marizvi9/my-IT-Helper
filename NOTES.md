# NOTES: build log for My IT Helper

A running log of each step: what was built, decisions made, and what's next.

## Roadmap

1. **Landing page + sign up + log in + demo** (teacher view, ticket-submit simulator, FAQ, admin demo)
   - **1a (this step):** project setup, landing page, sign-up and log-in *UIs*
   - 1b: demo
2. **Real sign up:** IT department signs up with a school email (Google, Microsoft/Outlook,
   or plain email); teachers get access once IT signs the school up
3. **Real product:** ticket submission + FAQ for teachers

---

## Step 1a: setup, landing page, sign-up & log-in UIs (2026-11-20) ✅

### What was built
- **Project setup:** Next.js 16 (App Router) + TypeScript + plain CSS, same layout as
  al-zahra-library (`src/app`, `src/components`, `src/lib`).
- **Landing page** (`/`): what the product is, "How it works", features, and buttons for
  Sign up, Log in, and View demo (disabled, "coming soon").
- **Sign-up page** (`/signup`): school name, IT admin name, school email, password,
  plus "Continue with Google / Microsoft" buttons. Client-side validation: required
  fields, email format, password length (12+), live strength meter + checklist.
- **Log-in page** (`/login`): email + password, Google/Microsoft buttons.
- **Theme:** every color is a CSS variable in `src/app/theme.css` (charcoal grays, warm
  whites, school gold). **Filler logo** in `src/components/Logo.tsx`.

### Decisions
- **No `output: "export"`** (unlike al-zahra-library). Real log-in needs a server, and
  Vercel runs Next.js natively.
- **Plain CSS, no Tailwind:** fewer tools to learn; theme colors stay in one file.
- **System fonts** (no web-font download): fast and nothing to load from third parties.
- **Password rule = length first** (12+ chars), following NIST guidance; the
  upper/lower/number checks are hints shown in the meter, not hard requirements.
- **Google/Microsoft buttons** only show a "coming soon" message for now.
- **Gold is a background color, not a text color** (gold text on white fails WCAG
  contrast). Links use the darker `--gold-text`.
- `themeColor` in `layout.tsx` is the one hex value outside theme.css: browser metadata
  can't read CSS variables. Keep it in sync with `--charcoal`.

### Security practices already in place
- `.gitignore` blocks every `.env*` file (except `.env.example`), `*.pem`, `*.key`.
- Password inputs are masked (`type="password"`), with a show/hide toggle.
- Correct `autocomplete` values (`new-password`, `current-password`, `username`, `email`)
  so password managers work, which leads people to use stronger, unique passwords.
- Forms use `method="post"`: if JavaScript fails, the password still can't end up in the URL.
- No `console.log` of form data; passwords are cleared from memory after submit.
- **Nothing is stored or sent**: no database, cookies, or localStorage.
- HTTP security headers in `next.config.ts`: `X-Frame-Options: DENY` (anti-clickjacking),
  `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`, and the
  `X-Powered-By` header is removed.

## Security notes: what real auth will need (Step 2)

1. **Hashed passwords.** Never store a password itself. Store a slow, salted hash
   (Argon2id or bcrypt) so a database leak doesn't reveal passwords. Prefer a proven
   auth library or service over writing our own.
2. **HTTPS everywhere.** Vercel provides HTTPS automatically; add the
   `Strict-Transport-Security` (HSTS) header so browsers never fall back to HTTP.
3. **Email verification.** Prove the IT admin really owns the school email (a
   one-time, expiring link) before the school account becomes active.
4. **Rate limiting.** Limit log-in, sign-up and password-reset attempts per IP/account
   to stop password guessing (brute force) and spam sign-ups.
5. **Server-side validation.** Re-check every field on the server; browser checks can be skipped.
6. **Generic error messages.** "Email or password is incorrect", never "no such user"
   (which leaks who has an account).
7. **Secure sessions.** Session cookies set `HttpOnly`, `Secure`, `SameSite=Lax`; expire
   them; and protect forms against CSRF.
8. **OAuth done right** (Google/Microsoft). Use the provider's official flow with `state`/PKCE,
   keep the client secret in Vercel environment variables (never in code), and only
   accept school domains.
9. **Breached-password check.** Reject passwords found in known leaks (e.g. Have I Been Pwned's
   k-anonymity API).
10. **Secrets** live in `.env.local` locally and in Vercel's Environment Variables in
    production, never in GitHub.

## Step 1b: demo + header/footer polish (2026-11-20) ✅

### What was built
- **Demo** under `/demo`, with a "Demo mode" banner and tabs:
  - **Overview** (`/demo`): explains the two views and suggests a walkthrough.
  - **Teacher view** (`/demo/teacher`): "Ms. Rivera" sees only her own tickets (open and
    solved) and IT's replies.
  - **Submit a ticket** (`/demo/submit`): category, summary, room, urgency, description,
    with validation, length limits, and **quick-fix FAQ suggestions** for the chosen category.
    Shows a confirmation with the new ticket number.
  - **FAQ** (`/demo/faq`): search box + category filter, open/close answers.
  - **IT admin view** (`/demo/admin`): stats (open / in progress / solved / urgent),
    status filters, urgent tickets first, change status, reply to teachers.
- The views are **connected**: a ticket submitted as the teacher appears in the admin view,
  and the admin's reply appears in the teacher view (shared `DemoProvider` context).
- Landing page **"View demo"** button now works.
- **Header** is a little bigger (taller bar, larger logo and buttons) and shrinks to fit
  one row on small phones.
- **Footer** redesigned: logo + tagline + links, and a copyright line:
  "© 2026 My IT Helper. All rights reserved." · "A project by Mahdi Rizvi".

### Files
- `src/lib/demoData.ts`: all fake tickets, categories and FAQ articles (types included).
- `src/app/demo/DemoProvider.tsx`: in-memory demo state (React Context).
- `src/app/demo/DemoBits.tsx`: shared `StatusBadge`, `TicketCard`, `FaqItem`.
- `src/app/demo/{teacher,submit,faq,admin}/`: one folder per demo page.

### Decisions
- **Demo state lives only in memory.** No localStorage, no server, so nothing typed is
  stored (AGENTS.md rule). Refreshing resets the demo; the banner says so.
- **Display-ready date labels** ("Today, 8:05 AM") instead of real dates. This avoids
  time-zone mismatches between server and browser rendering in the demo.
- **`<details>`/`<summary>`** for expandable tickets and FAQs: built-in HTML, accessible,
  no extra JavaScript.
- Each demo page is a small Server Component (to set the page title) that renders a
  Client Component (the interactive part).
- Added `--info` / `--info-bg` to `theme.css` for the "In progress" status color.

### Security practices in this step
- **XSS protection:** user-typed text is shown through normal JSX, which React escapes.
  Tested: a title of `<script>alert(1)</script>` shows as text and doesn't run. No
  `dangerouslySetInnerHTML` anywhere.
- **Length limits** on every text field (title 100, room 30, description/reply 1000).
- Ticket form reminds teachers to **never include passwords**; FAQ includes phishing and
  password-safety tips.
- Code comments mark what the real product must do on the **server**: only send a
  teacher their own tickets, and check the IT-staff role before showing the admin view
  (**authorization**). Hiding things in the browser is not security.

## What's next
- **Step 2: Real sign-up.** IT department signs up with a school email (Google,
  Microsoft/Outlook, or plain email); teachers get access once IT signs the school up.
  Needs: an auth library/service, a database, the "Security notes" checklist above.
