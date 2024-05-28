import test, { expect } from "@playwright/test";

// Description List
test("description list default regular", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=variant:regular&id=components-description-list--description-list&viewMode=story",
  );
  await expect(page).toHaveScreenshot({ fullPage: true });
});

test("description list default compact", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=variant:compact&id=components-description-list--description-list&viewMode=story",
  );
  await expect(page).toHaveScreenshot({ fullPage: true });
});

test("description list default regular and grid disabled", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=variant:regular;disableGrid:!true&id=components-description-list--description-list&viewMode=story",
  );
  await expect(page).toHaveScreenshot({ fullPage: true });
});

test("description list default compact and grid disabled", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=variant:compact;disableGrid:!true&id=components-description-list--description-list&viewMode=story",
  );
  await expect(page).toHaveScreenshot({ fullPage: true });
});

// Description List Inside Grid
test("description list regular inside Grid", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=variant:regular&id=components-description-list--description-list-inside-grid&viewMode=story",
  );
  await expect(page).toHaveScreenshot({ fullPage: true });
});

test("description list compact inside Grid", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=variant:compact&id=components-description-list--description-list-inside-grid&viewMode=story",
  );
  await expect(page).toHaveScreenshot({ fullPage: true });
});

test("description list regular inside Grid and DL grid enabled", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=variant:regular;disableGrid:!false&id=components-description-list--description-list-inside-grid&viewMode=story",
  );
  await expect(page).toHaveScreenshot({ fullPage: true });
});

test("description list compact inside Grid and DL grid enabled", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=variant:compact;disableGrid:!false&id=components-description-list--description-list-inside-grid&viewMode=story",
  );
  await expect(page).toHaveScreenshot({ fullPage: true });
});

// Description List With Sub Components
test("description list regular with sub components", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=variant:regular&id=components-description-list--description-list-with-sub-components&viewMode=story",
  );
  await expect(page).toHaveScreenshot({ fullPage: true });
});

test("description list regular with sub components and grid disabled", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=variant:regular;disableGrid:!true&id=components-description-list--description-list-with-sub-components&viewMode=story",
  );
  await expect(page).toHaveScreenshot({ fullPage: true });
});

test("description list compact with sub components", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=variant:compact&id=components-description-list--description-list-with-sub-components&viewMode=story",
  );
  await expect(page).toHaveScreenshot({ fullPage: true });
});

test("description list compact with sub components and grid disabled", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=variant:compact;disableGrid:!true&id=components-description-list--description-list-with-sub-components&viewMode=story",
  );
  await expect(page).toHaveScreenshot({ fullPage: true });
});

// Description List With Multiple Dd Elements
test("description list regular with multiple dd elements", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=variant:regular&id=components-description-list--description-list-with-multiple-dd-elements&viewMode=story",
  );
  await expect(page).toHaveScreenshot({ fullPage: true });
});

test("description list regular with multiple dd elements and grid disabled", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=variant:regular;disableGrid:!true&id=components-description-list--description-list-with-multiple-dd-elements&viewMode=story",
  );
  await expect(page).toHaveScreenshot({ fullPage: true });
});

test("description list compact with multiple dd elements", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=variant:compact&id=components-description-list--description-list-with-multiple-dd-elements&viewMode=story",
  );
  await expect(page).toHaveScreenshot({ fullPage: true });
});

test("description list compact with multiple dd elements and grid disabled", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=variant:compact;disableGrid:!true&id=components-description-list--description-list-with-multiple-dd-elements&viewMode=story",
  );
  await expect(page).toHaveScreenshot({ fullPage: true });
});

// Description List With Single Item
test("description list regular with single item", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=variant:regular&id=components-description-list--description-list-with-single-item&viewMode=story",
  );
  await expect(page).toHaveScreenshot({ fullPage: true });
});

test("description list regular with single item and grid disabled", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=variant:regular;disableGrid:!true&id=components-description-list--description-list-with-single-item&viewMode=story",
  );
  await expect(page).toHaveScreenshot({ fullPage: true });
});

test("description list compact with single item", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=variant:compact&id=components-description-list--description-list-with-single-item&viewMode=story",
  );
  await expect(page).toHaveScreenshot({ fullPage: true });
});

test("description list compact with single item and grid disabled", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=variant:compact;disableGrid:!true&id=components-description-list--description-list-with-single-item&viewMode=story",
  );
  await expect(page).toHaveScreenshot({ fullPage: true });
});

