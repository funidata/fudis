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
  await page.getByTestId("fudis-alert-2-button").click();
  await page.getByTestId("fudis-alert-4-button").click();
  await expect(page.getByText("Nothing special here.")).not.toBeVisible();
  await expect(page.getByText("Yippee Ki-Yay! You were successful!")).not.toBeVisible();

  // Open dialog
  await page.getByTestId("fudis-alert-6-button").click(); // Dismiss one Alert
  await page.getByTestId("fudis-button-3").click(); // Add success Alert
  await page.getByTestId("fudis-button-7").click(); // Open dialog
  await expect(page.getByText("Small test dialog")).toBeVisible();

  await page.getByTestId("fudis-alert-5-button").click(); // Dismiss one Alert
  await page.keyboard.press("Tab"); // Tab away from the last Alert
  await page.keyboard.press("Tab"); // Tab to Dialog text content
  await page.keyboard.press("Tab"); // Tab to Dialog OK button
  await page.keyboard.press("Tab"); // Tab to the first Alert since we are inside focus trap
  await expect(page).toHaveScreenshot("2-open-dialog-and-dismiss-alert.png");
  await page.keyboard.press("Escape"); // Close dialog
  await expect(page.getByText("Small test dialog")).not.toBeVisible();

  // Dismiss all alerts
  await page.getByTestId("fudis-button-6").click();
  await expect(page.getByText("Something dangerous happened")).not.toBeVisible();
  await expect(page.getByText("Something dangerous MIGHT happen")).not.toBeVisible();
  await expect(page.getByText("Yippee Ki-Yay! You were successful!")).not.toBeVisible();
});
