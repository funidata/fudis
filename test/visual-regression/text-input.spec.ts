import test, { expect } from "@playwright/test";

test("text-input disabled", async ({ page }) => {
  await page.goto("/iframe.html?args=&id=components-form-text-input--disabled&viewMode=story");
  await expect(page).toHaveScreenshot("disabled-1-init.png");
  await page.getByTestId("fudis-text-input-1").focus();
  await expect(page).toHaveScreenshot("disabled-2-focus.png");
});

test("text-input with validators", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=&id=components-form-text-input--with-validators&viewMode=story",
  );
  await expect(page).toHaveScreenshot("validators-1-init.png");
  await page.getByTestId("fudis-text-input-1").focus();
  await page.getByTestId("fudis-text-input-2").focus();
  await page.getByTestId("fudis-text-input-2").fill("hey");
  await page.getByTestId("fudis-text-input-1").focus();
  await expect(page).toHaveScreenshot("validators-2-blur.png");
  await page.getByTestId("fudis-text-input-1").fill("Hello there!");
  await page.getByTestId("fudis-text-input-2").focus();
  await page.getByTestId("fudis-text-input-2").fill("grievous@malevolence.com");

  await expect(page).toHaveScreenshot("validators-3-filled.png");
});
