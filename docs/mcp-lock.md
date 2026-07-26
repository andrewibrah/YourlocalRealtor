# MCP Server Configuration Lock

MCP servers are not auto-started in CI; this configuration is for local agent use only.

## Context7 MCP

- **Package:** `@upstash/context7-mcp`
- **Version:** 3.2.5
- **License:** MIT
- **Purpose:** Current version-specific framework documentation and code samples
- **Network access:** true
- **Data access:** Fetches public framework documentation and code samples from external sources
- **Removal:** Delete the `context7` entry from `.mcp.json`

## Playwright MCP

- **Package:** `@playwright/mcp`
- **Version:** 0.0.78
- **License:** Apache-2.0
- **Purpose:** Local browser journey and accessibility inspection
- **Network access:** false
- **Data access:** Controls local Chromium/Firefox/WebKit browsers; reads page state and renders
- **Removal:** Delete the `playwright` entry from `.mcp.json`

## Chrome DevTools MCP

- **Package:** `chrome-devtools-mcp`
- **Version:** 1.6.0
- **License:** Apache-2.0
- **Purpose:** Local Chrome performance traces and rendering diagnostics
- **Network access:** false
- **Data access:** Reads Chrome DevTools protocol events, performance traces, and rendering data from running Chrome instances
- **Removal:** Delete the `chrome-devtools` entry from `.mcp.json`

## shadcn MCP

- **Package:** `shadcn`
- **Version:** 4.15.0
- **License:** MIT
- **Purpose:** Inspectable component-registry primitives; never a source of visual identity
- **Network access:** true
- **Data access:** Fetches component source and accessibility patterns from the shadcn registry
- **Removal:** Delete the `shadcn` entry from `.mcp.json`

## Figma MCP (Not Configured)

Figma MCP is **not enabled** in this project. To enable it in the future:

1. Obtain an approved Figma file URL and least-privilege read-only API key
2. Add an entry to `.mcp.json` under `servers`:
   ```json
   "figma": {
     "command": "npx",
     "args": ["-y", "figma-mcp@PINNED_VERSION", "--api-key", "YOUR_API_KEY"],
     "purpose": "Design-to-code mapping from approved Figma frames",
     "network": true,
     "secrets": ["FIGMA_API_KEY"]
   }
   ```
3. Verify the pinned version via `npm view figma-mcp version` before adding
4. Never commit the API key; store it in a local `.env.local` file or secure credential manager
