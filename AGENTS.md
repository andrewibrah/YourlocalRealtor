<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Product requirements

The product requirements source of truth is `sharif-site-definition/`. Read
`sharif-site-definition/AGENTS.md` and every file in `sharif-site-definition/docs/` before writing
application code. Do not infer missing claims, rights, transcripts, brokerage language, or property
facts.

Hard architecture constraints (see `sharif-site-definition/docs/05-engineering-spec.md` and
`sharif-site-definition/docs/11-github-pages-deployment.md`):

- Static export only (`output: "export"`) — no API routes, Server Actions, runtime middleware,
  database, authentication, or CMS.
- GitHub Actions is the only CI/CD system; GitHub Pages is the only production host.
- No Vercel configuration, SDK, adapter, analytics, or deployment files.
- No lead-submission form; contact uses `tel:`, `sms:`, `mailto:`, and an optional approved
  scheduling link only.

Approved Claude Code skills and MCP servers are recorded in `docs/skill-lock.md` and
`docs/mcp-lock.md`. Do not install unreviewed skills or unpinned MCP packages.
