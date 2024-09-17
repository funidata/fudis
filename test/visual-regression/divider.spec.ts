import test, { expect } from "@playwright/test";

test("divider", async ({ page }) => {
  await page.goto("/iframe.html?args=&id=components-divider--example&viewMode=story");
  await expect(page).toHaveScreenshot();
});
