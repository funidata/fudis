import test, { expect } from "@playwright/test";

test("tooltip hover", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=&id=directives-tooltip--example-with-fudis-button&viewMode=story",
  );
  await page.getByTestId("fudis-button-1").hover();

  await page.waitForTimeout(50);

  await expect(page).toHaveScreenshot("hover-1-right.png");

  await page.goto(
    "/iframe.html?args=tooltipPosition:below&id=directives-tooltip--example-with-fudis-button&viewMode=story",
  );
  await page.getByTestId("fudis-button-1").hover();

  await page.waitForTimeout(50);

  await expect(page).toHaveScreenshot("hover-2-below.png");
});

test("tooltip toggle", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=tooltipToggle:!true&id=directives-tooltip--example-with-fudis-button&viewMode=story",
  );
  await page.getByTestId("fudis-button-1").click();
  await page.waitForTimeout(50);
  await expect(page).toHaveScreenshot("toggle-1-right.png");

  await page.goto(
    "/iframe.html?args=tooltipPosition:below;tooltipToggle:!true&id=directives-tooltip--example-with-fudis-button&viewMode=story",
  );
  await page.getByTestId("fudis-button-1").click();
  await page.waitForTimeout(50);
  await expect(page).toHaveScreenshot("toggle-2-below.png");
});
