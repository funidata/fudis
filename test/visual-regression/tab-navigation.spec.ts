import test, { expect } from "@playwright/test";

const tabNavigationBarId = "fudis-tab-navigation-bar-1";
const scrollButtonRight = tabNavigationBarId + "-scroll-button-right";
const scrollButtonLeft = tabNavigationBarId + "-scroll-button-left";
const tabNavigationTabPrefix = "fudis-tab-";

test.beforeEach(async ({ page }) => {
  await page.goto("/iframe.html?id=components-tab-navigation--example&viewMode=story");
});

test("should navigate tabs with arrow keys", async ({ page }) => {
  await page.getByTestId(`${tabNavigationTabPrefix}1`).focus();
  await page.getByTestId(`${tabNavigationTabPrefix}1`).press("ArrowRight");
  await expect(page.getByTestId(`${tabNavigationTabPrefix}2`)).toBeFocused();

  await page.getByTestId(`${tabNavigationTabPrefix}2`).press("ArrowLeft");
  await expect(page.getByTestId(`${tabNavigationTabPrefix}1`)).toBeFocused();

  await page.getByTestId(`${tabNavigationTabPrefix}1`).press("ArrowLeft");
  await expect(page.getByTestId(`${tabNavigationTabPrefix}5`)).toBeFocused();

  await page.getByTestId(`${tabNavigationTabPrefix}5`).press("ArrowRight");
  await expect(page.getByTestId(`${tabNavigationTabPrefix}1`)).toBeFocused();
});

test("should be able to scroll with ui arrow buttons", async ({ page }, testInfo) => {
  const mobileBrowsers = ["Mobile Chrome", "Mobile Safari"];
  test.skip(
    !mobileBrowsers.includes(testInfo.project.name),
    "This test is only for mobile devices",
  );

  await expect(page.getByTestId(scrollButtonLeft)).not.toBeVisible();
  await expect(page.getByTestId(scrollButtonRight)).toBeVisible();
  await expect(page.getByTestId(`${tabNavigationTabPrefix}1`)).toBeInViewport();

  await page.getByTestId(scrollButtonRight).click();

  await expect(page.getByTestId(`${tabNavigationTabPrefix}1`)).not.toBeInViewport();
  await expect(page.getByTestId(scrollButtonLeft)).toBeVisible();
  await expect(page.getByTestId(scrollButtonRight)).toBeVisible();

  await page.getByTestId(scrollButtonLeft).click();
  await expect(page.getByTestId(`${tabNavigationTabPrefix}1`)).toBeInViewport();
  await expect(page.getByTestId(scrollButtonLeft)).not.toBeVisible();
  await expect(page.getByTestId(scrollButtonRight)).toBeVisible();
});

test("tab navigation should match the snapshot", async ({ page }) => {
  await expect(page).toHaveScreenshot("tab-navigation-primary.png");

  await page.goto(
    "/iframe.html?args=variant:secondary;&id=components-tab-navigation--example&viewMode=story",
  );
  await expect(page).toHaveScreenshot("tab-navigation-secondary.png");
});
