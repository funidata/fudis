import test, { expect } from "@playwright/test";

test("Dropdown with Clear Button and dropdown keyboard interactions", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=&id=components-form-select--multiselect-showcase&viewMode=story",
  );
  await page.waitForTimeout(150);
  await expect(page).toHaveScreenshot("A-1-init.png", {
    fullPage: true,
  });

  /**
   * Dropdown with clear button
   */
  await page.getByTestId("fudis-multiselect-1").focus();
  await page.waitForTimeout(150);
  await expect(page.getByTestId("fudis-multiselect-1-dropdown")).toBeVisible();
  await page.keyboard.press("ArrowDown");
  await expect(page).toHaveScreenshot("A-2-focus-option.png");
  await page.keyboard.press("ArrowDown");
  await expect(page).toHaveScreenshot("A-3-focus-selected.png");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown"); /* Focus is on disabled option */
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await expect(
    page.getByTestId("fudis-multiselect-1-option-1oiq67e").getByRole("option"),
  ).toBeFocused();
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("ArrowUp");
  await expect(
    page.getByTestId("fudis-multiselect-1-option-zjlo9e").getByRole("option"),
  ).toBeFocused();

  await page.getByTestId("fudis-multiselect-1-option-h8wp28").first().hover();
  await expect(page).toHaveScreenshot("A-4-hover-academic-writing.png");
  await page.getByTestId("fudis-heading-1").hover();

  await page.keyboard.press("Enter");
  await expect(page.getByTestId("fudis-multiselect-1-dropdown")).toBeVisible();
  await expect(page).toHaveScreenshot("A-5-select-programming.png");
  await page.keyboard.press("Space");
  await expect(page.getByTestId("fudis-multiselect-1-dropdown")).toBeVisible();
  await expect(page).toHaveScreenshot("A-6-deselect-programming.png");
  await page.getByTestId("fudis-multiselect-1-option-179er9u").first().click();
  await page.getByTestId("fudis-multiselect-1-option-1388lei").click();

  await page.getByTestId("fudis-heading-1").hover();
  await expect(page.getByTestId("fudis-multiselect-1-dropdown")).toBeVisible();
  await page.getByTestId("fudis-heading-1").click();
  await page.waitForTimeout(150);
  await expect(page.getByTestId("fudis-multiselect-1-dropdown")).not.toBeVisible();

  await page.getByTestId("fudis-multiselect-1").focus();
  await page.waitForTimeout(150);
  await expect(page.getByTestId("fudis-multiselect-1-dropdown")).toBeVisible();
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Space");
  await expect(page.getByTestId("fudis-multiselect-1-dropdown")).toBeVisible();
  await page.keyboard.press("Escape");
  await page.waitForTimeout(150);
  await expect(page.getByTestId("fudis-multiselect-1-dropdown")).not.toBeVisible();

  /**
   * Disabled when multiselect has selected options
   */
  await page.keyboard.press("ArrowDown");
  await page.waitForTimeout(150);
  await expect(page.getByTestId("fudis-multiselect-1-dropdown")).toBeVisible();
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("Tab");
  await page.getByTestId("fudis-button-1").click();
  await expect(page.getByTestId("fudis-multiselect-1-dropdown")).not.toBeVisible();
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
  await expect(page.getByText("Select at least two courses")).toHaveCount(6);
  await page.getByTestId("fudis-button-1").click();
  await expect(page.getByText("Select at least two courses")).toHaveCount(0);
});

