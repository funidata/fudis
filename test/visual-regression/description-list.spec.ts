import test, { expect } from "@playwright/test";

// Description List
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

// Description List With Sub Components
test("description list regular with sub components", async ({ page }) => {
  await page.goto("/iframe.html?args=variant:regular&id=components-description-list--description-list-with-sub-components&viewMode=story");
  await expect(page).toHaveScreenshot();
});

test("description list regular with sub components and grid disabled", async ({ page }) => {
  await page.goto("/iframe.html?args=variant:regular;disableGrid:!true&id=components-description-list--description-list-with-sub-components&viewMode=story");
  await expect(page).toHaveScreenshot();
});

test("description list compact with sub components", async ({ page }) => {
  await page.goto("/iframe.html?args=variant:compact&id=components-description-list--description-list-with-sub-components&viewMode=story");
  await expect(page).toHaveScreenshot();
});

test("description list compact with sub components and grid disabled", async ({ page }) => {
  await page.goto("/iframe.html?args=variant:compact;disableGrid:!true&id=components-description-list--description-list-with-sub-components&viewMode=story");
  await expect(page).toHaveScreenshot();
});
