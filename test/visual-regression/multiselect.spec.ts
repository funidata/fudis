import test, { expect } from "@playwright/test";

test("Dropdown with Clear Button and dropdown keyboard interactions", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=&id=components-form-select--multiselect-showcase&viewMode=story",
  );
  await expect(page).toHaveScreenshot("A-1-init.png", {
    fullPage: true,
  });

  /**
   * Dropdown with clear button
   */
  await page.getByTestId("fudis-multiselect-1").focus();
  await expect(page.getByTestId("fudis-multiselect-1-dropdown")).toBeVisible();
  await page.keyboard.press("ArrowDown");
  await expect(page).toHaveScreenshot("A-2-focus-option.png", {
    fullPage: true,
  });
  await page.keyboard.press("ArrowDown");
  await expect(page).toHaveScreenshot("A-3-focus-selected.png", {
    fullPage: true,
  });
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await expect(page.getByTestId("fudis-multiselect-1-option-5-checkbox-input")).toBeFocused();
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("ArrowUp");

  await expect(
    page.getByTestId("fudis-multiselect-1-group-10-option-2-checkbox-input"),
  ).toBeFocused();
  await page.getByTestId("fudis-multiselect-1-group-10-option-1").hover();
  await expect(page).toHaveScreenshot("A-4-hover-alligator.png", {
    fullPage: true,
  });
  await page.getByTestId("fudis-heading-1").hover();

  await page.keyboard.press("Enter");
  await expect(page.getByTestId("fudis-multiselect-1-dropdown")).toBeVisible();
  await expect(page).toHaveScreenshot("A-5-select-dolphin.png", {
    fullPage: true,
  });
  await page.keyboard.press("Space");
  await expect(page.getByTestId("fudis-multiselect-1-dropdown")).toBeVisible();
  await expect(page).toHaveScreenshot("A-6-deselect-dolphin.png", {
    fullPage: true,
  });
  await page.getByTestId("fudis-multiselect-1-group-7-option-5").click();

  await page.getByTestId("fudis-multiselect-1-group-3-option-3").click();

  await page.getByTestId("fudis-heading-1").hover();
  await expect(page.getByTestId("fudis-multiselect-1-dropdown")).toBeVisible();
  await page.getByTestId("fudis-heading-1").click();
  await expect(page.getByTestId("fudis-multiselect-1-dropdown")).not.toBeVisible();

  await expect(page).toHaveScreenshot("A-7-select-two-more.png", {
    fullPage: true,
  });

  await page.getByTestId("fudis-multiselect-1").focus();
  await expect(page.getByTestId("fudis-multiselect-1-dropdown")).toBeVisible();
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Space");
  await expect(page.getByTestId("fudis-multiselect-1-dropdown")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByTestId("fudis-multiselect-1-dropdown")).not.toBeVisible();
  await expect(page).toHaveScreenshot("A-8-selection-before-reset.png", {
    fullPage: true,
  });

  /**
   * Disabled when multiselect has selected options
   */
  await page.keyboard.press("ArrowDown");
  await expect(page.getByTestId("fudis-multiselect-1-dropdown")).toBeVisible();
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("Tab");
  await expect(page.getByTestId("fudis-multiselect-1-dropdown")).not.toBeVisible();

  await page.getByTestId("fudis-button-1").click();

  await expect(page).toHaveScreenshot("A-9-disabled-selected.png", {
    fullPage: true,
  });

  /**
   * Disabled after clearing options
   */
  await page.getByTestId("fudis-button-1").click();
  await page.getByTestId("fudis-button-2").click();
  await expect(page.getByTestId("fudis-multiselect-1-dropdown")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByTestId("fudis-multiselect-1-dropdown")).not.toBeVisible();
  await expect(page).toHaveScreenshot("A-10-clear-click.png", {
    fullPage: true,
  });

  await page.getByTestId("fudis-button-1").click();

  await expect(page).toHaveScreenshot("A-11-disabled-cleared.png", {
    fullPage: true,
  });
});

