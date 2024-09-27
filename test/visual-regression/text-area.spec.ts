import test, { expect } from "@playwright/test";

test("text-area disabled", async ({ page }) => {
  await page.goto("/iframe.html?args=&id=components-form-text-area--disabled&viewMode=story");
  await page.getByTestId("fudis-text-area-1").focus();
  await expect(page).toHaveScreenshot("disabled.png");
});

test("text-area with validators", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=&id=components-form-text-area--with-validators&viewMode=story",
  );
  await expect(page).toHaveScreenshot("validators-1-init.png");
  await page.getByTestId("fudis-text-area-1").focus();
  await page.getByTestId("fudis-text-area-2").focus();
  await page.getByTestId("fudis-text-area-2").fill("hey");
  await page.getByTestId("fudis-text-area-1").focus();
  await expect(page).toHaveScreenshot("validators-2-blur.png");
  await page.getByTestId("fudis-text-area-1").fill("Hello there!");
  await page.getByTestId("fudis-text-area-2").focus();
  await page.getByTestId("fudis-text-area-2").fill("General Kenobi!");

  await expect(page).toHaveScreenshot("validators-3-filled.png");
});
