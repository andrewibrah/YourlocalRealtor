# Creative Direction

Brand truth (fixed, from `sharif-site-definition/docs/01-brand-strategy.md` and
`08-premium-motion-and-media.md`): **Kinetic proof.** Sharif's camera energy earns attention, clear
education earns trust, exact outcomes earn the call.

Three directions were developed against that same truth. They were not merged. One was promoted.

---

## Material reality that constrained the decision

This is the single most important input, and it is recorded here because it changes what a
responsible direction looks like.

At the time of this build the repository contains:

- **Zero video files.** `data/videos.json` holds twelve Instagram reel IDs. Doc 03 states plainly
  that "Instagram playback was not available through the public index" and that hooks, wording,
  shot sequence, transitions, music, property facts, duration, and episode titles are all
  `VERIFY_FROM_MASTER`. Scraping and hotlinking are prohibited.
- **Zero property photographs.**
- **Zero approved headshots.**
- **Three review screenshots** (`assets/reviews/*.jpeg`) carrying three verified-by-transcription
  proof stories with exact addresses and sale amounts, all marked
  `TRANSCRIBED_FROM_USER_SUPPLIED_SCREENSHOT_REQUIRES_APPROVAL`.
- **Placeholder contact destinations** (`.env.example` ships `+10000000000`).

A direction that depends on footage to be legible would be a direction that cannot be shipped,
reviewed, or shown to Sharif today. It would also be a direction that quietly invites fabrication —
inventing a summary, a duration, a property fact — which the requirements pack treats as a hard
failure.

So the promotion criterion carried an extra, decisive weight: **the direction must be at full
strength with type, structure, and verified numbers alone, and must get stronger — not merely
"complete" — when the licensed footage lands.**

---

## Direction A — "The Cut"

The concept named in `docs/08-premium-motion-and-media.md`.

| Aspect | Definition |
| --- | --- |
| Core visual metaphor | A film frame splitting along architectural planes |
| Hero composition | Full-bleed muted vertical talking-head crop; on first intentional interaction the frame divides into two or three building planes revealing a tour detail and a proof figure |
| Type treatment | Sora 800 set inside the mask geometry; type is subordinate to the image |
| Media treatment | Footage is the substrate; every section is a frame or a cut between frames |
| Signature interaction | Clip-path plane split driven by `clip-path` + `transform` |
| Proof presentation | A proof figure is revealed *inside* the split, as the payoff of the cut |
| Mobile behavior | Vertical crop is native; split becomes a two-plane vertical wipe |
| Conversion behavior | CTA rides the revealed plane |
| Accessibility fallback | Reduced motion renders a stable editorial triptych with identical information |
| Performance risk | High. Hero video is on the LCP path. 3 MB hero ceiling is the whole budget. |
| Why it belongs to Sharif | It is literally his edit grammar translated to UI |

**Fatal problem:** with no footage, the hero is an empty mask. The reduced-motion "triptych"
fallback is three empty rectangles. The direction has no state in which it can be reviewed today,
and it offers no honest way to represent a video that does not yet exist.

## Direction B — "The Ledger"

| Aspect | Definition |
| --- | --- |
| Core visual metaphor | A closing statement / transaction record |
| Hero composition | No media. A full-page typographic record: outcome lines stacked as ledger rows |
| Type treatment | IBM Plex Mono dominant; Sora only for the promise line |
| Media treatment | Media is evidence attached to a row, never the substrate |
| Signature interaction | Rows expand in place into full case studies |
| Proof presentation | The entire site *is* the proof presentation |
| Mobile behavior | Single-column rows; excellent |
| Conversion behavior | A persistent "Plan my move" row pinned to the ledger foot |
| Accessibility fallback | Trivially strong — it is a document |
| Performance risk | Very low |
| Why it belongs to Sharif | It leads with his three verified outcomes |

**Fatal problem:** it wins on honesty and loses on truth. Sharif's actual differentiator is
*velocity and visual point of view*, not accountancy. Doc 01 explicitly warns against sterilizing
that energy, and doc 04 asks for energy from scale, cropping, and rhythm. A ledger is calm. It
would also age into looking like a fintech landing page — an interchangeable one.

## Direction C — "Call Sheet" — **PROMOTED**

