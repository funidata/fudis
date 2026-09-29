import test, { expect, Page } from "@playwright/test";
import { clickButtonByTestId } from "./playwright-helpers";

const translations = {
  fi: "Tietojenkäsittelytieteen kandidaattiohjelma antaa opiskelijalle valmiudet ohjelmointiin, tietojärjestelmien suunnitteluun ja tieteelliseen työskentelyyn. Opiskelija laatii henkilökohtaisen opintosuunnitelman ja ilmoittautuu kursseille opinto-oikeutensa mukaisesti.",
  sv: "",
  en: "The Bachelor of Computer Science programme gives students a foundation in programming, information systems design, and academic work. Students prepare a personal study plan and register for courses according to their study right.",
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
