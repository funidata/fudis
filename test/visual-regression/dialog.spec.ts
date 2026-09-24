import test, { expect } from "@playwright/test";

const formErrorSummaryText =
  "Your learning experience / Your favourite course topic: You need to add a topic";

const dialogFormTitle = "Course feedback";

const dialogFormResultAfterClose =
  "Thank you for the feedback! Your favourite topic was Automation testing.";

test("dialog with form", async ({ page }) => {
  await page.goto("/iframe.html?args=&id=components-dialog--example-with-form&viewMode=story");
  await page.getByTestId("fudis-button-1").click();
  await expect(page.getByTestId("fudis-button-2")).toBeVisible();
  await expect(page).toHaveScreenshot("form-1-init.png");
  await page.getByText("SUBMIT").click();
  await expect(page.getByText(formErrorSummaryText)).toBeVisible();
  await expect(page).toHaveScreenshot("form-2-errors.png");
  await page.getByTestId("example-input-course-topic").focus();
  await page.getByTestId("example-input-course-topic").fill("Automation testing");
  await expect(page.getByTestId("fudis-validator-error-message-1")).not.toBeVisible();

  await page.getByTestId("fudis-select-1").focus();
  await page.waitForTimeout(150);
  await expect(page.getByTestId("fudis-select-1-dropdown")).toBeVisible();
  await page.getByTestId("fudis-select-1-dropdown").scrollIntoViewIfNeeded();
  await page.keyboard.press("ArrowDown");
  await expect(page).toHaveScreenshot("form-3-dropdown.png");

  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Enter"); /* Submit */
  await expect(page.getByText(dialogFormTitle)).not.toBeVisible();
  await expect(page.getByText(dialogFormResultAfterClose)).toBeVisible();
});

test("dialog with grid", async ({ page }) => {
  await page.goto("/iframe.html?args=&id=components-dialog--example-with-grid&viewMode=story");
  await page.getByTestId("fudis-button-1").click();
  await expect(page.getByTestId("fudis-menu-button-1")).toBeVisible();
  await expect(page.getByTestId("fudis-button-3")).toBeVisible();
  await expect(page.getByText("Course information and learning outcomes")).toBeVisible();
  await expect(page).toHaveScreenshot("grid-1-init.png");
  await page.keyboard.press("Tab");
  await expect(page).toHaveScreenshot("grid-2-content-focus.png");
  await page.getByText("Student support").scrollIntoViewIfNeeded();
  await expect(page).toHaveScreenshot("grid-3-content-scrolled.png");
  await page.keyboard.press("Tab"); // Focus to menu button
  await page.keyboard.press("Enter"); // Open dropdown menu
  await expect(page.getByTestId("fudis-dropdown-menu-1-option-1")).toBeVisible();
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
  await expect(currentDialog.getByText("Select study format")).toBeVisible();
  await expect(currentDialog.getByText("No study preferences have been provided.")).toBeVisible();
  await currentDialog.getByTestId("example-input-studyFormat").fill("Online");
  await currentDialog.getByText("Save and open next Dialog").click();

  await expect(page).toHaveScreenshot("nested-dialog-2-berry.png");

  currentDialog = page.getByTestId("fudis-dialog-2");
  await expect(currentDialog.getByText("Select teaching language")).toBeVisible();
  await expect(
    currentDialog.getByText("No study preferences have been provided."),
  ).not.toBeVisible();
  await expect(currentDialog.getByText("Your preferred study format is Online.")).toBeVisible();
  await currentDialog.getByTestId("example-input-teachingLanguage").fill("English");
  await currentDialog.getByText("Save and open next Dialog").click();

  await expect(page).toHaveScreenshot("nested-dialog-3-vegetable.png");

  currentDialog = page.getByTestId("fudis-dialog-3");
  await expect(currentDialog.getByText("Select campus")).toBeVisible();
  await expect(
    currentDialog.getByText("Your preferred teaching language is English."),
  ).toBeVisible();
  await currentDialog.getByTestId("example-input-campus").fill("City campus");
  await currentDialog.getByText("Save and open next Dialog").click();

  await expect(page).toHaveScreenshot("nested-dialog-4-inputs-filled.png");

  currentDialog = page.getByTestId("fudis-dialog-4");
  await expect(currentDialog.getByText("Study preferences summary")).toBeVisible();
  await expect(currentDialog.getByText("Your preferred campus is City campus.")).toBeVisible();
  await page.waitForTimeout(150); // Chrome seems to need some time at this point
  await page.keyboard.press("Escape");

  currentDialog = page.getByTestId("fudis-dialog-3");
  await expect(currentDialog.getByText("Study preferences summary")).not.toBeVisible();
  await expect(currentDialog.getByText("Select campus")).toBeVisible();
  await page.waitForTimeout(150); // Chrome seems to need some time at this point
  await page.keyboard.press("Escape");

  currentDialog = page.getByTestId("fudis-dialog-2");
  await expect(currentDialog.getByText("Select campus")).not.toBeVisible();
  await expect(currentDialog.getByText("Select teaching language")).toBeVisible();
  await page.waitForTimeout(150); // Chrome seems to need some time at this point
  await page.keyboard.press("Escape");

  currentDialog = page.getByTestId("fudis-dialog-1");
  await expect(currentDialog.getByText("Select teaching language")).not.toBeVisible();
  await expect(currentDialog.getByText("Select study format")).toBeVisible();
  await currentDialog.getByText("Save and close dialog").click(); // If the last closing is done by ESC, the data won't pass to the Story template

  await expect(page.getByText("Select study format")).not.toBeVisible();
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
