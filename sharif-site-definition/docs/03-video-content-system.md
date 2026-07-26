# Video Content System

## Strategic rule

The website must not flatten Sharif's videos into a row of Instagram embeds.
Each video has a job in the conversion system.

## Supplied video map

| ID | Supplied purpose | Primary placement | Website function |
| --- | --- | --- | --- |
| `DDXoM1aS-mn` | What a $500K budget can buy | Home + `/buy/budget` | Turn affordability curiosity into a buyer inquiry |
| `DDf1RVvOpQS` | Buying versus renting | Home decision rail + `/buy/buy-vs-rent` | Help undecided visitors choose the next analysis |
| `DDLVnpxuuJH` | Questions for sellers | Home + `/sell` | Prequalify seller concerns and open the seller funnel |
| `DBKJwTvSq9N` | First-time buyer, part 1 | `/buy/first-home` | Episode 1 of the guided buyer sequence |
| `DBPQjg1SV8K` | First-time buyer, part 2 | `/buy/first-home` | Episode 2 of the guided buyer sequence |
| `DBed1EYS4NY` | First-time buyer, part 3 | `/buy/first-home` | Episode 3 of the guided buyer sequence |
| `DBwbtSAOtJq` | First-time buyer, part 4 | `/buy/first-home` | Episode 4; indexed caption references mortgage-rate comparison |
| `DCQK966oY-E` | First-time buyer, part 5 | `/buy/first-home` | Episode 5 and series completion CTA |
| `C__YRbnS0O0` | Property tour | Home hero candidate + `/properties` | Establish visual intensity and listing-marketing capability |
| `DYPukf6B_rU` | Property tour | Home tour feature + `/properties` | Showcase production style and property |
| `DYPvQxZBiiC` | Property tour | Home tour feature + `/properties` | Showcase production style and property |
| `DZV7SoHhOTt` | Property tour | Home tour feature + `/properties` | Verified indexed title references 1 McClean Avenue |

## Verification status

Instagram playback was not available through the public index. User-supplied
purposes and link order are canonical for this definition pack. Exact hooks,
spoken wording, shot sequence, transitions, music, property facts, duration,
and episode titles remain `VERIFY_FROM_MASTER`.

Do not invent missing episode topics during implementation.

## Required media package per video

```text
video-id/
├── master.mp4
├── web-1080.mp4
├── web-720.mp4
├── web-720.webm
├── poster.avif
├── poster.webp
├── captions.vtt
├── transcript.md
└── metadata.json
```

## Player behavior

- Native player shell; no default browser controls until playback begins.
- Custom play, pause, mute, captions, progress, and fullscreen controls.
- Every control is keyboard accessible and visibly labeled.
- Muted autoplay is allowed only for the chosen hero derivative.
- All educational videos are click-to-play.
- Pause video when it leaves the viewport.
- Never run more than one video simultaneously.
- Preserve captions by default when audio begins muted.
- Store episode completion locally; do not require an account.
- Provide a visible transcript accordion.

## Motion translation

The site should inherit the videos' energy through:

- hard typographic entrances;
- quick mask reveals;
- oversized prices and episode numbers;
- snap-to-state transitions;
- poster frames with motion cues;
- full-bleed property moments;
- editorial cuts between dark and light sections.

The site must not imitate video editing with scroll-jacking, constant zoom,
shaking text, or background audio.

## Video card anatomy

1. 9:16 poster.
2. Topic label.
3. Direct title.
4. Duration.
5. One-sentence outcome.
6. Play control.
7. Transcript control.
8. Contextual CTA.

## CTA mapping

| Video category | CTA |
| --- | --- |
| Budget | `Build my buying range` |
| Buy versus rent | `Compare my situation` |
| First-time buyer | `Continue to the next step` |
| Seller questions | `Get a seller plan` |
| Property tour | `Ask about this property` or `Market my property like this` |

## Performance constraints

- Hero loop: target under 3 MB and under 12 seconds.
- Initial page load: poster only for every non-hero video.
- Video modules load source files only after interaction or near-viewport
  intent.
- Serve correct MIME types and byte-range requests.
- GitHub Pages caching is the only delivery layer; measure repeat and cold-load
  behavior on the production Pages URL.
- Do not load Instagram's embed script above the fold.

## Rights and compliance

- Confirm Sharif owns or controls web-use rights to footage, music, voice,
  property images, and editing elements.
- Replace platform-licensed music when web rights do not transfer.
- Preserve fair-housing compliance in captions and property descriptions.
- Do not imply current availability for an old property tour.
- Show an "as of" date beside price, status, and market claims.
