import test, { expect } from "@playwright/test";

let date = "20.1.2024";

test("datepicker default", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=&id=components-form-date-datepicker--datepicker&viewMode=story",
  );
  await expect(page).toHaveScreenshot();
});

test("datepicker default focus and fill input", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=&id=components-form-date-datepicker--datepicker&viewMode=story",
  );
  await page.getByTestId("fudis-datepicker-1").focus();
  await page.getByTestId("fudis-datepicker-1").fill(date);
  await expect(page).toHaveScreenshot();
});

test("datepicker default open calendar pop-up", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=&id=components-form-date-datepicker--datepicker&viewMode=story",
  );
  await page.getByTestId("fudis-datepicker-1").fill(date);
  await page.getByTestId("fudis-datepicker-1-calendar-icon-toggle").click();
  await expect(page).toHaveScreenshot({ fullPage: true });
});

test("datepicker default change calendar language", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=&id=components-form-date-datepicker--datepicker&viewMode=story",
  );
  await page.getByTestId("fudis-button-1").click();
  await expect(page.getByText("Current language: fi")).toBeVisible();
  await page.getByTestId("fudis-datepicker-1-calendar-icon-toggle").click();
  await page.waitForSelector(".mdc-button__label");
  await expect(page).toHaveScreenshot("to-finnish.png", { fullPage: true });
  await page.keyboard.press("Escape");

  await page.getByTestId("fudis-button-1").click();
  await expect(page.getByText("Current language: sv")).toBeVisible();
  await page.getByTestId("fudis-datepicker-1-calendar-icon-toggle").click();

  await page.waitForSelector(".mdc-button__label");
  await expect(page).toHaveScreenshot("to-swedish.png", { fullPage: true });
  await page.keyboard.press("Escape");

  await page.getByTestId("fudis-button-1").click();
  await expect(page.getByText("Current language: en")).toBeVisible();
  await page.getByTestId("fudis-datepicker-1-calendar-icon-toggle").click();
  await page.waitForSelector(".mdc-button__label");
  await expect(page).toHaveScreenshot("to-english.png", { fullPage: true });
});

test("datepicker disabled", async ({ page }) => {
  await page.goto("/iframe.html?args=&id=components-form-date-datepicker--disabled&viewMode=story");
  await expect(page).toHaveScreenshot();
});

test("datepicker min and max", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=&id=components-form-date-datepicker--with-min-max-validator&viewMode=story",
  );
  await page.getByTestId("fudis-datepicker-1-calendar-icon-toggle").click();
  await expect(page).toHaveScreenshot({ fullPage: true });
});
