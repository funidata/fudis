import test, { expect } from "@playwright/test";

test("all variants", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=&id=components-typography-heading--all-variants&viewMode=story",
  );
  await expect(page).toHaveScreenshot();
});
