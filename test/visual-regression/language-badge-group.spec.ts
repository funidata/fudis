import test, { expect, Page } from "@playwright/test";

const translations = {
  fi: "Harry Potter on mielestään ihan tavallinen poika. Tosin hän asuu huoltajiensa luona portaiden alla olevassa kaapissa. Harryn elämä muuttuu täysin, kun hän saa 11-vuotispäivänään merkillisen kirjeen. Se on kutsu Tylypahkan velhojen ja noitien kouluun. Harrylle avautuu kokonaan uusi maailma, johon kuuluvat velhot, noidat, yksisarviset ja lohikäärmeet. Harry saa tietää olevansa velhojen sukua!",
  sv: "",
  en: "Harry Potter considers himself just a normal boy. Although he lives with his guardians in the closet under the stairs. Harry's life changes completely when he receives a strange letter on his 11th birthday. It's an invitation to Hogwarts School of Witchcraft and Wizardry. A whole new world opens up for Harry, which includes wizards, witches, Unicorns and dragons. Harry learns that he is of wizarding blood!",
};

async function shouldSelectFinnishTranslation(page: Page) {
  await expect(page.getByTestId("fudis-body-text-1")).not.toBeEmpty();
  await expect(page.getByTestId("fudis-body-text-1")).toContainText(translations.fi);
  await expect(page.getByText(translations.en)).toBeHidden();
}

async function shouldSelectSwedishTranslation(page: Page) {
  await expect(page.getByTestId("fudis-body-text-1")).toBeEmpty();
  await expect(page.getByText(translations.fi)).toBeHidden();
  await expect(page.getByText(translations.en)).toBeHidden();
}

async function shouldSelectEnglishTranslation(page: Page) {
  await expect(page.getByTestId("fudis-body-text-1")).not.toBeEmpty();
  await expect(page.getByTestId("fudis-body-text-1")).toContainText(translations.en);
  await expect(page.getByText(translations.fi)).toBeHidden();
}
test("language badge group default", async ({ page }) => {
  await page.goto("/iframe.html?args=&id=components-language-badge-group--example&viewMode=story");
  await expect(page).toHaveScreenshot("language-badge-group.png");

  // Hover fi
  await page.getByTestId("fudis-language-badge-group-1-item-1").focus();
  await expect(page).toHaveScreenshot("language-badge-group-focus-fi.png");

  // Hover sv
  await page.getByTestId("fudis-language-badge-group-1-item-2").focus();
  await expect(page).toHaveScreenshot("language-badge-group-focus-sv.png");

  // Hover en
  await page.getByTestId("fudis-language-badge-group-1-item-3").focus();
  await expect(page).toHaveScreenshot("language-badge-group-focus-en.png");
});

test("language badge group interactive", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=&id=components-language-badge-group--with-interactive-content&viewMode=story",
  );

  // Set app language to Finnish
  await page.getByTestId("fudis-button-5").click();
  await shouldSelectFinnishTranslation(page);

  // Set app language to Swedish
  await page.getByTestId("fudis-button-6").click();
  await shouldSelectFinnishTranslation(page);
  //
  // // Set app language to English
  await page.getByTestId("fudis-button-4").click();
  await shouldSelectEnglishTranslation(page);

  // Select fi
  await page.getByTestId("fudis-language-badge-group-1-item-10").click();
  await shouldSelectFinnishTranslation(page);

  // Select sv
  await page.getByTestId("fudis-language-badge-group-1-item-11").click();
  await shouldSelectSwedishTranslation(page);

  // Change selectable languages to fi & sv
  await page.getByTestId("fudis-button-1").click();
  await shouldSelectFinnishTranslation(page);
  // Select sv
  await page.getByTestId("fudis-language-badge-group-1-item-14").click();
  await shouldSelectSwedishTranslation(page);

  // Change selectable languages to sv & en
  await page.getByTestId("fudis-button-2").click();
  await shouldSelectEnglishTranslation(page);
  // Select sv
  await page.getByTestId("fudis-language-badge-group-1-item-15").click();
  await shouldSelectSwedishTranslation(page);

  // Change selectable languages to sv, fi & en
  await page.getByTestId("fudis-button-3").click();
  await shouldSelectEnglishTranslation(page);
  // Select sv
  await page.getByTestId("fudis-language-badge-group-1-item-17").click();
  await shouldSelectSwedishTranslation(page);
  // Select fi
  await page.getByTestId("fudis-language-badge-group-1-item-18").click();
  await shouldSelectFinnishTranslation(page);
});
