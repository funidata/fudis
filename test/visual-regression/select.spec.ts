import test, { expect } from "@playwright/test";

test("Dropdown with Clear Button and dropdown keyboard interactions", async ({ page }) => {
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
  await expect(page.getByTestId("fudis-select-1-dropdown")).not.toBeVisible();
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

test("Dropdowns and Autocompletes", async ({ page }) => {
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
  await page.keyboard.press("Tab");

  /**
   * Autocomplete dropdown with clear button
   */
  await expect(page.getByTestId("fudis-select-3-dropdown")).toBeVisible();
  await page.keyboard.press("Backspace");
  await expect(page.getByText("You must choose a pet!").locator("visible=true")).toHaveCount(6);
  await expect(page).toHaveScreenshot("C-1-autocomplete-dropdown-backspace.png", {
    fullPage: true,
  });
  await page.keyboard.press("KeyI");
  await page.keyboard.press("KeyN");
  await expect(page.getByText("You must choose a pet!").locator("visible=true")).toHaveCount(6);
  await expect(page).toHaveScreenshot("C-2-autocomplete-dropdown-in-typed.png", {
    fullPage: true,
  });

  /**
   * Autocomplete dropdown without clear button
   */
  await page.getByTestId("fudis-select-4").focus();
  await expect(page.getByTestId("fudis-select-4-dropdown")).toBeVisible();
  await expect(page.getByTestId("fudis-select-3-dropdown")).not.toBeVisible();
  await expect(page.getByText("You must choose a pet!").locator("visible=true")).toHaveCount(6);
  await expect(page).toHaveScreenshot("D-1-autocomplete-dropdown-2-focused.png", {
    fullPage: true,
  });
  await page.getByTestId("fudis-select-4").fill("golden");
  await page.getByTestId("fudis-heading-1").hover();
  await expect(page.getByTestId("fudis-select-4-dropdown")).toBeVisible();
  await expect(page.getByText("You must choose a pet!").locator("visible=true")).toHaveCount(6);
  await expect(page).toHaveScreenshot("D-2-autocomplete-dropdown-2-golden-typed.png", {
    fullPage: true,
  });
  await page.keyboard.press("Enter");
  await expect(page.getByTestId("fudis-select-4-dropdown")).not.toBeVisible();
  await expect(page.getByText("You must choose a pet!").locator("visible=true")).toHaveCount(6);
  await expect(page).toHaveScreenshot("D-3-autocomplete-dropdown-2-golden-enter-1.png", {
    fullPage: true,
  });
  await page.keyboard.press("Space");
  await page.keyboard.press("KeyE");
  await page.keyboard.press("KeyA");
  await expect(page.getByTestId("fudis-select-4-dropdown")).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(page.getByTestId("fudis-select-4-dropdown")).not.toBeVisible();
  await expect(page.getByText("You must choose a pet!").locator("visible=true")).toHaveCount(0);
  await expect(page).toHaveScreenshot("D-4-autocomplete-dropdown-2-golden-eagle-selected.png", {
    fullPage: true,
  });

  await page.keyboard.press("Tab");

  /**
   * Autocomplete type with clear button
   */
  await expect(page.getByTestId("fudis-select-5-dropdown")).toBeVisible();
  await expect(page.getByText("You must choose a pet!").locator("visible=true")).toHaveCount(0);
  await expect(page).toHaveScreenshot("E-1-autocomplete-type-focused.png", {
    fullPage: true,
  });
  await page.keyboard.press("Tab");
  await page.keyboard.press("Space");
  await expect(page.getByTestId("fudis-select-5-dropdown")).not.toBeVisible();
  await expect(page.getByText("You must choose a pet!").locator("visible=true")).toHaveCount(6);
  await expect(page).toHaveScreenshot("E-2-autocomplete-type-cleared.png", {
    fullPage: true,
  });
  await page.keyboard.press("KeyM");
  await page.keyboard.press("KeyO");
  await expect(page.getByText("You must choose a pet!").locator("visible=true")).toHaveCount(6);
  await expect(page).toHaveScreenshot("E-3-autocomplete-type-short-input.png", {
    fullPage: true,
  });
  await expect(page.getByTestId("fudis-select-5-dropdown")).not.toBeVisible();
  await page.keyboard.press("KeyU");
  await expect(page.getByTestId("fudis-select-5-dropdown")).toBeVisible();
  await page.keyboard.press("Backspace");
  await expect(page.getByTestId("fudis-select-5-dropdown")).not.toBeVisible();
  await page.keyboard.press("KeyU");
  await page.keyboard.press("KeyN");
  await page.keyboard.press("KeyT");
  await page.keyboard.press("KeyA");
  await page.keyboard.press("KeyI");
  await page.keyboard.press("KeyN");
  await page.keyboard.press("Space");
  await page.keyboard.press("KeyL");
  await page.keyboard.press("KeyI");
  await page.keyboard.press("KeyO");
  await page.keyboard.press("KeyN");
  await expect(page.getByTestId("fudis-select-5-dropdown")).toBeVisible();
  await expect(page.getByText("You must choose a pet!").locator("visible=true")).toHaveCount(0);
  await expect(page).toHaveScreenshot("E-4-autocomplete-type-mountain-lion-typed.png", {
    fullPage: true,
  });
  await page.keyboard.press("Backspace");

  /**
   * Autocomplete type without clear button
   */
  await page.getByTestId("fudis-select-6").focus();
  await expect(page.getByTestId("fudis-select-5-dropdown")).not.toBeVisible();
  await expect(page.getByTestId("fudis-select-6-dropdown")).not.toBeVisible();
  await page.keyboard.press("E");
  await page.keyboard.press("N");
  await page.keyboard.press("D");
  await expect(page.getByTestId("fudis-select-6-dropdown")).toBeVisible();
  await expect(page.getByText("You must choose a pet!").locator("visible=true")).toHaveCount(6);
  await expect(page).toHaveScreenshot("F-1-autocomplete-type-end.png", {
    fullPage: true,
  });
  await page.keyboard.press("Backspace");
  await expect(page.getByText("You must choose a pet!").locator("visible=true")).toHaveCount(6);
  await expect(page).toHaveScreenshot("F-2-autocomplete-type-end-2.png", {
    fullPage: true,
  });
});
