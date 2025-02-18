import test, { expect } from "@playwright/test";

test("tooltip toggle", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=tooltipToggle:!true&id=directives-tooltip--example-with-fudis-button&viewMode=story",
  );
  await page.getByTestId("fudis-button-1").click();
  await page.waitForTimeout(150).then(async () => {
    await expect(page).toHaveScreenshot("toggle.png");
  });
});

test("tooltip should be hidden when scrolled out of view", async ({ page }) => {
  await page.goto("/iframe.html?id=components-language-badge-group--documentation&viewMode=story");

  await page.getByTestId("fudis-language-badge-group-1-item-3").first().focus();
  await expect(page.locator("mat-tooltip-component")).toBeVisible();

  await page.evaluate(() => window.scrollBy(0, document.body.scrollHeight));

  await page.waitForTimeout(1000).then(async () => {
    await expect(page.locator("mat-tooltip-component")).not.toBeVisible();
  });
});
