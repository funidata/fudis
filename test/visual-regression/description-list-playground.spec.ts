import test, { expect } from "@playwright/test";

test("description list playground collection", async ({ page }) => {
  test.setTimeout(30000);
  await page.goto(
    "/iframe.html?globals=&args=&id=components-test-playground--description-list-collection&viewMode=story",
  );
  await expect(page.getByTestId("fudis-description-list-35")).toBeVisible();
  await expect(page.getByTestId("fudis-body-text-1"))
    .toBeVisible() // Prevents flaky paragraph from moving on screen resize
    .then(async () => {
      await expect(page).toHaveScreenshot("1-description-list-collection.png", { fullPage: true });
    });
});
