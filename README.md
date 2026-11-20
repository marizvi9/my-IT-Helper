# My IT Helper

A website where school teachers submit IT help tickets to their school's IT department.

> Status: **Step 1** (landing page, plus sign-up and log-in screens with no real login yet).
> See [NOTES.md](NOTES.md) for the build log and what's next.

## Tech

- [Next.js](https://nextjs.org) 16 (App Router) + TypeScript
- Plain CSS. All colors live in one place: [`src/app/theme.css`](src/app/theme.css)
- Hosted on [Vercel](https://vercel.com); code on GitHub

## Run it on your computer

```bash
npm install     # download the packages listed in package.json
npm run dev     # start the dev server at http://localhost:3000
```

Other commands:

```bash
npm run build      # production build (also checks types), same as Vercel runs
npm run typecheck  # TypeScript check only
```

## Project layout

```
src/
  app/                 # each folder = a page (URL)
    page.tsx           # /          landing page
    signup/page.tsx    # /signup    IT department sign-up form
    login/page.tsx     # /login     log-in form
    theme.css          # school colors (swap these for a real school's logo colors)
    globals.css        # shared styles that use the theme colors
  assets/logo/         # logo images (dark/light, horizontal/stacked)
  components/
    Logo.tsx           # shows the right logo version
  lib/
    validation.ts      # simple form checks (email, password strength)
```

## Changing the school colors or logo

- **Colors:** edit the variables at the top of `src/app/theme.css`.
- **Logo:** the logo images are in `src/assets/logo/` (horizontal + stacked, each in a
  `dark` and `light` version). Replace those files with the same names to update the logo
  everywhere. `src/components/Logo.tsx` picks the right version. The original design files
  are in `design/logo/`. The browser-tab icons are `src/app/icon.png` and `src/app/apple-icon.png`.

## Secrets

Never commit passwords, API keys or `.env` files. `.gitignore` already blocks them.
