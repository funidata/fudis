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
  await expect(page.getByTestId("fudis-multiselect-1-option-100zewl-checkbox-input")).toBeFocused();
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("ArrowUp");

  await expect(page.getByTestId("fudis-multiselect-1-option-nr48pp-checkbox-input")).toBeFocused();
  await page.getByTestId("fudis-multiselect-1-option-ibd9lw").hover();
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
  await page.getByTestId("fudis-multiselect-1-option-1d30z6z").click();
  await page.getByTestId("fudis-multiselect-1-option-1szhdxn").click();

  await page.getByTestId("fudis-heading-1").hover();
  await expect(page.getByTestId("fudis-multiselect-1-dropdown")).toBeVisible();
  await page.getByTestId("fudis-heading-1").click();
  await expect(page.getByTestId("fudis-multiselect-1-dropdown")).not.toBeVisible();

  await page.getByTestId("fudis-multiselect-1").focus();
  await expect(page.getByTestId("fudis-multiselect-1-dropdown")).toBeVisible();
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Space");
  await expect(page.getByTestId("fudis-multiselect-1-dropdown")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByTestId("fudis-multiselect-1-dropdown")).not.toBeVisible();

  /**
   * Disabled when multiselect has selected options
   */
  await page.keyboard.press("ArrowDown");
  await expect(page.getByTestId("fudis-multiselect-1-dropdown")).toBeVisible();
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("Tab");
  await expect(page.getByTestId("fudis-multiselect-1-dropdown")).not.toBeVisible();

  await page.getByTestId("fudis-button-1").click();

  await expect(page).toHaveScreenshot("A-7-disabled-selected.png", {
    fullPage: true,
  });

  /**
   * Disabled after clearing options
   */
  await page.getByTestId("fudis-button-1").click();
  await page.getByTestId("fudis-multiselect-1-clear-button").click();
  await expect(page.getByTestId("fudis-multiselect-1-dropdown")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByTestId("fudis-multiselect-1-dropdown")).not.toBeVisible();
  await expect(page.getByText("Pick at least two pets")).toHaveCount(6);
  await page.getByTestId("fudis-button-1").click();
  await expect(page.getByText("Pick at least two pets")).toHaveCount(0);
});

test("Dropdown and autocompletes", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=&id=components-form-select--multiselect-showcase&viewMode=story",
  );

  /**
   * Dropdown without Clear button
   */
  await page.getByTestId("fudis-multiselect-1-clear-button").click();
  await page.getByTestId("fudis-multiselect-2").focus();
  await expect(page.getByTestId("fudis-multiselect-1-dropdown")).not.toBeVisible();
  await expect(page.getByTestId("fudis-multiselect-2-dropdown")).toBeVisible();
  await expect(
    page.getByTestId("fudis-multiselect-2-option-e05e75").getByText("Golden jackal"),
  ).toBeVisible();
  await page.getByTestId("fudis-multiselect-2").click();
  await expect(page.getByTestId("fudis-multiselect-2-dropdown")).not.toBeVisible();
  await page.getByTestId("fudis-multiselect-2").click();
  await expect(page.getByTestId("fudis-multiselect-2-dropdown")).toBeVisible();
  await page.getByTestId("fudis-multiselect-2-dropdown").getByText("Ostrich").click();
  await page.getByTestId("fudis-heading-1").hover();
  await expect(page.getByTestId("fudis-multiselect-2-dropdown")).toBeVisible();
  await expect(page.getByText("Pick at least two pets")).toHaveCount(6);

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

  /**
   * Autocomplete dropdown without clear button
   */
  await page.getByTestId("fudis-multiselect-4").focus();
  await expect(page.getByTestId("fudis-multiselect-4-dropdown")).toBeVisible();
  await expect(page.getByTestId("fudis-multiselect-3-dropdown")).not.toBeVisible();
  await page.getByTestId("fudis-multiselect-4").focus();
  await page.keyboard.type("golden");
  await expect(page.getByTestId("fudis-multiselect-4-dropdown")).toBeVisible();
  await expect(page.getByText("Showing 3 results")).toBeVisible();
  await page.getByTestId("fudis-multiselect-4").focus();
  await page.keyboard.press("Enter");
  await expect(page.getByTestId("fudis-multiselect-4-dropdown")).not.toBeVisible();
  await page.keyboard.press("Space");
  await page.keyboard.press("KeyE");
  await page.keyboard.press("KeyA");
  await expect(page.getByText("Showing 1 results")).toBeVisible();
  await expect(page.getByTestId("fudis-multiselect-4-dropdown")).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(page.getByTestId("fudis-multiselect-4-dropdown")).toBeVisible();
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

  await page.keyboard.press("KeyM");
  await page.keyboard.press("KeyO");

  await expect(page.getByTestId("fudis-multiselect-5-dropdown")).not.toBeVisible();
  await page.keyboard.press("KeyU");
  await expect(page.getByTestId("fudis-multiselect-5-dropdown")).toBeVisible();
  await expect(page.getByText("Showing 2 results")).toBeVisible();

  await page.keyboard.press("Backspace");
  await expect(page.getByTestId("fudis-multiselect-5-dropdown")).not.toBeVisible();
  await page.keyboard.press("KeyU");
  await expect(page.getByTestId("fudis-multiselect-5-dropdown")).toBeVisible();

  await page.keyboard.type("ntain lion");
  await expect(page.getByText("Showing 1 results")).toBeVisible();
  await expect(page.getByTestId("fudis-multiselect-5-dropdown")).toBeVisible();
  await page.keyboard.press("Enter");
  await page.getByTestId("fudis-multiselect-5").focus();
  await page.getByTestId("fudis-multiselect-5").clear();
  await page.keyboard.type("cat");
  await expect(page.getByText("Showing 4 results")).toBeVisible();
  await expect(page.getByTestId("fudis-multiselect-5-dropdown")).toBeVisible();

  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Space");
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("Space");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await expect(
    page.getByTestId("fudis-multiselect-5-option-1fkgm3k-checkbox-input"),
  ).toBeInViewport();
  await page.keyboard.press("Space");
  await page.getByTestId("fudis-heading-1").hover();
  await expect(page.getByTestId("fudis-multiselect-5-option-1fkgm3k")).toHaveClass(
    "fudis-multiselect-option fudis-multiselect-option--visible fudis-multiselect-option--focused fudis-multiselect-option--checked",
  );

  /**
   * Autocomplete type without clear button
   */
  await page.getByTestId("fudis-multiselect-6").focus();
  await expect(page.getByTestId("fudis-multiselect-5-dropdown")).not.toBeVisible();
  await expect(page.getByTestId("fudis-multiselect-6-dropdown")).not.toBeVisible();

  await page.getByTestId("fudis-multiselect-6-selected-items").getByText("Ringtail cat").focus();
  await page.getByTestId("fudis-multiselect-6-selected-items").getByText("Ringtail cat").click();

  await page.getByTestId("fudis-multiselect-6").focus();
  await page.getByTestId("fudis-multiselect-6").click();
  await expect(page.getByTestId("fudis-multiselect-6-dropdown")).not.toBeVisible();

  await page.getByTestId("fudis-multiselect-6").clear();
  await page.getByTestId("fudis-multiselect-6").pressSequentially("END");
  await expect(page.getByText("No results found")).not.toBeVisible();

  await page.keyboard.press("Space");
  await expect(page.getByText("No results found")).toBeVisible();

  await page.keyboard.press("Backspace");
  await page.keyboard.press("Backspace");
  await expect(page.getByTestId("fudis-multiselect-6-dropdown")).not.toBeVisible();
});
