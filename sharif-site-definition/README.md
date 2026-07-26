# Sharif — Website Definition Pack

This directory is the source of truth for the first implementation of Sharif
Abdelkader's personal real-estate website.

The site is not a conventional agent brochure. It translates Sharif's
high-energy video content into a fast, credible lead-generation system:

1. **Attention:** cinematic property tours and direct social-video hooks.
2. **Education:** budget, rent-versus-buy, seller questions, and the five-part
   first-time-homebuyer sequence.
3. **Proof:** exact sale outcomes, property context, and client testimony.
4. **Conversion:** one qualified path to call, text, or request a strategy
   conversation.

The implementation also includes a controlled ingest path for Sharif's
talking-head clips, tours, and supporting footage. Originals remain immutable;
only rights-cleared, captioned, optimized derivatives ship to the website.

## Definition files

| File | Purpose |
| --- | --- |
| `docs/01-brand-strategy.md` | Positioning, audience, voice, and brand rules |
| `docs/02-site-experience.md` | Sitemap, page sections, journeys, and components |
| `docs/03-video-content-system.md` | Placement and behavior of every supplied Reel |
| `docs/04-design-system.md` | Visual language, typography, color, layout, and motion |
| `docs/05-engineering-spec.md` | Stack, architecture, accessibility, SEO, and performance |
| `docs/06-build-plan.md` | Ordered implementation plan and release gates |
| `docs/07-copy-deck.md` | Draft interface copy and CTA hierarchy |
| `docs/08-premium-motion-and-media.md` | Clip intake, cinematic concepts, and premium UI bar |
| `docs/09-risk-security-accessibility.md` | Security, accessibility, legal, and ownership minimums |
| `docs/10-agentic-skill-stack.md` | Researched agent workflow and skill-supply-chain rules |
| `docs/11-github-pages-deployment.md` | GitHub Actions and GitHub Pages deployment contract |
| `docs/12-advanced-visual-engineering.md` | Visual R&D methods, techniques, and promotion gates |
| `data/videos.json` | Build-consumable video registry |
| `data/testimonials.json` | Build-consumable proof-story registry |
| `data/media-manifest.schema.json` | Validation contract for incoming media |
| `data/release-checklist.json` | Machine-readable blocking launch gates |
| `design-tokens.json` | Build-consumable visual tokens |
| `AGENTS.md` | Instructions for coding agents working from this pack |
| `templates/github-pages/` | Build-ready static-export and Actions templates |
| `templates/agent-tools/` | Reviewed MCP configuration template; never auto-enabled |

## Non-negotiable product decisions

- The website must feel like Sharif's content, not a purchased realtor theme.
- Video is a navigation and persuasion system, not decoration.
- Never autoplay audio.
- Do not use Instagram embeds as the primary production media source. Obtain
  authorized MP4/WebM exports, captions, poster frames, and transcripts.
- Every sales statistic must have a scope and source: individual, team, or
  brokerage.
- Review screenshots are source material. The website should render accessible
  HTML excerpts rather than forcing users to read text inside an image.
- Property addresses, sale prices, photographs, logos, and reviews must be
  cleared for web publication before production launch.
- The first release is lead generation, not a replacement for a licensed IDX
  or MLS product.
- No file uploads, mortgage documents, government IDs, banking information,
  or other high-risk personal data in the first release.
- No lead-submission form in the GitHub Pages release. Conversion uses direct
  call, text, email, and an optional approved external scheduling link.
- GitHub Actions is the only deployment pipeline and GitHub Pages is the only
  website host.
- Security, accessibility, media-rights, advertising, and fair-housing review
  are launch blockers, not optional polish.

## Inputs still required before production

- Original video exports or licensed derivatives.
- Captions/transcripts for every video.
- Final brokerage and licensing language.
- Approved phone, text, email, and optional scheduling destinations.
- Logo/wordmark decision and current brokerage logo assets.
- Confirmed attribution for the three review sources.
- Verified dates, sale-price scope, list-price percentages, and transaction
  roles for every proof story.
- Approved headshots and property photography.

## Recommended repository placement

Copy this entire directory into an initialized repository under `/product`.
Keep the JSON files machine-readable and treat the Markdown files as product
requirements. Once implementation begins, move reusable JSON tokens and
content registries into the application source tree without changing their
identifiers.

Copy the contents of `templates/github-pages/` to the repository root when
scaffolding. Replace placeholders, enable GitHub Pages with **GitHub Actions**
as its source, and protect the `github-pages` environment before launch.
