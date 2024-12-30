import test, { expect } from "@playwright/test";

test("basic form components playground", async ({ page }) => {
  await page.goto(
    "/iframe.html?globals=&args=&id=components-test-playground--description-list-collection&viewMode=story",
  );
  await expect(page.getByTestId("fudis-description-list-34"))
    .toBeVisible()
    .then(async () => {
      await expect(page).toHaveScreenshot("1-description-list-collection.png", { fullPage: true });
    });
});
