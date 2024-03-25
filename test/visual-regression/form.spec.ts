import test, { expect } from "@playwright/test";

test("form default", async ({ page }) => {
  await page.goto("/iframe.html?args=&id=components-form-form--example&viewMode=story");

  await page.getByTestId("fudis-button-2").click();
  await expect(page).toHaveScreenshot("default-form.png");
});

test("form multiple", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=&id=components-form-form--example-with-multiple-forms&viewMode=story",
  );

  await page.getByTestId("fudis-button-2").click();
  await expect(page).toHaveScreenshot("multiple-form-1.png");
  await page.getByTestId("fudis-button-1").click();

  await expect(page).toHaveScreenshot("multiple-form-2.png");
});
