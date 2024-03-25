import test, { expect } from "@playwright/test";

test("all variants", async ({ page }) => {
  await page.goto("/iframe.html?args=&id=components-notification--all-variants&viewMode=story");
  await expect(page).toHaveScreenshot();
});

test("with external link", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=&id=components-notification--example-with-external-link&viewMode=story",
  );
  await expect(page).toHaveScreenshot();
});
