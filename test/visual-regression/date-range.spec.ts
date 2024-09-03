import test, { expect } from "@playwright/test";

let startDate = "15.10.2024";
let invalidEndDate = "10.10.2024";
let endDate = "21.10.2024";

test("date range default init, focus, fill", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=&id=components-form-date-date-range--date-range&viewMode=story",
  );
  await expect(page).toHaveScreenshot("default-1-init.png");

  await page.getByTestId("fudis-datepicker-1").focus();
  await page.getByTestId("fudis-datepicker-2").focus();
  await page.getByTestId("fudis-datepicker-1").fill(startDate);
  await expect(page.getByText("Date is required.")).toBeVisible();
  await expect(page).toHaveScreenshot("default-2-focus-both-and-fill-startdate.png");

  await page.getByTestId("fudis-datepicker-2").fill(invalidEndDate);
  await expect(page.getByText("End date cannot be before start date")).toBeVisible();
  await expect(page.getByText("Start date cannot be after end date")).toBeVisible();
  await expect(page).toHaveScreenshot("default-3-fill-invalid-enddate.png", { fullPage: true });

  await page.getByTestId("fudis-datepicker-2").fill(endDate);
  await expect(page.getByText("End date cannot be before start date")).not.toBeVisible();
  await expect(page.getByText("Start date cannot be after end date")).not.toBeVisible();
  await expect(page).toHaveScreenshot("default-4-fill-valid-enddate.png", { fullPage: true });
});

test("date range without date comparison", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=dateComparisonParse:!false&id=components-form-date-date-range--date-range&viewMode=story",
  );

  await page.getByTestId("fudis-datepicker-1").focus();
  await page.getByTestId("fudis-datepicker-2").focus();
  await page.getByTestId("fudis-datepicker-1").fill(startDate);
  await expect(page.getByText("Date is required.")).toBeVisible();

  await page.getByTestId("fudis-datepicker-2").fill(invalidEndDate);
  await expect(page.getByText("End date cannot be before start date")).not.toBeVisible();
  await expect(page.getByText("Start date cannot be after end date")).not.toBeVisible();
  await expect(page).toHaveScreenshot("default-5-without-date-comparison.png", { fullPage: true });
});
