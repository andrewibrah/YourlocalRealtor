# Content verification register

Every factual claim on this site, what it rests on, and what is still needed
before it can be treated as approved.

`sharif-site-definition/AGENTS.md` requires unresolved verification state to be
*visibly tracked* and to never become a public factual claim. This file is the
tracking. The user-facing half is the provisional marker rendered beside each
claim on the page itself.

**Nothing on this site is currently marked `verified`.** That is enforced by a
test (`tests/unit/content-compliance.test.ts`), so flipping any record to
`verified` is a deliberate act that requires a corresponding evidence entry
here.

---

## 1. Blocking before this site is used as New York advertising

| # | Item | Owner | Status |
| --- | --- | --- | --- |
| 1 | Sharif's **licensed title**, in the exact wording the licence permits | Business | Outstanding |
| 2 | **Licence number**, if required to be displayed in this context | Business | Outstanding |
| 3 | Sign-off against the current NY Department of State real-estate advertising checklist | Business / counsel | Outstanding |
| 4 | Exact required **fair-housing notice** wording and official Equal Housing Opportunity artwork | Business / counsel | Outstanding |
| 5 | **Written permission** to reuse the three client reviews in marketing | Business | Outstanding |
| 6 | **Rights confirmation** for all supplied video, including music used in the edits | Business | Outstanding |
| 7 | Approved **public email address** | Business | Outstanding |
| 8 | Transaction role on **181 Meisner Ave** — see §4 | Business | Outstanding, conflicting sources |

Items 1–6 are launch blockers. The site is complete as a build; it is **not
cleared as advertising** until they are resolved.

## 2. Confirmed and in use

These came from Sharif's own published listing captions
(`sharif-site-definition/assets/videos/videos.md`) and are treated as
business-supplied fact.

| Fact | Value | Source |
| --- | --- | --- |
| Brokerage | Homes R Us Realty | Listing caption, 1 McClean Avenue |
| Office address | 111 Fingerboard Road, Staten Island, NY 10305 | Listing caption |
| Business telephone | 917-951-2142 | Listing caption |
| Coverage | Staten Island, Brooklyn | Transactions documented in both |

## 3. Video

Eleven masters were supplied. All are vertical 9:16 with an audio track.

**Captions and transcripts were generated from the audio of the masters**
using `faster-whisper` (`small.en`) via `scripts/transcribe.py`. They are not
written from post captions, which `docs/03` prohibits.

> **They are machine transcriptions and have not been read against the film.**
> Speech-to-text reliably mishears exactly the things on this site that must not
> be wrong. One confirmed example: the transcript of `why-me` renders "Brehaut"
> as **"Bregaud"**. Every transcript needs a human pass before its record moves
> to `verified`.

| Slug | Master supplied | Playable | Verification |
| --- | --- | --- | --- |
| `why-me` | Yes | Yes | `awaiting-approval` |
| `budget-500k` | Yes | Yes | `awaiting-approval` |
| `buy-vs-rent` | Yes | Yes | `awaiting-approval` |
| `first-home-01`…`05` | Yes | Yes | `awaiting-approval` |
| `tour-14-ottavio-promenade` | Yes | Yes | `awaiting-approval` |
| `tour-10-seidman-ave` | Yes | Yes | `awaiting-approval` |
| `brand-film` | Yes | Yes | `awaiting-approval` |
| `seller-questions` | **No** | No — renders a slate | `public-index-only` |
| `tour-1-mcclean-avenue` | **No** | No — renders a slate | `public-index-only` |

### Outstanding video items

1. **`1mcClean.mp4` is referenced in `videos.md` but was not supplied.** The
   listing caption is rich, so the property has a full record; the film itself
   renders as a Film Slate until the master arrives.
2. **`seller-questions` (reel `DDLVnpxuuJH`)** — no master supplied.
3. **Three previously listed reels were dropped from the library**
   (`C__YRbnS0O0`, `DYPukf6B_rU`, `DYPvQxZBiiC`). No master, no caption, no
   title — nothing was known about them beyond a URL, and three cards reading
   "Property film — one/two/three" added no value. They can be restored the
   moment masters exist.
4. **Filename/caption mismatch.** The master is named
   `4OttavioPromenade,-1.mp4` while its caption says **14** Ottavio Promenade.
   The caption was treated as authoritative. Confirm the address.
5. **Music rights.** Several edits carry music. Instagram's licence does not
   transfer to a website. This is blocking item 6 above.
