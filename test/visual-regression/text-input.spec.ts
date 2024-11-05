import test, { expect } from "@playwright/test";

test("text-input disabled", async ({ page }) => {
  await page.goto("/iframe.html?args=&id=components-form-text-input--disabled&viewMode=story");
  await page.getByTestId("fudis-text-input-1").focus();
  await expect(page).toHaveScreenshot("disabled.png");
});

test("text-input with validators", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=&id=components-form-text-input--with-validators&viewMode=story",
  );
  await expect(page).toHaveScreenshot("validators-1-init.png", { fullPage: true });
  await page.getByTestId("fudis-text-input-1").focus();
  await page.getByTestId("fudis-text-input-2").focus();
  await expect(page.getByText("This is required field.")).toBeVisible();
  await expect(
    page.getByText("This is a custom error and has nothing to do with components FormControl"),
  ).toBeVisible();

  await page.getByTestId("fudis-text-input-2").fill("hey");
  await page.getByTestId("fudis-text-input-3").focus();
  await expect(page.getByText("Input must be an email address.")).toBeVisible();
  await expect(
    page.getByText("Too short email. Minimum length is 5 and maximum length is 20."),
  ).toBeVisible();

  await page.getByTestId("fudis-text-input-3").fill("hey hey");
  await page.getByTestId("fudis-text-input-4").focus();
  await expect(page.getByText("YOU USED LOW CAPS! SHAME ON YOU!")).toBeVisible();

  await page.getByTestId("fudis-text-input-4").fill("2");
  await page.getByTestId("fudis-text-input-3").focus();
  await expect(page.getByText("Number is too small")).toBeVisible();

  await expect(page).toHaveScreenshot("validators-2-with-errors.png", { fullPage: true });

  await page.getByTestId("fudis-text-input-1").fill("Hello there!");
  await expect(page.getByText("This is required field.")).not.toBeVisible();
  await expect(
    page.getByText("This is a custom error and has nothing to do with components FormControl"),
  ).toBeVisible();

  await page.getByTestId("fudis-text-input-2").fill("grievous@malevolence.com");
  await expect(page.getByText("Input must be an email address.")).not.toBeVisible();
  await expect(
    page.getByText("Too short email. Minimum length is 5 and maximum length is 20."),
  ).not.toBeVisible();

  await page.getByTestId("fudis-text-input-3").fill("HEY HEY");
  await expect(page.getByText("YOU USED LOW CAPS! SHAME ON YOU!")).not.toBeVisible();

  await page.getByTestId("fudis-text-input-4").fill("22");
  await expect(page.getByText("Number is too small")).not.toBeVisible();

  await expect(page).toHaveScreenshot("validators-3-filled.png", { fullPage: true });
});
