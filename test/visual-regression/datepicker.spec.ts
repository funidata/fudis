import test, { expect } from "@playwright/test";

let date = "20.1.2024";

test("datepicker", async ({ page }) => {
  await page.goto("/iframe.html?args=&id=components-form-date-datepicker--datepicker&viewMode=story");
  await expect(page).toHaveScreenshot();
});

test("datepicker focus and fill input", async ({ page }) => {
  await page.goto("/iframe.html?args=&id=components-form-date-datepicker--datepicker&viewMode=story");
  await page.getByTestId("fudis-datepicker-1").focus();
  await page.getByTestId("fudis-datepicker-1").fill(date);
  await expect(page).toHaveScreenshot();
});

test("datepicker open calendar pop-up", async ({ page }) => {
  await page.goto("/iframe.html?args=&id=components-form-date-datepicker--datepicker&viewMode=story");
  await page.getByTestId("fudis-datepicker-1").fill(date);
  await page.getByTestId("fudis-datepicker-calendar-icon-toggle").click();
  await expect(page).toHaveScreenshot({ fullPage: true });
});

