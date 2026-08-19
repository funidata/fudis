import { expect, Page } from "@playwright/test";

export async function clickButtonByTestId(page: Page, testId: string) {
  const button = page.getByTestId(testId);
  await expect(button).toBeVisible();
  await button.scrollIntoViewIfNeeded();
  await button.evaluate((el: HTMLButtonElement) => el.click());
}
