import test, { expect } from "@playwright/test";

test("text-area with validators", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=&id=components-form-text-area--with-validators&viewMode=story",
  );
  await page.getByTestId("fudis-text-area-1").focus();
  await page.getByTestId("fudis-text-area-1").blur();
  await expect(page.getByText("Missing a value.")).toBeVisible();

  await page.getByTestId("fudis-text-area-1").focus();
  await page.getByTestId("fudis-text-area-1").fill("hey");
  await expect(page.getByText("Missing a value.")).not.toBeVisible();
  await expect(
    page.getByText("Too short input. Minimum length is 5 and maximum length is 20."),
  ).toBeVisible();

  await page.getByTestId("fudis-text-area-1").fill("Hello there!");
  await expect(
    page.getByText("Too short input. Minimum length is 5 and maximum length is 20."),
  ).not.toBeVisible();
});
