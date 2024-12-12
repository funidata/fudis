import test, { expect } from "@playwright/test";

test("basic form components playground", async ({ page }) => {
  await page.goto(
    "/iframe.html?globals=&args=&id=components-test-playground-basic-form-components--example&viewMode=story",
  );
  await expect(page.getByTestId("fudis-text-area-6"))
    .toBeVisible()
    .then(async () => {
      await expect(page).toHaveScreenshot("1-basic-form-components-init.png", { fullPage: true });

      await page.getByTestId("fudis-button-1").click();

      await expect(page.getByTestId("fudis-validator-error-message-25")).toBeVisible();

      await expect(page).toHaveScreenshot("2-basic-form-components-touched.png", {
        fullPage: true,
      });

      await page.getByTestId("fudis-button-2").click();

      await expect(page.getByTestId("fudis-validator-error-message-25")).not.toBeVisible();

      await expect(page).toHaveScreenshot("3-basic-form-components-disabled.png", {
        fullPage: true,
      });
    });
});
