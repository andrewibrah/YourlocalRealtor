# Engineering Specification

## Recommended stack

- Next.js App Router
- TypeScript with strict mode
- Tailwind CSS
- Motion for React, imported from `motion/react`
- Native HTML video with a thin custom control layer
- Zod for build-time content validation
- Static export with `output: "export"`
- GitHub Actions for CI/CD
- GitHub Pages as the only website host

Use typed local content. Do not add a runtime CMS to the GitHub Pages release.
The release must not use runtime-only Next.js features.

## Suggested application structure

```text
src/
├── app/
│   ├── (marketing)/
│   ├── buy/
│   ├── sell/
│   ├── videos/
│   ├── properties/
│   ├── results/
│   ├── about/
│   └── contact/
├── components/
│   ├── primitives/
│   ├── video/
│   ├── property/
│   ├── proof/
│   └── contact/
├── content/
├── lib/
│   ├── analytics/
│   ├── media/
│   ├── seo/
│   └── validation/
└── styles/
```

## Content schemas

### Video

- `id`
- `sourceUrl`
- `category`
- `series`
- `episode`
- `title`
- `summary`
- `durationSeconds`
- `media`
- `transcript`
- `captions`
- `poster`
- `placement`
- `cta`
- `verification`

### Proof story

- `id`
- `headline`
- `transactionType`
- `property`
- `outcome`
- `capabilities`
- `excerpt`
- `sourceAsset`
- `verification`

### Property

- `slug`
- `address`
- `neighborhood`
- `status`
- `statusAsOf`
- `price`
- `facts`
- `description`
- `media`
- `attribution`
- `inquiryDestination`

## Media architecture

- Keep source masters outside Git. Ship only the small, approved derivative set
  that fits the GitHub Pages artifact and performance budgets.
- Keep poster images in AVIF and WebP.
- Deliver MP4/H.264 and WebM where supported.
- Enable byte-range requests.
- Use a `<track kind="captions">` source.
- Render descriptive fallback content when video fails.
- Do not scrape or hotlink Instagram media.

## Contact flow

GitHub Pages is static hosting. It cannot securely execute form handlers,
Server Actions, API routes, secret-backed email delivery, CRM submission, or
rate limiting. The first release therefore contains no submission form.

Provide:

- `tel:` call link;
- `sms:` link with a short, editable starter message;
- `mailto:` link with a short, editable subject and body;
- optional approved scheduling URL;
- clear fallback copy when a device cannot open a protocol link.

Do not encode budget, address, message text, or other visitor data into
analytics. Do not add a client-side email service, exposed API key, public
database write, or form-to-email workaround.

## Analytics events

- `hero_video_play`
- `video_complete`
- `buyer_series_started`
- `buyer_series_completed`
- `budget_cta_clicked`
- `seller_cta_clicked`
- `proof_story_opened`
- `contact_panel_opened`
- `call_clicked`
- `text_clicked`
- `email_clicked`
- `schedule_clicked`

Events contain content IDs and page locations, never contact information.

## Accessibility acceptance criteria

- WCAG 2.2 AA.
- Keyboard access to every control.
- Logical focus order follows reading order.
- Visible skip link.
- One `h1` per page.
- Contact actions have descriptive accessible names and visible fallback
  details.
- Video has captions, transcript, pause, mute, and volume access.
- No content depends on autoplay.
- Screen readers receive video title, duration, and state.
- Reduced-motion mode is tested.
- 200% browser zoom and 400% text zoom preserve functionality.

## Performance budget

| Metric | Release ceiling | Internal target |
| --- | ---: | ---: |
| LCP | 2.5s | 2.0s |
| CLS | 0.10 | 0.05 |
| INP | 200ms | 150ms |
| Initial JS, gzip | 180KB | 140KB |
| Initial imagery | 1.2MB | 800KB |
| Hero loop | 3MB | 2MB |

Only the hero poster or chosen hero video receives preload priority.

## SEO

- Title template: `%s | Sharif Abdelkader — New York Real Estate`
- Local page titles name the exact neighborhood and decision.
- `RealEstateAgent`, `Person`, `BreadcrumbList`, and `Article` structured data.
- Property pages use the appropriate residence type plus `Offer`.
- Open Graph images are generated at build time from approved property media.
- Unique transcripts and written summaries make video pages indexable.
- Canonical URLs prevent duplicate property and video routes.
- Generate sitemap and robots files.

## Security

- Use OWASP ASVS 5.0 Level 1 as the minimum verification baseline, with
  targeted review for build/deployment integrity and third-party integrations.
- Use no application secrets, authentication, database, or runtime endpoints.
- Use a restrictive Content Security Policy only where it can be deployed
  without breaking the static Next.js output.
- Serve approved media from the GitHub Pages artifact only.
- Sanitize any CMS-provided rich text.
- Do not use cookies or persistent identifiers in v1.
- Add dependency, secret, static-analysis, and lockfile-integrity checks to CI.
- Generate an SBOM for releases and retain dependency provenance.
- Do not claim control of HSTS, Referrer-Policy, Permissions-Policy, framing,
  or MIME-sniffing headers on GitHub Pages; record the hosting exception.
- Keep contact data out of URLs, analytics, logs, session replay, and error
  payloads.
- Maintain a third-party dependency/integration inventory. V1 has no
  application secrets to hand off.
- Do not expose unpublished property data in static payloads.

GitHub Pages does not provide arbitrary custom HTTP response headers. This
means the full header baseline cannot be guaranteed on this hosting choice.
Compensating controls are: no sensitive data, no authentication, no forms, no
secrets, no runtime backend, minimal third-party code, HTTPS enforcement, and
a documented exception in the release record. If full custom headers become a
hard requirement, GitHub Pages alone is technically insufficient.

The complete security, privacy, incident, ownership, and release requirements
are in `09-risk-security-accessibility.md`.

## Legal/content gates

Production cannot launch until:

- license and brokerage wording are approved;
- fair-housing requirements are reviewed;
- contact consent language is reviewed;
- property media and music rights are confirmed;
- testimonials are approved for marketing use;
- transaction figures and roles are verified;
- MLS/IDX attribution is approved where applicable.
- the New York advertising checklist and required fair-housing notice/link are
  approved for the final brokerage relationship;
- privacy, retention, analytics, email, and text-consent behavior are approved.

## Definition of done

- All primary journeys work without JavaScript-enhanced animation.
- Every supplied video has a record, poster, transcript, caption file, and CTA.
- Every published proof story has verification metadata.
- No external Instagram script blocks initial rendering.
- Lighthouse and real-device tests meet the performance budget.
- Automated accessibility checks pass and manual keyboard/video testing is
  complete.
- Call, text, email, and approved scheduling actions are verified on real
  mobile and desktop devices.
