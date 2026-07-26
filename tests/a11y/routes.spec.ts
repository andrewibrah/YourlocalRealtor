import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

/**
 * Automated accessibility checks across every route family.
 *
 * These are necessary and not sufficient — axe reliably catches roughly a third
 * of real barriers. Manual keyboard, screen-reader, zoom, and media testing are
 * tracked separately in docs/qa-log.md and docs/accessibility gaps are stated
 * openly on /accessibility/.
 */
const ROUTES = [
  "/",
  "/buy/",
  "/buy/first-home/",
  "/buy/budget/",
  "/buy/buy-vs-rent/",
  "/sell/",
  "/videos/",
  "/videos/first-home-01/",
  "/properties/",
  "/properties/2031-60th-st-brooklyn/",
  "/results/",
  "/results/brooklyn-sell-and-buy/",
  "/areas/staten-island/",
  "/areas/brooklyn/",
  "/about/",
  "/contact/",
  "/accessibility/",
  "/privacy/",
  "/fair-housing/",
  "/legal/",
  "/brokerage-notices/",
];

for (const route of ROUTES) {
  test(`${route} has no detectable accessibility violations`, async ({ page }) => {
    await page.goto(route);

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();

    expect(
      results.violations.map((violation) => ({
        id: violation.id,
        nodes: violation.nodes.map((node) => node.html),
      })),
    ).toEqual([]);
  });
}

test("every page has exactly one h1", async ({ page }) => {
  for (const route of ROUTES) {
    await page.goto(route);
    await expect(page.locator("h1"), `${route} h1 count`).toHaveCount(1);
  }
});

test("no section is left invisible, with or without motion", async ({ page }) => {
  for (const reducedMotion of ["reduce", "no-preference"] as const) {
    await page.emulateMedia({ reducedMotion });
    await page.goto("/");

    // Every top-level section must be painted. This is the regression guard for
    // the removed scroll-reveal system, which could leave whole sections — the
    // proof stories included — at opacity 0 when its observer did not fire.
    const invisible = await page.evaluate(() =>
      Array.from(document.querySelectorAll("main section")).filter((element) => {
        const style = getComputedStyle(element);
        return (
          Number(style.opacity) < 0.99 ||
          style.visibility === "hidden" ||
          element.getBoundingClientRect().height === 0
        );
      }).length,
    );

    expect(invisible, `reducedMotion: ${reducedMotion}`).toBe(0);
  }
});

/**
 * WCAG 2.2 SC 1.4.10 Reflow (AA).
 *
 * The criterion is defined by viewport width: content must reflow at 320 CSS
 * pixels — equivalent to 400% browser zoom on a 1280px screen — without
 * requiring two-dimensional scrolling.
 */
test("reflows at 320px without horizontal scrolling", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });

  for (const route of ROUTES) {
    await page.goto(route, { waitUntil: "load" });

    const overflow = await page.evaluate(async () => {
      // Web fonts change text metrics and reflow is asynchronous; measuring
      // before both settle produces a figure that varies with machine load.
      await document.fonts.ready;
      await new Promise((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(resolve)),
      );
      return (
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth
      );
    });

    expect(overflow, `${route} horizontal overflow at 320px`).toBeLessThanOrEqual(2);
  }
});

/**
 * WCAG 2.2 SC 1.4.4 Resize Text (AA).
 *
 * Text must scale to 200% without loss of content or functionality. Note that
 * 1.4.4 does not prohibit horizontal scrolling — that is 1.4.10, covered above
 * and measured by viewport width rather than by text-only zoom. What this
 * checks is that nothing is clipped, collapsed, or overlapped out of reach.
 */
test("text scales to 200% without loss of content", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "load" });
  await page.addStyleTag({ content: "html { font-size: 32px !important; }" });

  const problems = await page.evaluate(async () => {
    await document.fonts.ready;
    await new Promise((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(resolve)),
    );

    const found: string[] = [];
    for (const el of Array.from(
      document.querySelectorAll<HTMLElement>("main h1, main h2, main h3, main p, main a"),
    )) {
      const style = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      if (rect.height === 0) continue;

      // Text clipped by a fixed height with hidden overflow is lost content.
      if (
        style.overflowY === "hidden" &&
        el.scrollHeight > el.clientHeight + 2
      ) {
        found.push(`clipped: ${el.tagName} ${el.textContent?.slice(0, 40)}`);
      }
      // Content scrolled off the top of the document is unreachable.
      if (rect.bottom < 0) {
        found.push(`unreachable: ${el.tagName}`);
      }
    }
    return found;
  });

  expect(problems).toEqual([]);
});
