import test, { expect } from "@playwright/test";

test("Multiselect with shared option", async ({ page }) => {
  await page.goto(
    "/iframe.html?globals=&id=components-form-select-multiselect--pw-no-form-example&viewMode=story",
  );
  await expect(page.getByTestId("fudis-multiselect-1")).toBeVisible();
  await expect(page.getByTestId("fudis-multiselect-2")).toBeVisible();

  await page.getByTestId("fudis-multiselect-1").focus();
  await expect(page.getByTestId("fudis-multiselect-1-dropdown")).toBeVisible();

  // Select two options in the first Multiselect, one of them is the shared option
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Space");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Space");
  await page.keyboard.press("Escape");

  // Both Multiselects should now have chips visible
  await expect(page.getByTestId("fudis-multiselect-1-selected-items")).toBeVisible();
  await expect(page.getByTestId("fudis-multiselect-2-selected-items")).toBeVisible();

  await expect(
    page.getByTestId("fudis-multiselect-1-selected-items").getByRole("listitem"),
  ).toHaveCount(2);
  await expect(
    page.getByTestId("fudis-multiselect-2-selected-items").getByRole("listitem"),
  ).toHaveCount(1);

  // Select another option for the second Multiselect, which should not affect the first one
  await page.getByTestId("fudis-multiselect-2").focus();
  await expect(page.getByTestId("fudis-multiselect-2-dropdown")).toBeVisible();

  // Check that the shared option is still selected in the second Multiselect
  const sharedOption = page
    .getByTestId("fudis-multiselect-2-dropdown")
    .getByRole("option", { name: "Capybara" });

  await expect(sharedOption).toHaveAttribute("aria-selected", "true");

  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Space");
  await page.keyboard.press("Escape");

  await expect(
    page.getByTestId("fudis-multiselect-1-selected-items").getByRole("listitem"),
  ).toHaveCount(2);
  await expect(
    page.getByTestId("fudis-multiselect-2-selected-items").getByRole("listitem"),
  ).toHaveCount(2);

  // Clear all selections from the second Multiselect, which should also clear the shared option from the first Multiselect
  await page.getByTestId("fudis-multiselect-2-clear-button").click();

  await expect(
    page.getByTestId("fudis-multiselect-1-selected-items").getByRole("listitem"),
  ).toHaveCount(1);
  await expect(
    page.getByTestId("fudis-multiselect-2-selected-items").getByRole("listitem"),
  ).toHaveCount(0);

  // Select the shared option again from the first Multiselect
  await page.getByTestId("fudis-multiselect-1").focus();
  await expect(page.getByTestId("fudis-multiselect-1-dropdown")).toBeVisible();

  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Space");
  await page.keyboard.press("Escape");

  await expect(
    page.getByTestId("fudis-multiselect-1-selected-items").getByRole("listitem"),
  ).toHaveCount(2);
  await expect(
    page.getByTestId("fudis-multiselect-2-selected-items").getByRole("listitem"),
  ).toHaveCount(1);

  // Remove the shared option from the dropdown in the first Multiselect, which should also remove it from the second Multiselect
  await page.getByTestId("fudis-multiselect-1").focus();
  await expect(page.getByTestId("fudis-multiselect-1-dropdown")).toBeVisible();

  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Space");
  await page.keyboard.press("Escape");

  await expect(
    page.getByTestId("fudis-multiselect-1-selected-items").getByRole("listitem"),
  ).toHaveCount(1);
  await expect(
    page.getByTestId("fudis-multiselect-2-selected-items").getByRole("listitem"),
  ).toHaveCount(0);
});
