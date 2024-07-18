import test, { expect } from "@playwright/test";

test("checkbox group one required", async ({ page }) => {
  await page.goto("/iframe.html?args=&id=components-form-checkbox-group--example&viewMode=story");
  await expect(page).toHaveScreenshot("validation-1-init.png");

  await page.getByTestId("fudis-checkbox-group-1-item-4").focus();
  await expect(page).toHaveScreenshot("validation-2-focus-1.png");

  await page.getByTestId("fudis-checkbox-group-1-item-5").focus();
  await expect(page).toHaveScreenshot("validation-3-focus-2.png");

  await page.getByTestId("fudis-checkbox-group-1-item-5").blur();
  await page.waitForSelector(".fudis-error-message");
  await expect(page.getByText("No fruit picked!")).toBeVisible();
  await expect(page).toHaveScreenshot("validation-4-errors.png");

  await page.getByText("Pear").click();
  await expect(page).toHaveScreenshot("validation-5-click.png");
});

test("checkbox group disabled", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=&id=components-form-checkbox-group--example-with-disabled-option&viewMode=story",
  );
  await expect(page).toHaveScreenshot("disabled-1-init.png");

  await page.keyboard.press("Tab"); // Focus on tooltip button
  await page.keyboard.press("Tab"); // Focus on next focusable (i.e. not disabled) checkbox element
  await expect(page).toHaveScreenshot("disabled-2-focused.png");
});
