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
  await expect(page.getByTestId("fudis-select-1-option-5")).toBeFocused();
  await page.keyboard.press("ArrowDown", { delay: 20 });
  await page.keyboard.press("ArrowDown", { delay: 20 });
  await page.keyboard.press("ArrowDown", { delay: 20 });
  await page.keyboard.press("ArrowDown", { delay: 20 });
  await page.keyboard.press("ArrowDown", { delay: 20 });
  await page.keyboard.press("ArrowUp", { delay: 20 });
  await page.keyboard.press("ArrowUp", { delay: 20 });
  await expect(page.getByTestId("fudis-select-1-group-1-option-2")).toBeVisible();
  await expect(page).toHaveScreenshot("A-4-focus-mountain-lion.png", {
    fullPage: true,
  });
  await page.getByTestId("fudis-select-1-group-1-option-3").hover();
  await expect(page).toHaveScreenshot("A-5-hover-cat.png", {
    fullPage: true,
  });
  await page.getByTestId("fudis-heading-1").hover();
  await page.keyboard.press("Enter");
  await expect(page.getByTestId("fudis-select-1-dropdown")).not.toBeVisible();
  await expect(page).toHaveScreenshot("A-6-select-mountain-lion.png", {
    fullPage: true,
  });
  await page.keyboard.press("Enter");
  await expect(page.getByTestId("fudis-select-1-dropdown")).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(page.getByTestId("fudis-select-1-dropdown")).not.toBeVisible();
  await page.keyboard.press("ArrowDown");
  await expect(page.getByTestId("fudis-select-1-dropdown")).toBeVisible();
  await expect(page.getByTestId("fudis-select-1-option-1")).toBeFocused();
  await page.keyboard.press("ArrowUp");
  await expect(page.getByTestId("fudis-select-1-group-10-option-5")).toBeInViewport();
  await expect(page.getByTestId("fudis-select-1-group-10-option-5")).toBeFocused();

  await page.keyboard.press("ArrowDown");
  await expect(page.getByTestId("fudis-select-1-option-1")).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByTestId("fudis-select-1-dropdown")).not.toBeVisible();
  await page.keyboard.press("ArrowDown", { delay: 50 });
  await expect(page.getByTestId("fudis-select-1-dropdown")).toBeVisible();
  await expect(page.getByTestId("fudis-select-1-option-1")).toBeFocused();
  await page.keyboard.press("ArrowUp", { delay: 50 });
  await expect(page.getByTestId("fudis-select-1-group-10-option-5")).toBeFocused();
  await page.keyboard.press("ArrowUp", { delay: 50 });
  await expect(page.getByTestId("fudis-select-1-group-10-option-4")).toBeFocused();
  await page.keyboard.press("ArrowUp", { delay: 50 });
  await expect(page.getByTestId("fudis-select-1-group-10-option-3")).toBeFocused();
  await page.keyboard.press("ArrowUp", { delay: 50 });
  await expect(page.getByTestId("fudis-select-1-group-10-option-2")).toBeFocused();
  await page.keyboard.press("Enter", { delay: 50 });
  await expect(page.getByTestId("fudis-select-1-dropdown")).not.toBeVisible();
  await expect(page).toHaveScreenshot("A-7-enter-select-dolphin.png", {
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
  await expect(page).toHaveScreenshot("A-8-click-select-hyena.png", {
    fullPage: true,
  });

  /**
   * Disabled with selection
   */
  await page.getByTestId("fudis-button-1").focus();
  await expect(page.getByTestId("fudis-select-1-dropdown")).not.toBeVisible();
  await page.getByTestId("fudis-button-1").click();
  await expect(page).toHaveScreenshot("A-9-disabled-with-selection.png", {
    fullPage: true,
  });
  await page.getByTestId("fudis-button-1").click();
  await page.getByTestId("fudis-select-1").focus();
  await page.getByTestId("fudis-button-2").focus();
  await page.keyboard.press("Enter");
  await expect(page.getByText("You must choose a pet!").locator("visible=true")).toHaveCount(6);

  await expect(page.getByTestId("fudis-select-1-dropdown")).toBeVisible();
  await expect(page).toHaveScreenshot("A-10-enter-clear.png", {
    fullPage: true,
  });

  /**
   * Disabled after clearing selection
   */
  await expect(page.getByText("You must choose a pet!").locator("visible=true")).toHaveCount(6);
  await page.getByTestId("fudis-button-1").click();
  await expect(page).toHaveScreenshot("A-11-disabled-clear.png", {
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
  await page.getByTestId("fudis-select-2").click();
  await expect(page.getByTestId("fudis-select-2-dropdown")).not.toBeVisible();
  await page.getByTestId("fudis-select-2").click();
  await expect(page.getByTestId("fudis-select-2-dropdown")).toBeVisible();
  await page.getByTestId("fudis-select-2-dropdown").getByText("Ostrich").click();
  expect(page.getByText("You must choose a pet!")).not.toBeVisible();
  await page.getByTestId("fudis-heading-1").hover();
  await expect(page.getByTestId("fudis-select-2-dropdown")).not.toBeVisible();
  await expect(page).toHaveScreenshot("B-1-ostrich-selected.png", {
    fullPage: true,
  });
});
