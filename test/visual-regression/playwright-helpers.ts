import { expect, Page } from "@playwright/test";

export async function clickButtonByTestId(page: Page, testId: string) {
  const button = page.getByTestId(testId);

  await expect(button).toBeVisible();
  await expect(button).toBeEnabled();

  await button.click();
}