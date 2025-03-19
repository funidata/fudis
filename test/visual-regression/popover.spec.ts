import test, { expect, Page } from "@playwright/test";

const buttonId = "fudis-button-1";
const popoverId = "fudis-popover-1";

test.beforeEach(async ({ page }) => {
  await page.goto("/iframe.html?id=directives-popover--example-with-fudis-button&viewMode=story");
});

test("open and close popover with mouse click correctly", async ({ page }) => {
  await page.getByTestId(buttonId).click();
  await assertPopoverVisibility(page, true);

  await page.getByTestId(popoverId).click();
  await assertPopoverVisibility(page, true);

  await page.getByTestId(buttonId).click();
  await assertPopoverVisibility(page, false);

  /**
   * Close the popover with mouse click
   */
  await page.getByTestId(buttonId).click();
  await assertPopoverVisibility(page, true);

  await page.mouse.click(0, 0);
  await assertPopoverVisibility(page, false);
});

test("open and close popover with key press correctly", async ({ page }) => {
  await page.getByTestId(buttonId).press("Enter");
  await assertPopoverVisibility(page, true);

  await page.getByTestId(buttonId).press("Enter");
  await assertPopoverVisibility(page, false);

  await page.getByTestId(buttonId).press("Space");
  await assertPopoverVisibility(page, true);

  await page.getByTestId(buttonId).press("Space");
  await assertPopoverVisibility(page, false);
});

test("popover should match the screenshot", async ({ page }) => {
  await page.getByTestId(buttonId).click();
  await expect(page).toHaveScreenshot("popover.png");
});

const assertPopoverVisibility = async (page: Page, visible: boolean) => {
  if (visible) {
    await expect(page.getByTestId(popoverId)).toHaveText(
      "Greetings from popover, I hope you can see me!",
    );
  } else {
    await expect(page.getByTestId(popoverId)).not.toBeVisible();
  }
};
