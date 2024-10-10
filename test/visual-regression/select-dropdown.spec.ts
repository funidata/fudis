import test, { expect } from "@playwright/test";

test("Select dropdown with keyboard interactions", async ({ page }) => {
  await page.goto("/iframe.html?args=&id=components-form-select--select-showcase&viewMode=story");
  await expect(page).toHaveScreenshot("A-1-init.png", {
    fullPage: true,
  });

  /**
   * Dropdown with clear button
   */
  await page.getByTestId("fudis-select-1").focus();
  await expect(page.getByTestId("fudis-select-1-dropdown")).toBeVisible();
  await expect(page).toHaveScreenshot("A-2-focus-input.png", {
    fullPage: true,
  });
  await page.keyboard.press("ArrowDown");
  await expect(page).toHaveScreenshot("A-3-focus-option.png", {
    fullPage: true,
  });
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await expect(page).toHaveScreenshot("A-4-focus-disabled.png", {
    fullPage: true,
  });
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("ArrowUp");
  await expect(page).toHaveScreenshot("A-5-focus-mountain-lion.png", {
    fullPage: true,
  });
  await page.getByTestId("fudis-select-1-group-1-option-3").hover();
  await expect(page).toHaveScreenshot("A-6-hover-cat.png", {
    fullPage: true,
  });
  await page.getByTestId("fudis-heading-1").hover();
  await page.keyboard.press("Enter");
  await expect(page.getByTestId("fudis-select-1-dropdown")).not.toBeVisible();
  await expect(page).toHaveScreenshot("A-7-select-mountain-lion.png", {
    fullPage: true,
  });
  await page.keyboard.press("Enter");
  await expect(page.getByTestId("fudis-select-1-dropdown")).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(page.getByTestId("fudis-select-1-dropdown")).not.toBeVisible();
  await page.keyboard.press("ArrowDown");
  await expect(page.getByTestId("fudis-select-1-dropdown")).toBeVisible();
  await expect(page).toHaveScreenshot("A-8-toggle-arrow-down-open.png", {
    fullPage: true,
  });
  await page.keyboard.press("ArrowUp");
  await expect(page.getByTestId("fudis-select-1-group-10-option-5")).toBeInViewport();
  await expect(page).toHaveScreenshot("A-9-focus-last-item.png", {
    fullPage: true,
  });
  await page.keyboard.press("ArrowDown");
  await expect(page).toHaveScreenshot("A-10-focus-first-dog.png", {
    fullPage: true,
  });
  await page.keyboard.press("Escape");
  await expect(page.getByTestId("fudis-select-1-dropdown")).not.toBeVisible();
  await expect(page).toHaveScreenshot("A-11-close-escape.png", {
    fullPage: true,
  });
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("Enter");
  await page.waitForTimeout(100);
  await expect(page.getByTestId("fudis-select-1-dropdown")).not.toBeVisible();
  await expect(
    page.getByTestId("fudis-select-1-input-label").getByText("Dolphin, common"),
  ).toBeVisible();
  await expect(page).toHaveScreenshot("A-12-enter-select-dolphin.png", {
    fullPage: true,
  });
  await page.keyboard.press("Enter");
  await expect(page.getByTestId("fudis-select-1-dropdown")).toBeVisible();

  await page
    .getByTestId("fudis-select-1-dropdown")
    .getByText("Striped hyena")
    .scrollIntoViewIfNeeded()
    .then(() => {
      page.getByText("Striped hyena").click();
    });
  await page.getByTestId("fudis-heading-1").hover();
  await expect(page.getByTestId("fudis-select-1-dropdown")).not.toBeVisible();
  await expect(page).toHaveScreenshot("A-13-click-select-hyena.png", {
    fullPage: true,
  });

  /**
   * Disabled with selection
   */
  await page.getByTestId("fudis-button-1").focus();
  await expect(page.getByTestId("fudis-select-1-dropdown")).not.toBeVisible();
  await page.getByTestId("fudis-button-1").click();
  await expect(page).toHaveScreenshot("A-14-disabled-with-selection.png", {
    fullPage: true,
  });
  await page.getByTestId("fudis-button-1").click();
  await expect(page).toHaveScreenshot("A-15-enabled-with-selection.png", {
    fullPage: true,
  });
  await page.getByTestId("fudis-select-1").focus();
  await page.getByTestId("fudis-button-2").focus();
  await page.keyboard.press("Enter");
  await expect(page.getByText("You must choose a pet!").locator("visible=true")).toHaveCount(6);

  await expect(page.getByTestId("fudis-select-1-dropdown")).toBeVisible();
  await expect(page).toHaveScreenshot("A-16-enter-clear.png", {
    fullPage: true,
  });

  /**
   * Disabled after clearing selection
   */
  await expect(page.getByText("You must choose a pet!").locator("visible=true")).toHaveCount(6);
  await page.getByTestId("fudis-button-1").click();
  await expect(page).toHaveScreenshot("A-17-disabled-clear.png", {
    fullPage: true,
  });
});

test("Select dropdown without clear button", async ({ page }) => {
  await page.goto("/iframe.html?args=&id=components-form-select--select-showcase&viewMode=story");

  /**
   * Dropdown without clear button
   */
  await page.getByTestId("fudis-button-2").click();
  await page.getByTestId("fudis-select-2").focus();
  await expect(page.getByText("You must choose a pet!").locator("visible=true")).toHaveCount(6);
  await expect(
    page.getByTestId("fudis-select-2-group-1-option-1").getByText("Golden jackal"),
  ).toBeVisible();
  await expect(page).toHaveScreenshot("B-1-focus-to-second.png", {
    fullPage: true,
  });
  await page.getByTestId("fudis-select-2").click();
  await expect(page.getByTestId("fudis-select-2-dropdown")).not.toBeVisible();
  await page.getByTestId("fudis-select-2").click();
  await expect(page.getByTestId("fudis-select-2-dropdown")).toBeVisible();
  await page.getByTestId("fudis-select-2-dropdown").getByText("Ostrich").click();
  expect(page.getByText("You must choose a pet!")).not.toBeVisible();
  await page.getByTestId("fudis-heading-1").hover();
  await expect(page.getByTestId("fudis-select-2-dropdown")).not.toBeVisible();
  await expect(page).toHaveScreenshot("B-2-ostrich-selected.png", {
    fullPage: true,
  });
});
