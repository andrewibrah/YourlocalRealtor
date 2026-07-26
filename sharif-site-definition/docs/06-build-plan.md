# Build Plan

## Phase 0 — Source verification

1. Obtain original video exports.
2. Transcribe and title every video.
3. Confirm the five-part series order and episode topics.
4. Select the strongest property-tour hero.
5. Verify every review excerpt and transaction detail.
6. Confirm rights, brokerage, license, and contact information.
7. Inventory every supplied clip using `data/media-manifest.schema.json`.
8. Confirm music, talent, property, testimonial, and photography permissions.

**Gate:** no production claims or media without source status.

## Phase 1 — Foundation

1. Scaffold Next.js and TypeScript.
2. Configure Tailwind theme variables from `design-tokens.json`.
3. Configure fonts and base styles.
4. Create route structure.
5. Add linting, formatting, unit testing, and CI.
6. Add content-schema validation.
7. Configure security headers, dependency scanning, secret scanning, SAST, and
   an SBOM job.

**Gate:** clean build, strict type check, and token-driven sample page.

## Phase 2 — Primitives

1. Buttons, links, badges, labels, and data typography.
2. Contact-action links, protocol fallbacks, and unavailable states.
3. Poster image and responsive image component.
4. Video-player shell.
5. Status and progress indicators.
6. Focus and reduced-motion behavior.

**Gate:** Storybook or component-route review at mobile and desktop sizes.

## Phase 3 — Core journeys

1. Global navigation and mobile action bar.
2. Home-page video hero.
3. Decision rail.
4. First-time-buyer player.
5. Property-tour feature.
6. Proof-story components.
7. Contact-action panel.

**Gate:** Home, Buy, and Sell journeys usable with placeholder media but real
content structure.

## Phase 4 — Content routes

1. Videos library and detail behavior.
2. Results page and case-study template.
3. Curated property index and detail template.
4. About and Contact.
5. Legal and brokerage-notice routes.

**Gate:** every sitemap route exists and has final content ownership.

## Phase 5 — Media integration

1. Encode responsive video derivatives.
2. Generate poster frames.
3. Add captions and transcripts.
4. Replace placeholder content with verified assets.
5. Implement lazy loading and single-player coordination.
6. Verify mobile data and low-power behavior.
7. Build the approved signature transitions and pre-rendered motion assets.
8. Review every motion treatment with captions and reduced motion enabled.

**Gate:** video experience meets performance and accessibility budgets.

## Phase 6 — Conversion

1. Add Call, Text, Email, and optional scheduling links.
2. Add editable starter copy without prefilled sensitive details.
3. Add privacy-safe, cookieless analytics only if approved; default is none.
4. Verify protocol handling and visible fallbacks.
5. Confirm no visitor-entered or contact data reaches analytics or URLs.

**Gate:** every contact path works on real mobile and desktop devices without a
submission form, client-side email service, API key, or public database write.

## Phase 7 — QA and launch

1. Keyboard and screen-reader review.
2. Reduced-motion review.
3. Contrast and zoom review.
4. Core Web Vitals testing.
5. Metadata and structured-data validation.
6. Link, protocol-handler, and media failure testing.
7. Legal/content approval.
8. OWASP ASVS control review and abuse testing.
9. Dependency/provenance, secret, and static-analysis review.
10. Media-rights and music-rights sign-off.
11. New York advertising and fair-housing sign-off.
12. Premium UI review against `08-premium-motion-and-media.md`.
13. Staging sign-off by code owner and business owner.
14. GitHub Actions deployment to the protected `github-pages` environment.
15. Restore the previous Pages artifact or revert-and-redeploy as the rollback
    drill.

**Gate:** every blocking item in `data/release-checklist.json` is marked
`passed` with an owner and evidence. A waiver must be written, time-limited,
and accepted by both owners; legal or accessibility blockers are not silently
waived.

## First-release exclusions

- User accounts.
- Saved-property synchronization.
- Unlicensed listing search.
- Mortgage qualification or rate promises.
- Automated valuation claims.
- Chatbot.
- Background audio.
- More than one playing video.
- File uploads or collection of mortgage/identity documents.
- Public admin panels.
- API routes, Server Actions, runtime middleware, or hidden backend
  dependencies.

These features add risk before they add leverage.
