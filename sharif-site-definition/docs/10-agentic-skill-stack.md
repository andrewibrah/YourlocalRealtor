# Agentic Skill Stack

## Purpose

These skills form a gated studio workflow; they are not a license for an agent
to install arbitrary packages or make unsupervised production decisions. Use
official maintainer repositories, pin reviewed versions or commits, inspect
instructions and scripts before use, grant least privilege, and prohibit
secret/network access unless the task genuinely requires it.

## Researched capability stack

| Order | Skill, MCP, or tool | Role in this build | Required output |
| ---: | --- | --- | --- |
| 1 | [Anthropic frontend-design skill](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md) | Establish a subject-specific visual thesis and reject generic template habits | Creative thesis, three art-direction laws, one justified signature risk |
| 2 | [Context7 skill/MCP](https://github.com/upstash/context7) | Retrieve current, version-specific framework documentation and code samples instead of inventing APIs | Source-linked technique brief with library/version recorded |
| 3 | [Figma MCP and Code Connect](https://help.figma.com/hc/en-us/articles/39888629089175-Codex-and-Figma-Set-up-the-MCP-server) | Read approved frames, variables, components, and code mappings when a Figma file exists | Design-to-code mapping with intentional deviations listed |
| 4 | [shadcn MCP](https://ui.shadcn.com/docs/mcp) | Search inspectable component source and accessibility patterns | Primitive shortlist; no copied visual identity or unreviewed registry code |
| 5 | [Vercel web-design-guidelines skill](https://github.com/vercel-labs/agent-skills/blob/main/skills/web-design-guidelines/SKILL.md) | Audit usability, focus, touch, typography, imagery, navigation, and motion | Annotated UI compliance report |
| 6 | [Remotion skills](https://github.com/remotion-dev/skills) | Build deterministic React-based title cards, compositing, masks, and video transitions | Reproducible motion source plus rendered derivatives |
| 7 | [GSAP official techniques](https://gsap.com/docs/v3/) through Context7/official docs | Prototype editorial timelines, FLIP transitions, SplitText reveals, SVG and scroll triggers | Isolated prototype, teardown, reduced-motion equivalent, bundle cost |
| 8 | [React Three Fiber official examples](https://r3f.docs.pmnd.rs/getting-started/examples) through Context7/official docs | Prototype spatial architecture only when real depth materially improves the story | Progressive-enhancement prototype with static fallback and measured GPU cost |
| 9 | [Vercel react-view-transitions skill](https://github.com/vercel-labs/agent-skills/blob/main/skills/react-view-transitions/SKILL.md) | Implement restrained shared/page transitions with reduced-motion behavior | Transition map and fallback states |
| 10 | [Vercel react-best-practices skill](https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/SKILL.md) | Control waterfalls, bundles, server/client boundaries, and rendering cost | Performance review against budgets |
| 11 | [Chrome DevTools MCP](https://github.com/ChromeDevTools/chrome-devtools-mcp) | Give the agent real performance traces, network waterfalls, rendering diagnostics, and device emulation | Trace-backed performance report |
| 12 | [Microsoft Playwright CLI/MCP](https://github.com/microsoft/playwright-mcp) | Run critical journeys, responsive states, keyboard use, protocol links, media failure, and visual comparisons | Repeatable E2E suite and failure evidence |
| 13 | [Storybook accessibility and visual tests](https://storybook.js.org/docs/writing-tests/accessibility-testing) | Pressure-test primitives and composed sections outside full pages | Component-state matrix with accessibility and visual evidence |
| 14 | [Google Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) | Enforce performance, accessibility, SEO, and best-practice budgets in Actions | CI assertions and retained reports |
| 15 | [Trail of Bits security skills](https://github.com/trailofbits/skills) | Run insecure-default, static-analysis, and differential security review | Reviewed findings with no open release blocker |

Remotion's official AI-skill setup is documented at
[remotion.dev/docs/ai/skills](https://www.remotion.dev/docs/ai/skills).
Playwright's test-generation workflow is documented in its
[official test-generation reference](https://github.com/microsoft/playwright-cli/blob/main/skills/playwright-cli/references/test-generation.md).

The repositories authored by Vercel Labs supply review guidance only. They do
not introduce Vercel hosting, runtime services, deployment, or analytics.

## Orchestration

### Gate 1 — Creative

Use `frontend-design` to propose the composition from the verified brand and
media, then obtain human approval. The agent must explain why every distinctive
choice belongs to Sharif's content rather than merely looking fashionable.
Apply the dual-lens review from `AGENTS.md`: veteran structural judgment and
young mobile-native experimentation must both pass.

### Gate 2 — Research

Use Context7 only for the exact pinned libraries being evaluated. Use Figma
only when an approved file exists. Use shadcn as a source of inspectable
primitives, not a page generator. Record URLs, versions, licenses, and the
reason a technique was accepted or rejected.

### Gate 3 — System

Translate the approved direction into tokens, original components, responsive
layouts, typed content, static fallbacks, and design-guideline acceptance
criteria.

### Gate 4 — Visual R&D

Prototype advanced motion in isolation. Remotion handles pre-rendered media.
CSS/View Transitions handle cheap web motion. GSAP is allowed only when its
timeline or FLIP capability materially simplifies the interaction. WebGL/React
Three Fiber is the last resort, never the default. Promote only work that
passes `12-advanced-visual-engineering.md`.

### Gate 5 — Performance and journeys

Run React/Next.js performance review, then Playwright critical journeys at
mobile and desktop sizes. Use Chrome DevTools traces and Lighthouse CI. Test
keyboard navigation, protocol-link fallbacks, video failure, slow network,
missing imagery, GPU stress, and reduced motion.

### Gate 6 — Security and release

Run insecure-defaults and static analysis before staging. Run differential
review on the final release diff. A human reviews findings, media/content
approvals, and every blocking release item.

## Skill supply-chain policy

- Only add a skill from the maintainer's official repository.
- An MCP is an execution boundary, not a smarter prompt. Add one only when it
  supplies current source material, a real browser, or approved design data.
- Pin the exact release or commit; do not track an unreviewed moving branch.
- Read `SKILL.md` and every invoked script before allowing execution.
- Record package source, version, checksum/commit, purpose, permissions, and
  removal instructions.
- Run unknown code in an isolated environment without production secrets.
- Do not permit a design/testing skill to deploy, message leads, modify DNS,
  access contact data, or change billing.
- Require review for dependency installs and generated shell commands.
- Treat skill output as a proposal or test result, not as legal approval.
- Remove unused skills from CI and rotate any credentials they accessed.
- MCP configuration lives in a reviewed local example until each server,
  package, license, permission, and version is approved. Never auto-start an
  unpinned server in CI.

## Originality test

Before acceptance, remove Sharif's name and footage from the design. If the
result could plausibly be sold unchanged to any realtor, the concept fails.
Originality must come from his editorial rhythm, teaching structure, verified
proof, architecture, language, and footage—not inaccessible novelty.
