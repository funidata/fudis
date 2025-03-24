import test, { expect } from "@playwright/test";

test("tooltip toggle", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=tooltipToggle:!true&id=directives-tooltip-deprecated--example-with-native-button&viewMode=story",
  );

  await page.getByTestId("button-1").click();
  await page.waitForTimeout(150).then(async () => {
    await expect(page).toHaveScreenshot("toggle.png");
  });

  const tooltipText = await page.locator(".mdc-tooltip .mdc-tooltip__surface").textContent();

  await page.getByTestId("cdk-overlay-0").click(); // Click tooltip overlay element
  await expect(page.locator("mat-tooltip-component")).toBeVisible();
  await expect(tooltipText).toBe("Greetings from tooltip, I hope you can see me!");

  await page.mouse.move(0, 0); // Move mouse away from the tooltip
  await expect(page.locator("mat-tooltip-component")).toBeVisible();

  await page.mouse.click(0, 0); // Click away from the tooltip
  await expect(page.locator("mat-tooltip-component")).not.toBeVisible();

  await page.getByTestId("button-1").click();
  await expect(page.locator("mat-tooltip-component")).toBeVisible();
  await page.keyboard.press("Escape"); // Dismiss tooltip with Esc
  await expect(page.locator("mat-tooltip-component")).not.toBeVisible();

  await page.getByTestId("button-1").focus();
  await expect(page.locator("mat-tooltip-component")).not.toBeVisible();
  await page.getByTestId("button-1").click();
  await expect(page.locator("mat-tooltip-component")).toBeVisible();
  await page.getByTestId("button-1").blur(); // Dismiss tooltip by blurring away
  await expect(page.locator("mat-tooltip-component")).not.toBeVisible();
});

test("tooltip hover", async ({ page }) => {
  await page.goto(
    "/iframe.html?globals=&id=directives-tooltip-deprecated--example-with-native-button&viewMode=story",
  );

  await expect(page.locator("mat-tooltip-component")).not.toBeVisible();
  await page.getByTestId("button-1").hover();
  await expect(page.locator("mat-tooltip-component")).toBeVisible();

  const tooltipText = await page.locator(".mdc-tooltip .mdc-tooltip__surface").textContent();

  await page.getByTestId("cdk-overlay-0").click(); // Click tooltip overlay element
  await expect(page.locator("mat-tooltip-component")).toBeVisible();
  await expect(tooltipText).toBe("Greetings from tooltip, I hope you can see me!");

  await page.mouse.move(0, 0); // Move mouse away from the tooltip
  await expect(page.locator("mat-tooltip-component")).not.toBeVisible();
});
