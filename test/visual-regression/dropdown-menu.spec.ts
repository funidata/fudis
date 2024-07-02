import test, { expect } from "@playwright/test";

test("dropdown menu", async ({ page }) => {
  await page.goto("/iframe.html?id=components-dropdown-menu--example&viewMode=story");
  await expect(page).toHaveScreenshot("1-init.png", { fullPage: true });

  await page.getByTestId("fudis-button-1").click();
  await expect(page).toHaveScreenshot("2-first-menu-open.png", { fullPage: true });

  await page.getByTestId("fudis-dropdown-menu-1-option-1").focus();
  await expect(page).toHaveScreenshot("3-option-focused.png", { fullPage: true });

  await page.getByTestId("fudis-dropdown-menu-1-option-1").click();
  await expect(page).toHaveScreenshot("4-option-clicked.png", { fullPage: true });

  await page.keyboard.press("Enter");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Space");
  await expect(page).toHaveScreenshot("5-option-selected-with-keyboard.png", { fullPage: true });

  await page.keyboard.press("Tab");
  await page.keyboard.press("Enter");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await expect(page).toHaveScreenshot("6-navigate-to-second-menu.png", { fullPage: true });

  await page.keyboard.press("Escape");
  await expect(page).toHaveScreenshot("7-close-dropdown-with-escape.png", { fullPage: true });
});