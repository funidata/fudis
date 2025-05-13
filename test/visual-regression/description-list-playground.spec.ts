import test, { expect } from "@playwright/test";

test.skip("description list playground collection", async ({ page }) => {
  await page.goto(
    "/iframe.html?globals=&args=&id=components-test-playground--description-list-collection&viewMode=story",
  );
  await expect(page.getByTestId("fudis-description-list-35"))
    .toBeVisible()
    .then(async () => {
      await expect(page).toHaveScreenshot("1-description-list-collection.png", { fullPage: true });
    });
});