test.describe("Dropdown and autocompletes", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(
      "/iframe.html?args=&id=components-form-select--multiselect-showcase&viewMode=story",
    );
  });

  test("Dropdown without Clear button", async ({ page }) => {
    await page.getByTestId("fudis-multiselect-1-clear-button").click();
    await page.getByTestId("fudis-multiselect-2").focus();
    await page.waitForTimeout(150);
    await expect(page.getByTestId("fudis-multiselect-1-dropdown")).not.toBeVisible();
    await expect(page.getByTestId("fudis-multiselect-2-dropdown")).toBeVisible();
    await expect(
      page
        .getByTestId("fudis-multiselect-2-option-173f7lm")
        .getByText("Introduction to Programming", { exact: true }),
    ).toBeVisible();
    await page.getByTestId("fudis-multiselect-2").click();
    await page.waitForTimeout(150);
    await expect(page.getByTestId("fudis-multiselect-2-dropdown")).not.toBeVisible();
    await page.getByTestId("fudis-multiselect-2").click();
    await page.waitForTimeout(150);
    await expect(page.getByTestId("fudis-multiselect-2-dropdown")).toBeVisible();
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");

    await page.getByTestId("fudis-heading-1").hover();
    await expect(page.getByTestId("fudis-multiselect-2-dropdown")).toBeVisible();
    await expect(page.getByText("Select at least two courses")).toHaveCount(6);
  });

  test("Autocomplete dropdown with clear button", async ({ page }) => {
    await page.getByTestId("fudis-multiselect-2").focus();
    await page.getByTestId("fudis-multiselect-3").focus();
    await page.waitForTimeout(150);
    await expect(page.getByTestId("fudis-multiselect-3-dropdown")).toBeVisible();
    await expect(page.getByTestId("fudis-multiselect-2-dropdown")).not.toBeVisible();

    await page.keyboard.press("KeyI");
    await expect(page.locator(".fudis-body-text").getByText("Showing 55 results")).toBeVisible();
    await page.keyboard.press("KeyN");
    await expect(page.locator(".fudis-body-text").getByText("Showing 30 results")).toBeVisible();
  });

  test("Autocomplete dropdown without clear button", async ({ page }) => {
    await page.getByTestId("fudis-multiselect-3").focus();

    await page.getByTestId("fudis-multiselect-4").focus();
    await page.waitForTimeout(150);
    await expect(page.getByTestId("fudis-multiselect-4-dropdown")).toBeVisible();
    await expect(page.getByTestId("fudis-multiselect-3-dropdown")).not.toBeVisible();
    await page.getByTestId("fudis-multiselect-4").focus();
    await page.keyboard.type("di");
    await page.waitForTimeout(150);
    await expect(page.getByTestId("fudis-multiselect-4-dropdown")).toBeVisible();
    await expect(page.locator(".fudis-body-text").getByText("Showing 6 results")).toBeVisible();
    await page.getByTestId("fudis-multiselect-4").focus();
    await page.keyboard.press("Enter");
    await expect(page.getByTestId("fudis-multiselect-4-dropdown")).not.toBeVisible();
    await page.keyboard.press("KeyG");
    await page.waitForTimeout(150);
    await expect(page.locator(".fudis-body-text").getByText("Showing 1 results")).toBeVisible();
    await expect(page.getByTestId("fudis-multiselect-4-dropdown")).toBeVisible();
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");
    await expect(page.getByTestId("fudis-multiselect-4-dropdown")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByTestId("fudis-multiselect-4-dropdown")).not.toBeVisible();
  });

  test("Autocomplete type with clear button", async ({ page }) => {
    await page.getByTestId("fudis-multiselect-4").focus();
    await page.getByTestId("fudis-multiselect-5").focus();
    await page.waitForTimeout(150);
    await expect(page.getByTestId("fudis-multiselect-5-dropdown")).not.toBeVisible();
    await page.keyboard.press("ArrowDown");
    await expect(page.getByTestId("fudis-multiselect-5-dropdown")).not.toBeVisible();
    await page.keyboard.press("Enter");
    await expect(page.getByTestId("fudis-multiselect-5-dropdown")).not.toBeVisible();

    await page.getByTestId("fudis-multiselect-5-clear-button").focus();
    await page.keyboard.press("Space");
    await expect(page.getByTestId("fudis-multiselect-5-dropdown")).not.toBeVisible();

    await page.getByTestId("fudis-multiselect-5").focus();
    await page.keyboard.type("di");
    await page.waitForTimeout(150);

    await expect(page.getByTestId("fudis-multiselect-5-dropdown")).not.toBeVisible();
    await page.keyboard.type("g");
    await page.waitForTimeout(150);
    await expect(page.getByTestId("fudis-multiselect-5-dropdown")).toBeVisible();
    await expect(page.locator(".fudis-body-text").getByText("Showing 1 results")).toBeVisible();

    await page.keyboard.press("Backspace");
    await expect(page.getByTestId("fudis-multiselect-5-dropdown")).not.toBeVisible();
    await page.keyboard.press("KeyG");
    await page.waitForTimeout(150);
    await expect(page.getByTestId("fudis-multiselect-5-dropdown")).toBeVisible();

    await page.keyboard.type("ital learning environments");
    await page.waitForTimeout(150);
    await expect(page.locator(".fudis-body-text").getByText("Showing 1 results")).toBeVisible();
    await expect(page.getByTestId("fudis-multiselect-5-dropdown")).toBeVisible();
    await page.keyboard.press("Enter");
    await page.getByTestId("fudis-multiselect-5").focus();
    await page.getByTestId("fudis-multiselect-5").clear();
    await page.keyboard.type("research");
    await page.waitForTimeout(150);
    await expect(page.locator(".fudis-body-text").getByText("Showing 11 results")).toBeVisible();
    await expect(page.getByTestId("fudis-multiselect-5-dropdown")).toBeVisible();

    await page.keyboard.press("ArrowDown"); /* Focus is on disabled option */
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Space");
    await page.keyboard.press("ArrowUp");
    await page.keyboard.press("Space");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Space");
    await expect(page.getByTestId("fudis-multiselect-5-option-3fjgbu")).toHaveClass(
      "fudis-multiselect-option fudis-multiselect-option--visible fudis-multiselect-option--focused fudis-multiselect-option--checked",
    );
  });

  test("Autocomplete type without clear button", async ({ page }) => {
    await page.getByTestId("fudis-multiselect-5").focus();
    await page.getByTestId("fudis-multiselect-6").focus();
    await page.waitForTimeout(150);
    await expect(page.getByTestId("fudis-multiselect-5-dropdown")).not.toBeVisible();
    await expect(page.getByTestId("fudis-multiselect-6-dropdown")).not.toBeVisible();

    await page.keyboard.type("Data Analysis");
    await expect(page.getByTestId("fudis-multiselect-6-dropdown")).toBeVisible();
    await expect(page.getByTestId("fudis-multiselect-6-option-179er9u")).toBeVisible();
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Space");
    await page.keyboard.press("Escape");
    const dataAnalysisChip = page
      .getByTestId("fudis-multiselect-6-selected-items")
      .getByRole("button", { name: "Data Analysis Remove selection" });
    await expect(dataAnalysisChip).toBeVisible();
    await dataAnalysisChip.focus();
    await dataAnalysisChip.click();

    await page.getByTestId("fudis-multiselect-6").focus();
    await page.keyboard.press("Escape");
    await expect(page.getByTestId("fudis-multiselect-6-dropdown")).not.toBeVisible();

    await page.getByTestId("fudis-multiselect-6").clear();
    await page.getByTestId("fudis-multiselect-6").pressSequentially("END");
    await expect(page.locator(".fudis-body-text").getByText("No results found")).not.toBeVisible();

    await page.keyboard.press("Space");
    await page.waitForTimeout(100);
    await expect(page.locator(".fudis-body-text").getByText("No results found")).toBeVisible();

    await page.keyboard.press("Backspace");
    await page.keyboard.press("Backspace");
    await expect(page.getByTestId("fudis-multiselect-6-dropdown")).not.toBeVisible();
  });
});

