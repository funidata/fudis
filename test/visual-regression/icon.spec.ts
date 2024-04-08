import test, { expect } from "@playwright/test";

test("all icons", async ({ page }) => {
  await page.goto("/iframe.html?args=&id=components-icon--all-icons&viewMode=story");
  await expect(page).toHaveScreenshot({ fullPage: true });
});
