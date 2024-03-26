import test, { expect } from "@playwright/test";

test("link default", async ({ page }) => {
  await page.goto("/iframe.html?id=components-link--example&viewMode=story");
  await expect(page).toHaveScreenshot();
});

test("link external", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=&id=components-link--example-with-external-link&viewMode=story",
  );
  await expect(page).toHaveScreenshot();
});

test("link with title", async ({ page }) => {
  await page.goto("/iframe.html?id=components-link--example-with-link-with-title&viewMode=story");
  await expect(page).toHaveScreenshot();
});
