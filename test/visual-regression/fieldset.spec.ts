import test, { expect } from "@playwright/test";

test("fieldset", async ({ page }) => {
  await page.goto("/iframe.html?args=&id=components-form-field-set--example&viewMode=story");
  await expect(page).toHaveScreenshot();
});
