# Sharif Abdelkader — New York Real Estate

**Live:** https://andrewibrah.github.io/YourlocalRealtor/

Static Next.js site for a Staten Island and Brooklyn real-estate agent.

Product requirements, brand strategy, design tokens, and content schemas live in
[`sharif-site-definition/`](./sharif-site-definition) — read
`sharif-site-definition/AGENTS.md` before making product or design decisions.
That directory is the requirements source and is never modified by the
application.

## Start here

| If you are… | Read |
| --- | --- |
| The client | [`handoff/CLIENT_PRESENTATION.md`](./handoff/CLIENT_PRESENTATION.md) |
| Taking over the code | [`handoff/TECHNICAL_HANDOFF.md`](./handoff/TECHNICAL_HANDOFF.md) |
| Making a routine change | [`handoff/MAINTENANCE_RUNBOOK.md`](./handoff/MAINTENANCE_RUNBOOK.md) |
| Adding a film | [`handoff/MEDIA_WORKFLOW.md`](./handoff/MEDIA_WORKFLOW.md) |
| Checking what is unverified | [`docs/content-verification.md`](./docs/content-verification.md) |
| Wondering why it looks like this | [`docs/creative-direction.md`](./docs/creative-direction.md) |
| Working on search | [`docs/seo-strategy.md`](./docs/seo-strategy.md) |
| Auditing quality | [`docs/qa-log.md`](./docs/qa-log.md), [`handoff/SECURITY_AND_ACCESSIBILITY_REPORT.md`](./handoff/SECURITY_AND_ACCESSIBILITY_REPORT.md) |

## Architecture

- Next.js App Router, TypeScript strict, Tailwind CSS 4.
- **Static export.** Builds to `out/`, ships no server runtime.
- No API routes, Server Actions, middleware, database, authentication, or CMS.
- GitHub Actions is the only CI/CD; GitHub Pages is the only host.
- No Vercel configuration, SDK, adapter, or deployment file. CI enforces this.
- Six runtime dependencies.
- The site collects no visitor data of any kind.

## Getting started

```bash
npm ci
npm run dev          # http://localhost:3000
```

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run build` | Static export to `out/` |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test:unit` | Content compliance, contact safety, structured data (25) |
| `npm run test:a11y` | axe across every route family (24) |
| `npm run test:e2e` | Journeys, no-JS, keyboard, deep links (21) |
| `npm run audit:dependencies` | `npm audit --audit-level=high` |
| `npm run audit:licenses` | Copyleft licence check |
| `npm run sbom` | CycloneDX SBOM |

Media pipeline, only when new masters arrive:

```bash
bash scripts/encode-media.sh
python3 scripts/transcribe.py
node scripts/media-manifest.mjs
```

## Two things that will bite you

**Video source masters are not in git.** `sharif-site-definition/assets/videos/`
is gitignored — the requirements pack requires masters to stay out of version
control, and they are ~62 MB. **They are the only copies supplied. Back them up
elsewhere.** `generated/media-manifest.json` holds a SHA-256 of each one so
derivatives remain traceable.

**Facts live in `src/content/`, validated by Zod at build time.** No page
hard-codes a price, an address, or a claim. Invalid content fails `next build`
rather than shipping.

## Status

Deployed and serving. **Complete as a build.** **Not cleared for use as New York real-estate advertising**
until the blocking items in
[`docs/content-verification.md`](./docs/content-verification.md) §1 are resolved
— principally the licensed title, testimonial permission, and media/music
rights.
