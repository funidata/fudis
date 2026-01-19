import test, { expect } from "@playwright/test";

test("description list playground collection", async ({ page }, testInfo) => {
  await page.goto(
    "/iframe.html?globals=&args=&id=components-test-playground--description-list-collection&viewMode=story",
  );

  /**
   * TODO: This test is skipped in Firefox since it has some dl+grid issues, see ticket DS-516
   */
  const firefoxBrowser = "firefox";
  test.skip(
    firefoxBrowser.includes(testInfo.project.name),
    "Still working on this to work on FireFox",
  );

  await expect(page.getByTestId("fudis-description-list-35"))
    .toBeVisible()
    .then(async () => {
      await expect(page).toHaveScreenshot("1-description-list-collection.png", { fullPage: true });
    });
});
