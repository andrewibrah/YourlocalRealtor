# Technical handoff

## Stack

| | |
| --- | --- |
| Framework | Next.js 16.2.12, App Router, static export (`output: "export"`) |
| Language | TypeScript 6, strict |
| React | 19.2.8 |
| Styling | Tailwind CSS 4 (`@theme` tokens in `src/app/globals.css`) |
| Validation | Zod 4 — build-time only, never in the browser bundle |
| Runtime deps | `clsx`, `tailwind-merge`, `zod`, `next`, `react`, `react-dom`. That is all. |
| Node | 22 (CI); built locally on 26 |
| Host | GitHub Pages, via GitHub Actions. Nothing else. |

No API routes, Server Actions, middleware, database, authentication, CMS, or
runtime services. No Vercel configuration, SDK, adapter, or deployment file
exists anywhere in the repository.

## Layout

```
src/
├── app/                    routes; one directory per URL segment
├── components/
│   ├── contact/            contact actions + the Plan my move dialog
│   ├── home/               hero and hero loop
│   ├── layout/             header, footer, action bar, index rail, notice shell
│   ├── primitives/         Button, Typography, Data, Editorial
│   ├── proof/              proof story + review source disclosure
│   └── video/              frame, slate, player, card, library, series
├── content/                typed content — the only place facts live
└── lib/                    schema, seo, site-config, utils, hooks
scripts/                    media encoding, transcription, manifest
generated/                  transcripts + media manifest (committed)
public/media/               deployed video derivatives, posters, captions
sharif-site-definition/     the requirements pack — read-only source of truth
```

## The three rules that hold this together

### 1. Facts live in `src/content/`, nowhere else

Pages compose components; components render props. No page hard-codes a price,
an address, or a claim. Everything is validated by Zod at module load, which for
a static export means **at build time** — invalid content fails `next build`
rather than shipping.

This is load-bearing. It already caught a record with an empty provenance field
that would otherwise have shipped.

### 2. Verification state travels with every claim

Every content record carries a `verification` field. Anything that is not
`verified` renders a visible provisional marker beside the claim. Removing those
markers is a content-approval action (change the field), not a code change.

A test asserts nothing is marked `verified` while `docs/content-verification.md`
lists it as outstanding.

### 3. Zod never reaches the browser

`src/lib/schema.ts` is server-only by convention. Anything a client component
needs — price formatting, video category labels — lives in a module with no
validator import (`src/lib/format.ts`, `src/content/video-taxonomy.ts`).

Breaking this costs ~90 KB of gzipped JavaScript on every page. It has been
broken once already; if the bundle jumps, check this first.

## Things that will look wrong and are not

**`cn()` extends `tailwind-merge` with the custom type scale.**
`src/lib/utils.ts`. Without it, `tailwind-merge` treats `text-heading-lg` as a
colour, decides it conflicts with `text-gray-300`, and silently drops it — a
48px heading renders at 16px. Any new `text-*` size token must be added to that
list.

**`preload="none"` on every video.** Not an oversight. `preload="metadata"`
transferred 14 MB on the home page. The poster is a real `<img>` and the
duration comes from the build-time manifest, so metadata buys nothing.

**A plain `<img>` for review screenshots, not `next/image`.** With
`images.unoptimized: true`, `next/image` does no optimisation here — it only
adds a client component to the bundle.

**No scroll-reveal animation.** It existed and was removed. See the note in
`globals.css` and `docs/qa-log.md` §3.1.

**The index rail has its own gutter at `xl`.** `page-gutter` reserves 7rem of
right padding above 1280px. Removing it puts the rail on top of the content.

**`--action-bar-height` is 5.5rem, larger than the bar.** The extra space stops
the closing call to action sitting underneath the fixed bar at the bottom of the
page.

## Configuration

All build-time, all `NEXT_PUBLIC_*`, all inlined into the static output. There
are no secrets — a static export cannot hold one.

| Variable | Default | Effect |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://example.invalid` | Canonicals, sitemap, Open Graph. **Must be set for production.** |
| `NEXT_PUBLIC_PHONE` | `+19179512142` | Overrides the published business line |
| `NEXT_PUBLIC_EMAIL` | *(empty)* | Enables the email action |
| `NEXT_PUBLIC_SCHEDULING_URL` | *(empty)* | Enables the scheduling action; HTTPS enforced |
| `NEXT_PUBLIC_BASE_PATH` | *(empty)* | Set to `/<repo>` for a project Pages site; leave empty for a custom domain |

Placeholder detection is in `src/lib/site-config.ts`. A destination that is
absent or recognisably fake never renders a protocol link — it renders as
visibly unavailable with the reason. That behaviour is asserted by tests.

Brokerage details are in the same file. `licensedTitle` and `licenseNumber` are
`null`; filling them in removes the pending notices site-wide and makes
`/brokerage-notices/` indexable.

## Commands

```bash
npm ci
npm run dev              # localhost:3000
npm run build            # → out/
npm run lint
npm run typecheck
npm run test:unit        # 25 tests — content compliance, contact safety, schema
npm run test:a11y        # 24 tests — axe across every route family
npm run test:e2e         # 21 tests — journeys, no-JS, keyboard, deep links
npm run sbom
```

Media (only when new masters arrive):

```bash
bash scripts/encode-media.sh      # masters → public/media/
python3 scripts/transcribe.py     # audio → captions + transcripts
node scripts/media-manifest.mjs   # → generated/media-manifest.json
```

## Deployment

`main` → `.github/workflows/deploy-pages.yml` → GitHub Pages.

The workflow lints, type-checks, runs all three test suites, builds, verifies
`out/index.html` exists, then uploads and deploys. Build gets `contents: read`;
deploy gets `pages: write` and `id-token: write` and nothing else.

**Before production:** pin every action to an immutable commit SHA. See
`docs/repo-security-checklist.md`.

## Known limitations

- **GitHub Pages cannot set custom HTTP response headers.** No CSP, HSTS,
  Permissions-Policy, or X-Frame-Options. Accepted and documented, with
  compensating controls (no secrets, no forms, no auth, no data, minimal
  dependencies). Stated openly on `/privacy/`.
- **Initial JavaScript is ~198 KB gzipped against a 180 KB budget.** ~147 KB of
  that is React, React DOM, and the Next App Router — the framework floor, not
  application code. See `handoff/SECURITY_AND_ACCESSIBILITY_REPORT.md`.
- **Deployed media is ~39 MB.** Fine for Pages, and none of it is fetched until
  a visitor presses play. If it grows much further, move video to a CDN — which
  would be a hosting decision requiring approval.
