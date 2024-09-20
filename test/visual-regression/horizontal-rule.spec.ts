import test, { expect } from "@playwright/test";

test("horizontal rule", async ({ page }) => {
  await page.goto("/iframe.html?args=&id=components-horizontal-rule--example&viewMode=story");
  await expect(page).toHaveScreenshot();
});
