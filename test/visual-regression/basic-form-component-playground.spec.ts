import test, { expect } from "@playwright/test";

test("basic form components playground", async ({ page }) => {
  await page.goto(
    "/iframe.html?globals=&args=&id=components-test-playground-basic-form-components--example&viewMode=story",
  );
  await expect(page.getByTestId("fudis-text-area-3"))
    .toBeVisible()
    .then(async () => {
      await expect(page).toHaveScreenshot("1-basic-form-components-init.png", { fullPage: true });

      await page.getByTestId("fudis-button-1").click();

      await expect(page.getByText("This is required!")).toHaveCount(6);
      await expect(
        page.getByText("This is definitely even required as this error has so many words"),
      ).toHaveCount(3);

      await page.getByTestId("fudis-text-input-1").focus();
      await page.keyboard.type("Fill text input!");
      await page.getByTestId("fudis-text-area-1").focus();
      await page.keyboard.type("Fill text area with some more text!");

      await expect(page).toHaveScreenshot("2-basic-form-components-touched.png", {
        fullPage: true,
      });

      await page.getByTestId("fudis-button-2").click();

      await expect(page.getByText("This is required!")).not.toBeVisible();
      await expect(
        page.getByText("This is definitely even required as this error has so many words"),
      ).not.toBeVisible();

      await expect(page).toHaveScreenshot("3-basic-form-components-disabled.png", {
        fullPage: true,
      });
    });
});
