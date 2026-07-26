# Advanced Visual Engineering

## Standard

The site must combine mature judgment with active experimentation. Experience
without curiosity produces a polished museum. Novelty without experience
produces a fragile demo. Every advanced visual must pass both.

## Technique ladder

Use the least expensive layer capable of producing the idea:

1. typography, crop, grid, color, and real footage;
2. CSS transforms, masks, `clip-path`, gradients, blend modes, and native
   scroll-driven/view transitions where supported;
3. Motion for React for component choreography and shared state;
4. SVG paths, filters, and architectural line systems;
5. GSAP timelines/FLIP/SplitText for sequences that are otherwise brittle;
6. Canvas/WebGL/React Three Fiber only for a signature spatial moment.

Skipping directly to WebGL is not sophistication. It is usually undisciplined
cost.

## Visual R&D loop

1. Define the content problem in one sentence.
2. Retrieve current official documentation and examples for the exact pinned
   library version.
3. Build three small prototypes:
   - editorial/static;
   - motion-forward;
   - experimental/spatial.
4. Test each at 390px, 768px, and 1440px; keyboard; reduced motion; 4× CPU
   slowdown; mid-tier mobile GPU; and a slow network.
5. Score comprehension, distinctiveness, accessibility, implementation risk,
   payload, frame stability, and maintainability.
6. Promote one. Delete rejected prototype code and dependencies.
7. Document the reason, fallback, teardown, ownership, and budget.

## High-value techniques for this brand

### Architectural masking

Use rooflines, door frames, windows, and room boundaries from real footage as
mask geometry. The motion should reveal proof or a second scene, not decorate
empty space.

### Editorial FLIP

Let a sale-price pill, video frame, or property fact move between list and
detail contexts while preserving spatial continuity. Provide a direct cut for
reduced motion.

### Kinetic typography

Animate only verified spoken phrases or proof facts. Maintain a semantic,
unsplit accessible text copy. Avoid character-by-character effects on body
copy.

### Depth with restraint

Use subtle perspective or a short WebGL architectural plane only if it remains
smooth on a mid-tier phone. The no-WebGL fallback must be visually complete,
not a warning or empty box.

### Film-to-interface continuity

Match a real camera move, dominant line, or room transition to the next UI
state. This creates originality from source footage rather than generic
animation presets.

## Promotion gates

An experiment is rejected if any is true:

- it obscures the message or primary action;
- it requires sound or motion to understand;
- it breaks keyboard, zoom, screen-reader, or reduced-motion use;
- it causes long tasks, layout shift, persistent GPU work, or budget failure;
- it degrades badly when JavaScript, video, or WebGL fails;
- it copies a sample's visual identity rather than learning its technique;
- it adds a dependency for an effect that platform APIs can express clearly;
- it cannot be explained, tested, maintained, and removed by another engineer.

## Code-sample discipline

- Samples are research, not production code.
- Verify source, license, framework version, browser support, accessibility,
  cleanup, and bundle cost.
- Rebuild the idea through Sharif's tokens, content, footage, and component
  boundaries.
- Link the accepted source in the pull request and describe material changes.
- Never paste unknown registry code, minified snippets, or code that starts a
  remote service without review.

## Evidence bundle

Each promoted signature interaction requires:

- prototype and final screenshots/video;
- source/version/license record;
- reduced-motion and no-JavaScript state;
- keyboard and screen-reader result;
- Chrome trace and bundle delta;
- Playwright journey;
- visual-regression baseline;
- removal/fallback instructions.

## Official technique sources

- [GSAP documentation](https://gsap.com/docs/v3/)
- [React Three Fiber examples](https://r3f.docs.pmnd.rs/getting-started/examples)
- [Context7 current documentation retrieval](https://github.com/upstash/context7)
- [Chrome DevTools for coding agents](https://developer.chrome.com/docs/devtools/agents)
- [shadcn MCP](https://ui.shadcn.com/docs/mcp)
- [Figma MCP and Code Connect](https://help.figma.com/hc/en-us/articles/23920389749655-Code-Connect)
- [Playwright MCP](https://playwright.dev/docs/getting-started-mcp)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
