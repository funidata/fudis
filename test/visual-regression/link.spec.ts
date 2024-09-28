import test, { expect } from "@playwright/test";

test("link combinations", async ({ page }) => {
  await page.goto("/iframe.html?id=directives-link--all-combinations&viewMode=story");
  await expect(page).toHaveScreenshot({ fullPage: true });
});
