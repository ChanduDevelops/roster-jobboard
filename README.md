# Roster — a job board

A small, opinionated job board built with Next.js (App Router), TypeScript,
and Tailwind CSS. Listings read like a hiring-hall notice board: a req
code, a plain-language description, a visible salary range, and a
"tear-off" apply action.

## Features

- **Board view** with live search (title, company, category), category and
  work-setting filters, and sort by newest / highest pay.
- **Job detail page** with responsibilities, requirements, a closing-date
  countdown, and an apply interaction.
- **Post a job** — a form that adds a listing to the board, stored in the
  browser via `localStorage` (no backend needed for this demo).
- **Saved jobs** — bookmark any listing and find it again from the Saved
  tab, also persisted in `localStorage`.
- Fully responsive, keyboard-focusable, and respects
  `prefers-reduced-motion`.

## Tech

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS v4
- Self-hosted fonts via `@fontsource` (Fraunces, Inter, IBM Plex Mono) — no
  external font requests at runtime
- No database: seed data lives in `lib/seed-jobs.ts`; anything a user posts
  or saves lives in their own browser's `localStorage`

## Running locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

```bash
npm run lint   # ESLint
npm run build  # production build (also type-checks)
```

## Project structure

```
app/
  page.tsx            # the board (search + filters + listings)
  jobs/[id]/page.tsx   # job detail page
  post/page.tsx        # post-a-job form
  saved/page.tsx       # saved/bookmarked listings
  layout.tsx           # shell, header, footer
  globals.css          # design tokens (colors, fonts, motifs)
components/
  Header.tsx
  JobCard.tsx
  FilterBar.tsx
lib/
  types.ts             # Job type
  seed-jobs.ts          # sample listings
  jobs.ts              # data + localStorage helpers
.github/workflows/
  ci-cd.yml            # lint/typecheck/build, then deploy to Vercel
```

## CI/CD

`.github/workflows/ci-cd.yml` runs on every push and pull request:

1. **CI** — install, `npm run lint`, `tsc --noEmit`, `npm run build`.
2. **CD** — only if CI passes:
   - Pull requests get a **preview deployment** on Vercel, with the
     preview URL commented on the PR.
   - Pushes to `main` get deployed to **production** on Vercel.

### One-time setup to connect this repo to Vercel

1. Push this repo to GitHub (see below).
2. Install the [Vercel CLI](https://vercel.com/docs/cli) locally and run,
   from the project root:
   ```bash
   npm install --global vercel
   vercel login
   vercel link
   ```
   `vercel link` creates a `.vercel/project.json` file locally (already
   gitignored) containing your `orgId` and `projectId`.
3. In your GitHub repo, go to **Settings → Secrets and variables →
   Actions** and add three repository secrets:
   - `VERCEL_TOKEN` — create one at
     [vercel.com/account/tokens](https://vercel.com/account/tokens)
   - `VERCEL_ORG_ID` — from `.vercel/project.json`
   - `VERCEL_PROJECT_ID` — from `.vercel/project.json`
4. Push to `main` (or open a PR) — the `CI/CD` workflow in the **Actions**
   tab will lint, build, and deploy automatically.

Alternatively, skip the GitHub Actions deploy step entirely and just
import the repo directly at [vercel.com/new](https://vercel.com/new) —
Vercel auto-detects Next.js and deploys on every push on its own. The
Actions-based pipeline above is useful when you want the lint/build gate
to run *before* Vercel deploys, and to control preview vs. production
deploys explicitly.

## Pushing this repo to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Roster job board"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```
