import test, { expect } from "@playwright/test";

test("section default", async ({ page }) => {
  await page.goto("/iframe.html?args=&id=components-section--example&viewMode=story");
  await expect(page).toHaveScreenshot();
  await page.getByTestId("fudis-button-1").hover();
  await expect(page).toHaveScreenshot("1-header-tooltip-hovered.png");
  await page.getByTestId("fudis-expandable-1").click();
  await expect(page).toHaveScreenshot("1-content-expandable-clicked.png");
});

test("section titleSize md", async ({ page }) => {
  await page.goto("/iframe.html?args=titleSize:md&id=components-section--example&viewMode=story");
  await expect(page).toHaveScreenshot();
});
