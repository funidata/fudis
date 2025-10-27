import test, { expect } from "@playwright/test";

test("pagination default", async ({ page }) => {
  await page.goto("/iframe.html?args=&globals=&id=components-pagination--example&viewMode=story");
  await expect(page).toHaveScreenshot("pagination-1-init.png");

  await expect(page.getByText("Previous")).not.toBeVisible();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Enter"); // Select 5 item

  await expect(page).toHaveScreenshot("pagination-2-active-item.png");
});
