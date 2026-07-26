# Design System

## Direction

**Kinetic proof.**

The interface should feel like one of Sharif's videos paused at the exact frame
where the useful fact lands. Large type, aggressive hierarchy, clear prices,
vertical media, and sharp transitions create energy. Clean grids, calm body
copy, and source-backed proof keep that energy credible.

## Visual principles

1. **Neutral field, signal color:** black and off-white carry the system;
   yellow and blue indicate action and proof.
2. **Numbers are visual objects:** prices, parts, percentages, and outcomes use
   oversized type.
3. **Media stays dominant:** interface chrome never competes with the property.
4. **Contrast over decoration:** use scale, cropping, and rhythm instead of
   luxury ornament.
5. **Proof remains readable:** review text is HTML, not baked into screenshots.

## Palette

| Token | HEX | Role |
| --- | --- | --- |
| `ink` | `#0B0D10` | Primary text and dark surfaces |
| `paper` | `#F7F7F2` | Main light surface |
| `white` | `#FFFFFF` | Cards and inverse text |
| `signal-yellow` | `#FFC928` | Active markers, prices, episode progress |
| `action-blue` | `#155EEF` | Links, primary actions, proof ratings |
| `blue-dark` | `#0B2B63` | Dark action state |
| `gray-100` | `#ECEDE8` | Quiet surface |
| `gray-300` | `#C9CBC5` | Borders |
| `gray-600` | `#626660` | Secondary text |
| `success` | `#18794E` | Completed and confirmed |
| `warning` | `#A15C00` | Pending and time-sensitive |
| `danger` | `#B42318` | Error |

Usage ratio:

- 44% paper/white
- 36% ink
- 10% gray
- 6% action blue
- 4% signal yellow

Yellow is a signal, not a background for entire sections.

## Typography

### Families

- Display: `Sora`, 700–800
- Heading/body: `Inter`, 400–700
- Data: `IBM Plex Mono`, 500–600

### Scale

| Token | Mobile | Desktop | Use |
| --- | --- | --- | --- |
| `display-xl` | 56px | 104px | Hero |
| `display-lg` | 48px | 80px | Major proof/output |
| `heading-xl` | 40px | 64px | Page sections |
| `heading-lg` | 32px | 48px | Feature titles |
| `heading-md` | 24px | 32px | Cards |
| `body-lg` | 18px | 20px | Lead copy |
| `body` | 16px | 16px | Default |
| `caption` | 13px | 13px | Metadata/legal |

- Display line height: `0.94–1.02`.
- Heading line height: `1.08–1.2`.
- Body line height: `1.55–1.7`.
- Use uppercase only for labels under 24 characters.

## Grid and spacing

- Base spacing unit: 4px.
- Mobile: 4 columns, 20px gutters.
- Tablet: 8 columns, 32px gutters.
- Desktop: 12 columns, 48px gutters.
- Maximum content width: 1440px.
- Maximum reading width: 720px.
- Section spacing: 72px mobile; 112–160px desktop.
- Allow property media to break the content grid but not the viewport.

## Shape

- Buttons: 8px radius.
- Cards: 12px radius.
- Large media: 16px radius or square when full-bleed.
- Pills: 999px.
- Borders: 1px, high enough contrast to remain visible.
- Avoid glassmorphism and heavy shadows.

## Review treatment

The source screenshots establish four useful visual patterns:

- a yellow outcome marker;
- oversized sale price;
- property photography as context;
- blue rating/proof cues.

Translate them into an accessible `ProofStory`:

```text
[Sold outcome] [Capability tags]

$1,960,000
2031 60th St, Brooklyn

"Short verified client excerpt..."

[Read the case study] [View source review]
```

Do not duplicate the screenshot's long translucent text panel as the primary
interface. It is hard to scan and produces inconsistent contrast.

## Motion

### Durations

- instant: 80ms
- fast: 160ms
- standard: 240ms
- feature: 420ms
- cinematic: 700ms maximum

### Easing

- enter: `cubic-bezier(0.16, 1, 0.3, 1)`
- exit: `cubic-bezier(0.7, 0, 0.84, 0)`
- emphasis: `cubic-bezier(0.34, 1.56, 0.64, 1)`

### Patterns

- Clip or mask reveal for section titles.
- 8–16px translation for supporting content.
- Numeric count-up only when the number is verified and visible without
  animation.
- Poster-to-player shared-layout transition.
- Fast active-line movement in navigation.
- No scroll-jacking.
- No automatic carousels.
- No continuous element movement outside a playing video.

### Reduced motion

- Remove transforms, masks, count-ups, and shared-layout animation.
- Preserve state change through opacity and instant layout.
- Never suppress content.

## Iconography

- Use one 1.75px rounded-line set.
- No roof, key, handshake, or generic skyscraper brand mark.
- Status indicators may use the yellow-dot pattern from the review graphics.

## Focus and accessibility

- Focus ring: 3px `action-blue` plus 2px offset.
- Text contrast meets WCAG 2.2 AA.
- Yellow is never used alone to communicate status.
- Touch targets are at least 44×44px.
- Captions and transcript controls remain visible over all video backgrounds.

