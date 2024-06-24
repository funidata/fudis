import test, { expect } from "@playwright/test";

test("form default", async ({ page }) => {
  await page.goto("/iframe.html?args=&id=components-form-form--example&viewMode=story");
  await expect(page).toHaveScreenshot("default-1-init.png", { fullPage: true });

  await page.getByTestId("fudis-button-2").click();
  await expect(page).toHaveScreenshot("default-2-after-submit.png", { fullPage: true });
});

test("form dynamic", async ({ page }) => {
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

test("form multiple", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=&id=components-form-form--example-with-multiple-forms&viewMode=story",
  );
  await page.getByTestId("fudis-button-2").click();
  await expect(page).toHaveScreenshot("multiple-1-single-submitted.png", { fullPage: true });

  await page.getByTestId("fudis-button-1").click();
  await expect(page).toHaveScreenshot("multiple-2-all-submitted.png", { fullPage: true });
});
