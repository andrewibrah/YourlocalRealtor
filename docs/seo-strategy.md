# Local SEO strategy — Staten Island and Brooklyn

What is implemented, why, and what only the business owner can do.

## Method and source

The audit framework applied here is the **`claude-seo`** plugin
(`AgricIDaniel/claude-seo`), MIT licensed, pinned at commit
`09d37c7b66ed3ca9c6efbdb765a805a6c76a8f01`. Its `seo-local`, `seo-schema`, and
`seo-geo` skills and its `schema/templates.json` were **read and applied**, not
installed.

That distinction is deliberate and follows this project's own supply-chain rules
(`sharif-site-definition/docs/10-agentic-skill-stack.md`): the plugin ships an
`install.sh`, 25 skills, 18 agents, and optional extensions that call external
paid APIs (DataForSEO, Firecrawl). Running an installer and enabling network
tooling is a supply-chain expansion that requires review and pinning before use.
The methodology needed no installation to apply — so the repository was cloned
to a scratch directory, inspected, and its recommendations implemented directly.

The plugin is an *audit* tool aimed at a live URL. This site is not deployed
yet, so its checks were applied by hand against the source.

Recorded in `docs/skill-lock.md`.

---

## Business type

**Service-area business.** There is a brokerage office address, but Sharif works
across Staten Island and Brooklyn rather than from a storefront that clients
visit. This determines the schema shape: `areaServed` carries the geography and
`address` is omitted.

**Vertical:** real estate. Schema.org has no `RealEstateBrokerage` type;
`RealEstateAgent` is correct for both an individual agent and a firm.

---

## What is implemented

### 1. Dedicated area pages — the strongest available signal

`/areas/staten-island/` and `/areas/brooklyn/`.

Dedicated local pages are the single highest-weighted local organic factor. They
are also the easiest thing in local SEO to get penalised for: a page that
survives having its city name swapped for another city is a doorway page, and
Google has demonstrably acted against that pattern.

**These pass the swap test by construction.** Swap "Staten Island" for
"Brooklyn" on the Staten Island page and the addresses, the amounts, the postal
codes, and the transaction types all become false:

- Staten Island: 327 Brehaut Ave ($960,000), 181 Meisner Ave ($1,299,999), plus
  three marketed listings — 10306, 10307.
- Brooklyn: 2031 60th St, a three-family sold at 98% of list inside the first
  week — 11204.

A test enforces that no two area pages share a proof story
(`tests/unit/content-compliance.test.ts`).

### 2. City + service in titles and headings

`Real estate agent in Staten Island, NY — buying and selling` — city and service
in the title tag and the `h1`, which is the standard on-page local pattern.

Service pages carry it too: *"Buying a home in Staten Island and Brooklyn"*,
*"Selling a home in Staten Island and Brooklyn"*.

### 3. Dedicated service pages

`/buy/`, `/sell/`, and three buyer sub-pages (`/buy/first-home/`,
`/buy/budget/`, `/buy/buy-vs-rent/`). One page per core service rather than one
page listing all services.

### 4. Structured data

Emitted as a single JSON-LD `@graph`, with page-level nodes referencing the
site-level entity by `@id` rather than repeating it.

| Type | Where | Notes |
| --- | --- | --- |
| `RealEstateAgent` | Every page (root layout) | `areaServed` with both boroughs, `knowsAbout`, `makesOffer` → buyer and seller `Service` |
| `Person` | Every page | `worksFor` the agent entity |
| `BreadcrumbList` | Every page | Absolute URLs, ordered |
| `WebSite` | Home | |
| `FAQPage` | `/buy/`, `/sell/` | From the real FAQ content on the page |
| `ItemList` | Hub pages | Lets AI-search surfaces enumerate contents instead of inferring them |
| `VideoObject` | Video pages **with playable media only** | |
| `Residence` | Property pages with a verified address | |
| `Article` | Case studies | |

**What is deliberately omitted, and why it matters more than what is included:**

