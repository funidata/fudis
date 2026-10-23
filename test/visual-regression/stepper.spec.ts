import test, { expect } from "@playwright/test";

test("stepper in vertical orientation", async ({ page }) => {
  await page.goto(
    `/iframe.html?args=orientation:vertical&id=components-stepper--example&viewMode=story`,
  );

  await expect(page.locator(".fudis-stepper")).toBeVisible();
  await expect(page).toHaveScreenshot(`stepper-vertical.png`);
});
test("stepper in horizontal orientation", async ({ page }) => {
  await page.goto(
    `/iframe.html?args=orientation:horizontal&id=components-stepper--example&viewMode=story`,
  );

  await expect(page.locator(".fudis-stepper")).toBeVisible();
  await expect(page).toHaveScreenshot(`stepper-horizontal.png`);
});
