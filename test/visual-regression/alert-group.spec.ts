import test, { expect } from "@playwright/test";

test("alert-group default", async ({ page }) => {
  await page.goto("/iframe.html?args=&id=components-alert-group--example&viewMode=story");
  await expect(page).toHaveScreenshot();
});
