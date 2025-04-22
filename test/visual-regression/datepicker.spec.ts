import test, { expect } from "@playwright/test";

let date = "20.1.2024";

test("datepicker default init, focus, fill, open, select", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=&id=components-form-date-datepicker--datepicker&viewMode=story",
  );

  await expect(page.getByText("Choose your favourite date.")).toBeVisible();
  await page.getByTestId("fudis-datepicker-1").focus();
  await page.getByTestId("fudis-datepicker-1").fill(date);
  await page.getByTestId("fudis-datepicker-1-calendar-icon-toggle").click();
  await expect(page.getByTestId("cdk-overlay-0")).toBeVisible();
  await expect(page).toHaveScreenshot("default-1-open-calendar.png", { fullPage: true });
  await page.keyboard.press("ArrowLeft");
  await page.keyboard.press("ArrowLeft");
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("ArrowDown");
  await expect(page).toHaveScreenshot("default-2-navigate-to-date.png", { fullPage: true });
  await page.keyboard.press("Enter");
  await expect(page.getByTestId("cdk-overlay-0")).not.toBeVisible();
  await expect(page.getByText("Choose your favourite date.")).toBeVisible();
  await expect(page).toHaveScreenshot("default-3-selected.png", { fullPage: true });
});

test("datepicker default change calendar language", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=&id=components-form-date-datepicker--datepicker&viewMode=story",
  );

  await expect(page.getByPlaceholder("dd.mm.yyyy")).toBeVisible(); // Note: getByPlaceholder searches for the input with respective placeholder. The placeholder value itself does not have to be visible.
  await page.getByTestId("fudis-datepicker-1").fill(date);
  await page.getByTestId("fudis-button-2").click();
  await expect(page.getByPlaceholder("pp.kk.vvvv")).toBeVisible();
  await expect(page.getByText("Current language: fi")).toBeVisible();
  await page.getByTestId("fudis-datepicker-1-calendar-icon-toggle").click();
  await page.waitForSelector(".mdc-button__label");
  await expect(page).toHaveScreenshot("to-finnish.png", { fullPage: true });
  await page.keyboard.press("Escape");
  await expect(page.getByText("Choose your favourite date.")).toBeVisible();

  await page.getByTestId("fudis-button-2").click();
  await expect(page.getByPlaceholder("dd.mm.åååå")).toBeVisible();
  await expect(page.getByText("Current language: sv")).toBeVisible();
  await page.getByTestId("fudis-datepicker-1").fill(date);
  await page.getByTestId("fudis-datepicker-1-calendar-icon-toggle").click();
  await page.waitForSelector(".mdc-button__label");
  await expect(page).toHaveScreenshot("to-swedish.png", { fullPage: true });
  await page.keyboard.press("Escape");
  await expect(page.getByText("Choose your favourite date.")).toBeVisible();

  await page.getByTestId("fudis-button-2").click();
  await expect(page.getByPlaceholder("dd.mm.yyyy")).toBeVisible();
  await expect(page.getByText("Current language: en")).toBeVisible();
  await page.getByTestId("fudis-datepicker-1").fill(date);
  await page.getByTestId("fudis-datepicker-1-calendar-icon-toggle").click();
  await page.waitForSelector(".mdc-button__label");
  await expect(page).toHaveScreenshot("to-english.png", { fullPage: true });
});

test("datepicker min and max", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=&id=components-form-date-datepicker--with-min-max-validator&viewMode=story",
  );
  await page.getByTestId("fudis-datepicker-1-calendar-icon-toggle").click();
  await expect(page).toHaveScreenshot("min-max-1-init-open.png", { fullPage: true });
  await page.keyboard.press("Escape");
  await expect(page.getByText("Choose a date between the allowed range.")).toBeVisible();
  await page.getByTestId("fudis-datepicker-1").fill("1.2.2024");
  await expect(page.getByText("Date cannot be before 4.2.2024")).toBeVisible();
  await page.getByTestId("fudis-datepicker-1-calendar-icon-toggle").click();
  await expect(page).toHaveScreenshot("min-max-2-min-error-open.png", { fullPage: true });
  await page.keyboard.press("Escape");
  await expect(page.getByText("Choose a date between the allowed range.")).toBeVisible();
  await page.getByTestId("fudis-datepicker-1").fill("22.2.2024");
  await expect(page.getByText("Date cannot be after 20.2.2024")).toBeVisible();
  await page.getByTestId("fudis-datepicker-1").fill("15.2.2024");
  await expect(page.getByText("Date cannot be")).not.toBeVisible();
  await page.getByTestId("fudis-datepicker-1-calendar-icon-toggle").click();
  await expect(page).toHaveScreenshot("min-max-3-valid-open.png", { fullPage: true });
});
