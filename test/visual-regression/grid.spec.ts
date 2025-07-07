import test, { expect } from "@playwright/test";

test("grid basic with tweaked aligns", async ({ page }) => {
  await page.goto(
    "/iframe.html?globals=&args=&id=components-test-playground--grid-collection&viewMode=story",
  );
  await expect(page).toHaveScreenshot("grid-basics.png", { fullPage: true });
});

test("grid min-content", async ({ page }) => {
  await page.goto("/iframe.html?args=&id=components-grid-grid--min-content&viewMode=story");
  await expect(page).toHaveScreenshot("grid-min-content.png");
});

test("grid max-content", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=columns:max-content%20auto&id=components-grid-grid--max-content&viewMode=story",
  );
  await expect(page).toHaveScreenshot("grid-max-content.png");
});

test("grid auto", async ({ page }) => {
  await page.goto("/iframe.html?args=&id=components-grid-grid--auto&viewMode=story");
  await expect(page).toHaveScreenshot("grid-auto.png");
});

test("grid responsive", async ({ page }) => {
  await page.goto("/iframe.html?args=&id=components-grid-grid--responsive-columns&viewMode=story");
  await expect(page).toHaveScreenshot("grid-responsive.png");
});

test("grid with service", async ({ page }) => {
  await page.goto("/iframe.html?id=components-grid-grid--example-with-service&viewMode=story");
  await expect(page).toHaveScreenshot("grid-with-service-1.png");
  await page.getByTestId("fudis-button-1").click();
  await expect(page).toHaveScreenshot("grid-with-service-2.png");
  await page.getByTestId("fudis-button-2").click();
  await expect(page).toHaveScreenshot("grid-with-service-3.png");
});

test("grid with flexbox", async ({ page }) => {
  await page.goto(
    "/iframe.html?globals=&args=&id=components-grid-grid--with-flexbox&viewMode=story",
  );
  await expect(page).toHaveScreenshot("grid-with-flexbox.png", { fullPage: true });
});
