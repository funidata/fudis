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

  // Add alert with link
  await page.getByTestId("fudis-button-5").click();
  await page.keyboard.press("Tab"); // Navigate from focused link to close button
  await page.keyboard.press("Enter"); // Dismiss alert, focus should move to the next alert
  await page.keyboard.press("Enter"); // Dismiss focused alert
  await page.getByTestId("fudis-button-5").click();
  await page.getByTestId("fudis-button-6").click();
  await expect(page).toHaveScreenshot("3-add-alerts-with-link.png");

  // Open dialog
  await page.getByTestId("fudis-button-9").click();
  await expect(page).toHaveScreenshot("4-open-dialog.png");
  await page.keyboard.press("Escape"); // Close dialog

  // Dismiss all alerts
  await page.getByTestId("fudis-button-8").click();
  await expect(page).toHaveScreenshot("5-dismiss-all.png");
});
