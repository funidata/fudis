import test, { expect } from "@playwright/test";

test("form dynamic text-input", async ({ page }) => {
  await page.goto("/iframe.html?args=&id=components-form-form--dynamic-example&viewMode=story");
  await page.getByTestId("fudis-text-input-2").fill("mail");
  await page.getByTestId("fudis-text-input-3").fill("123456");

  await page.getByTestId("fudis-button-1").click(); /* submit form */
  await expect(page).toHaveScreenshot("dynamic-1-first-submit.png", { fullPage: true });

  await page.getByTestId("fudis-button-2").click(); /* remove required validator from text input */
  await page
    .getByTestId("fudis-button-3")
    .click(); /* remove max length validator from text input */
  await page.getByTestId("fudis-button-5").click(); /* remove email pattern validator */
  await page
    .getByTestId("fudis-button-7")
    .click(); /* remove min length validator from email input */
  await page.getByTestId("fudis-button-9").click(); /* remove max number validator */

  await expect(page).toHaveScreenshot("dynamic-2-validators-removed.png", { fullPage: true });

  await page.getByTestId("fudis-button-1").click(); /* submit form */
  await expect(page).toHaveScreenshot("dynamic-3-second-submit.png", { fullPage: true });

  await page.getByTestId("fudis-text-input-2").fill("mail@fi");
  await page.getByTestId("fudis-text-input-3").fill("1");

  await page.getByTestId("fudis-button-2").click(); /* add required validator from text input */
  await page.getByTestId("fudis-button-3").click(); /* add max length validator from text input */
  await page.getByTestId("fudis-button-5").click(); /* add email pattern validator */
  await page.getByTestId("fudis-button-7").click(); /* add min length validator from email input */
  await page.getByTestId("fudis-button-9").click(); /* add max number validator */

  await expect(page).toHaveScreenshot("dynamic-4-validators-added.png", { fullPage: true });
});

test("form dynamic checkbox-group", async ({ page }) => {
  await page.goto("/iframe.html?args=&id=components-form-form--dynamic-example&viewMode=story");

  await page.getByTestId("fudis-button-1").click(); /* submit form */
  await expect(page).toHaveScreenshot("dynamic-checkbox-group-1-submit-before-checked.png", { fullPage: true });

  await page.getByTestId('fudis-checkbox-group-1-item-1').focus(); /** Focus on the first checkbox */
  await page.getByText("Summer holidays").click(); /** Check the first checkbox */
  await page.getByTestId("fudis-button-1").click(); /* submit form */
  await expect(page).toHaveScreenshot("dynamic-checkbox-group-2-submit-after-checked.png", { fullPage: true });

  await page.getByTestId('fudis-checkbox-group-1-item-1').focus(); /** Focus on the first checkbox */
  await page.getByText("Summer holidays").click(); /** Uncheck the first checkbox */
  await page.getByTestId('fudis-checkbox-group-2-item-1').focus(); /** Focus on the second checkbox */
  await expect(page).toHaveScreenshot("dynamic-checkbox-group-3-uncheck-first-checkbox.png", { fullPage: true });

  await page.getByText("Winter holidays").click(); /** Check the second checkbox */
  await expect(page).toHaveScreenshot("dynamic-checkbox-group-4-check-second-checkbox.png", { fullPage: true });
});
