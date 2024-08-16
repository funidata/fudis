import test, { expect } from "@playwright/test";

test("radio button group with required", async ({ page }) => {
  await page.goto("/iframe.html?args=&id=components-form-radio-button-group--example&viewMode=story");
  await expect(page).toHaveScreenshot("validation-1-init.png");

  await page.getByTestId("fudis-radio-button-group-1-item-1").focus();
  await expect(page).toHaveScreenshot("validation-2-focus-1.png");

  await page.getByTestId("fudis-radio-button-group-1-item-2").focus();
  await page.waitForSelector(".fudis-error-message");
  await expect(page.getByText("You must choose a fruit")).toBeVisible();
  await expect(page).toHaveScreenshot("validation-3-errors.png.png");

  await page.getByTestId("fudis-radio-button-group-1-item-2").click();
  await expect(page).toHaveScreenshot("validation-4-click-1.png");

  await page.keyboard.press("ArrowDown");
  await expect(page).toHaveScreenshot("validation-5-click-2.png");

  await page.keyboard.press("Tab");
  await expect(page).toHaveScreenshot("validation-6-blur.png");
});

test("radio button group disabled", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=&id=components-form-radio-button-group--example-with-disabled-options",
  );
  await expect(page).toHaveScreenshot("disabled-1-init.png");
});