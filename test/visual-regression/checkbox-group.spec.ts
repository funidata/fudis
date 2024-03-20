import test, { expect } from "@playwright/test";

test("checkbox group one required", async ({ page }) => {
  await page.goto("/iframe.html?args=&id=components-form-checkbox-group--example&viewMode=story");

  await expect(page).toHaveScreenshot("1-init.png");

  await page.getByTestId("fudis-checkbox-group-1-item-4").focus();
  await expect(page).toHaveScreenshot("2-focus-1.png");
  await page.getByTestId("fudis-checkbox-group-1-item-5").focus();
  await expect(page).toHaveScreenshot("3-focus-2.png");
  await page.getByTestId("fudis-checkbox-group-1-item-5").blur();
  await expect(page).toHaveScreenshot("4-errors.png");
  await page.getByTestId("fudis-checkbox-group-1-item-2").click();
  await expect(page).toHaveScreenshot("5-click.png");
});

test("checkbox group disabled", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=&id=components-form-checkbox-group--example-with-disabled-option&viewMode=story",
  );

  await expect(page).toHaveScreenshot("1-init.png");

  await page.getByTestId("fudis-checkbox-group-1-item-1").click();

  await expect(page).toHaveScreenshot("2-focused-and-clicked.png");
});
