import test, { expect } from "@playwright/test";

test("text-area disabled", async ({ page }) => {
  await page.goto("/iframe.html?args=&id=components-form-text-area--disabled&viewMode=story");
  await page.getByTestId("fudis-text-area-1").focus();
  await expect(page).toHaveScreenshot("disabled.png");
});

test("text-area with validators", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=&id=components-form-text-area--with-validators&viewMode=story",
  );
  await expect(page).toHaveScreenshot("validators-1-init.png");

  await page.getByTestId("fudis-text-area-1").focus();
  await page.getByTestId("fudis-text-area-1").blur();
  await expect(page.getByText("Missing a value.")).toBeVisible();

  await page.getByTestId("fudis-text-area-1").focus();
  await page.getByTestId("fudis-text-area-1").fill("hey");
  await expect(page.getByText("Missing a value.")).not.toBeVisible();
  await expect(page.getByText("Too short input. Minimum length is 5 and maximum length is 20.")).toBeVisible();

  await expect(page).toHaveScreenshot("validators-2-with-errors.png");

  await page.getByTestId("fudis-text-area-1").fill("Hello there!");
  await expect(page.getByText("Too short input. Minimum length is 5 and maximum length is 20.")).not.toBeVisible();

  await expect(page).toHaveScreenshot("validators-3-filled.png");
});
