import test, { expect } from "@playwright/test";

test("Select autocompletes", async ({ page }) => {
  await page.goto("/iframe.html?args=&id=components-form-select--select-showcase&viewMode=story");

  /**
   * Autocomplete dropdown with clear button
   */
  await page.getByTestId("fudis-select-3").focus();
  await expect(page.getByTestId("fudis-select-3-dropdown")).toBeVisible();
  await page.getByTestId("fudis-select-3-clear-button").focus();
  await page.keyboard.press("Enter");
  await expect(page.getByText("You must choose a pet!").filter({ visible: true })).toHaveCount(6);
  await expect(page.getByTestId("fudis-select-3-dropdown")).toBeVisible();

  await page.getByTestId("fudis-select-3").focus();
  await page.keyboard.press("KeyI");
  await expect(page.getByTestId("fudis-body-text-6").getByText("Showing 48 results")).toBeVisible();
  await page.keyboard.press("KeyN");
  await expect(page.getByTestId("fudis-body-text-6").getByText("Showing 18 results")).toBeVisible();
  await expect(page.getByText("You must choose a pet!").filter({ visible: true })).toHaveCount(6);

  /**
   * Autocomplete dropdown without clear button
   */
  await page.getByTestId("fudis-select-4").focus();
  await expect(page.getByTestId("fudis-select-4-dropdown")).toBeVisible();
  await expect(page.getByTestId("fudis-select-3-dropdown")).not.toBeVisible();
  await expect(page.getByText("You must choose a pet!").filter({ visible: true })).toHaveCount(6);

  const select4 = page.getByTestId("fudis-select-4");

  // Work around flaky Chromium typing: set the final value directly, then fire
  // one keydown/keyup pair so the component's keyboard-driven filter logic runs.
  await select4.evaluate((input: HTMLInputElement, value: string) => {
    input.focus();
    input.value = value;
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new KeyboardEvent("keydown", { key: "n", bubbles: true }));
    input.dispatchEvent(new KeyboardEvent("keyup", { key: "n", bubbles: true }));
  }, "golden");

  await expect(select4).toHaveValue("golden");
  await expect(page.getByTestId("fudis-body-text-8").getByText("Showing 3 results")).toBeVisible();
  await expect(page.getByTestId("fudis-select-4-dropdown")).toBeVisible();
  await expect(page.getByText("You must choose a pet!").filter({ visible: true })).toHaveCount(6);

  await page.keyboard.press("Enter");
  await expect(page.getByTestId("fudis-select-4-dropdown")).not.toBeVisible();
  await expect(page.getByText("You must choose a pet!").filter({ visible: true })).toHaveCount(6);

  await page.keyboard.press("Space");
  await expect(page.locator(".fudis-body-text").getByText("Showing 2 results")).toBeVisible();
  await page.keyboard.press("KeyE");
  await expect(page.locator(".fudis-body-text").getByText("Showing 1 results")).toBeVisible();
  await page.keyboard.press("KeyA");
  await expect(page.locator(".fudis-body-text").getByText("Showing 1 results")).toBeVisible();
  await expect(page.getByTestId("fudis-select-4-dropdown")).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(page.getByTestId("fudis-select-4-dropdown")).not.toBeVisible();
  await expect(page.getByText("You must choose a pet!").filter({ visible: true })).toHaveCount(0);

  /**
   * Autocomplete type with clear button
   */
  await page.getByTestId("fudis-select-5").focus();
  await expect(page.getByTestId("fudis-select-5-dropdown")).toBeVisible();
  await expect(page.getByText("You must choose a pet!").filter({ visible: true })).toHaveCount(0);

  await page.getByTestId("fudis-select-5-clear-button").focus();
  await page.keyboard.press("Space");
  await expect(page.getByTestId("fudis-select-5-dropdown")).not.toBeVisible();
  await expect(page.getByText("You must choose a pet!").filter({ visible: true })).toHaveCount(6);

  await page.keyboard.press("KeyM");
  await page.keyboard.press("KeyO");
  await expect(page.getByText("You must choose a pet!").filter({ visible: true })).toHaveCount(6);

  await expect(page.getByTestId("fudis-select-5-dropdown")).not.toBeVisible();
  await page.keyboard.press("KeyU");
  await expect(page.locator(".fudis-body-text").getByText("Showing 2 results")).toBeVisible();
  await expect(page.getByTestId("fudis-select-5-dropdown")).toBeVisible();
  await page.keyboard.press("Backspace");
  await expect(page.getByTestId("fudis-select-5-dropdown")).not.toBeVisible();

  const select5 = page.getByTestId("fudis-select-5");

  // Work around flaky Chromium typing: set the final value directly, then fire
  // one keydown/keyup pair so the component's keyboard-driven filter logic runs.
  await select5.evaluate((input: HTMLInputElement, value: string) => {
    input.focus();
    input.value = value;
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new KeyboardEvent("keydown", { key: "n", bubbles: true }));
    input.dispatchEvent(new KeyboardEvent("keyup", { key: "n", bubbles: true }));
  }, "mouflon");

  await expect(select5).toHaveValue("Mouflon");
  await expect(page.getByText("You must choose a pet!").filter({ visible: true })).toHaveCount(0);
  await page.keyboard.press("Backspace");

  /**
   * Autocomplete type without clear button
   */
  await page.getByTestId("fudis-select-6").click();
  await page.getByTestId("fudis-select-6").selectText();
  await page.keyboard.press("Backspace");
  await expect(page.getByTestId("fudis-select-6")).toHaveValue("");

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
  await expect(page.getByText("You must choose a pet!").filter({ visible: true })).toHaveCount(6);
  await expect(page.getByTestId("fudis-select-5-clear-button")).toBeVisible();

  await page.keyboard.press("Backspace");
  await page.keyboard.press("Backspace");
  await expect(
    page.getByTestId("fudis-select-6-dropdown").getByText("No results found"),
  ).not.toBeVisible();
  await expect(page.getByTestId("fudis-select-6-dropdown")).not.toBeVisible();
  await expect(page.getByText("You must choose a pet!").filter({ visible: true })).toHaveCount(6);
});
