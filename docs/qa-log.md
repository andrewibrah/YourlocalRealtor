# QA log

Four passes, the defects each one found, and what was done about them.
Only material corrections are recorded — not every tweak.

---

## Pass 1 — Structural

Route completeness, information hierarchy, content order, component
consistency, conversion visibility.

| # | Finding | Resolution |
| --- | --- | --- |
| 1.1 | All 45 routes generate and `out/index.html` exists. | — |
| 1.2 | `robots.ts` and `sitemap.ts` failed the static export: Next 16 requires metadata routes to be explicitly static. | Added `export const dynamic = "force-static"` to both. |
| 1.3 | `/brokerage-notices/` is a list of compliance gaps, not disclosures. Indexing it would surface an unfinished page. | `noindex` while `brokerageIsApproved` is false, excluded from the sitemap, and disallowed in `robots.txt`. All three flip automatically once the details are approved. |
| 1.4 | Three property films had no address, price, caption, or master — only a URL. Three cards reading "Property film — one/two/three" carried no information. | Removed from the library; recorded in `content-verification.md` §3. |
| 1.5 | A `1-mcclean-avenue` property record existed twice after the real listing arrived. | Placeholder removed. |

## Pass 2 — Visual

Screenshots at 390, 768, 1024, and 1440 px. Reviewed typography, spacing,
alignment, rhythm, colour balance, proof hierarchy, and mobile art direction.

| # | Finding | Resolution |
| --- | --- | --- |
| 2.1 | **The type scale was not being applied.** `tailwind-merge` does not know this project's custom `text-*` sizes, so it classified `text-heading-lg` as a colour, decided it conflicted with `text-gray-300`, and dropped it. A 48px heading was rendering at 16px in `ProcessList`, `Price`, `Stat`, and others. | Registered the scale under the `font-size` class group via `extendTailwindMerge` in `src/lib/utils.ts`. Fixes the whole class of bug at the root. Found by an accessibility scan reporting an impossible font size, not by eye. |
| 2.2 | The index rail sat on top of the hero media and the buyer series at ≥1280px. | The rail gets its own lane: `page-gutter` reserves 7rem of right padding at `xl`. |
| 2.3 | Large void in the hero — the text column was bottom-aligned against a much taller 9:16 media column. | Media capped at 22rem wide, columns centred. |
| 2.4 | The property-films row used a 4-column grid for 3 films, leaving an empty column. | Changed to 3 columns. |
| 2.5 | Feature sections used fractional grid columns, so the 9:16 media floated in a wide near-empty lane. | Fixed 20rem media lane. |
| 2.6 | Tour posters shipped at 720px wide (271 KB) while rendering at ≤352px. | Resampled to 540px; 271 KB → 61 KB. |

## Pass 3 — Adversarial

| # | Attack | Result |
| --- | --- | --- |
| 3.1 | **Full-page render / no scrolling.** | **Failed.** The scroll-reveal system armed below-the-fold elements to `opacity: 0` and released them on intersection. Where the observer did not fire — full-page rendering, print — entire sections stayed invisible, *including all three proof stories*. **The reveal system was removed entirely** rather than patched: a visual nicety that can hide the most important content on the site is not a trade worth making, and a timeout failsafe would only have shortened the window. Guarded by a test asserting no `main section` is ever invisible, in both motion modes. |
| 3.2 | **JavaScript disabled.** | Passes. Every page is readable and navigable; "Plan my move" degrades from a dialog to a real navigation to `/contact/`. |
| 3.3 | **Video preload cost.** | **Failed.** A measured home-page load transferred **14.3 MB of MP4** before anyone pressed play — `preload="metadata"` combined with a host that does not honour range requests. Changed to `preload="none"`; the poster is a real `<img>` and duration comes from the build-time manifest, so nothing is lost. Home page load: **16.4 MB → 3.2 MB.** |
| 3.4 | **Contrast on real surfaces.** | **Failed in three places.** `warning` on `gray-100` measured 4.41:1, `success` on a success tint 4.39:1, and index numerals in `gray-300` on paper 1.38:1 — all against a 4.5:1 / 3:1 requirement. Added darker text-only siblings (`warning-ink`, `success-ink`) preserving hue, and moved numerals to `gray-600`. Brand tokens unchanged for borders and fills. |
| 3.5 | **Fixed mobile action bar covering content.** | **Failed.** The closing call to action could sit underneath the bar at the very bottom of the page, where no further scroll is available. Reserved space increased from 4.25rem to 5.5rem. |
| 3.6 | **Reduced motion.** | Passes. Transitions collapse to 1ms, smooth scrolling is disabled, and the hero loop is never fetched at all — the server snapshot of the preference is "reduced", so the video element is not even in the server-rendered HTML. |
| 3.7 | **400% text zoom at 390px.** | Recorded as passing here. **That was wrong** — the check was measuring against an arbitrary bar and later, once the measurement was made deterministic, it failed badly. Superseded by Pass 4 §4.4. Left in place rather than edited out, because a QA log that quietly rewrites its own history is not evidence of anything. |
| 3.8 | **Keyboard only.** | Skip link is the first focusable element and reaches `#main`. The contact dialog uses native `<dialog>.showModal()`, so focus containment and Escape are the platform's, not hand-rolled. |
| 3.9 | **Deep links and back/forward.** | Passes on all dynamic routes. |
| 3.10 | **Media failure.** | The player renders a descriptive fallback and the transcript remains on the page. |
| 3.11 | **Placeholder contact destinations.** | No `tel:`/`sms:`/`mailto:` link is ever emitted from an unconfigured or placeholder destination — the action renders as visibly unavailable with the reason stated. Asserted in both unit and journey tests. |

