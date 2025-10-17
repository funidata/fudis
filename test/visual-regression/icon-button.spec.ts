import test, { expect } from "@playwright/test";

test("button default", async ({ page }) => {
  await page.goto("/iframe.html?args=&id=components-iconbutton--all-variants&viewMode=story");
  await expect(page.getByTestId("fudis-button-1")).toBeVisible();
  await expect(page).toHaveScreenshot("1-all-icon-buttons.png", { fullPage: true });
  await page.getByTestId("fudis-button-1").focus();
  await expect(page).toHaveScreenshot("2-focus-primary-icon-button.png", { fullPage: true });
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await expect(page).toHaveScreenshot("3-skipped-disabled-icon-button-focus.png", {
    fullPage: true,
  });
});
