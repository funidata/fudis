import test, { expect } from "@playwright/test";

test("form default", async ({ page }) => {
  await page.goto("/iframe.html?args=&id=components-form-form--example&viewMode=story");
  await expect(page).toHaveScreenshot("default-1-init.png", { fullPage: true });

  await page.getByTestId("fudis-button-2").click();
  await expect(page).toHaveScreenshot("default-2-after-submit.png", { fullPage: true });
});

test("form multiple", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=&id=components-form-form--example-with-multiple-forms&viewMode=story",
  );
  await page.getByTestId("fudis-button-2").click();
  await expect(page).toHaveScreenshot("multiple-1-single-submitted.png", { fullPage: true });

  await page.getByTestId("fudis-button-1").click();
  await expect(page).toHaveScreenshot("multiple-2-all-submitted.png", { fullPage: true });
});