---

## Pass 4 — Home restructure and reflow (client-requested)

Requested: remove the budget section, move the decision rail to 02, add a new
section 01 built on the "why the right agent matters" film, align the rail
numbers with the on-screen numbers, and add an Instagram link to the hero.

| # | Finding | Resolution |
| --- | --- | --- |
| 4.1 | The rail counted 01–08 while sections were labelled 00–07 on screen, so every entry was off by one. | `RailSection` now carries the section's own index instead of deriving it from array position, so both read from one source. |
| 4.2 | The active rail label auto-expanded ~14rem back into the content column and sat unreadable on top of the hero video. | Labels expand on hover and focus only. Active state is still carried by the bold number, the longer yellow bar, and `aria-current`. The label also gained a solid chip so it stays legible over any background. |
| 4.3 | The `awaiting-approval` verification note read "Transcribed from a client-supplied review screenshot" — and appeared under every *video* on the site, where it was simply wrong. | Reworded to name the class of source (a review or the film's own audio) rather than assume one. |
| 4.4 | **The page could be forced into horizontal scrolling by a single long word or number.** At 200% text the home page overflowed by 128px and at 400% by 971px. Root cause was `min-width: auto` on flex and grid items throughout — an item refuses to shrink below its content's intrinsic width — compounded by an unbreakable price, a nowrap link, and non-wrapping flex rows. | `min-w-0` on the column wrappers, proof cards, buyer-series rows, and star ratings; `flex-wrap` on the section eyebrow, source link, and rating rows; `[overflow-wrap:anywhere]` on the price. |
| 4.5 | `overflow-wrap: break-word` on headings did not fix it. | It lets a word break *visually* but does not reduce intrinsic min-content width, so grid items still sized to the longest word. Switched to `overflow-wrap: anywhere`, which does. A subtle distinction that cost several iterations to find. |

### Reflow result

| Measure | Before | After |
| --- | --- | --- |
| Reflow at 320px (WCAG 1.4.10) — 10 routes | not measured | **0px overflow, all routes** |
| Text 200% at 390px, home | 128px | 0px |
| Text 200% at 390px, worst route (`/about/`) | — | 66px |
| Text 400% at 390px, home | 971px | 498px |

**The accessibility tests were also corrected.** The previous check asserted no
horizontal scrolling at 400% *text-only* zoom, which is not a WCAG criterion —
1.4.4 requires 200% text resize, and 1.4.10 specifies a 320px viewport, not
text-only zoom. The suite now tests both criteria as written: reflow at 320px
(passes on every route) and 200% text resize checked for loss of content rather
than for scrollbars, which 1.4.4 does not prohibit.

**Residual, stated plainly:** at 200% text-only zoom `/about/` still scrolls
horizontally by 66px, and at 400% text-only zoom several pages do. Neither
breaches an AA criterion, and no content is clipped or unreachable in either
case. It is recorded here rather than closed.

---

## Defects found by tests that eyes had missed

Worth recording separately, because they argue for the tests existing:

- The type-scale bug (2.1) was invisible to review — text simply looked
  slightly small — and was caught by an accessibility scan reporting a 48px
  heading measuring 16px.
- The 14 MB video preload (3.3) was invisible on a local network and would have
  been invisible in review. It took a byte measurement.
- The invisible proof stories (3.1) only appeared in a full-page screenshot.

## Test-harness issues (not product defects)

Recorded so they are not mistaken for findings later:

- The local static file server is single-threaded and dropped connections under
  parallel workers once media was added, surfacing as `ERR_CONNECTION_RESET`.
  Both Playwright suites now run with `workers: 1`.
- axe sampled colours mid-transition and reported contrast failures against
  blended intermediate values. The accessibility suite now runs with reduced
  motion, which measures the settled state and audits the stricter mode.
- WebKit does not move focus to links with Tab unless an OS preference is set,
  so the sequential-focus test is skipped there. **Real Safari keyboard testing
  remains an outstanding manual item.**
- The local server does not serve `404.html` for unmatched paths (GitHub Pages
  does), so the 404 test requests the artifact directly.

## Outstanding manual QA

Not yet done. Listed on `/accessibility/` as well, publicly.

- Screen-reader testing (NVDA, JAWS, VoiceOver).
- Real-device testing, as opposed to emulated viewports.
- Captioned video playback verified on a real device.
- Protocol-link behaviour (`tel:`, `sms:`) on real phones — currently only the
  phone number is configured; email and scheduling are not.
- Lighthouse CI against the production Pages URL.
- A full manual pass against every WCAG 2.2 AA success criterion.
