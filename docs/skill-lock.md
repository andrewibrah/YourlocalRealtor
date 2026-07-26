# Supply-Chain Review: Agentic Skill Stack

These skills are documented for supply-chain verification per the skill-stack policy ([10-agentic-skill-stack.md](../sharif-site-definition/docs/10-agentic-skill-stack.md)). None are auto-executed; each requires manual review and installation by pinning the exact commit verified below.

| Skill                    | Source                                                                  | Pinned Commit/Release                    | License      | Purpose                                                                            | Status                                                                                                                                                 |
| ------------------------ | ----------------------------------------------------------------------- | ---------------------------------------- | ------------ | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `frontend-design`        | [anthropics/skills](https://github.com/anthropics/skills)               | b29e7cf65e5cb78a5ac33d582270551bc74a14eb | Apache 2.0   | Establish visual thesis; reject generic template habits                            | documented — manual install required: `git clone https://github.com/anthropics/skills && git checkout b29e7cf65e5cb78a5ac33d582270551bc74a14eb`        |
| `web-design-guidelines`  | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | 7c180d9044c9ae2b442b567aad4e42a28dd5ed62 | MIT          | Audit usability, focus, touch, typography, imagery, navigation, motion             | documented — manual install required: `git clone https://github.com/vercel-labs/agent-skills && git checkout 7c180d9044c9ae2b442b567aad4e42a28dd5ed62` |
| `react-best-practices`   | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | 7c180d9044c9ae2b442b567aad4e42a28dd5ed62 | MIT          | Control waterfalls, bundles, server/client boundaries, rendering cost              | documented — manual install required: `git clone https://github.com/vercel-labs/agent-skills && git checkout 7c180d9044c9ae2b442b567aad4e42a28dd5ed62` |
| `react-view-transitions` | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | 7c180d9044c9ae2b442b567aad4e42a28dd5ed62 | MIT          | Implement restrained shared/page transitions with reduced-motion fallback          | documented — manual install required: `git clone https://github.com/vercel-labs/agent-skills && git checkout 7c180d9044c9ae2b442b567aad4e42a28dd5ed62` |
| `remotion` (skills)      | [remotion-dev/skills](https://github.com/remotion-dev/skills)           | 5e2daf82fd2d4468500ced14f6c5a0c8a54f9470 | _not found_  | Build deterministic React-based title cards, compositing, masks, video transitions | blocked — license not documented in repo; consult remotion.dev/docs/ai/skills for official setup                                                       |
| `insecure-defaults`      | [trailofbits/skills](https://github.com/trailofbits/skills)             | cfe5d7b1619e47fb5b38b7e2561dad7e5f1e89af | CC-BY-SA-4.0 | Security audit: detect insecure default configurations                             | documented — manual install required: `git clone https://github.com/trailofbits/skills && git checkout cfe5d7b1619e47fb5b38b7e2561dad7e5f1e89af`       |
| `static-analysis`        | [trailofbits/skills](https://github.com/trailofbits/skills)             | cfe5d7b1619e47fb5b38b7e2561dad7e5f1e89af | CC-BY-SA-4.0 | Run static analysis and vulnerability scanning                                     | documented — manual install required: `git clone https://github.com/trailofbits/skills && git checkout cfe5d7b1619e47fb5b38b7e2561dad7e5f1e89af`       |
| `differential-review`    | [trailofbits/skills](https://github.com/trailofbits/skills)             | cfe5d7b1619e47fb5b38b7e2561dad7e5f1e89af | CC-BY-SA-4.0 | Run differential security review on release diff                                   | documented — manual install required: `git clone https://github.com/trailofbits/skills && git checkout cfe5d7b1619e47fb5b38b7e2561dad7e5f1e89af`       |

## Verification Summary

**7 of 8 fully verified.** All Anthropic, Vercel Labs, and Trail of Bits skills confirmed via GitHub API and direct inspection: correct repos found, SKILL.md/plugin files exist at stated paths, licenses confirmed from README or root LICENSE files, and commit SHAs pinned to latest main-branch commits as of 2026-07-26.

**1 blocked:** Remotion skills repo has no license documented in README or root; repo README states "internal package with no documentation." Official setup guidance is external at [remotion.dev/docs/ai/skills](https://www.remotion.dev/docs/ai/skills). Defer Remotion integration to that upstream documentation.

---

## Addendum — SEO methodology (added 2026-07-26)

| Skill | Source | Pinned commit | License | Purpose | Status |
| --- | --- | --- | --- | --- | --- |
| `claude-seo` (`seo-local`, `seo-schema`, `seo-geo`, `schema/templates.json`) | [AgricIDaniel/claude-seo](https://github.com/AgricIDaniel/claude-seo) | `09d37c7b66ed3ca9c6efbdb765a805a6c76a8f01` | MIT (verified in repo `LICENSE`) | Local-SEO audit framework, Schema.org patterns for the real-estate vertical, AI-search guidance | **Read and applied — not installed** |

**Why not installed.** The plugin ships `install.sh` / `install.ps1`, 25 skills,
18 agents, and optional extensions that call external paid APIs (DataForSEO,
Firecrawl). Installing it means executing a third-party installer and enabling
network tooling, which this project's supply-chain policy requires to be
reviewed, pinned, and approved first — and which was not needed to use the
methodology.

**What was done instead.** The repository was cloned shallow into a scratch
directory outside the project, inspected read-only, and the relevant guidance
applied by hand. No script was executed, no dependency added, no MCP server
started, and nothing from the plugin exists inside this repository.

**Findings applied** are documented in `docs/seo-strategy.md`. The material
ones: `RealEstateAgent` is the correct Schema.org type for both agent and
brokerage; service-area businesses carry geography in `areaServed` rather than
`address`; dedicated per-area pages are the strongest on-page local signal but
must pass the swap test to avoid the doorway-page pattern; and review markup for
a business's own reviews is prohibited.

**Removal.** Delete the scratch clone. Nothing in this repository depends on it.
