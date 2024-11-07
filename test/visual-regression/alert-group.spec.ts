import test, { expect } from "@playwright/test";

test("alert group default", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=position:absolute&id=components-alert-group--example&viewMode=story",
  );
  await expect(page).toHaveScreenshot("1-init.png");

  // Add two more alerts
  await page.getByTestId("fudis-button-1").click();
  await page.getByTestId("fudis-button-2").click();

  // Close two previous alerts
  await page.getByTestId("fudis-alert-1-button").click();
  await page.getByTestId("fudis-alert-2-button").click();
  await expect(page).toHaveScreenshot("2-add-and-remove.png");

  // Open dialog
  await page.getByTestId("fudis-button-7").click();
  await page.getByTestId("fudis-alert-3-button").click(); // Dismiss one Alert
  await page.keyboard.press("Tab"); // Tab away from the last Alert
  await page.keyboard.press("Tab"); // Tab to Dialog text content
  await page.keyboard.press("Tab"); // Tab to Dialog OK button
  await page.keyboard.press("Tab"); // Tab to the first Alert since we are inside focus trap
  await expect(page).toHaveScreenshot("3-open-dialog-and-dismiss-alert.png");
  await page.keyboard.press("Escape"); // Close dialog

  // Dismiss all alerts
  await page.getByTestId("fudis-button-6").click();
  await expect(page).toHaveScreenshot("4-dismiss-all.png");
});
