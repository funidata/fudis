import test, { expect } from "@playwright/test";

test("badge default", async ({ page }) => {
  await page.goto("/iframe.html?args=&id=components-badge--all-variants&viewMode=story");
  await expect(page).toHaveScreenshot();
});
