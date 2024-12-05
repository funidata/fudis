import test, { expect } from "@playwright/test";

test("error summary", async ({ page }) => {
  const invalidEmailText =
    "Form Section Title / Fieldset Legend / Contact email: Input must be an email address.";

  const missingEmailText =
    "Form Section Title / Fieldset Legend / Contact email: Missing email contact.";

  const missingTeacher =
    "Form Section Title / Fieldset Legend / Responsible Teacher: Missing teacher's name who is responsible for this course.";

  await page.goto("/iframe.html?args=&id=components-form-error-summary--example&viewMode=story");

  await page.getByTestId("submit-button").click();
  await expect(page).toHaveScreenshot("1-init.png", { fullPage: true });
  await page.getByTestId("fudis-link-4").click();
  await expect(page.getByTestId("fudis-checkbox-group-1-legend")).toBeFocused();

  await page.getByTestId("unique-input-4").focus();
  await page.keyboard.type("hello");
  await expect(page.getByText(missingEmailText)).toBeVisible();
  await expect(page.getByText(invalidEmailText)).not.toBeVisible();
  await expect(page).toHaveScreenshot("2-before-reload-only.png", { fullPage: true });
  await page.getByTestId("submit-button").click();
  await expect(page).toHaveScreenshot("3-after-reload-only.png", { fullPage: true });
  await page.getByTestId("change-strategy-button").click();
  await expect(page.getByText(invalidEmailText)).toBeVisible();
  await expect(page).toHaveScreenshot("4-before-remove-only-1.png", { fullPage: true });
  await page.getByTestId("unique-input-4").focus();
  await page.getByTestId("unique-input-4").clear();
  await page.keyboard.type("hello@hey.com");
  await expect(page.getByText(invalidEmailText)).not.toBeVisible();
  await expect(page).toHaveScreenshot("5-after-removeonly.png", { fullPage: true });
  await page.getByTestId("change-strategy-button").click();
  await expect(page.getByText(missingTeacher)).toBeVisible();
  await page.getByTestId("unique-input-4").focus();
  await page.getByTestId("unique-input-4").clear();
  await page.keyboard.type("cookie@put.down", { delay: 25 });
  await page.getByTestId("unique-input-3").focus();
  await page.getByTestId("unique-input-3").clear();
  await page.keyboard.type("Mr. Kimble", { delay: 25 });
  await expect(page.getByText(missingTeacher)).not.toBeVisible();
  await expect(page).toHaveScreenshot("6-after-remove-all-1.png", { fullPage: true });
  await page.getByTestId("unique-input-3").clear();
  await expect(page.getByText(missingTeacher)).toBeVisible();
  await expect(page).toHaveScreenshot("7-after-remove-all-2.png", { fullPage: true });
});

test("error summary language change and manually sent errors", async ({ page }) => {
  const firstManualError =
    "Add and Remove Error Summary Messages / This is the first custom error sent to Error Summary";

  const secondManualError =
    "Add and Remove Error Summary Messages / Here is the second custom error";

  const firstManualErrorFi =
    "Lisää tai poista Error Summaryn viestejä / Tämä on ensimmäinen manuaalisesti Error Summaryyn lähetetty virheviesti";

  const secondManualErrorFi =
    "Lisää tai poista Error Summaryn viestejä / Tämä on toinen manuaalinen virheviesti";

  await page.goto("/iframe.html?args=&id=components-form-error-summary--example&viewMode=story");

  await page.getByTestId("error-button-1").click();
  await page.getByTestId("submit-button").click();
  await page.waitForTimeout(100);
  await expect(page.getByText(firstManualError)).toBeVisible();
  await expect(page.getByText(secondManualError)).not.toBeVisible();

  // Change update strategy
  await page.getByTestId("change-strategy-button").dblclick();
  await expect(page.getByText("Current Error Summary update strategy is: all")).toBeVisible();

  await page.getByTestId("error-button-2").click();
  await page.waitForTimeout(100);
  await expect(page.getByText(firstManualError)).toBeVisible();
  await expect(page.getByText(secondManualError)).toBeVisible();
  await page.getByTestId("error-button-2").focus();
  await expect(page).toHaveScreenshot("8-manual-errors-visible-en.png", { fullPage: true });

  // Change language
  await page.getByTestId("change-language-button").click();
  await expect(page.getByText(firstManualError)).not.toBeVisible();
  await expect(page.getByText(secondManualError)).not.toBeVisible();
  await expect(page.getByText(firstManualErrorFi)).toBeVisible();
  await expect(page.getByText(secondManualErrorFi)).toBeVisible();
  await expect(page).toHaveScreenshot("9-manual-errors-visible-fi.png", { fullPage: true });

  // Remove manual errors
  await page.getByTestId("error-button-1").click();
  await page.getByTestId("error-button-2").click();
  await expect(page.getByText(firstManualErrorFi)).not.toBeVisible();
  await expect(page.getByText(secondManualErrorFi)).not.toBeVisible();
  await expect(page).toHaveScreenshot("10-manual-errors-remove.png", { fullPage: true });
});
