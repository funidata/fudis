import test, { expect } from "@playwright/test";

test("localized text group, text-input", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=&id=components-form-localized-text-group--example&viewMode=story",
  );

  const input = page.getByTestId("fudis-localized-text-group-1");

  await expect(page).toHaveScreenshot("text-input-1-init.png");

  await input.fill("Fudistaja");

  await expect(page).toHaveScreenshot("text-input-2-fill.png");

  await page.getByTestId("fudis-localized-text-group-1_language-select").click();

  await expect(page).toHaveScreenshot("text-input-3-menu-open.png");

  await page.getByRole("option", { name: /EN/ }).click();

  await expect(page).toHaveScreenshot("text-input-4-en-selected.png");

  await input.fill("Fudisher");

  await page.getByTestId("fudis-localized-text-group-1_language-select").click();

  await page.getByRole("option", { name: /FI/ }).click();

  // Clear the input by selecting all text and pressing backspace, since .clear() does not trigger the necessary events for the component to update its state.
  await input.click();
  await input.selectText();
  await page.keyboard.press("Backspace");
  await expect(input).toHaveValue("");

  await expect(page).toHaveScreenshot("text-input-5-cleared.png");

  await page.getByTestId("fudis-localized-text-group-1_language-select").click();

  await page.getByRole("option", { name: /EN/ }).click();

  await expect(page).toHaveScreenshot("text-input-6-en-required.png");

  await input.click();
  await input.selectText();
  await page.keyboard.press("Backspace");
  await expect(input).toHaveValue("");

  await expect(page).toHaveScreenshot("text-input-7-en-cleared.png");
});

test("localized text group, text-area", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=&id=components-form-localized-text-group--example-with-all-required&viewMode=story",
  );

  const textarea = page.getByTestId("unique-custom-text-group-1");

  await expect(page).toHaveScreenshot("text-area-1-init.png");

  await textarea.fill(
    "Kovakoodatut pikseliarvot ja negatiiviset marginit teki kaupungistani levottoman.",
  );

  await expect(page).toHaveScreenshot("text-area-2-fill.png");

  await page.getByTestId("unique-custom-text-group-1_language-select").click();

  await expect(page).toHaveScreenshot("text-area-3-menu-open.png");

  await page.getByRole("option", { name: /EN/ }).click();

  await expect(page).toHaveScreenshot("text-area-4-en-selected.png");

  await textarea.fill("Hardcoded pixel values and negative margins made my hometown restless.");

  await page.getByTestId("unique-custom-text-group-1_language-select").click();

  await page.getByRole("option", { name: /FI/ }).click();

  // Clear the textarea by selecting all text and pressing backspace, since .clear() does not trigger the necessary events for the component to update its state.
  await textarea.click();
  await textarea.selectText();
  await page.keyboard.press("Backspace");
  await expect(textarea).toHaveValue("");

  await expect(page).toHaveScreenshot("text-area-5-cleared.png");

  await page.getByTestId("unique-custom-text-group-1_language-select").click();

  await page.getByRole("option", { name: /EN/ }).click();

  await expect(page).toHaveScreenshot("text-area-6-en-filled.png");

  await textarea.click();
  await textarea.selectText();
  await page.keyboard.press("Backspace");
  await expect(textarea).toHaveValue("");

  await expect(page).toHaveScreenshot("text-area-7-en-cleared.png");
});
