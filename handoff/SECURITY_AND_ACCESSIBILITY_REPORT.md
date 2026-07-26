# Security and accessibility report

Measured 26 July 2026 against the build in `out/`.

---

## Security posture

The primary control is **data avoidance**. The application collects nothing, so
there is nothing to leak.

| Control | State |
| --- | --- |
| Application data collection | **None.** No form, no account, no upload, no submission of any kind. |
| Cookies | **None.** No consent banner, because there is nothing to consent to. |
| Analytics / tracking / session replay | **None.** No third-party script of any kind. |
| Fonts | Self-hosted by `next/font`. No request reaches a font provider. |
| Secrets | **None exist.** A static export cannot hold one. `.env.example` contains only deliberately invalid placeholders. |
| Runtime backend | None. No API route, Server Action, middleware, database, or authentication. |
| Client-side storage | One `localStorage` key holding a list of episode slugs. No identifier, never transmitted, with a visible control to clear it. |
| Third-party runtime code | None. |
| Runtime dependencies | Six: `next`, `react`, `react-dom`, `clsx`, `tailwind-merge`, `zod`. |
| Transport | HTTPS enforced by GitHub Pages. |
| Lockfile | Committed; CI installs with `npm ci`. |

### Prohibited data

The site does not collect — and cannot collect — Social Security numbers, dates
of birth, identity documents, tax returns, bank statements, account numbers,
credit reports, pre-approval files, asset/debt records, or document uploads.
`/privacy/` and `/contact/` both tell visitors not to send them.

No visitor data is encoded into any URL. The `sms:` and `mailto:` starter
message is generic and fully editable before sending; a test asserts it contains
no sensitive field names.

### Checks

| Check | Status |
| --- | --- |
| Secret scan (heuristic, source + workflows) | No findings |
| Static analysis — CodeQL (JS/TS) | Configured in CI, runs on PR, push, and weekly |
| Dependency review | Configured in CI, fails on high severity |
| Dependabot | Enabled for npm and GitHub Actions |
| SBOM | `npm run sbom` (CycloneDX) |
| Lockfile integrity | `npm ci` in CI |
| `npm audit` (production) | **Clean — 0 high, 0 critical.** Reached by pinning `postcss` and `sharp` forward with `overrides`; npm's own suggested "fix" was a downgrade from Next 16 to Next 9 and was not applied. Full record in `docs/repo-security-checklist.md`. |
| `npm audit` (dev toolchain) | 23 high advisories remain in `eslint`, `@lhci/cli`, and the SBOM tooling. None ship — nothing from `devDependencies` reaches `out/`. Reported non-blocking by `npm run audit:dependencies:full` rather than hidden. |
| Action pinning | **Outstanding.** Actions are on major-version tags and must be pinned to immutable commit SHAs before production. Tracked in `docs/repo-security-checklist.md`. |

### Accepted hosting limitation

**GitHub Pages cannot set custom HTTP response headers.** Content-Security-Policy,
HSTS, Permissions-Policy, and X-Frame-Options are therefore unavailable.

This is recorded as an accepted limitation, not concealed — it is stated in
plain terms on `/privacy/`. The compensating position: no authentication, no
session, no secret, no form, no personal data, no third-party script, and a
static artifact reviewed in version control. **Do not claim full
security-header compliance for this site.**

If custom headers become a hard requirement, GitHub Pages is technically
insufficient and the hosting decision has to be reopened.

---

## Accessibility

Target: **WCAG 2.2 Level AA.**

### Automated

`@axe-core/playwright` against `wcag2a`, `wcag2aa`, `wcag21aa`, `wcag22aa`,
across 21 routes covering every route family.

**25 / 25 passing. Zero violations.**

The suite runs with reduced motion emulated, which measures the settled state
and audits the stricter of the two motion modes.

Also asserted:

- exactly one `h1` per page, across every route;
- no `main section` is ever invisible, in either motion mode;
- reflow at 320px with no horizontal scrolling, on every route (WCAG 1.4.10);
- text scaling to 200% with no clipped or unreachable content (WCAG 1.4.4).

### Built in

- Semantic landmarks; heading order follows reading order.
- Skip link as the first focusable element, verified by test.
- Full keyboard operation. The contact dialog is a native `<dialog>` using
  `showModal()`, so focus containment, background inertness, and Escape are the
  platform's — not hand-rolled, which is how focus traps get shipped.
- Focus ring: 3px, 2px offset, switching to signal yellow on dark surfaces.
- Touch targets ≥ 44 × 44 px.
- No information carried by colour alone — every status is accompanied by text.
- Reduced motion removes transitions, smooth scrolling, and prevents the hero
  video from being fetched at all.
- The site is fully readable and navigable with JavaScript disabled, verified by
  test.

