import test, { expect } from "@playwright/test";

test("section default", async ({ page }) => {
  await page.goto("/iframe.html?args=&id=components-section--example&viewMode=story");
  await expect(page).toHaveScreenshot({ fullPage: true });
  await page.getByTestId("fudis-button-3").hover();
  await expect(page).toHaveScreenshot({ fullPage: true });
});

test("nested section", async ({ page }) => {
  await page.goto("/iframe.html?args=&id=components-section--nested-example&viewMode=story");
  await expect(page).toHaveScreenshot({ fullPage: true });
});
