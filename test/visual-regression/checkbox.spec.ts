import test, { expect } from "@playwright/test";

test("checkbox default states", async ({ page }) => {
  await page.goto(
    "/iframe.html?globals=&args=&id=components-form-checkbox--all-states&viewMode=story",
  );
  await page.getByTestId("fudis-checkbox-1").focus();
  await page.getByTestId("fudis-checkbox-2").click();
  await expect(page).toHaveScreenshot("checkbox-states-init.png", { fullPage: true });
});
