import test, { expect } from "@playwright/test";

test("Single-select Dropdown", async ({ page }) => {
  await page.goto("/iframe.html?args=&id=components-form-select--select-showcase&viewMode=story");
  await expect(page).toHaveScreenshot("1-init.png", {
    fullPage: true,
  });
  await page.getByTestId("fudis-select-1").focus();
  await expect(page).toHaveScreenshot("2-focus-input.png", {
    fullPage: true,
  });
  await page.keyboard.press("ArrowDown");
  await expect(page).toHaveScreenshot("3-focus-option.png", {
    fullPage: true,
  });
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await expect(page).toHaveScreenshot("4-focus-disabled.png", {
    fullPage: true,
  });
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("ArrowUp");
  await expect(page).toHaveScreenshot("5-focus-mountain-lion.png", {
    fullPage: true,
  });
  await page.getByTestId("fudis-select-1-group-1-option-3").hover();
  await expect(page).toHaveScreenshot("6-hover-gecko.png", {
    fullPage: true,
  });
  await page.keyboard.press("Enter");
  await expect(page).toHaveScreenshot("7-select-mountain-lion.png", {
    fullPage: true,
  });
  await page.keyboard.press("Enter");
  await expect(page).toHaveScreenshot("8-toggle-enter-open.png", {
    fullPage: true,
  });
  await page.keyboard.press("Enter");
  await expect(page).toHaveScreenshot("9-toggle-enter-close.png", {
    fullPage: true,
  });
  await page.keyboard.press("ArrowDown");
  await expect(page).toHaveScreenshot("9-toggle-arrow-down-open.png", {
    fullPage: true,
  });
  await page.keyboard.press("ArrowUp");
  await expect(page).toHaveScreenshot("10-focus-last-item.png", {
    fullPage: true,
  });
  await page.keyboard.press("ArrowDown");
  await expect(page).toHaveScreenshot("11-focus-first-dog.png", {
    fullPage: true,
  });
  await page.keyboard.press("Escape");
  await expect(page).toHaveScreenshot("12-close-escape.png", {
    fullPage: true,
  });
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("Enter");
  await expect(page).toHaveScreenshot("13-enter-select-dolphin.png", {
    fullPage: true,
  });
  await page.keyboard.press("Enter");
  await expect(page.getByTestId("fudis-select-1-dropdown")).toBeVisible();

  await page
    .getByTestId("fudis-select-1-dropdown")
    .getByText("Striped hyena")
    .scrollIntoViewIfNeeded()
    .then(() => {
      page.getByText("Striped hyena").click();
    });
  await expect(page).toHaveScreenshot("14-click-select-hyena.png", {
    fullPage: true,
  });
  await page.keyboard.press("Tab");
  await expect(page).toHaveScreenshot("15-focus-clear-button.png", {
    fullPage: true,
  });
  await page.keyboard.press("Enter");
  await expect(page).toHaveScreenshot("16-enter-clear.png", {
    fullPage: true,
  });
  await page.keyboard.press("Tab");
  await expect(
    page.getByTestId("fudis-select-2-dropdown").getByText("Golden jackal"),
  ).toBeVisible();
  await expect(page).toHaveScreenshot("17-focus-to-second.png", {
    fullPage: true,
  });
  await page.getByTestId("fudis-select-2").click();
  await expect(
    page.getByTestId("fudis-select-2-dropdown").getByText("Golden jackal"),
  ).not.toBeVisible();
});
