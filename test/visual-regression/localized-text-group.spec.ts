import test, { expect } from "@playwright/test";

test("localized text group, text-input", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=&id=components-form-localized-text-group--example&viewMode=story",
  );
  await expect(page).toHaveScreenshot("text-input-1-init.png");

  await page.getByTestId("fudis-localized-text-group-1").fill("Fudistaja");

  await expect(page).toHaveScreenshot("text-input-2-fill.png");

  await page.getByTestId("fudis-localized-text-group-1_language-select").click();

  await expect(page).toHaveScreenshot("text-input-3-menu-open.png");

  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");

  await expect(page).toHaveScreenshot("text-input-4-en-selected.png");

  await page.getByTestId("fudis-localized-text-group-1").fill("Fudisher");

  await page.getByTestId("fudis-localized-text-group-1_language-select").click();

  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");

  await page.getByTestId("fudis-localized-text-group-1").clear();

  await expect(page).toHaveScreenshot("text-input-5-cleared.png");

  await page.getByTestId("fudis-localized-text-group-1_language-select").click();

  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");

  await expect(page).toHaveScreenshot("text-input-6-en-required.png");

  await page.getByTestId("fudis-localized-text-group-1").clear();

  await expect(page).toHaveScreenshot("text-input-7-en-cleared.png");
});

test("localized text group, text-area", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=&id=components-form-localized-text-group--example-with-all-required&viewMode=story",
  );
  await expect(page).toHaveScreenshot("text-area-1-init.png");

  await page
    .getByTestId("unique-custom-text-group-1")
    .fill("Kovakoodatut pikseliarvot ja negatiiviset marginit teki kaupungistani levottoman.");

  await expect(page).toHaveScreenshot("text-area-2-fill.png");

  await page.getByTestId("unique-custom-text-group-1_language-select").click();

  await expect(page).toHaveScreenshot("text-area-3-menu-open.png");

  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");

  await expect(page).toHaveScreenshot("text-area-4-en-selected.png");

  await page
    .getByTestId("unique-custom-text-group-1")
    .fill("Hardcoded pixel values and negative margins made my hometown restless.");

  await page.getByTestId("unique-custom-text-group-1_language-select").click();

  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");

  await page.getByTestId("unique-custom-text-group-1").clear();

  await expect(page).toHaveScreenshot("text-area-5-cleared.png");

  await page.getByTestId("unique-custom-text-group-1_language-select").click();

  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");

  await expect(page).toHaveScreenshot("text-area-6-en-filled.png");

  await page.getByTestId("unique-custom-text-group-1").clear();

  await expect(page).toHaveScreenshot("text-area-7-en-cleared.png");
});
