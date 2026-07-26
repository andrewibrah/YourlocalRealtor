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

test("content survives 400% text zoom without horizontal page scroll", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  // 400% text resize, approximated by scaling the root font size.
  await page.addStyleTag({ content: "html { font-size: 64px !important; }" });

  const overflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );

  // A small tolerance for sub-pixel rounding.
  expect(overflow).toBeLessThanOrEqual(2);
});
