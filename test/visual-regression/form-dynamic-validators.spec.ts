import test, { expect } from "@playwright/test";

test("form dynamic inputs", async ({ page }) => {
  await page.goto("/iframe.html?args=&id=components-form-form--dynamic-example&viewMode=story");
  await page.getByTestId("fudis-button-1").click(); /* submit form with errors */
  await expect(page).toHaveScreenshot("dynamic-1-submit-with-errors.png", { fullPage: true });

  /**
   * Remove validators which are visible at the moment
   */
  await page.getByTestId("fudis-button-2").click(); /* remove required validator from text input */
  await page.getByTestId("fudis-button-8").click(); /* remove required number validator */
  await page.getByTestId("fudis-button-11").click(); /* remove required date validator */
  await page.getByTestId("fudis-button-14").click(); /* remove required option validator */
  await page
    .getByTestId("fudis-checkbox-group-1-item-1")
    .focus(); /** Focus on the first checkbox */
  await page
    .getByText("Summer holidays")
    .click(); /** Check the first checkbox to remove error messages */
  await page
    .getByTestId("fudis-button-15")
    .click(); /* remove required validator from radio button group */

  await page.getByTestId("fudis-button-1").click(); /* submit form without errors */
  await expect(page).toHaveScreenshot("dynamic-2-submit-without-errors.png", { fullPage: true });

  /**
   * Insert invalid data to inputs
   */
  await page
    .getByTestId("fudis-text-input-1")
    .fill("hi"); /** insert invalid minlength to text-input */
  await page
    .getByTestId("fudis-text-input-2")
    .fill("mail"); /** insert invalid email pattern and minlength to email text-input */
  await page
    .getByTestId("fudis-text-input-3")
    .fill("123456"); /** insert invalid maxnumber to number text-input */
  await page
    .getByTestId("fudis-datepicker-1")
    .fill(
      new Date(2021, 3, 12).toLocaleDateString("fi-FI"),
    ); /** insert invalid mindate to datepicker */
  await page
    .getByTestId("fudis-checkbox-group-1-item-1")
    .focus(); /** Focus on the first checkbox */
  await page.getByText("Summer holidays").click(); /** Uncheck the first checkbox */

  await page.getByTestId("fudis-button-1").click(); /* submit form with errors */
  await expect(page).toHaveScreenshot("dynamic-3-submit-with-invalid-data.png", { fullPage: true });

  /**
   * Remove validators which are visible at the moment
   */
  await page.getByTestId("fudis-button-4").click(); /* remove minlength validator from text input */
  await page.getByTestId("fudis-button-5").click(); /* remove email pattern validator */
  await page
    .getByTestId("fudis-button-7")
    .click(); /* remove min length validator from email input */
  await page.getByTestId("fudis-button-9").click(); /* remove max number validator */
  await page.getByTestId("fudis-button-13").click(); /* remove min date validator */
  await page
    .getByTestId("fudis-checkbox-group-2-item-1")
    .focus(); /** Focus on the second checkbox */
  await page.getByText("Winter holidays").click(); /** Check the second checkbox */

  await page.getByTestId("fudis-button-1").click(); /* submit form without errors */
  await expect(page).toHaveScreenshot("dynamic-4-submit-after-removed-validators.png", {
    fullPage: true,
  });
});
