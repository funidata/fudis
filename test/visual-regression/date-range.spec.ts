import test, { expect } from "@playwright/test";

let startDate = "15.10.2024";
let invalidEndDate = "10.10.2024";
let endDate = "21.10.2024";

test("date range default init, focus, fill", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=&id=components-form-date-date-range--date-range&viewMode=story",
  );
  await expect(page.getByTestId("fudis-datepicker-1")).toBeVisible();
  await expect(page.getByTestId("fudis-datepicker-2")).toBeVisible();

  await page.getByTestId("fudis-datepicker-1").focus();
  await page.getByTestId("fudis-datepicker-2").focus();
  await page.getByTestId("fudis-datepicker-1").fill(startDate);
  await expect(page.getByText("Date is required.")).toBeVisible();

  await page.getByTestId("fudis-datepicker-2").fill(invalidEndDate);
  await expect(page.getByText("End date cannot be before start date")).toBeVisible();
  await expect(page.getByText("Start date cannot be after end date")).toBeVisible();
  await expect(page).toHaveScreenshot("1-with-date-comparison.png", { fullPage: true });

  await page.getByTestId("fudis-datepicker-2").fill(endDate);
  await expect(page.getByText("End date cannot be before start date")).not.toBeVisible();
  await expect(page.getByText("Start date cannot be after end date")).not.toBeVisible();
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
});
