import test, { expect } from "@playwright/test";

test("error message", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=&id=components-form-error-message--example-with-observable-error&viewMode=story",
  );

  await page.getByTestId("fudis-text-input-1").focus();

  await page.getByTestId("fudis-button-1").focus();

  await expect(page).toHaveScreenshot("1-init.png");

  await page.getByTestId("fudis-button-1").click();

  await expect(page).toHaveScreenshot("2-errors-1.png");

  await page.getByTestId("fudis-button-2").click();

  await expect(page).toHaveScreenshot("3-errors-2.png");
});
