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
  await expect(page.getByText("Dialog with fudis-grid and scrollable content")).toBeVisible();
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
  await page.getByText("Open dialog with nested dialogs").click();
  await expect(page).toHaveScreenshot("nested-dialog-fruit-1.png");

  let currentDialog = page.getByTestId("fudis-dialog-1");
  await expect(currentDialog.getByText("First opened dialog")).toBeVisible();
  await expect(currentDialog.getByText("You don't have any favorite veggies!")).toBeVisible();
  await currentDialog.getByTestId("example-input-fruit").fill("Orange");
  await currentDialog.getByText("Save and open next dialog").click();

  await expect(page).toHaveScreenshot("nested-dialog-berry-1.png");

  currentDialog = page.getByTestId("fudis-dialog-2");
  await expect(currentDialog.getByText("Second opened dialog")).toBeVisible();
  await expect(currentDialog.getByText("You don't have any favorite veggies!")).not.toBeVisible();
  await expect(currentDialog.getByText("Your favorite fruit is Orange.")).toBeVisible();
  await currentDialog.getByTestId("example-input-berry").fill("Strawberry");
  await currentDialog.getByText("Save and open next dialog").click();

  await expect(page).toHaveScreenshot("nested-dialog-vegetable-1.png");

  currentDialog = page.getByTestId("fudis-dialog-3");
  await expect(currentDialog.getByText("Third opened dialog")).toBeVisible();
  await expect(currentDialog.getByText("Your favorite fruit is Orange.")).toBeVisible();
  await expect(currentDialog.getByText("Your favorite berry is Strawberry.")).toBeVisible();
  await currentDialog.getByText("Save and close dialog").click();

  await expect(page).toHaveScreenshot("nested-dialog-berry-2.png");

  currentDialog = page.getByTestId("fudis-dialog-2");
  await expect(currentDialog.getByText("Second opened dialog")).toBeVisible();
  await expect(currentDialog.getByText("Your favorite fruit is Orange.")).toBeVisible();
  await expect(currentDialog.getByText("Your favorite berry is Strawberry.")).toBeVisible();
  await currentDialog.getByTestId("example-input-berry").fill("Blueberry");
  await currentDialog.getByText("Save and close dialog").click();

  await expect(page).toHaveScreenshot("nested-dialog-fruit-2.png");

  currentDialog = page.getByTestId("fudis-dialog-1");
  await expect(currentDialog.getByText("First opened dialog")).toBeVisible();
  await expect(currentDialog.getByText("Your favorite fruit is Orange.")).toBeVisible();
  await expect(currentDialog.getByText("Your favorite berry is Strawberry.")).not.toBeVisible();
  await expect(currentDialog.getByText("Your favorite berry is Blueberry.")).toBeVisible();
  await currentDialog.getByTestId("example-input-fruit").fill("Banana");
  await currentDialog.getByText("Save and open next dialog").click();
  currentDialog = page.getByTestId("fudis-dialog-4");
  await currentDialog.getByText("Save and open next dialog").click();
  currentDialog = page.getByTestId("fudis-dialog-5");
  await currentDialog.getByText("Save and open next dialog").click();

  await expect(page).toHaveScreenshot("nested-dialog-favorite-veggies-1.png");

  currentDialog = page.getByTestId("fudis-dialog-6");
  await expect(currentDialog.getByText("Fourth and last opened dialog")).toBeVisible();
  await expect(currentDialog.getByText("Your favorite fruit is Orange.")).not.toBeVisible();
  await expect(currentDialog.getByText("Your favorite fruit is Banana.")).toBeVisible();
  await expect(currentDialog.getByText("Your favorite berry is Blueberry.")).toBeVisible();
  await currentDialog.getByText("Close this dialog").click();

  await expect(page).toHaveScreenshot("nested-dialog-vegetable-2.png");

  currentDialog = page.getByTestId("fudis-dialog-5");
  await expect(currentDialog.getByText("Third opened dialog")).toBeVisible();
  await expect(currentDialog.getByText("Your favorite fruit is Banana.")).toBeVisible();
  await expect(currentDialog.getByText("Your favorite berry is Blueberry.")).toBeVisible();
  await currentDialog.getByTestId("example-input-vegetable").fill("Tomato");
  await currentDialog.getByText("Save and open next dialog").click();

  await expect(page).toHaveScreenshot("nested-dialog-favorite-veggies-2.png");

  currentDialog = page.getByTestId("fudis-dialog-7");
  await expect(currentDialog.getByText("Fourth and last opened dialog")).toBeVisible();
  await expect(currentDialog.getByText("Your favorite fruit is Banana.")).toBeVisible();
  await expect(currentDialog.getByText("Your favorite berry is Blueberry.")).toBeVisible();
  await expect(currentDialog.getByText("Your favorite vegetable is Tomato.")).toBeVisible();
  await page.keyboard.press("Escape");

  currentDialog = page.getByTestId("fudis-dialog-5");
  await expect(currentDialog.getByText("Fourth and last opened dialog")).not.toBeVisible();
  await expect(currentDialog.getByText("Third opened dialog")).toBeVisible();
  await page.keyboard.press("Escape");

  currentDialog = page.getByTestId("fudis-dialog-4");
  await expect(currentDialog.getByText("Third opened dialog")).not.toBeVisible();
  await expect(currentDialog.getByText("Second opened dialog")).toBeVisible();
  await page.keyboard.press("Escape");

  currentDialog = page.getByTestId("fudis-dialog-1");
  await expect(currentDialog.getByText("Second opened dialog")).not.toBeVisible();
  await expect(currentDialog.getByText("First opened dialog")).toBeVisible();
  await page.keyboard.press("Escape");

  await expect(page.getByText("First opened dialog")).not.toBeVisible();
  await expect(page.getByText("Open dialog with nested dialogs")).toBeVisible();
});
