import test, { expect } from "@playwright/test";

test("error summary", async ({ page }) => {
  await page.goto("/iframe.html?args=&id=components-form-error-summary--example&viewMode=story");

  await page.getByTestId("fudis-button-2").click();
  await expect(page).toHaveScreenshot("1-init.png");

  await page.getByTestId("unique-input-4").fill("hello");
  await expect(page).toHaveScreenshot("2-before-reload-only.png");

  await page.getByTestId("fudis-button-2").click();
  await expect(page).toHaveScreenshot("3-after-reload-only.png");
  await page.getByTestId("fudis-button-1").click();
  await expect(page).toHaveScreenshot("4-before-remove-only-1.png");
  await page.getByTestId("unique-input-4").fill("hello@hey.com");
  await expect(page).toHaveScreenshot("5-after-removeonly.png");
  await page.getByTestId("fudis-button-1").click();
  await page.getByTestId("unique-input-4").fill("cookie@put.down");
  await page.getByTestId("unique-input-3").fill("Mr. Kimble");
  await expect(page).toHaveScreenshot("6-after-remove-all-1.png");
  await page.getByTestId("unique-input-3").fill("");
  await expect(page).toHaveScreenshot("7-after-remove-all-2.png");
});