test("Dropdown and autocompletes", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=&id=components-form-select--multiselect-showcase&viewMode=story",
  );

  /**
   * Dropdown without Clear button
   */
  await page.getByTestId("fudis-button-2").click();
  await page.getByTestId("fudis-multiselect-2").focus();
  await expect(page.getByTestId("fudis-multiselect-1-dropdown")).not.toBeVisible();
  await expect(page.getByTestId("fudis-multiselect-2-dropdown")).toBeVisible();
  await expect(
    page.getByTestId("fudis-multiselect-2-group-1-option-1").getByText("Golden jackal"),
  ).toBeVisible();
  await expect(page).toHaveScreenshot("B-1-focus-to-second.png", {
    fullPage: true,
  });
  await page.getByTestId("fudis-multiselect-2").click();
  await expect(page.getByTestId("fudis-multiselect-2-dropdown")).not.toBeVisible();
  await page.getByTestId("fudis-multiselect-2").click();
  await expect(page.getByTestId("fudis-multiselect-2-dropdown")).toBeVisible();
  await page.getByTestId("fudis-multiselect-2-dropdown").getByText("Ostrich").click();
  await page.getByTestId("fudis-heading-1").hover();
  await expect(page.getByTestId("fudis-multiselect-2-dropdown")).toBeVisible();
  await expect(page).toHaveScreenshot("B-2-ostrich-selected.png", {
    fullPage: true,
  });

  /**
   * Autocomplete dropdown with clear button
   */
  await page.getByTestId("fudis-multiselect-3").focus();
  await expect(page.getByTestId("fudis-multiselect-3-dropdown")).toBeVisible();
  await expect(page.getByTestId("fudis-multiselect-2-dropdown")).not.toBeVisible();

  await page.keyboard.press("KeyI");
  await expect(page.getByText("Showing 47 results")).toBeVisible();
  await page.keyboard.press("KeyN");
  await expect(page.getByText("Showing 18 results")).toBeVisible();
  await expect(page).toHaveScreenshot("C-1-autocomplete-dropdown-in-typed.png", {
    fullPage: true,
  });

  /**
   * Autocomplete dropdown without clear button
   */
  await page.getByTestId("fudis-multiselect-4").focus();
  await expect(page.getByTestId("fudis-multiselect-4-dropdown")).toBeVisible();
  await expect(page.getByTestId("fudis-multiselect-3-dropdown")).not.toBeVisible();
  await expect(page).toHaveScreenshot("D-1-autocomplete-dropdown-2-focused.png", {
    fullPage: true,
  });
  await page.getByTestId("fudis-multiselect-4").fill("golden");

  await expect(page.getByTestId("fudis-multiselect-4-dropdown")).toBeVisible();
  await expect(page).toHaveScreenshot("D-2-autocomplete-dropdown-2-golden-typed.png", {
    fullPage: true,
  });
  await page.getByTestId("fudis-multiselect-4").focus();
  await page.keyboard.press("Enter");
  await expect(page.getByTestId("fudis-multiselect-4-dropdown")).not.toBeVisible();
  await expect(page).toHaveScreenshot("D-3-autocomplete-dropdown-2-golden-enter-1.png", {
    fullPage: true,
  });
  await page.keyboard.press("Space");
  await page.keyboard.press("KeyE");
  await page.keyboard.press("KeyA");
  await expect(page.getByText("Showing 1 results")).toBeVisible();
  await expect(page.getByTestId("fudis-multiselect-4-dropdown")).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(page.getByTestId("fudis-multiselect-4-dropdown")).toBeVisible();
  await expect(page).toHaveScreenshot("D-4-autocomplete-dropdown-2-golden-eagle-selected.png", {
    fullPage: true,
  });

  await page.keyboard.press("Escape");

  await expect(page.getByTestId("fudis-multiselect-4-dropdown")).not.toBeVisible();

  /**
   * Autocomplete type with clear button
   */
  await page.getByTestId("fudis-multiselect-5").focus();
  await expect(page.getByTestId("fudis-multiselect-5-dropdown")).not.toBeVisible();
  await page.keyboard.press("ArrowDown");
  await expect(page.getByTestId("fudis-multiselect-5-dropdown")).not.toBeVisible();
  await page.keyboard.press("Enter");
  await expect(page.getByTestId("fudis-multiselect-5-dropdown")).not.toBeVisible();

  await page.keyboard.press("Tab");
  await page.keyboard.press("Space");
  await expect(page.getByTestId("fudis-multiselect-5-dropdown")).not.toBeVisible();
  await expect(page).toHaveScreenshot("E-1-autocomplete-type-cleared.png", {
    fullPage: true,
  });
  await page.keyboard.press("KeyM");
  await page.keyboard.press("KeyO");

  await expect(page.getByTestId("fudis-multiselect-5-dropdown")).not.toBeVisible();
  await page.keyboard.press("KeyU");
  await expect(page.getByTestId("fudis-multiselect-5-dropdown")).toBeVisible();

  await expect(page).toHaveScreenshot("E-2-autocomplete-type-mou.png", {
    fullPage: true,
  });

  await page.keyboard.press("Backspace");
  await expect(page.getByTestId("fudis-multiselect-5-dropdown")).not.toBeVisible();
  await page.keyboard.press("KeyU");
  await expect(page.getByTestId("fudis-multiselect-5-dropdown")).toBeVisible();

  await page.keyboard.type("ntain lion", { delay: 50 });
  await expect(page.getByText("Showing 1 results")).toBeVisible();
  await expect(page.getByTestId("fudis-multiselect-5-dropdown")).toBeVisible();
  await page.keyboard.press("Enter");
  await page.getByTestId("fudis-multiselect-5").focus();
  await page.getByTestId("fudis-multiselect-5").fill("cat");
  await expect(page.getByText("Showing 4 results")).toBeVisible();
  await expect(page.getByTestId("fudis-multiselect-5-dropdown")).toBeVisible();
  await expect(page).toHaveScreenshot("E-3-autocomplete-type-cat-typed.png", {
    fullPage: true,
  });

  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Space");
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("Space");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await expect(page.getByTestId("fudis-multiselect-5-group-7-option-2")).toBeInViewport();
  await page.keyboard.press("Space");
  await page.getByTestId("fudis-heading-1").hover();
  await expect(page.getByTestId("fudis-multiselect-5-group-7-option-2")).toHaveClass(
    "fudis-multiselect-option fudis-multiselect-option--visible fudis-multiselect-option--focused fudis-multiselect-option--checked",
  );
  await expect(page).toHaveScreenshot("E-4-autocomplete-type-cats-selected.png", {
    fullPage: true,
  });

  /**
   * Autocomplete type without clear button
   */
  await page.getByTestId("fudis-multiselect-6").focus();
  await expect(page.getByTestId("fudis-multiselect-5-dropdown")).not.toBeVisible();
  await expect(page.getByTestId("fudis-multiselect-6-dropdown")).not.toBeVisible();

  page.getByTestId("fudis-multiselect-6-selected-items").getByText("Ringtail cat").focus();
  page.getByTestId("fudis-multiselect-6-selected-items").getByText("Ringtail cat").click();

  await expect(page).toHaveScreenshot("E-5-autocomplete-type-remove-chip.png", {
    fullPage: true,
  });

  await page.getByTestId("fudis-multiselect-6").focus();
  await expect(page.getByTestId("fudis-multiselect-6-dropdown")).not.toBeVisible();

  await page.keyboard.type("END", { delay: 50 });

  await expect(
    page.getByTestId("fudis-multiselect-6-dropdown").getByText("No results found"),
  ).not.toBeVisible();

  await page.keyboard.press("Space");

  await expect(
    page.getByTestId("fudis-multiselect-6-dropdown").getByText("No results found"),
  ).toBeVisible();

  await expect(page).toHaveScreenshot("F-1-autocomplete-type-end.png", {
    fullPage: true,
  });

  await page.keyboard.press("Backspace");
  await page.keyboard.press("Backspace");
  await expect(page.getByTestId("fudis-multiselect-6-dropdown")).not.toBeVisible();
});
