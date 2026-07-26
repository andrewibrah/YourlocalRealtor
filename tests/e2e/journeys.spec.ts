import { expect, test, type Page } from "@playwright/test";

/**
 * Critical journeys.
 *
 * Focused on the things that would actually cost the business: a conversion
 * path that dead-ends, a page that needs JavaScript to be readable, or a claim
 * appearing without its verification marker.
 */

/**
 * Waits until React has hydrated.
 *
 * Needed because several of these tests exercise *enhanced* behaviour, and
 * Playwright's actionability checks only prove an element is clickable — not
 * that its event handler is attached yet. Clicking a "Plan my move" link one
 * frame early takes the progressive-enhancement fallback and navigates to
 * /contact/, which is correct product behaviour but not what these particular
 * tests are asserting. The root element carries `data-hydrated` once the
 * client bootstrap has run, which is the honest signal.
 */
async function hydrated(page: Page) {
  await page.waitForFunction(
    () => document.documentElement.dataset.hydrated === "true",
  );
}

/** The visible "Plan my move" trigger for the current viewport. */
function planMyMove(page: Page) {
  return page
    .getByRole("link", { name: /plan my move/i })
    .filter({ visible: true })
    .first();
}

test("home page loads with the promise line and both primary actions", async ({
  page,
}) => {
  const response = await page.goto("/");
  expect(response?.ok()).toBeTruthy();

  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Know the move before you make it",
  );
  await expect(planMyMove(page)).toBeVisible();
  await expect(
    page.getByRole("link", { name: /watch the films/i }),
  ).toBeVisible();
});

test("skip link is the first focusable element and reaches main", async ({
  page,
  browserName,
}) => {
  // WebKit does not move focus to links with Tab unless the OS-level
  // "Press Tab to highlight each item" preference is on, so sequential-focus
  // assertions are meaningless there. Real Safari keyboard testing is tracked
  // as a manual item in docs/qa-log.md.
  test.skip(browserName === "webkit", "WebKit Tab behaviour differs by OS setting");

  await page.goto("/");
  await page.keyboard.press("Tab");

  const skip = page.getByRole("link", { name: /skip to main content/i });
  await expect(skip).toBeFocused();

  await skip.press("Enter");
  await expect(page.locator("#main")).toBeVisible();
});

test("Plan my move opens the contact dialog and Escape closes it", async ({
  page,
}) => {
  await page.goto("/");
  await hydrated(page);

  await planMyMove(page).click();

  // Four triggers exist across the layout, each with its own <dialog>. Only the
  // opened one is matched: closed dialogs are display:none and carry no role.
  const dialog = page.locator("dialog[open]");
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText("Make the next move directly");

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});

test("contact actions never render a placeholder protocol link", async ({
  page,
}) => {
  await page.goto("/contact/");

  // With unconfigured destinations there must be no tel:/sms:/mailto: anchors
  // at all — a dead protocol link is worse than an honest pending state.
  const anchors = await page
    .locator('a[href^="tel:"], a[href^="sms:"], a[href^="mailto:"]')
    .all();

  for (const anchor of anchors) {
    const href = await anchor.getAttribute("href");
    expect(href).not.toMatch(/0{7,}/);
    expect(href).not.toMatch(/example\.(invalid|com)/);
  }
});

test("the site is readable and navigable without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();

  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  // Every section must still be painted without scripting.
  const invisible = await page.evaluate(() =>
    Array.from(document.querySelectorAll("main section")).filter(
      (element) =>
        getComputedStyle(element).opacity !== "1" ||
        element.getBoundingClientRect().height === 0,
    ).length,
  );
  expect(invisible).toBe(0);

  // And the proof stories specifically — the content most worth protecting.
  await expect(page.getByText("$1,960,000").first()).toBeVisible();

  // The primary CTA must degrade to a real navigation.
  //
  // Centred first: the fixed mobile action bar occupies the bottom of the
  // viewport, and Playwright's default "scroll into view if needed" can leave a
  // target sitting underneath it. A real user scrolls past that; the automation
  // needs to be told to.
  const cta = planMyMove(page);
  await cta.evaluate((el) =>
    // Instant, not smooth: the global stylesheet sets `scroll-behavior: smooth`,
    // so a default scroll leaves the target in motion and Playwright waits
    // forever for it to become stable.
    el.scrollIntoView({ block: "center", behavior: "instant" }),
  );
  await cta.click();
  await expect(page).toHaveURL(/\/contact\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Make the next move directly",
  );

  await context.close();
});

