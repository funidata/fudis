import test, { expect } from "@playwright/test";

test("form dynamic inputs", async ({ page }) => {
  const errorSummaryText =
    "There are errors in this form. Please address these before trying to submit again.";

  await page.goto(
    "/iframe.html?args=&id=components-form-form--example-with-dynamic-validators&viewMode=story",
  );

  await expect(page.getByTestId("fudis-text-input-1")).toBeVisible();
  await expect(page.getByTestId("fudis-text-input-2")).toBeVisible();
  await expect(page.getByTestId("fudis-text-input-3")).toBeVisible();
  await expect(page.getByTestId("fudis-datepicker-1")).toBeVisible();
  await expect(page.getByTestId("fudis-select-1")).toBeVisible();
  await expect(page.getByTestId("fudis-checkbox-group-1")).toBeVisible();
  await expect(page.getByTestId("fudis-checkbox-group-2")).toBeVisible();
  await expect(page.getByTestId("fudis-checkbox-group-3")).toBeVisible();
  await expect(page.getByTestId("fudis-radio-button-group-1")).toBeVisible();
  await expect(page.getByTestId("fudis-localized-text-group-1")).toBeVisible();

  await page.getByTestId("fudis-button-2").click(); // submit form with errors
  await expect(page.getByText(errorSummaryText)).toBeVisible();
  await expect(page).toHaveScreenshot("dynamic-1-submit-with-errors.png", { fullPage: true });

  await page.getByTestId("fudis-button-1").click(); // Click toggle to hide

  await expect(page.getByText(errorSummaryText)).not.toBeVisible();

  await page.getByTestId("fudis-button-1").click(); // Click toggle to show

  await expect(page.getByText(errorSummaryText)).toBeVisible();

  await page.getByTestId("fudis-button-1").click(); // Click toggle to hide

  await expect(page.getByText(errorSummaryText)).not.toBeVisible();

  await page.getByTestId("fudis-button-2").click(); // Click submit to show

  await expect(page.getByText(errorSummaryText)).toBeVisible();

  /**
   * Remove validators which are visible at the moment
   */
  await page.getByTestId("fudis-button-3").click(); // remove required validator from text input
  await page.getByTestId("fudis-button-9").click(); // remove required number validator
  await page.getByTestId("fudis-button-12").click(); // remove required date validator
  await page.getByTestId("fudis-button-15").click(); // remove required option validator
  await page.getByTestId("fudis-checkbox-group-1-item-1").click(); // Check the first checkbox to remove error messages
  await page.getByTestId("fudis-button-16").click(); // remove required validator from radio button group

  await page.getByTestId("fudis-button-17").click(); // remove at least one required validator from Localized Text Group

  await page.getByTestId("fudis-button-2").click(); // submit form without errors

  await expect(page.getByText(errorSummaryText)).not.toBeVisible();

  await expect(page).toHaveScreenshot("dynamic-2-submit-without-errors.png", { fullPage: true });

  /**
   * Insert invalid data to inputs
   */
  await page.getByTestId("fudis-text-input-1").fill("hi"); // Insert invalid minlength to text-input
  await page.getByTestId("fudis-text-input-2").fill("mail"); // Insert invalid email pattern and minlength to email text-input
  await page.getByTestId("fudis-text-input-3").fill("123456"); // Insert invalid maxnumber to number text-input
  await page
    .getByTestId("fudis-datepicker-1")
    .fill(new Date(2021, 3, 12).toLocaleDateString("fi-FI")); // Insert invalid mindate to datepicker
  await page.getByTestId("fudis-checkbox-group-1-item-1").focus(); // Focus on the first checkbox
  await page.getByText("Summer holidays").click(); // Uncheck the first checkbox

  await expect(page.getByText("At least one option must be selected")).toHaveCount(3);

  await page.waitForTimeout(150).then(async () => {
    await page.getByTestId("fudis-button-2").click(); // submit form with errors
    await expect(page).toHaveScreenshot("dynamic-3-submit-with-invalid-data.png", {
      fullPage: true,
    });
  });

  /**
   * Remove validators which are visible at the moment
   */
  await page.getByTestId("fudis-button-5").click(); // remove minlength validator from text input
  await page.getByTestId("fudis-button-6").click(); // remove email pattern validator
  await page.getByTestId("fudis-button-8").click(); // remove min length validator from email input
  await page.getByTestId("fudis-button-10").click(); // remove max number validator
  await page.getByTestId("fudis-button-14").click(); // remove min date validator
  await page.getByTestId("fudis-checkbox-group-2-item-1").focus(); // Focus on the second checkbox
  await page.getByText("Winter holidays").click(); // Check the second checkbox

  await page.getByTestId("fudis-button-2").click(); // submit form without errors
  await expect(page).toHaveScreenshot("dynamic-4-submit-after-removed-validators.png", {
    fullPage: true,
  });
});
