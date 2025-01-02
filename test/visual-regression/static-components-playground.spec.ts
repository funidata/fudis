import test, { expect } from "@playwright/test";

test("Static components playground", async ({ page }) => {
  await page.goto(
    "/iframe.html?globals=&id=components-test-playground--static-components&viewMode=story",
  );
  await expect(page.getByText("System information"))
    .toBeVisible()
    .then(async () => {
      await expect(page).toHaveScreenshot("1-static-components.png", { fullPage: true });
    });
});
