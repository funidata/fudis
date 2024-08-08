import test, { expect } from "@playwright/test";

test("spacing directive", async ({ page }) => {
  await page.goto("/iframe.html?id=directives-spacing--example&viewMode=story");
  await expect(page).toHaveScreenshot();
});

test("spacing directive responsive", async ({ page }) => {
  await page.goto("/iframe.html?id=directives-spacing--responsive-example&viewMode=story");
  await expect(page).toHaveScreenshot();
});
