import test, { expect } from "@playwright/test";

test("fieldset", async ({ page }) => {
  await page.goto("/iframe.html?args=&id=components-form-fieldset--example&viewMode=story");
  await expect(page).toHaveScreenshot();
});
