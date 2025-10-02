import test, { expect } from "@playwright/test";

const formErrorSummaryText =
  "Question about your power animal / What is your power animal?: You need to choose your power animal";

const dialogFormTitle = "Dialog with Form and some random text";

const dialogFormResultAfterClose = "Great choise, your power animal is Holiday armadillo.";

test("dialog with form", async ({ page }) => {
  await page.goto("/iframe.html?args=&id=components-dialog--example-with-form&viewMode=story");
  await page.getByTestId("fudis-button-1").click();
  await expect(page.getByTestId("fudis-button-2")).toBeVisible();
  await expect(page).toHaveScreenshot("form-1-init.png");
  await page.getByText("SUBMIT").click();
  await expect(page.getByText(formErrorSummaryText)).toBeVisible();
  await expect(page).toHaveScreenshot("form-2-errors.png");
  await page.getByTestId("example-input-power-animal").focus();
  await page.getByTestId("example-input-power-animal").fill("Holiday Armadillo");
  await expect(page.getByTestId("fudis-validator-error-message-1")).not.toBeVisible();
  await page.getByText("SUBMIT").click();
  await expect(page.getByText(dialogFormTitle)).not.toBeVisible();
  await expect(page.getByText(dialogFormResultAfterClose)).toBeVisible();
});

test("dialog with grid", async ({ page }) => {
  await page.goto("/iframe.html?args=&id=components-dialog--example-with-grid&viewMode=story");
  await page.getByTestId("fudis-button-1").click();
  await expect(page.getByTestId("fudis-button-2")).toBeVisible();
  await expect(page.getByText("Dialog with fudis-grid and scrollable content")).toBeVisible();
  await expect(page).toHaveScreenshot("grid-1-init.png");
  await page.keyboard.press("Tab");
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
  await expect(page).toHaveScreenshot("nested-dialog-1-fruit.png");

  let currentDialog = page.getByTestId("fudis-dialog-1");
  await expect(currentDialog.getByText("First opened dialog")).toBeVisible();
  await expect(currentDialog.getByText("You don't have any favorite veggies!")).toBeVisible();
  await currentDialog.getByTestId("example-input-fruit").fill("Orange");
  await currentDialog.getByText("Save and open next dialog").click();

  await expect(page).toHaveScreenshot("nested-dialog-2-berry.png");

  currentDialog = page.getByTestId("fudis-dialog-2");
  await expect(currentDialog.getByText("Second opened dialog")).toBeVisible();
  await expect(currentDialog.getByText("You don't have any favorite veggies!")).not.toBeVisible();
  await expect(currentDialog.getByText("Your favorite fruit is Orange.")).toBeVisible();
  await currentDialog.getByTestId("example-input-berry").fill("Strawberry");
  await currentDialog.getByText("Save and open next dialog").click();

  await expect(page).toHaveScreenshot("nested-dialog-3-vegetable.png");

  currentDialog = page.getByTestId("fudis-dialog-3");
  await expect(currentDialog.getByText("Third opened dialog")).toBeVisible();
  await expect(currentDialog.getByText("Your favorite berry is Strawberry.")).toBeVisible();
  await currentDialog.getByTestId("example-input-vegetable").fill("Tomato");
  await currentDialog.getByText("Save and open next dialog").click();

  await expect(page).toHaveScreenshot("nested-dialog-4-inputs-filled.png");

  currentDialog = page.getByTestId("fudis-dialog-4");
  await expect(currentDialog.getByText("Fourth and last opened dialog")).toBeVisible();
  await expect(currentDialog.getByText("Your favorite vegetable is Tomato")).toBeVisible();
  await page.waitForTimeout(150); // Chrome seems to need some time at this point
  await page.keyboard.press("Escape");

  currentDialog = page.getByTestId("fudis-dialog-3");
  await expect(currentDialog.getByText("Fourth and last opened dialog")).not.toBeVisible();
  await expect(currentDialog.getByText("Third opened dialog")).toBeVisible();
  await page.waitForTimeout(150); // Chrome seems to need some time at this point
  await page.keyboard.press("Escape");

  currentDialog = page.getByTestId("fudis-dialog-2");
  await expect(currentDialog.getByText("Third opened dialog")).not.toBeVisible();
  await expect(currentDialog.getByText("Second opened dialog")).toBeVisible();
  await page.waitForTimeout(150); // Chrome seems to need some time at this point
  await page.keyboard.press("Escape");

  currentDialog = page.getByTestId("fudis-dialog-1");
  await expect(currentDialog.getByText("Second opened dialog")).not.toBeVisible();
  await expect(currentDialog.getByText("First opened dialog")).toBeVisible();
  await currentDialog.getByText("Save and close dialog").click(); // If the last closing is done by ESC, the data won't pass to the Story template

  await expect(page.getByText("First opened dialog")).not.toBeVisible();
  await expect(page.getByText("Open dialog with nested dialogs")).toBeVisible();
  await expect(page).toHaveScreenshot("nested-dialog-5-final-result.png");
});

test("Dialog sizes", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=&id=components-dialog--example-with-dialog-sizes&viewMode=story",
  );

  let x = 1;
  while (x <= 10) {
    await page.getByTestId(`fudis-button-${x}`).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page).toHaveScreenshot(`dialog-sizes-${x}.png`, { fullPage: true });
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).not.toBeVisible();
    x++;
  }
});