| Omitted | Reason |
| --- | --- |
| `aggregateRating` / `Review` | Three owner-selected review screenshots are not an aggregate of all reviews. Google's review-snippet policy also does not permit a business to mark up reviews of itself on its own site. Emitting it would be both a policy violation and a misrepresentation. |
| `address` on the agent entity | Google lists `address` as required for full LocalBusiness rich results. It is still omitted, because the brokerage relationship is not yet approved for advertising. **This is a known, accepted gap** — see "Blocked on the business owner". |
| `geo` | No verified coordinates. Invented coordinates in machine-readable form are worse than none. |
| `priceRange` | No verified fee information. |
| `RealEstateListing` / `Offer` on properties | These are closed transactions and past marketing, not a live feed. Listing markup would tell search engines a property is for sale when the site cannot know that. |
| `VideoObject` for unreleased films | Would advertise a video that cannot be played. |

Structured data is read by search engines and assistants as machine-readable
*fact*. Fabricating a value here is worse than fabricating it in body copy,
because it is stated in a format designed to be trusted and reused.

### 5. Click-to-call

The published business line renders as a real `tel:` link in the footer, the
mobile action bar, and the contact panel. Placeholder or unapproved destinations
never render a protocol link at all.

### 6. Internal linking

Hub-and-spoke. Every page is within three clicks of the home page. Area pages
link to their transactions and properties; properties link back to their case
study and film; the film library links to properties; the footer carries the
full map including both area pages.

### 7. Crawlability

- `sitemap.xml` generated at build with priorities reflecting the hub structure;
  area pages at 0.9, alongside the two service pages.
- `robots.txt` allows everything public, **including AI crawlers** — GPTBot,
  ClaudeBot, PerplexityBot and the rest are not blocked. That is deliberate:
  this site's job is to be found and quoted accurately by someone deciding who
  to call, and assistants are now part of that. There is nothing here to
  protect.
- Canonical URLs on every page.
- Unique transcripts and written summaries make the video pages indexable as
  text, which is the only reason a video page ranks for anything.

### 8. Content depth for AI search

Google's own position is that optimising for generative AI search is still SEO;
`llms.txt` in particular is not a ranking mechanism and has not been added. What
does carry over is substance: full transcripts, itemised transaction records
with exact figures, and objective property facts give an assistant something
specific and quotable rather than marketing adjectives.

---

## Blocked on the business owner

These are the highest-impact remaining items, and none of them can be done in
code.

| Priority | Item | Why it matters |
| --- | --- | --- |
| **Critical** | **Google Business Profile** — claim, verify, set the primary category to *Real estate agent* | The primary category is the single most important local-pack factor, and an incorrect one is the largest negative factor. Nothing on the website substitutes for this. |
| **Critical** | **NAP consistency** — the exact business name, address, and phone used on the site must match the Business Profile character for character | Discrepancies between site, schema, and profile actively suppress local ranking. The site currently publishes: Homes R Us Realty, 111 Fingerboard Road, Staten Island, NY 10305, 917-951-2142. |
| **Critical** | Approve the brokerage details in §1 of `content-verification.md` | Until then the site cannot state a licensed title, and the agent entity cannot carry an address. |
| High | **Bing Places** | Powers ChatGPT, Copilot, and Alexa. Distinct from Google and frequently skipped. |
| High | **Apple Business Connect** | Apple Maps. |
| High | **Review cadence** — a steady flow of new Google reviews rather than a burst | Review recency carries meaningful weight, and most consumers discount reviews older than a few months. Never pre-screen for satisfaction before asking — review gating breaches Google policy and FTC rules. |
| Medium | Chamber of Commerce, BBB, local press and sponsorship mentions | Local authority signals; brand mentions correlate more strongly with AI visibility than backlinks. |
| Medium | Yelp, Zillow, Realtor.com, Facebook profiles kept NAP-consistent | Tier-1 citations and sources assistants read from. |
| Medium | An approved public email address | The site currently offers only call and text. |
| Low | Data aggregators (Data Axle, Foursquare, Neustar) | Downstream distribution. |

## Deliberately not done

- **No neighbourhood landing-page farm.** Generating a page per Staten Island
  neighbourhood would produce exactly the doorway pattern described above.
  Additional area pages should be added only when there are documented
  transactions to anchor them — which is a business milestone, not a content
  task.
- **No school, crime, or demographic content**, however well it might rank. See
  `/fair-housing/`.
- **No review-count or star-rating claims** anywhere on the site or in markup.

## What this cannot measure

Rank tracking, geo-grid position, competitor gap analysis, backlink profile, and
Business Profile insights all need live data and paid tooling against a deployed
URL. This document covers what is verifiable from the source.
