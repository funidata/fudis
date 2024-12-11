import test, { expect } from "@playwright/test";

const alignSelfXText = "alignSelfX = 'stretch' (default)";
const alignSelfYText = "alignSelfY = 'stretch' (default)";
const alignSelfXYText = "alignSelfX = 'stretch' & alignSelfY = 'stretch' (default)";
const columnsText = "columns = 'stretch', so it takes the full width";
const responsiveText = "columns=\"{'xs: 'stretch', md: 3, lg: 'auto'}\"";

test("grid-item align-self-x", async ({ page }) => {
  await page.goto("/iframe.html?args=&id=components-grid-grid-item--align-self-x&viewMode=story");
  await expect(page.getByText(alignSelfXText)).toBeVisible();
  await expect(page).toHaveScreenshot("align-self-x.png", {
    fullPage: true,
  });
});

test("grid-item align-self-y", async ({ page }) => {
  await page.goto("/iframe.html?args=&id=components-grid-grid-item--align-self-y&viewMode=story");
  await expect(page.getByText(alignSelfYText)).toBeVisible();
  await expect(page).toHaveScreenshot("align-self-y.png", {
    fullPage: true,
  });
});

test("grid-item align-self-x-and-y", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=&id=components-grid-grid-item--align-self-x-and-y&viewMode=story",
  );
  await expect(page.getByText(alignSelfXYText)).toBeVisible();
  await expect(page).toHaveScreenshot("align-self-x-and-y.png", {
    fullPage: true,
  });
});

test("grid-item columns", async ({ page }) => {
  await page.goto("/iframe.html?args=&id=components-grid-grid-item--columns&viewMode=story");
  await expect(page.getByText(columnsText)).toBeVisible();
  await expect(page).toHaveScreenshot("columns.png", {
    fullPage: true,
  });
});

test("grid-item responsive columns", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=&id=components-grid-grid-item--responsive-columns&viewMode=story",
  );
  await expect(page.getByText(responsiveText)).toBeVisible();
  await expect(page).toHaveScreenshot("responsive-columns.png", {
    fullPage: true,
  });
});