test("Select values that have duplicate labels", async ({ page }) => {
  await page.goto(
    "/iframe.html?globals=&args=&id=components-form-select-multiselect--example&viewMode=story",
  );

  await page.getByTestId("fudis-multiselect-1").click();
  await expect(page.getByTestId("fudis-multiselect-1-dropdown")).toBeVisible();
  await expect(
    page.getByTestId("fudis-multiselect-1-option-1tb1v88").nth(1).getByRole("option"),
  ).toHaveAttribute("aria-selected", "false");

  await page.getByTestId("fudis-multiselect-1-option-1tb1v88").nth(1).click();

  await expect(
    page.getByTestId("fudis-multiselect-1-option-1tb1v88").nth(1).getByRole("option"),
  ).toHaveAttribute("aria-selected", "true");
  await expect(
    page.getByTestId("fudis-multiselect-1-option-1tb1v88").nth(0).getByRole("option"),
  ).toHaveAttribute("aria-selected", "false");

  await page.getByTestId("fudis-multiselect-1-option-1tb1v88").nth(1).click();
  await page.getByTestId("fudis-multiselect-1-option-1tb1v88").nth(0).click();

  await expect(
    page.getByTestId("fudis-multiselect-1-option-1tb1v88").nth(1).getByRole("option"),
  ).toHaveAttribute("aria-selected", "false");
  await expect(
    page.getByTestId("fudis-multiselect-1-option-1tb1v88").nth(0).getByRole("option"),
  ).toHaveAttribute("aria-selected", "true");
});
