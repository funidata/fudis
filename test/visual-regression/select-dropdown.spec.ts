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
  await expect(page.getByTestId("fudis-select-1-option-value-5-armadillo")).toBeFocused();
  await page.keyboard.press("ArrowDown", { delay: 20 });
  await page.keyboard.press("ArrowDown", { delay: 20 });
  await page.keyboard.press("ArrowDown", { delay: 20 });
  await page.keyboard.press("ArrowDown", { delay: 20 });
  await page.keyboard.press("ArrowDown", { delay: 20 });
  await page.keyboard.press("ArrowUp", { delay: 20 });
  await page.keyboard.press("ArrowUp", { delay: 20 });
  await expect(page.getByTestId("fudis-select-1-option-value-2-capybara")).toBeVisible();
  await expect(page).toHaveScreenshot("A-4-focus-mountain-lion.png", {
    fullPage: true,
  });
  await page.getByTestId("fudis-select-1-option-0cf7dff9-10e4-400b-b8e0-828b2e0baf30").hover();
  await expect(page).toHaveScreenshot("A-5-hover-cat.png", {
    fullPage: true,
  });
  await page.getByText("Select showcase").hover();
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
  await expect(page.getByTestId("fudis-select-1-option-value-1-dog")).toBeFocused();
  await page.keyboard.press("ArrowUp");
  await expect(
    page.getByTestId("fudis-select-1-option-f00849ca-38fd-4255-b833-ce23e8f17058"),
  ).toBeInViewport();
  await expect(
    page.getByTestId("fudis-select-1-option-f00849ca-38fd-4255-b833-ce23e8f17058"),
  ).toBeFocused();

  await page.keyboard.press("ArrowDown");
  await expect(page.getByTestId("fudis-select-1-option-value-1-dog")).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByTestId("fudis-select-1-dropdown")).not.toBeVisible();
  await page.keyboard.press("ArrowDown", { delay: 50 });
  await expect(page.getByTestId("fudis-select-1-dropdown")).toBeVisible();
  await expect(page.getByTestId("fudis-select-1-option-value-1-dog")).toBeFocused();
  await page.keyboard.press("ArrowUp", { delay: 50 });
  await expect(
    page.getByTestId("fudis-select-1-option-f00849ca-38fd-4255-b833-ce23e8f17058"),
  ).toBeFocused();
  await page.keyboard.press("ArrowUp", { delay: 50 });
  await expect(
    page.getByTestId("fudis-select-1-option-b1fb350c-5977-4e81-b25c-c2507181ebd0"),
  ).toBeFocused();
  await page.keyboard.press("ArrowUp", { delay: 50 });
  await expect(
    page.getByTestId("fudis-select-1-option-bbf08d11-88cf-4d3e-b411-5409db3cb57c"),
  ).toBeFocused();
  await page.keyboard.press("ArrowUp", { delay: 50 });
  await expect(
    page.getByTestId("fudis-select-1-option-e4cb0061-020c-4a5f-b6d9-8acb9a3bb0bb"),
  ).toBeFocused();
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
      page.getByTestId("fudis-select-1-dropdown").getByText("Striped hyena").click();
    });
  await page.getByText("Select showcase").hover();
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
  await page.getByTestId("fudis-select-1-clear-button").focus();
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
  await page.getByTestId("fudis-select-1-clear-button").click();
  await page.getByTestId("fudis-select-2").focus();
  await expect(page.getByText("You must choose a pet!").locator("visible=true")).toHaveCount(6);
  await expect(
    page
      .getByTestId("fudis-select-2-option-4257d865-872c-4ea6-80e6-8bd04ce56ad7")
      .getByText("Golden jackal"),
  ).toBeVisible();
  await page.getByTestId("fudis-select-2").click();
  await expect(page.getByTestId("fudis-select-2-dropdown")).not.toBeVisible();
  await page.getByTestId("fudis-select-2").click();
  await expect(page.getByTestId("fudis-select-2-dropdown")).toBeVisible();
  await page.getByTestId("fudis-select-2-dropdown").getByText("Ostrich").click();
  expect(page.getByText("You must choose a pet!")).not.toBeVisible();
  await page.getByText("Select showcase").hover();
  await expect(page.getByTestId("fudis-select-2-dropdown")).not.toBeVisible();
  await expect(page).toHaveScreenshot("B-1-ostrich-selected.png", {
    fullPage: true,
  });
});
