# Agent Instructions

This directory is the product source of truth. Before writing application code,
read `README.md`, all files in `docs/`, `design-tokens.json`, and the data
schemas. Do not infer missing claims, rights, transcripts, brokerage language,
or property facts.

## Required workflow

1. Validate inputs and preserve original media.
2. Build from tokens and typed content, never hard-coded visual drift.
3. Treat `VERIFY_FROM_MASTER` and `ASSUMPTION` as unresolved blockers.
4. Implement a functional, accessible experience before enhanced motion.
5. Run the security, accessibility, performance, content, and legal gates in
   `data/release-checklist.json`.
6. Record evidence for every gate before recommending launch.
7. Build with `output: "export"` and deploy only through the approved GitHub
   Actions workflow to GitHub Pages.

## Agent boundaries

- Do not scrape or hotlink Instagram media.
- Do not add tracking, third-party scripts, dependencies, or remote fonts
  without documenting purpose, data flow, performance cost, and approval.
- Do not add API routes, Server Actions, runtime middleware, authentication,
  databases, secrets, or submission forms to the GitHub Pages release.
- Do not collect file uploads or high-risk personal/financial information.
- Do not place secrets, contact data, unpublished listings, or private notes in
  client bundles, URLs, analytics, logs, fixtures, or screenshots.
- Do not publish unsourced performance claims, testimonials, transaction data,
  school-quality claims, demographic targeting, or subjective neighborhood
  safety/family language.
- Do not autoplay sound, scroll-jack, trap focus, or make animation essential
  to understanding or navigation.
- Never weaken tests, headers, validation, or accessibility rules merely to
  make a check pass.

## Definition of premium

Premium means an intentional, subject-specific composition; excellent
typography; disciplined spacing; high-quality media; fast response; accessible
controls; and motion that explains the content. It does not mean excessive
effects, generic luxury styling, dark patterns, or large payloads.

Any coding agent should use the staged skill sequence in
`docs/10-agentic-skill-stack.md`, with human approval at creative, content,
risk, and launch gates.

## Dual-lens design review

Every visual decision receives two passes:

1. **Mastery:** test hierarchy, typography, rhythm, accessibility, rendering
   cost, maintainability, browser behavior, and whether the technique has a
   reason to exist.
2. **Experiment:** test whether a younger, mobile-native viewer would stop,
   understand, explore, remember, and share it without encountering a familiar
   template.

Reject work that is technically mature but culturally stale, or visually novel
but fragile, inaccessible, slow, or derivative.
