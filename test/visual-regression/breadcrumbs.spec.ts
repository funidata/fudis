import test, { expect } from "@playwright/test";

test("breadcrumbs default", async ({ page }) => {
  await page.goto("/iframe.html?args=&id=components-breadcrumbs--example&viewMode=story");
  await expect(page).toHaveScreenshot();
});
