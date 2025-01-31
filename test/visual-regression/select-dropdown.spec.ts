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
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await expect(page.getByTestId("fudis-select-1-option-100zewl")).toBeFocused();

  await page.keyboard.press("ArrowDown", { delay: 20 });
  await page.keyboard.press("ArrowDown", { delay: 20 });
  await page.keyboard.press("ArrowDown", { delay: 20 });
  await page.keyboard.press("ArrowDown", { delay: 20 });
  await page.keyboard.press("ArrowDown", { delay: 20 });
  await page.keyboard.press("ArrowUp", { delay: 20 });
  await page.keyboard.press("ArrowUp", { delay: 20 });
  await expect(page.getByTestId("fudis-select-1-option-ba3at")).toBeVisible();

  await page.getByTestId("fudis-select-1-option-qqdcwh").hover();
  await page.getByText("Select showcase").hover();
  await page.keyboard.press("Enter");
  await expect(page.getByTestId("fudis-select-1-dropdown")).not.toBeVisible();
  await page.keyboard.press("Enter");
  await expect(page.getByTestId("fudis-select-1-dropdown")).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(page.getByTestId("fudis-select-1-dropdown")).not.toBeVisible();
  await page.keyboard.press("ArrowDown");
  await expect(page.getByTestId("fudis-select-1-dropdown")).toBeVisible();
  await expect(page.getByTestId("fudis-select-1-option-1h5o")).toBeFocused();
  await page.keyboard.press("ArrowUp");
  await expect(
    page.getByTestId("fudis-select-1-option-c46h35"),
  ).toBeInViewport();
  await expect(
    page.getByTestId("fudis-select-1-option-c46h35"),
  ).toBeFocused();

  await page.keyboard.press("ArrowDown");
  await expect(page.getByTestId("fudis-select-1-option-1h5o")).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByTestId("fudis-select-1-dropdown")).not.toBeVisible();
  await page.keyboard.press("ArrowDown", { delay: 50 });
  await expect(page.getByTestId("fudis-select-1-dropdown")).toBeVisible();
  await expect(page.getByTestId("fudis-select-1-option-1h5o")).toBeFocused();
  await page.keyboard.press("ArrowUp", { delay: 50 });
  await expect(
    page.getByTestId("fudis-select-1-option-c46h35"),
  ).toBeFocused();
  await page.keyboard.press("ArrowUp", { delay: 50 });
  await expect(
    page.getByTestId("fudis-select-1-option-1ap8lze"),
  ).toBeFocused();
  await page.keyboard.press("ArrowUp", { delay: 50 });
  await expect(
    page.getByTestId("fudis-select-1-option-11u6ihc"),
  ).toBeFocused();
  await page.keyboard.press("ArrowUp", { delay: 50 });
  await expect(
    page.getByTestId("fudis-select-1-option-nr48pp"),
  ).toBeFocused();
  await page.keyboard.press("Enter", { delay: 50 });
  await expect(page.getByTestId("fudis-select-1-dropdown")).not.toBeVisible();

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

  /**
   * Disabled with selection
   */
  await page.getByTestId("fudis-button-1").focus();
  await expect(page.getByTestId("fudis-select-1-dropdown")).not.toBeVisible();

  await page.getByTestId("fudis-button-1").click();
  await page.getByTestId("fudis-button-1").click();
  await page.getByTestId("fudis-select-1").focus();
  await page.getByTestId("fudis-select-1-clear-button").focus();
  await page.keyboard.press("Enter");

  await expect(page.getByText("You must choose a pet!").locator("visible=true")).toHaveCount(6);
  await expect(page.getByTestId("fudis-select-1-dropdown")).toBeVisible();

  /**
   * Disabled after clearing selection
   */
  await page.getByTestId("fudis-button-1").click();
  await expect(page.getByText("You must choose a pet!").locator("visible=true")).toHaveCount(0);
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
      .getByTestId("fudis-select-2-option-e05e75")
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
});
