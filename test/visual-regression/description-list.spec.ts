import test, { expect } from "@playwright/test";

test("description list default regular", async ({ page }) => {
  await page.goto("/iframe.html?args=variant:regular&id=components-description-list--description-list&viewMode=story");
  await expect(page).toHaveScreenshot();
});

test("description list default compact", async ({ page }) => {
  await page.goto("/iframe.html?args=variant:compact&id=components-description-list--description-list&viewMode=story");
  await expect(page).toHaveScreenshot();
});

test("description list default regular and grid disabled", async ({ page }) => {
  await page.goto("/iframe.html?args=variant:compact;disableGrid:!true&id=components-description-list--description-list&viewMode=story");
  await expect(page).toHaveScreenshot();
});

test("description list default compact and grid disabled", async ({ page }) => {
  await page.goto("/iframe.html?args=variant:regular;disableGrid:!true&id=components-description-list--description-list&viewMode=story");
  await expect(page).toHaveScreenshot();
});
