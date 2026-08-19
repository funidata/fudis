import test, { expect, Page } from "@playwright/test";
import { clickButtonByTestId } from "./playwright-helpers";

const translations = {
  fi: "Harry Potter on mielestään ihan tavallinen poika. Tosin hän asuu huoltajiensa luona portaiden alla olevassa kaapissa. Harryn elämä muuttuu täysin, kun hän saa 11-vuotispäivänään merkillisen kirjeen. Se on kutsu Tylypahkan velhojen ja noitien kouluun. Harrylle avautuu kokonaan uusi maailma, johon kuuluvat velhot, noidat, yksisarviset ja lohikäärmeet. Harry saa tietää olevansa velhojen sukua!",
  sv: "",
  en: "Harry Potter considers himself just a normal boy. Although he lives with his guardians in the closet under the stairs. Harry's life changes completely when he receives a strange letter on his 11th birthday. It's an invitation to Hogwarts School of Witchcraft and Wizardry. A whole new world opens up for Harry, which includes wizards, witches, Unicorns and dragons. Harry learns that he is of wizarding blood!",
};

async function shouldSelectFinnishTranslation(page: Page) {
  await expect(page.getByTestId("fudis-body-text-1")).toHaveAttribute("lang", "fi");
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
  await expect(page.getByTestId("fudis-body-text-1")).toHaveAttribute("lang", "en");
  await expect(page.getByTestId("fudis-body-text-1")).not.toBeEmpty();
  await expect(page.getByTestId("fudis-body-text-1")).toContainText(translations.en);
  await expect(page.getByText(translations.fi)).toBeHidden();
}
test("language badge group default", async ({ page }) => {
  await page.goto("/iframe.html?args=&id=components-language-badge-group--example&viewMode=story");
  await expect(page).toHaveScreenshot("language-badge-group.png");
});

test("language badge group interactive", async ({ page }) => {
  await page.goto(
    "/iframe.html?args=&id=components-language-badge-group--with-interactive-content&viewMode=story",
  );

  // Set app language to Finnish
  await clickButtonByTestId(page, "fudis-button-5");
  await shouldSelectFinnishTranslation(page);

  // Set app language to Swedish
  await clickButtonByTestId(page, "fudis-button-6");
  await shouldSelectFinnishTranslation(page);
  //
  // // Set app language to English
  await clickButtonByTestId(page, "fudis-button-4");
  await shouldSelectEnglishTranslation(page);

  // Select fi
  await clickButtonByTestId(page, "fudis-language-badge-group-1-item-1");
  await shouldSelectFinnishTranslation(page);

  // Select sv
  await clickButtonByTestId(page, "fudis-language-badge-group-1-item-2");
  await shouldSelectSwedishTranslation(page);

  // Change selectable languages to fi & sv
  await clickButtonByTestId(page, "fudis-button-1");
  await shouldSelectFinnishTranslation(page);
  // Select sv
  await clickButtonByTestId(page, "fudis-language-badge-group-1-item-2");
  await shouldSelectSwedishTranslation(page);

  // Change selectable languages to sv & en
  await clickButtonByTestId(page, "fudis-button-2");
  await shouldSelectEnglishTranslation(page);
  // Select sv
  await clickButtonByTestId(page, "fudis-language-badge-group-1-item-2");
  await shouldSelectSwedishTranslation(page);

  // Change selectable languages to sv, fi & en
  await clickButtonByTestId(page, "fudis-button-3");
  await shouldSelectEnglishTranslation(page);
  // Select sv
  await clickButtonByTestId(page, "fudis-language-badge-group-1-item-2");
  await shouldSelectSwedishTranslation(page);
  // Select fi
  await clickButtonByTestId(page, "fudis-language-badge-group-1-item-5");
  await shouldSelectFinnishTranslation(page);
});
