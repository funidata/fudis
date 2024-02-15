import test, { expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto(
    "/iframe.html?args=&id=components-form-select-multiselect--example&viewMode=story",
  );
});

test("default", async ({ page }) => {
  await expect(page).toHaveScreenshot();
});

test("focused", async ({ page }) => {
  await page.getByRole("combobox").focus();
  await expect(page).toHaveScreenshot();
});

test("option selected", async ({ page }) => {
  await page.getByRole("combobox").focus();
  await page.locator("#fudis-multiselect-1-item-1 div").first().check();
  await page.locator("#fudis-multiselect-1-item-3 div").first().check();
  await expect(page).toHaveScreenshot();
});

test("selected and blurred", async ({ page }) => {
  await page.getByRole("combobox").focus();
  await page.locator("#fudis-multiselect-1-item-1 div").first().check();
  await page.locator("#fudis-multiselect-1-item-3 div").first().check();
  await page.keyboard.press("Escape");
  await expect(page).toHaveScreenshot();
});
