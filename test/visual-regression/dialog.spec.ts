import test, { expect } from "@playwright/test";

test("dialog with form", async ({ page }) => {
  await page.goto("/iframe.html?args=&id=components-dialog--example-with-form&viewMode=story");
  await page.getByTestId("fudis-button-1").click();
  await expect(page.getByTestId("fudis-button-2")).toBeVisible();
  await expect(page).toHaveScreenshot("form-1-init.png");
  await page.getByText("SUBMIT").click();
  await expect(page).toHaveScreenshot("form-2-errors.png");
  await page.getByTestId("example-input-power-animal").fill("Holiday Armadillo");
  await page.getByText("SUBMIT").focus();
  await expect(page).toHaveScreenshot("form-3-before-submit.png");
  await page.getByText("SUBMIT").click();
  await expect(page).toHaveScreenshot("form-4-after-submit.png");
});

test("dialog with grid", async ({ page }) => {
  await page.goto("/iframe.html?args=&id=components-dialog--example-with-grid&viewMode=story");
  await page.getByTestId("fudis-button-1").click();
  await expect(page.getByTestId("fudis-button-2")).toBeVisible();
  await expect(page).toHaveScreenshot("grid-1-init.png");
  await page.getByRole("region").focus();
  await expect(page).toHaveScreenshot("grid-2-content-focus.png");
  await page.getByText(" I am last item of the grid ").scrollIntoViewIfNeeded();
  await expect(page).toHaveScreenshot("grid-3-content-scrolled.png");
  await page.getByLabel("Close").click();
  await expect(page).toHaveScreenshot("grid-4-content-closed.png");
});

test("nested dialogs", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=&id=components-dialog--example-with-nested-dialogs&viewMode=story",
  );
  await page.getByTestId("fudis-button-1").click();
  await expect(page.getByText("First opened dialog")).toBeVisible();
  await expect(page.getByText("Open nested dialog")).toBeVisible();
  await page.getByTestId("fudis-button-2").click();
  await expect(page.getByText("Second opened dialog")).toBeVisible();
  await expect(page.getByText("Open final third dialog")).toBeVisible();
  await page.getByTestId("fudis-button-5").click();
  await expect(page.getByText("This is now third and last dialog opened.")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByText("This is now third and last dialog opened.")).not.toBeVisible();
  await expect(page.getByText("Second opened dialog")).toBeVisible();
  await page.getByTestId("fudis-button-7").click();
  await expect(page.getByText("First opened dialog")).toBeVisible();
  await page.getByTestId("fudis-button-2").click();
  await expect(page.getByText("Second opened dialog")).toBeVisible();
  await page.getByTestId("fudis-button-11").click();
  await expect(page.getByText("This is now third and last dialog opened.")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByText("Second opened dialog")).toBeVisible();
  await expect(page.getByText("This is now third and last dialog opened.")).not.toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByText("Second opened dialog")).not.toBeVisible();
  await expect(page.getByText("First opened dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByText("First opened dialog")).not.toBeVisible();
});
