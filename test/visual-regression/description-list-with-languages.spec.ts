import test, { expect } from "@playwright/test";

test("description list regular with languages", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=variant:regular&id=components-description-list--with-language-badges&viewMode=story",
  );
  await expect(page).toHaveScreenshot("regular-1-initial.png");
  await page.getByTestId("fudis-button-1").click();
  await expect(page).toHaveScreenshot("regular-2-clicked-fi-sv.png");
  await page.getByTestId("fudis-button-2").click();
  await expect(page).toHaveScreenshot("regular-3-clicked-sv-en.png");
  await page.getByTestId("fudis-button-3").click();
  await expect(page).toHaveScreenshot("regular-4-clicked-sv-fi-en.png");

  await page.getByTestId("fudis-language-badge-group-2-item-9").click();
  await page.getByTestId("fudis-language-badge-group-3-item-9").click();
  await page.getByTestId("fudis-button-1").focus();
  await expect(page).toHaveScreenshot("regular-5-clicked-fi-badge.png");
  await page.getByTestId("fudis-language-badge-group-2-item-10").click();
  await page.getByTestId("fudis-language-badge-group-3-item-10").click();
  await page.getByTestId("fudis-button-1").focus();
  await expect(page).toHaveScreenshot("regular-6-clicked-en-badge.png");
  await page.getByTestId("fudis-language-badge-group-2-item-8").click();
  await page.getByTestId("fudis-language-badge-group-3-item-8").click();
  await page.getByTestId("fudis-button-1").focus();
  await expect(page).toHaveScreenshot("regular-7-clicked-sv-badge.png");
  await page.getByTestId("fudis-button-5").click();
  await expect(page).toHaveScreenshot("regular-8-lang-changed-to-fi.png");
  await page.getByTestId("fudis-language-badge-group-2-item-11").focus();
  await expect(page).toHaveScreenshot("regular-9-lang-focus-sv.png");
  await page.getByTestId("fudis-language-badge-group-2-item-12").focus();
  await expect(page).toHaveScreenshot("regular-10-lang-focus-fi.png");
  await page.getByTestId("fudis-language-badge-group-2-item-13").focus();
  await expect(page).toHaveScreenshot("regular-11-lang-focus-en.png");
});

test("description list compact with languages", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=variant:compact&id=components-description-list--with-language-badges&viewMode=story",
  );
  await expect(page).toHaveScreenshot("compact-1-initial.png");
  await page.getByTestId("fudis-button-1").click();
  await expect(page).toHaveScreenshot("compact-2-clicked-fi-sv.png");
  await page.getByTestId("fudis-button-2").click();
  await expect(page).toHaveScreenshot("compact-3-clicked-sv-en.png");
  await page.getByTestId("fudis-button-3").click();
  await expect(page).toHaveScreenshot("compact-4-clicked-sv-fi-en.png");

  await page.getByTestId("fudis-language-badge-group-2-item-9").click();
  await page.getByTestId("fudis-language-badge-group-3-item-9").click();
  await page.getByTestId("fudis-button-1").focus();
  await expect(page).toHaveScreenshot("compact-5-clicked-fi-badge.png");
  await page.getByTestId("fudis-language-badge-group-2-item-10").click();
  await page.getByTestId("fudis-language-badge-group-3-item-10").click();
  await page.getByTestId("fudis-button-1").focus();
  await expect(page).toHaveScreenshot("compact-6-clicked-en-badge.png");
  await page.getByTestId("fudis-language-badge-group-2-item-8").click();
  await page.getByTestId("fudis-language-badge-group-3-item-8").click();
  await page.getByTestId("fudis-button-1").focus();
  await expect(page).toHaveScreenshot("compact-7-clicked-sv-badge.png");
  await page.getByTestId("fudis-button-5").click();
  await expect(page).toHaveScreenshot("compact-8-lang-changed-to-fi.png");
  await page.getByTestId("fudis-language-badge-group-2-item-11").focus();
  await expect(page).toHaveScreenshot("compact-9-lang-focus-sv.png");
  await page.getByTestId("fudis-language-badge-group-2-item-12").focus();
  await expect(page).toHaveScreenshot("compact-10-lang-focus-fi.png");
  await page.getByTestId("fudis-language-badge-group-2-item-13").focus();
  await expect(page).toHaveScreenshot("compact-11-lang-focus-en.png");
});
