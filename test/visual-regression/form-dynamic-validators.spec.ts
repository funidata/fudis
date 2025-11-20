import test, { expect } from "@playwright/test";

test("form dynamic validators", async ({ page }) => {
  const errorSummaryText =
    "There are errors in this form. Please address these before trying to submit again.";

  await page.goto("/iframe.html?args=&id=components-form-form--pw-form-dynamic-example");

  await expect(page.getByTestId("fudis-text-input-1")).toBeVisible();
  await expect(page.getByTestId("fudis-text-input-2")).toBeVisible();
  await expect(page.getByTestId("fudis-text-input-3")).toBeVisible();
  await expect(page.getByTestId("fudis-datepicker-1")).toBeVisible();
  await expect(page.getByTestId("fudis-select-1")).toBeVisible();
  await expect(page.getByTestId("fudis-radio-button-group-1")).toBeVisible();
  await expect(page.getByTestId("fudis-localized-text-group-1")).toBeVisible();
  await expect(page.getByTestId("fudis-checkbox-group-1")).toBeVisible();
  await expect(page.getByTestId("fudis-checkbox-group-2")).toBeVisible();
  await expect(page.getByTestId("fudis-checkbox-group-3")).toBeVisible();

  await page.getByTestId("fudis-button-2").click(); // submit form with errors
  await expect(page.getByText(errorSummaryText)).toBeVisible();
  await expect(page).toHaveScreenshot("dynamic-1-submit-with-errors.png", { fullPage: true });

  await page.getByTestId("fudis-button-1").click(); // Click toggle to hide
  await expect(page.getByText(errorSummaryText)).not.toBeVisible();

  await page.getByTestId("fudis-button-1").click(); // Click toggle to show
  await expect(page.getByText(errorSummaryText)).toBeVisible();

  /**
   * Remove validators which are visible at the moment
   */

  await page.getByTestId("fudis-button-3").click(); // Toggle Remove Required Validators
  await page.getByTestId("fudis-checkbox-group-1-item-1").click(); // Check the first checkbox to remove error messages

  await page.getByTestId("fudis-button-2").click(); // submit form without errors

  await expect(page.getByText(errorSummaryText)).not.toBeVisible();

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

  await page.getByTestId("fudis-button-2").click(); // submit form with errors
  await expect(page).toHaveScreenshot("dynamic-2-submit-with-invalid-data.png", {
    fullPage: true,
  });

  await page.getByText("Winter holidays").click(); // Check the second checkbox
  await page.getByTestId("fudis-button-4").click(); // Toggle Remove Other Validators

  await page.getByTestId("fudis-button-2").click(); // submit form without errors
  await expect(page).toHaveScreenshot("dynamic-3-submit-after-removed-validators.png", {
    fullPage: true,
  });
});
