import test, { expect } from "@playwright/test";

test("tooltip hover", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=&id=directives-tooltip--example-with-fudis-button&viewMode=story",
  );
  await page.getByTestId("fudis-button-1").hover();
  await expect(page).toHaveScreenshot("hover.png");
});

test("tooltip toggle", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=tooltipToggle:!true&id=directives-tooltip--example-with-fudis-button&viewMode=story",
  );
  await page.getByTestId("fudis-button-1").click();
  await expect(page).toHaveScreenshot("toggle.png");
});
