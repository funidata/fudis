import test, { expect } from "@playwright/test";

test("error summary", async ({ page }) => {
  const invalidEmailText =
    "Section title / Fieldset legend / Contact email: Input must be an email address.";

  const missingTeacher =
    "Section title / Fieldset legend / Responsible teacher: Missing teacher's name who is responsible for this course.";

  await page.goto("/iframe.html?args=&id=components-form-error-summary--example&viewMode=story");

  await page.getByTestId("fudis-button-2").click();
  await expect(page).toHaveScreenshot("1-init.png", { fullPage: true });
  await page.getByTestId("fudis-link-4").click();
  await expect(page.getByTestId("fudis-checkbox-group-1-legend")).toBeFocused();

  await page.getByTestId("unique-input-4").focus();
  await page.getByTestId("unique-input-4").clear();
  await page.keyboard.type("hello", { delay: 25 });
  await expect(page).toHaveScreenshot("2-before-reload-only.png", { fullPage: true });
  await page.getByTestId("fudis-button-2").click();
  await expect(page).toHaveScreenshot("3-after-reload-only.png", { fullPage: true });
  await page.getByTestId("fudis-button-1").click();
  await expect(page.getByText(invalidEmailText)).toBeVisible();
  await expect(page).toHaveScreenshot("4-before-remove-only-1.png", { fullPage: true });

  await page.getByTestId("unique-input-4").focus();
  await page.getByTestId("unique-input-4").clear();
  await page.keyboard.type("hello@hey.com", { delay: 25 });
  await expect(page.getByText(invalidEmailText)).not.toBeVisible();
  await expect(page).toHaveScreenshot("5-after-removeonly.png", { fullPage: true });
  await page.getByTestId("fudis-button-1").click();
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
