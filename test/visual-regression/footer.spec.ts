import test, { expect } from "@playwright/test";

test("footer", async ({ page }) => {
  await page.goto("/iframe.html?args=&id=components-footer--example&viewMode=story");
  await expect(page).toHaveScreenshot();
});