test("buyer series records progress locally and can be cleared", async ({
  page,
}) => {
  await page.goto("/videos/first-home-01/");
  await hydrated(page);

  await page.goto("/buy/first-home/");
  await hydrated(page);

  const progress = page.getByText(/opened on this device/i);
  await expect(progress).toBeVisible();
  await expect(progress).toContainText("01");

  const clear = page.getByRole("button", { name: /clear progress/i });
  await expect(clear).toBeVisible();
  await clear.click();
  await expect(clear).toBeHidden();
});

test("video library filters narrow the list without hiding it by default", async ({
  page,
}) => {
  await page.goto("/videos/");

  // Unfiltered content is server-rendered, so it is present before hydration.
  const items = page.locator("article");
  expect(await items.count()).toBe(13);

  await hydrated(page);

  // The count lives in a live region assembled from several elements, so match
  // on its text content rather than on a single text node.
  const status = page.locator("[aria-live=polite]");
  await expect(status).toHaveText(/Showing\s*13\s*of\s*13\s*films/);

  await page.getByRole("button", { name: /^first home/i }).click();
  await expect(status).toHaveText(/Showing\s*5\s*of\s*13\s*films/);
  expect(await items.count()).toBe(5);
});

test("pressing play starts the video with sound", async ({ page }) => {
  await page.goto("/videos/budget-500k/");
  await hydrated(page);

  const before = await page.evaluate(() => {
    const v = document.querySelector("video")!;
    return { muted: v.muted, paused: v.paused };
  });
  expect(before.paused).toBe(true);

  await page.getByRole("button", { name: /^Play/ }).first().click();
  await page.waitForTimeout(1500);

  const after = await page.evaluate(() => {
    const v = document.querySelector("video")!;
    return {
      muted: v.muted,
      volume: v.volume,
      playing: !v.paused,
      cues: v.textTracks[0]?.cues?.length ?? 0,
    };
  });

  // Pressing play is the visitor's consent, so audio is on. This is not
  // autoplay — nothing on this site starts sound by itself.
  expect(after.playing).toBe(true);
  expect(after.muted).toBe(false);
  expect(after.volume).toBeGreaterThan(0);
  // Captions stay on regardless of sound.
  expect(after.cues).toBeGreaterThan(0);
});

test("the hero loop never plays sound", async ({ page }) => {
  await page.goto("/");
  await hydrated(page);
  await page.waitForTimeout(1200);

  const hero = await page.evaluate(() => {
    const v = document.querySelector("video");
    return v ? { muted: v.muted } : null;
  });

  // Null is valid: under reduced motion the element is never mounted at all.
  if (hero) expect(hero.muted).toBe(true);
});

test("unverified claims always carry a provisional marker", async ({ page }) => {
  await page.goto("/results/brooklyn-sell-and-buy/");
  await expect(page.getByText(/pending approval/i).first()).toBeVisible();

  await page.goto("/videos/seller-questions/");
  await expect(page.getByText(/indexed source/i).first()).toBeVisible();

  // A film with a real master still carries its approval marker.
  await page.goto("/videos/budget-500k/");
  await expect(page.getByText(/pending approval/i).first()).toBeVisible();
});

test("no property is presented as currently available", async ({ page }) => {
  await page.goto("/properties/");
  const body = (await page.locator("body").innerText()).toLowerCase();

  expect(body).not.toContain("for sale");
  expect(body).not.toContain("available now");
  expect(body).toContain("not a listing search");
});

test("deep links resolve and the 404 page is useful", async ({ page }) => {
  const direct = await page.goto("/areas/staten-island/");
  expect(direct?.ok()).toBeTruthy();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Staten Island",
  );

  // A genuinely unmatched path. The test server mirrors GitHub Pages and
  // serves 404.html with a 404 status, so this exercises the real behaviour.
  const missing = await page.goto("/does-not-exist/");
  expect(missing?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "That page is not here",
  );
  await expect(
    page.locator("main").getByRole("link", { name: /film library/i }),
  ).toBeVisible();
});

test("back and forward navigation preserve the page", async ({ page }) => {
  await page.goto("/");
  await hydrated(page);

  await page.getByRole("link", { name: "Sell", exact: true }).first().click();
  await expect(page).toHaveURL(/\/sell\/$/);

  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Know the move",
  );

  await page.goForward();
  await expect(page).toHaveURL(/\/sell\/$/);
});
