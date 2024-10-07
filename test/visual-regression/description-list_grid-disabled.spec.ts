import test, { expect } from "@playwright/test";

// Description List
test("description list default regular and grid disabled", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=variant:regular;disableGrid:!true&id=components-description-list--description-list&viewMode=story",
  );
  await expect(page).toHaveScreenshot({ fullPage: true });
});

test("description list default compact and grid disabled", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=variant:compact;disableGrid:!true&id=components-description-list--description-list&viewMode=story",
  );
  await expect(page).toHaveScreenshot({ fullPage: true });
});

test("nested description list compact and grid disabled", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=disableGrid:!true&id=components-description-list--nested-description-lists&viewMode=story",
  );
  await expect(page).toHaveScreenshot({ fullPage: true });
});

test("description list regular with sub components and grid disabled", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=variant:regular;disableGrid:!true&id=components-description-list--nested-sub-components&viewMode=story",
  );
  await expect(page).toHaveScreenshot({ fullPage: true });
});

test("description list compact with sub components and grid disabled", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=variant:compact;disableGrid:!true&id=components-description-list--nested-sub-components&viewMode=story",
  );
  await expect(page).toHaveScreenshot({ fullPage: true });
});

test("description list regular with multiple dd elements and grid disabled", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=variant:regular;disableGrid:!true&id=components-description-list--item-with-multiple-dd-elements&viewMode=story",
  );
  await expect(page).toHaveScreenshot({ fullPage: true });
});

test("description list compact with multiple dd elements and grid disabled", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=variant:compact;disableGrid:!true&id=components-description-list--item-with-multiple-dd-elements&viewMode=story",
  );
  await expect(page).toHaveScreenshot({ fullPage: true });
});

// Description List With Single Item
test("description list regular with single item and grid disabled", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=variant:regular;disableGrid:!true&id=components-description-list--single-list-item&viewMode=story",
  );
  await expect(page).toHaveScreenshot({ fullPage: true });
});

test("description list compact with single item and grid disabled", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=variant:compact;disableGrid:!true&id=components-description-list--single-list-item&viewMode=story",
  );
  await expect(page).toHaveScreenshot({ fullPage: true });
});