6. **`4OttavioPromenade,.mp4` and `4OttavioPromenade,-1.mp4`** are near-identical
   duplicates. Only `-1` was used.

## 4. The 181 Meisner Avenue conflict — unresolved

Two supplied sources describe the same property differently.

- **The client review** reads from the buyer's side: *"I nearly lost the
  property I had my heart set on in a bidding war… Thank you Sharif for getting
  us our beautiful home."*
- **Sharif's own film (`why-me`)** describes the listing side: *"181 Meisner
  Avenue, this homeowner hired two different realtors for way over a year… I was
  able to relist for the same price… and get over 10 offers within 30 days on
  the market, selling it for 100% of the list price."*

Both can be true — but the transaction role is not established by either.

**How the site handles it:** the property record no longer asserts a
"Represented" role at all. The proof story retains the client's own words
unaltered. The facts now shown (over 10 offers within 30 days, 100% of list
price) come from Sharif's film. **Do not resolve this by choosing the more
flattering reading.** It needs a factual answer.

## 5. Client reviews

Three reviews, published on Sharif's agent review profile (`shfkader123`),
transcribed directly from the supplied screenshots.

| Property | Amount | Verification |
| --- | --- | --- |
| 327 Brehaut Ave, Staten Island NY 10307 | $960,000 | `awaiting-approval` |
| 181 Meisner Ave, Staten Island NY 10306 | $1,299,999 | `awaiting-approval` |
| 2031 60th St, Brooklyn NY 11204 | $1,960,000 | `awaiting-approval` |

Outstanding:

1. **Written permission** for marketing use (blocking item 5).
2. **Closing dates.** None of the screenshots show one, so no property record
   states a date. Every price is rendered with "Status as of: date pending
   confirmation" rather than dropping the qualifier.
3. **Review platform.** The interface is consistent with Zillow's agent review
   widget, but the site does not name a platform because that was not confirmed.
4. **MLS attribution.** The property photographs inside the screenshots carry a
   Multiple Listing Service credit. They are reproduced only as part of the
   unaltered source image, behind a disclosure, and are never extracted or
   reused. Confirm this is acceptable to the MLS.

## 6. Marketed listings

Prices and facts from Sharif's published listing captions.

| Property | Marketed at | Verification |
| --- | --- | --- |
| 14 Ottavio Promenade, Tottenville | $3,098,888 | `awaiting-approval` |
| 10 Seidman Avenue, Annadale | $1,299,999 | `awaiting-approval` |
| 1 McClean Avenue, Fort Wadsworth | $1,299,998 | `public-index-only` |

**No publication date is known for any of them**, so no "as of" date can be
shown. Every listing renders an availability caveat by construction — the
content layer returns it and the component cannot omit it.

### Caption language deliberately not reproduced

| Phrase | Why |
| --- | --- |
| "one of Staten Island's most desirable neighborhoods" | Subjective neighbourhood characterisation — steering risk |
| "quiet, tree-lined street" | Same |
| "unlock approximately 500,000 in potential equity" | Speculative return claim; `docs/09` bars implying investment return or valuation |
| "minutes from … schools" | School-proximity language invites exactly the inference fair-housing rules exist to prevent |

A regression test asserts these categories stay out of the content layer.

## 7. Aggregate figures

The home page and About page show **"Combined, these three: $4,219,999"**.

This is the exact sum of the three documented transactions, labelled with its
scope, and it links to the page that itemises them. It is **not** a career
total, a team figure, or a brokerage figure, and it must never be relabelled as
one — `docs/01` rules out leading with an unscoped lifetime-sales number.

## 8. What the site deliberately does not claim

- No years of experience, client count, transaction count beyond the three
  documented, awards, or rankings.
- No `aggregateRating` structured data. Three owner-selected screenshots are
  not an aggregate of all reviews, and marking them up as one would
  misrepresent them to search engines.
- No email address, because none has been approved.
- No office address in structured data, because the brokerage relationship has
  not been confirmed as approved for advertising. The site is modelled as a
  service-area business instead.
- No school, crime, demographic, or lifestyle claims about any area.

## 9. Sign-off

| Gate | Owner | Status | Evidence |
| --- | --- | --- | --- |
| Content verification | Business | Not started | — |
| Media and music rights | Business | Not started | — |
| Brokerage / advertising / fair housing | Business + counsel | Not started | — |
| Testimonial permission | Business | Not started | — |
| Transcript accuracy review | Business | Not started | — |
