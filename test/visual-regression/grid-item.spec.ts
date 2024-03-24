import test, { expect } from "@playwright/test";

test("grid-item align-self-x", async ({ page }) => {
  await page.goto("/iframe.html?args=&id=components-grid-grid-item--align-self-x&viewMode=story");
  await expect(page).toHaveScreenshot("align-self-x.png");
});

test("grid-item align-self-y", async ({ page }) => {
  await page.goto("/iframe.html?args=&id=components-grid-grid-item--align-self-y&viewMode=story");
  await expect(page).toHaveScreenshot("align-self-y-1.png");

  await page.getByText("alignSelfY = 'responsive'").scrollIntoViewIfNeeded();
  await expect(page).toHaveScreenshot("align-self-y-2.png");
});

test("grid-item align-self-x-and-y", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=&id=components-grid-grid-item--align-self-x-and-y&viewMode=story",
  );
  await expect(page).toHaveScreenshot("align-self-x-and-y.png");
});

test("grid-item columns", async ({ page }) => {
  await page.goto("/iframe.html?args=&id=components-grid-grid-item--columns&viewMode=story");
  await expect(page).toHaveScreenshot("columns.png");
});

test("grid-item responsive columns", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=&id=components-grid-grid-item--responsive-columns&viewMode=story",
  );
  await expect(page).toHaveScreenshot("responsive-columns.png");
});
