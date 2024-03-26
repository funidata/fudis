import test, { expect } from "@playwright/test";

test("button default", async ({ page }) => {
  await page.goto("/iframe.html?args=&id=components-button--all-variants&viewMode=story");
  await expect(page.getByTestId("fudis-button-1")).toBeVisible();
  await expect(page).toHaveScreenshot("all-variants.png");

  await page.getByTestId("fudis-button-1").focus();
  await expect(page).toHaveScreenshot("focus-primary.png");
  await page.getByTestId("fudis-button-2").focus();
  await expect(page).toHaveScreenshot("focus-secondary.png");
  await page.getByTestId("fudis-button-3").focus();
  await expect(page).toHaveScreenshot("focus-tertiary.png");
  await page.getByTestId("fudis-button-4").focus();
  await expect(page).toHaveScreenshot("focus-disabled.png");
});
