import test, { expect } from "@playwright/test";

test("Multiselect Autocomplete with filtering false", async ({ page }) => {
  const hotelRoomsId = "fudis-multiselect-1-option-86a27212-b5a5-41a6-bfc4-c0b88248ad6f";

  const jurassicParkId = "fudis-multiselect-1-option-195da6a2-8a81-48a2-88c7-66a6307d3612";

  const dalmatiansId = "fudis-multiselect-1-option-70c15d93-e846-425b-bae0-2313a5c91d90";

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

    await expect(page.getByText(`Showing ${domLoaded} results`)).toBeVisible();
  };

  await page.goto(
    "/iframe.html?globals=&args=&id=components-form-select-multiselect--backend-simulation&viewMode=story",
  );
  await expect(page.getByTestId("fudis-multiselect-1")).toBeVisible();

  await page.getByTestId("fudis-multiselect-1").focus();

  await expectSearchResults(20, 10, "drama");

  await expect(page.getByTestId(hotelRoomsId)).toBeVisible();
  await expect(page.getByTestId(hotelRoomsId)).toContainText("28 Hotel Rooms");

  await expectSearchResults(1000, 1, "assic pa");

  await expect(page.getByTestId(jurassicParkId)).toContainText("Jurassic Park");

  await expectSearchResults(10, 10, "&&&");

  await expect(page.getByTestId(dalmatiansId)).toContainText(
    "101 Dalmatians II: Patch's London Adventure",
  );
});
