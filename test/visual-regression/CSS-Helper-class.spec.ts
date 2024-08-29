import test, { expect } from "@playwright/test";

test("responsive margins and paddings", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=&id=foundations-spacing-css-helper-classes--example&viewMode=story",
  );
  await expect(page).toHaveScreenshot();
});