| Aspect | Definition |
| --- | --- |
| Core visual metaphor | A production call sheet / shot list. Sharif's output genuinely *is* a numbered sequence of vertical films and a numbered set of closed transactions. The site adopts the document his own work already produces. |
| Hero composition | Ink field. `display-xl` promise line set against a 9:16 media column on the right (desktop) / above (mobile). A mono metadata strip runs the full width beneath: coverage area, brokerage line, verification status, "as of" date — exactly like a slate. |
| Type treatment | Sora 800 for promise and section titles; Inter for reading; IBM Plex Mono carrying every number, index, address, status, and date. Indices (`[01]`…) are set as real content, not decoration. |
| Media treatment | Everything vertical stays 9:16 and is never centre-cropped. The 9:16 column is the site's structural unit at every breakpoint. |
| Signature interaction | **The Rail** — a persistent index rail with a `signal-yellow` position marker that snaps between sections as you scroll, driven by `IntersectionObserver`. It is a scrubber for the page. It is real navigation: every entry is a focusable link, the marker is paired with a text label and `aria-current`, and it is never the only carrier of state. |
| Proof presentation | **The Receipt** — sale price in oversized mono as the visual anchor, resolving into outcome / situation / role / client excerpt / source. The source screenshot sits behind a disclosure; the readable text is HTML. |
| Mobile behavior | Art-directed, not stacked: the rail becomes a horizontal scroll-snapped index under the header, the 9:16 column becomes full-bleed, and the action bar exposes Call / Text / Plan without covering captions. |
| Conversion behavior | "Plan my move" is a real link to `/contact/` that progressively upgrades into a native `<dialog>`. It works with JavaScript disabled. |
| Accessibility fallback | Reduced motion: the marker cuts instead of sliding, reveals resolve instantly. Nothing is hidden. No information is carried by yellow alone. |
| Performance risk | Very low. Zero animation libraries. CSS transitions plus one `IntersectionObserver`. |
| Why it belongs to Sharif | The numbered five-part series, the numbered tours, and the three exact outcomes are already a call sheet. The direction does not decorate his work; it reads its structure back to him. |

---

## Scoring

Scored 1–10. Higher is better.

| Criterion | A — The Cut | B — The Ledger | C — Call Sheet |
| --- | ---: | ---: | ---: |
| Sharif specificity | 9 | 5 | 9 |
| Immediate clarity | 5 | 8 | 9 |
| Originality | 7 | 6 | 8 |
| Premium perception | 8 | 6 | 9 |
| Mobile impact | 7 | 7 | 9 |
| Accessibility | 5 | 10 | 9 |
| Performance | 3 | 10 | 9 |
| Maintainability | 4 | 9 | 8 |
| Conversion strength | 6 | 7 | 9 |
| Template resistance | 8 | 5 | 9 |
| **Total** | **62** | **73** | **88** |

## Decision

**Direction C — "Call Sheet" is promoted.** A and B are rejected outright and no element of either
is blended in.

The deciding argument is not the total. It is that C is the only direction whose *core idea is
structural rather than material*. Its distinctiveness comes from the index, the 9:16 unit, the mono
data spine, and the rail — all of which are fully present today with no footage at all. When
licensed exports arrive they drop into slots that were designed around their real aspect ratio, and
the direction gets stronger without being redesigned.

Direction A's idea is a good idea that this project cannot honestly execute yet, and executing it
badly with grey boxes would be worse than not executing it.

## What "The Cut" contributes without being blended in

Nothing visual. The one thing carried forward is a *constraint*, not a treatment: the hero media
slot is authored as a 9:16 masked column with a documented reduced-motion end state, so that if
Sharif later approves the plane-split treatment it can be added inside that slot without touching
the page architecture. That is a forward-compatibility note, not a compromise.

## Handling of missing media — the "Film Slate"

Because placeholder media cannot survive release review (`docs/08`, "Premium UI acceptance bar"),
missing footage is **not** represented by a grey box, a spinner, or a stock image.

Every unreleased video renders a **Film Slate**: a composed 9:16 editorial card built purely from
CSS and real metadata — index number, canonical topic, series, status, and the mono legend
`AWAITING LICENSED MASTER`. It is honest (it does not pretend to be a frame of the video), it is
designed (it reads as an intentional production artifact, consistent with the call-sheet metaphor),
and it is accessible (its state is text, not colour).

The slate carries a link to the original Instagram post as *attribution and provenance* — a plain
outbound anchor. No embed script, no scraped media, no hotlinked video, nothing above the fold.

When a video's record gains a `media` block, the same component renders the real player instead.
No page changes.

## Rejected techniques and why

| Technique | Verdict |
| --- | --- |
| WebGL / React Three Fiber | Rejected. There is no spatial content to justify it. Doc 12: "Skipping directly to WebGL is not sophistication. It is usually undisciplined cost." |
| GSAP | Rejected. Nothing here needs a timeline that CSS cannot express. |
| `motion` / Motion for React | Rejected **and removed from `package.json`**. It was in the scaffold's dependencies and unused. Every transition in this direction is a CSS transition on `transform`/`opacity`/`clip-path`. Keeping an unused ~34 KB animation library would violate the no-dead-dependencies rule and spend budget on nothing. If a future shared-layout poster→player transition needs it, reinstate it deliberately with a recorded reason. |
| Scroll-driven CSS animations (`animation-timeline`) | Rejected for now. Support is uneven across the target set and the rail's `IntersectionObserver` is smaller, testable, and degrades to "no marker movement" rather than "no reveal". |
| Numeric count-up on prices | Rejected. Doc 04 permits it only when the number is verified and visible without animation; these figures are pending approval, and a counting sale price reads as salesmanship on exactly the content that must read as evidence. |
| Parallax, carousels, cursor effects, gradient blobs, glass cards | Rejected by the pack and by the anti-generic gate. |

## Anti-generic check

Remove Sharif's name and the direction still cannot be resold, because its structure is derived
from three things specific to him: a five-part numbered education series, a set of vertical property
films, and three exact New York transaction outcomes. Delete those and the call sheet has nothing to
index — the layout stops making sense rather than degrading into a usable template.
