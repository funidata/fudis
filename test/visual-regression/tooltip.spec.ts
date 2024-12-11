import test, { expect } from "@playwright/test";

test("tooltip toggle", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=tooltipToggle:!true&id=directives-tooltip--example-with-fudis-button&viewMode=story",
  );
  await page.getByTestId("fudis-button-1").click();
  await page.waitForTimeout(150).then(async () => {
    await expect(page).toHaveScreenshot("toggle.png");
  });
});
