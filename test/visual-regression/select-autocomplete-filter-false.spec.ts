import test, { expect } from "@playwright/test";

test("Select Autocomplete with filtering false", async ({ page }) => {
  const programmingFundamentalsId = "fudis-select-1-option-1b6oytb";

  const finalCourseId = "fudis-select-1-option-1nqcrtg";

  const firstCourseId = "fudis-select-1-option-q20y82";

  /**
   * @param database How many options from 'database' was checked to match results
   * @param domLoaded Number of results sent to DOM
   * @param input String to be used for searching
   */
  const expectSearchResults = async (database: number, domLoaded: number, input: string) => {
    const select1 = page.getByTestId("fudis-select-1");

    // Work around flaky Chromium typing: set the final value directly, then fire
    // one keydown/keyup pair so the component's keyboard-driven filter logic runs.
    await select1.evaluate((inputEl: HTMLInputElement, value: string) => {
      inputEl.focus();
      inputEl.value = "";
      inputEl.dispatchEvent(new Event("input", { bubbles: true }));

      inputEl.value = value;
      inputEl.dispatchEvent(new Event("input", { bubbles: true }));
      inputEl.dispatchEvent(
        new KeyboardEvent("keydown", { key: value.at(-1) ?? "", bubbles: true }),
      );
      inputEl.dispatchEvent(new KeyboardEvent("keyup", { key: value.at(-1) ?? "", bubbles: true }));
    }, input);

    await expect(select1).toHaveValue(input);

    await expect(page.getByTestId("fudis-select-1-dropdown")).toBeVisible();
    await expect(
      page.getByText(`Number of options from 'database' checked: ${database}`),
    ).toBeVisible();

    await expect(page.getByText(`Number of options loaded to DOM: ${domLoaded}`)).toBeVisible();

    await expect(
      page.locator(".fudis-body-text").getByText(`Showing ${domLoaded} results`),
    ).toBeVisible();
  };

  await page.goto(
    "/iframe.html?globals=&args=&id=components-form-select-select--backend-simulation&viewMode=story",
  );
  await expect(page.getByTestId("fudis-select-1")).toBeVisible();

  await page.getByTestId("fudis-select-1").focus();

  await expectSearchResults(92, 10, "programming");

  await expect(page.getByTestId(programmingFundamentalsId)).toContainText(
    "Programming Fundamentals: Computer Science Lecture Series",
  );

  await expectSearchResults(10, 10, "&&&");

  await expect(page.getByTestId(firstCourseId)).toContainText(
    "Data Analysis: Computer Science Lecture Series",
  );

  await expectSearchResults(1000, 1, "course 1000");

  await expect(page.getByTestId(finalCourseId)).toContainText(
    "Professional Communication: Law Capstone",
  );

  await page.getByTestId(finalCourseId).click();

  await expect(page.getByTestId("fudis-select-1-dropdown")).not.toBeVisible();

  await expect(page.getByText(`Number of options loaded to DOM: 1`)).toBeVisible();

  await expect(
    page.getByText("Currently selected course: Professional Communication: Law Capstone"),
  ).toBeVisible();
});
