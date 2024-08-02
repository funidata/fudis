import test, { expect } from "@playwright/test";

test("button default", async ({ page }) => {
  await page.goto("/iframe.html?args=&id=components-button--all-variants&viewMode=story");
  await expect(page.getByTestId("fudis-button-1")).toBeVisible();
  await expect(page).toHaveScreenshot("1-all-buttons.png", { fullPage: true });
  await page.getByTestId("fudis-button-1").focus();
  await expect(page).toHaveScreenshot("2-focus-primary-button.png", { fullPage: true });
  await page.keyboard.press("Tab");
  await expect(page).toHaveScreenshot("3-focus-secondary-button.png", { fullPage: true });
  await page.keyboard.press("Tab");
  await expect(page).toHaveScreenshot("4-focus-tertiary-button.png", { fullPage: true });
  await page.keyboard.press("Tab");
  await expect(page).toHaveScreenshot("5-skipped-disabled-button-focus.png", { fullPage: true });
});