// Description List With Languages
test("description list regular with languages", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=variant:regular&id=components-description-list--description-list-with-languages&viewMode=story",
  );
  await expect(page).toHaveScreenshot("languages-regular-1-initial.png");
  await page.getByTestId("fudis-button-1").click();
  await expect(page).toHaveScreenshot("languages-regular-2-clicked-fi-sv.png");
  await page.getByTestId("fudis-button-2").click();
  await expect(page).toHaveScreenshot("languages-regular-3-clicked-sv-en.png");
  await page.getByTestId("fudis-button-3").click();
  await expect(page).toHaveScreenshot("languages-regular-4-clicked-sv-fi-en.png");

  await page.getByTestId("fudis-language-badge-group-2-item-9").click();
  await page.getByTestId("fudis-language-badge-group-3-item-9").click();
  await page.getByTestId("fudis-button-1").focus();
  await expect(page).toHaveScreenshot("languages-regular-5-clicked-fi-badge.png");
  await page.getByTestId("fudis-language-badge-group-2-item-10").click();
  await page.getByTestId("fudis-language-badge-group-3-item-10").click();
  await page.getByTestId("fudis-button-1").focus();
  await expect(page).toHaveScreenshot("languages-regular-6-clicked-en-badge.png");
  await page.getByTestId("fudis-language-badge-group-2-item-8").click();
  await page.getByTestId("fudis-language-badge-group-3-item-8").click();
  await page.getByTestId("fudis-button-1").focus();
  await expect(page).toHaveScreenshot("languages-regular-7-clicked-sv-badge.png");
  await page.getByTestId("fudis-button-5").click();
  await expect(page).toHaveScreenshot("languages-regular-8-lang-changed-to-fi.png");
  await page.getByTestId("fudis-language-badge-group-2-item-11").focus();
  await expect(page).toHaveScreenshot("languages-regular-9-lang-focus-sv.png");
  await page.getByTestId("fudis-language-badge-group-2-item-12").focus();
  await expect(page).toHaveScreenshot("languages-regular-10-lang-focus-fi.png");
  await page.getByTestId("fudis-language-badge-group-2-item-13").focus();
  await expect(page).toHaveScreenshot("languages-regular-11-lang-focus-en.png");
});

test.only("description list compact with languages", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=variant:compact&id=components-description-list--description-list-with-languages&viewMode=story",
  );
  await expect(page).toHaveScreenshot("languages-compact-1-initial.png");
  await page.getByTestId("fudis-button-1").click();
  await expect(page).toHaveScreenshot("languages-compact-2-clicked-fi-sv.png");
  await page.getByTestId("fudis-button-2").click();
  await expect(page).toHaveScreenshot("languages-compact-3-clicked-sv-en.png");
  await page.getByTestId("fudis-button-3").click();
  await expect(page).toHaveScreenshot("languages-compact-4-clicked-sv-fi-en.png");

  await page.getByTestId("fudis-language-badge-group-2-item-9").click();
  await page.getByTestId("fudis-language-badge-group-3-item-9").click();
  await page.getByTestId("fudis-button-1").focus();
  await expect(page).toHaveScreenshot("languages-compact-5-clicked-fi-badge.png");
  await page.getByTestId("fudis-language-badge-group-2-item-10").click();
  await page.getByTestId("fudis-language-badge-group-3-item-10").click();
  await page.getByTestId("fudis-button-1").focus();
  await expect(page).toHaveScreenshot("languages-compact-6-clicked-en-badge.png");
  await page.getByTestId("fudis-language-badge-group-2-item-8").click();
  await page.getByTestId("fudis-language-badge-group-3-item-8").click();
  await page.getByTestId("fudis-button-1").focus();
  await expect(page).toHaveScreenshot("languages-compact-7-clicked-sv-badge.png");
  await page.getByTestId("fudis-button-5").click();
  await expect(page).toHaveScreenshot("languages-compact-8-lang-changed-to-fi.png");
  await page.getByTestId("fudis-language-badge-group-2-item-11").focus();
  await expect(page).toHaveScreenshot("languages-compact-9-lang-focus-sv.png");
  await page.getByTestId("fudis-language-badge-group-2-item-12").focus();
  await expect(page).toHaveScreenshot("languages-compact-10-lang-focus-fi.png");
  await page.getByTestId("fudis-language-badge-group-2-item-13").focus();
  await expect(page).toHaveScreenshot("languages-compact-11-lang-focus-en.png");
});
