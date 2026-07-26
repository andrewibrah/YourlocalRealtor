# Site Experience Specification

## Experience model

The home page follows a deliberate sequence:

```text
Impact → Relevance → Education → Proof → Conversion
```

Video earns attention. Structured information makes it useful. Exact outcomes
remove doubt. The CTA converts the visitor while intent is clear.

## Sitemap

```text
/
├── buy
│   ├── first-home
│   ├── budget
│   └── buy-vs-rent
├── sell
├── videos
├── properties
│   └── [slug]
├── results
│   └── [case-study-slug]
├── about
├── contact
├── privacy
├── accessibility
└── brokerage-notices
```

`/properties` is curated until an approved IDX/RESO feed exists.

## Home page

### 1. Video hero

**Purpose:** establish Sharif's pace and point of view immediately.

Content:

- optimized cinematic-tour clip;
- compact wordmark;
- headline: "Know the move before you make it.";
- one-line local positioning;
- primary CTA: "Plan my move";
- secondary CTA: "Watch the tours";
- muted/sound control with explicit state.

Behavior:

- desktop may use a muted looping montage under 3 MB;
- mobile loads a poster first and video only after interaction or sufficient
  connection conditions;
- never autoplay sound;
- no Instagram UI chrome in the hero.

### 2. Decision rail

Four fast entry points:

- What $500K buys
- Buy or rent
- First home
- Selling questions

Each card uses a short video poster, one-sentence value statement, and a
specific next action.

### 3. What a budget buys

Feature the `DDXoM1aS-mn` video beside structured property examples.

Content slots:

- budget amount;
- representative property type;
- neighborhood;
- bedroom/bath range;
- estimated cash-to-close disclaimer;
- timestamp indicating when the example was recorded.

The section is educational, not a live affordability guarantee.

### 4. First-time-buyer sequence

Five-step vertical stepper on mobile and split-screen playlist on desktop.

Each step contains:

- episode number;
- verified title;
- 20–40 word summary;
- vertical-video player;
- transcript;
- "What to do next" action;
- progress state stored locally.

### 5. Cinematic property tours

Full-bleed, editorial property modules using the four supplied tour Reels.

Each module:

- poster or short hover preview;
- address/neighborhood when verified;
- property type;
- price/status as of a stated date;
- 2–3 notable facts;
- full video;
- property-specific inquiry CTA.

### 6. Proof stories

Three asymmetric cards using the supplied review material:

- `$960,000` — seller rescue and hands-on process support;
- `$1,299,999` — competitive buyer win and financing guidance;
- `$1,960,000` — seller result and coordinated next purchase.

Display the short excerpt as HTML. Place the original screenshot behind a
"View source review" disclosure rather than using it as the readable interface.

### 7. Seller questions

Use `DDLVnpxuuJH` as the lead-in to a concise seller FAQ:

- price and preparation;
- timing;
- marketing;
- showings;
- offers and negotiation;
- buying the next home.

CTA: "Get a seller plan."

### 8. Closing conversion

Headline: "Make the next move with a plan."

Show:

- Buy
- Sell
- Buy and sell
- Still deciding

Then route to the contact-action panel.

## Buy page

1. Buyer-focused video hero.
2. First-time-buyer five-part series.
3. What a budget buys.
4. Buy-versus-rent decision section.
5. Buyer process.
6. Competitive-offer proof story.
7. Mortgage/provider disclaimer.
8. Buyer contact-action panel.

## Sell page

1. Seller-focused direct-response hero.
2. Seller-questions video.
3. Pricing and positioning framework.
4. Property-marketing system using tour examples.
5. Negotiation and offer-management approach.
6. Two seller proof stories.
7. Sell-and-buy coordination.
8. Seller contact-action panel.

## Videos page

This is a searchable learning library, not a social feed mirror.

Filters:

- Buying
- Selling
- First home
- Property tours
- Market decisions

Every item includes a title, written summary, transcript, duration, publish
date, topic, and relevant CTA.

## Results page

Use case studies rather than a wall of screenshots.

Case-study template:

1. Outcome.
2. Situation.
3. Constraints.
4. Sharif's actions.
5. Result.
6. Client excerpt.
7. Source and verification notes.

## About page

The About page explains operating philosophy, not a long biography:

- direct communication;
- local judgment;
- education before pressure;
- process control;
- negotiation;
- current brokerage relationship and credentials.

## Component inventory

### Primitives

- `Button`
- `IconButton`
- `TextLink`
- `Badge`
- `Price`
- `Stat`
- `Input`
- `Select`
- `Textarea`
- `Checkbox`
- `PosterImage`
- `VideoControl`
- `ProgressIndicator`

### Composed

- `GlobalHeader`
- `MobileActionBar`
- `VideoHero`
- `VideoCard`
- `VideoPlayer`
- `VideoTranscript`
- `DecisionCard`
- `BuyerSeries`
- `PropertyTourFeature`
- `PropertyFacts`
- `ProofStory`
- `ReviewSourceDisclosure`
- `ContactActionPanel`
- `FAQ`
- `GlobalFooter`

### States

- default
- hover
- focus-visible
- active
- disabled
- loading
- unavailable
- copied
- poster
- playing
- paused
- muted
- captions-on
- completed
- sold
- pending
- under-contract

## Responsive rules

- Mobile is the canonical experience because the source material is vertical.
- Vertical videos remain 9:16 and never receive destructive center crops.
- At `768px`, video and transcript may form a 5/7 split.
- At `1024px`, property tours may use full-width cinematic modules.
- The mobile action bar exposes Call, Text, and Plan without covering captions.
- No information exists only on hover.
- Text never overlays the visually dense portion of a property video without a
  tested contrast scrim.
