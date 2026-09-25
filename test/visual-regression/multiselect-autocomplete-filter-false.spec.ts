import test, { expect } from "@playwright/test";

test("Multiselect Autocomplete with filtering false", async ({ page }) => {
  const programmingFundamentalsId = "fudis-multiselect-1-option-1b6oytb";

  const finalCourseId = "fudis-multiselect-1-option-1nqcrtg";

  const firstCourseId = "fudis-multiselect-1-option-q20y82";

  /**
   * @param database How many options from 'database' was checked to match results
   * @param domLoaded Number of results sent to DOM
   * @param input String to be used for searching
   */
  const expectSearchResults = async (database: number, domLoaded: number, input: string) => {
    await page.getByTestId("fudis-multiselect-1").clear();
    await page.keyboard.type(input, { delay: 50 });
    await expect(page.getByTestId("fudis-multiselect-1-dropdown")).toBeVisible();
    await expect(
      page.getByText(`Number of options from 'database' checked: ${database}`),
    ).toBeVisible();

    await expect(page.getByText(`Number of options loaded to DOM: ${domLoaded}`)).toBeVisible();

    await expect(
      page.locator(".fudis-body-text").getByText(`Showing ${domLoaded} results`),
    ).toBeVisible();
  };

  await page.goto(
    "/iframe.html?globals=&args=&id=components-form-select-multiselect--backend-simulation&viewMode=story",
  );
  await expect(page.getByTestId("fudis-multiselect-1")).toBeVisible();

  await page.getByTestId("fudis-multiselect-1").focus();

  await expectSearchResults(92, 10, "programming");

  await expect(page.getByTestId(programmingFundamentalsId)).toBeVisible();
  await expect(page.getByTestId(programmingFundamentalsId)).toContainText(
    "Programming Fundamentals: Computer Science Lecture Series",
  );

  await expectSearchResults(1000, 1, "course 1000");

  await expect(page.getByTestId(finalCourseId)).toContainText(
    "Professional Communication: Law Capstone",
  );

  await expectSearchResults(10, 10, "&&&");

  await expect(page.getByTestId(firstCourseId)).toContainText(
    "Data Analysis: Computer Science Lecture Series",
  );
});
