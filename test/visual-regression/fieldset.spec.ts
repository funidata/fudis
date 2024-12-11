import test, { expect } from "@playwright/test";

test("fieldset", async ({ page }) => {
  const startText = "Currently Fieldset Actions are aligned: start";
  const endText = "Currently Fieldset Actions are aligned: end";
  const belowText = "Currently Fieldset Actions are aligned: below";

  await page.goto("/iframe.html?args=&id=components-form-fieldset--example&viewMode=story");
  await expect(page.getByText(startText)).toBeVisible();
  await expect(page).toHaveScreenshot("1-fieldset-align-start.png", { fullPage: true });
  await page.getByTestId("change-actions-align-button").click();
  await expect(page.getByText(endText)).toBeVisible();
  await expect(page).toHaveScreenshot("2-fieldset-align-end.png", { fullPage: true });
  await page.getByTestId("change-actions-align-button").click();
  await expect(page.getByText(belowText)).toBeVisible();
  await expect(page).toHaveScreenshot("3-fieldset-align-below.png", { fullPage: true });
});
