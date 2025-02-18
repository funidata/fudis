import test, { expect } from "@playwright/test";

test("expandable", async ({ page }) => {
  await page.goto("/iframe.html?args=&id=components-expandable--all-variants&viewMode=story");
  await page.getByTestId("fudis-expandable-1-header-button").click();
  await expect(page.getByText("The content of the expandable.")).toBeVisible();
  await expect(page).toHaveScreenshot("1-regular-open.png");

  await page.getByTestId("fudis-expandable-4-header-button").focus();
  await page.keyboard.press("Tab");
  await expect(page.getByTestId("fudis-button-1")).toBeFocused();

  await page.getByTestId("fudis-expandable-5-header-button").click();
  await expect(page.getByText("The content of the expandable with padding small.")).toBeVisible();
  await expect(page).toHaveScreenshot("2-lite-open.png");

  await page.getByTestId("fudis-expandable-1-header-button").click();
  await page.getByTestId("fudis-expandable-5-header-button").click();
  await expect(page.getByText("The content of the expandable.")).not.toBeVisible();
  await expect(
    page.getByText("The content of the expandable with padding small."),
  ).not.toBeVisible();
});
