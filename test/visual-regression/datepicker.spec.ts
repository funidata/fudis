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
  await page.getByTestId("fudis-datepicker-1-calendar-icon-toggle").click();
  await expect(page).toHaveScreenshot({ path:"to-finnish.png", fullPage: true });
  await page.waitForText("Touko 2024").toBeVisible();
  await page.getByTestId("fudis-datepicker-1-calendar-icon-toggle").click();

  await page.waitForSelector(".fudis-button").toBeVisible();
  await page.getByTestId("fudis-button-1").click();
  await page.getByTestId("fudis-datepicker-1-calendar-icon-toggle").click();
  await expect(page).toHaveScreenshot({ path: "to-swedish.png", fullPage: true });
  await page.waitForText("Maj 2024").toBeVisible();
  await page.getByTestId("fudis-datepicker-1-calendar-icon-toggle").click();

  await page.waitForSelector(".fudis-button").toBeVisible();
  await page.getByTestId("fudis-button-1").click();
  await page.getByTestId("fudis-datepicker-1-calendar-icon-toggle").click();
  await expect(page).toHaveScreenshot({ path: "to-english.png", fullPage: true });
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
