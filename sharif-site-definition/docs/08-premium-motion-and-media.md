# Premium Motion and Media System

## Creative thesis

**Kinetic proof:** Sharif's camera energy earns attention; clear education
earns trust; exact outcomes earn the call. The website should feel like a
high-end editorial real-estate film cut into a decisive digital product—not a
realtor template with videos pasted into cards.

Exact clip timing, dialogue, shot selection, and transition points are
`VERIFY_FROM_MASTER` until the original media arrives.

## Source folder contract

```text
media-source/
├── talking-head/
├── tours/
├── b-roll/
├── testimonials/
├── music-cleared/
└── releases/
generated/
├── transcripts/
├── captions/
├── posters/
├── web-video/
└── motion-renders/
```

- Never modify or rename originals after manifesting them.
- Record each file in the media manifest before editing.
- `media-source/` never deploys with the application.
- Only approved derivatives from `generated/` may enter the delivery pipeline.
- Rights evidence stays private and outside the public site repository.

## Clip workflow

1. **Inventory:** hash, duration, orientation, audio, resolution, date received.
2. **Rights check:** footage, music, on-camera people, property, testimonial,
   logo, and listing/MLS permission.
3. **Transcript:** verbatim transcript plus corrected caption file.
4. **Scene map:** hooks, claims, rooms, camera moves, energy, pauses, and CTAs.
5. **Selects:** mark exact in/out timecodes; never invent a spoken claim.
6. **Storyboard:** assign each select a purpose in the customer journey.
7. **Motion build:** use Remotion for pre-rendered compositing; use CSS/Motion
   for lightweight, interactive transitions.
8. **Encode:** responsive MP4/WebM derivatives and AVIF/WebP posters.
9. **QA:** captions, keyboard controls, reduced motion, contrast, audio level,
   mobile bandwidth, poster fallback, and source verification.

## Signature experiences

### The Cut — home hero

A muted vertical talking-head hook begins in an architectural crop. On the
first intentional user action, the frame divides into two or three building
planes revealing a tour detail and a verified proof figure. Reduced motion
shows the same information as a stable editorial triptych.

### The Receipt — results

The sale-price pill is the visual anchor. It resolves into a readable outcome:
property, scope, verified transaction fact, client excerpt, and capability.
Numbers animate once, briefly, and never count from zero.

### Buyer Runway — five-part series

The homebuyer series becomes a guided sequence with episode progress, short
written summaries, transcript access, and one contextual CTA. Completion state
is local and non-identifying.

### Market Lens — decision tools

The `$500K` and buy-versus-rent content becomes a tactile comparison surface.
It teaches tradeoffs and routes to a conversation; it must not imply mortgage,
investment, appraisal, or legal advice.

### Scene-to-proof transition

A matching architectural shape or camera direction links a tour to a result
story. Use real visual continuity from the supplied footage, not artificial
3D spectacle.

## Motion rules

- Motion has one of four jobs: orient, reveal hierarchy, connect evidence, or
  confirm action.
- One signature moment per page; supporting motion remains quiet.
- 160–240ms for controls, 300–500ms for content transitions, and at most 800ms
  for the primary editorial reveal.
- Prefer transform and opacity; avoid layout-thrashing animation.
- Never autoplay audio. Never begin a second video while one is playing.
- No scroll-jacking, forced horizontal scroll, cursor hijacking, or essential
  parallax.
- `prefers-reduced-motion` removes spatial travel, looping decoration, and
  cross-page choreography without hiding content.
- Pause animation and video when offscreen or when the document is hidden.

## Premium UI acceptance bar

- No generic gradient blobs, glass-card grids, stock luxury clichés, or copied
  real-estate templates.
- Typography, crop, rhythm, and proof hierarchy must remain strong with motion
  disabled.
- Each screen has a single dominant message and a single primary action.
- Mobile is art-directed, not merely stacked desktop.
- Tour imagery stays architecturally accurate; no AI alteration of a property
  presented as documentary fact.
- Every animation maps to a content beat in the scene map.
- Placeholder media cannot survive release review.
- At least three real-device widths and a low-power/data-saver scenario pass.

## Media delivery minimums

- Do not preload a full video; preload the poster and metadata only unless
  measured evidence supports more.
- Provide width/height or aspect ratio to prevent layout shift.
- Use short, separately encoded hero loops; do not repurpose a full Reel as a
  background download.
- Captions and a readable transcript are mandatory for speech.
- Normalize loudness across edited assets and retain a mute state.
- Serve only the tightly limited approved derivative set through GitHub Pages;
  verify seeking/range behavior and caching on the production URL.
- Retain source-to-derivative traceability through the media manifest.
