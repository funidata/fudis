import test, { expect } from "@playwright/test";

test("expandable", async ({ page }) => {
  await page.goto("/iframe.html?args=&id=components-expandable--all-variants&viewMode=story");
  await expect(page).toHaveScreenshot("1-init.png");
  await page.getByTestId("fudis-expandable-1-header-button").click();
  await expect(page.getByText("The content of the expandable.")).toBeVisible();
  await expect(page).toHaveScreenshot("2-regular-opened.png");
  await page.getByTestId("fudis-expandable-2-header-button").focus();
  await expect(page).toHaveScreenshot("3-focused-title.png");
  await page.getByTestId("fudis-expandable-4-header-button").click();
  await expect(page).toHaveScreenshot("4-lite-opened.png");
  await page.getByTestId("fudis-expandable-1-header-button").click();
  await expect(page).toHaveScreenshot("5-regular-closed.png");
});
