import test, { expect } from "@playwright/test";

test("dropdown menu", async ({ page }) => {
  await page.goto("/iframe.html?id=components-dropdown-menu--example&viewMode=story");

  await page.getByTestId("fudis-button-1").click();
  await expect(page).toHaveScreenshot("1-dropdown-menu-open.png", { fullPage: true });

  await page.getByTestId("fudis-dropdown-menu-1-option-1").focus();
  await expect(page).toHaveScreenshot("2-dropdown-menu-option-focused.png", { fullPage: true });

  await page.getByTestId("fudis-dropdown-menu-1-option-1").click();
  await expect(page.getByText("Latest clicked item was: First item")).toBeVisible();

  await page.keyboard.press("Enter");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Space");
  await expect(page.getByText("Latest clicked item was: Third item with really long label to push it to the limit!")).toBeVisible();

  await page.keyboard.press("Tab");
  await page.keyboard.press("Enter");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await expect(page.getByText("Mountain Lion")).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(page.getByText("Mountain Lion")).not.toBeVisible();
});