### Contrast corrections made

Three palette values from the design system fell short against the surfaces
actually used. Brand tokens were left intact for borders and fills; darker
text-only siblings were added, preserving hue.

| Token | Measured | On | Fix |
| --- | --- | --- | --- |
| `action` #155EEF | 3.1:1 | paper | `action-ink` #0E45B0 (7.0:1); `action-sky` #8FB6FF on ink (8.4:1) |
| `warning` #A15C00 | 4.41:1 | gray-100 | `warning-ink` #8A4E00 (5.6:1) |
| `success` #18794E | 4.39:1 | success tint | `success-ink` #10603D (6.0:1) |
| `gray-300` #C9CBC5 | 1.38:1 | paper | Index numerals moved to `gray-600` (5.1:1) |

### Video

- Captions and a full transcript ship with every playable film — enforced by the
  content schema, which cannot produce a media package for a film with audio and
  no caption file.
- No video autoplays with sound. The one autoplaying clip has **no audio track
  at all**.
- Only one video plays at a time.
- Custom controls are keyboard operable with visible accessible names; captions
  default to on.
- A descriptive fallback renders when media fails, with the transcript still on
  the page.

### Outstanding — automated testing is not sufficient

Stated publicly on `/accessibility/` as well:

1. Screen-reader testing (NVDA, JAWS, VoiceOver) — **not done**.
2. Real-device testing as opposed to emulated viewports — **not done**.
3. Captioned playback verified on a real device — **not done**.
4. Protocol-link behaviour on real phones — **not done**; only the phone number
   is configured.
5. Safari keyboard navigation — the automated check is skipped on WebKit, whose
   Tab behaviour depends on an OS preference.
6. A full manual pass against every WCAG 2.2 AA success criterion — **not done**.

### Known residual

At 200% *text-only* zoom on a 390px viewport, `/about/` scrolls horizontally by
66px; at 400% text-only zoom several pages do. This breaches no AA criterion —
1.4.4 requires 200% text resize without loss of content (nothing is clipped or
unreachable) and 1.4.10 is measured by viewport width, which passes cleanly at
320px on every route. It is recorded rather than closed. See `docs/qa-log.md`
Pass 4.

---

## Performance

Measured on the built artifact at 1440 × 900 and 390 × 844.

| Metric | Measured | Ceiling | Verdict |
| --- | --- | ---: | --- |
| LCP | 164 ms desktop / 76 ms mobile | 2.5 s | Pass (local network — re-measure on the production URL) |
| CLS | 0.0019 desktop / 0 mobile | 0.10 | **Pass** |
| Initial JS (gzip) | **198.7 KB** | 180 KB | **FAIL — see below** |
| Initial imagery | ~50 KB | 1.2 MB | **Pass** |
| Hero loop | 1.11 MB | 3 MB | **Pass** |
| Home page total transfer | 3.2 MB uncompressed local (~1.5 MB with the compression Pages applies), of which 1.1 MB is the hero video | — | — |

### The JavaScript budget miss — blocking report

**198.7 KB against a 180 KB ceiling. Over by 18.7 KB.**

This is a genuine miss and is not being written off. The breakdown:

| Chunk | gzip | What |
| --- | ---: | --- |
| react-dom | 69.3 KB | Framework |
| react | 38.5 KB | Framework |
| Next App Router runtime | 39.6 KB | Framework |
| **Framework subtotal** | **~147 KB** | **Not removable without changing the framework** |
| Application + layout shell | ~52 KB | Navigation active state, contact dialog, hydration marker, buyer-series progress, video library filter, index rail |

The lightest page on the site — `/privacy/`, which is prose and a footer — is
**193.8 KB**. That is the floor with this stack.

**What was already done to reduce it:**

- Removed the `motion` animation library entirely (unused, ~34 KB).
- Moved Zod out of every client-reachable module (~90 KB).
- Moved the contact list out of the dialog's client bundle via server children.
- Code-split the video player so it loads only where media exists.
- Replaced `next/image` with a plain `<img>` where optimisation was disabled
  anyway.

**Assessment:** the 180 KB ceiling in the requirements pack predates the stack
being pinned to Next 16 / React 19. It is not reachable with the App Router and
any client interactivity at all. Reaching it would require abandoning the App
Router or shipping zero interactive components — neither is a reasonable trade
for 19 KB.

**Recommendation:** accept a revised ceiling of **210 KB** for this stack, with
the application-code portion (~52 KB) as the number actually worth governing,
and re-examine if the framework baseline changes.

### Not yet measured

- Lighthouse CI against the production URL.
- INP under real interaction.
- 4× CPU throttling and mid-tier mobile GPU.
- Repeat-visit and cold-load behaviour on the Pages CDN, including whether range
  requests behave as expected for video seeking.
