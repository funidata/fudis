import test, { expect } from "@playwright/test";

test("Select autocompletes", async ({ page }) => {
  await page.goto("/iframe.html?args=&id=components-form-select--select-showcase&viewMode=story");

  /**
   * Autocomplete dropdown with clear button
   */
  await page.getByTestId("fudis-select-3").focus();
  await expect(page.getByTestId("fudis-select-3-dropdown")).toBeVisible();
  await page.getByTestId("fudis-button-3").focus();
  await page.keyboard.press("Enter");
  await expect(page.getByText("You must choose a pet!").locator("visible=true")).toHaveCount(6);
  await expect(page).toHaveScreenshot("A-1-autocomplete-dropdown-clear.png", {
    fullPage: true,
  });
  await page.getByTestId("fudis-select-3").focus();
  await page.keyboard.press("KeyI");
  await expect(page.getByTestId("fudis-body-text-6").getByText("Showing 47 results")).toBeVisible();
  await page.keyboard.press("KeyN");
  await expect(page.getByTestId("fudis-body-text-6").getByText("Showing 18 results")).toBeVisible();
  await expect(page.getByText("You must choose a pet!").locator("visible=true")).toHaveCount(6);
  await expect(page).toHaveScreenshot("A-2-autocomplete-dropdown-in-typed.png", {
    fullPage: true,
  });

  /**
   * Autocomplete dropdown without clear button
   */
  await page.getByTestId("fudis-select-4").focus();
  await expect(page.getByTestId("fudis-select-4-dropdown")).toBeVisible();
  await expect(page.getByTestId("fudis-select-3-dropdown")).not.toBeVisible();
  await expect(page.getByText("You must choose a pet!").locator("visible=true")).toHaveCount(6);
  await expect(page).toHaveScreenshot("B-1-autocomplete-dropdown-2-focused.png", {
    fullPage: true,
  });
  await page.getByTestId("fudis-select-4").fill("golden");
  await expect(page.getByTestId("fudis-body-text-8").getByText("Showing 3 results")).toBeVisible();
  await expect(page.getByTestId("fudis-select-4-dropdown")).toBeVisible();
  await expect(page.getByText("You must choose a pet!").locator("visible=true")).toHaveCount(6);
  await expect(page).toHaveScreenshot("B-2-autocomplete-dropdown-2-golden-typed.png", {
    fullPage: true,
  });
  await page.keyboard.press("Enter");
  await expect(page.getByTestId("fudis-select-4-dropdown")).not.toBeVisible();
  await expect(page.getByText("You must choose a pet!").locator("visible=true")).toHaveCount(6);
  await expect(page).toHaveScreenshot("B-3-autocomplete-dropdown-2-golden-enter-1.png", {
    fullPage: true,
  });
  await page.keyboard.press("Space");
  await expect(page.getByText("Showing 2 results")).toBeVisible();
  await page.keyboard.press("KeyE");
  await expect(page.getByText("Showing 1 results")).toBeVisible();
  await page.keyboard.press("KeyA");
  await expect(page.getByText("Showing 1 results")).toBeVisible();
  await expect(page.getByTestId("fudis-select-4-dropdown")).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(page.getByTestId("fudis-select-4-dropdown")).not.toBeVisible();
  await expect(page.getByText("You must choose a pet!").locator("visible=true")).toHaveCount(0);
  await expect(page).toHaveScreenshot("B-4-autocomplete-dropdown-2-golden-eagle-selected.png", {
    fullPage: true,
  });
  await page.keyboard.press("Tab");

  /**
   * Autocomplete type with clear button
   */
  await expect(page.getByTestId("fudis-select-5-dropdown")).toBeVisible();
  await expect(page.getByText("You must choose a pet!").locator("visible=true")).toHaveCount(0);
  await expect(page).toHaveScreenshot("C-1-autocomplete-type-focused.png", {
    fullPage: true,
  });
  await page.keyboard.press("Tab");
  await page.keyboard.press("Space");
  await expect(page.getByTestId("fudis-select-5-dropdown")).not.toBeVisible();
  await expect(page.getByText("You must choose a pet!").locator("visible=true")).toHaveCount(6);
  await expect(page).toHaveScreenshot("C-2-autocomplete-type-cleared.png", {
    fullPage: true,
  });
  await page.keyboard.press("KeyM");
  await page.keyboard.press("KeyO");
  await expect(page.getByText("You must choose a pet!").locator("visible=true")).toHaveCount(6);
  await expect(page).toHaveScreenshot("C-3-autocomplete-type-short-input.png", {
    fullPage: true,
  });
  await expect(page.getByTestId("fudis-select-5-dropdown")).not.toBeVisible();
  await page.keyboard.press("KeyU");
  await expect(page.getByText("Showing 2 results")).toBeVisible();
  await expect(page.getByTestId("fudis-select-5-dropdown")).toBeVisible();
  await page.keyboard.press("Backspace");
  await expect(page.getByTestId("fudis-select-5-dropdown")).not.toBeVisible();

  await page.keyboard.type("untain lion", { delay: 50 });
  await expect(page.getByTestId("fudis-select-5-dropdown")).toBeVisible();
  await expect(page.getByText("You must choose a pet!").locator("visible=true")).toHaveCount(0);
  await expect(page).toHaveScreenshot("C-4-autocomplete-type-mountain-lion-typed.png", {
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
  await expect(
    page.getByTestId("fudis-select-6-dropdown").getByText("No results found"),
  ).not.toBeVisible();
  await page.keyboard.press("Space");
  await page.waitForTimeout(200); // Seemed that Safari needed a small timeout here
  await expect(
    page.getByTestId("fudis-select-6-dropdown").getByText("No results found"),
  ).toBeVisible();
  await expect(page.getByTestId("fudis-select-6-dropdown")).toBeVisible();
  await expect(page.getByText("You must choose a pet!").locator("visible=true")).toHaveCount(6);
  await expect(page).toHaveScreenshot("D-1-autocomplete-type-end.png", {
    fullPage: true,
  });
  await page.keyboard.press("Backspace");
  await page.keyboard.press("Backspace");
  await expect(
    page.getByTestId("fudis-select-6-dropdown").getByText("No results found"),
  ).not.toBeVisible();
  await expect(page.getByTestId("fudis-select-6-dropdown")).not.toBeVisible();
  await expect(page.getByText("You must choose a pet!").locator("visible=true")).toHaveCount(6);
  await expect(page).toHaveScreenshot("D-2-autocomplete-type-end-2.png", {
    fullPage: true,
  });
});
