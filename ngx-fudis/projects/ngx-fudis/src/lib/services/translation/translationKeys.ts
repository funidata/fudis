import { FudisTranslationConfig } from '../../types/miscellaneous';

/**
 * This file contains translations for static translation keys used by Fudis components.
 * These are not supposed to be modified by the using application.
 */

/**
 * English translations
 */
export const en: FudisTranslationConfig = {
  BREADCRUMBS: { PREFIX: 'Breadcrumbs' },
  REQUIRED: 'Required',
  DATEPICKER: {
    CALENDAR: 'Calendar',
    CLOSE: 'Close calendar',
    OPEN: 'Open calendar',
    PREV_MONTH: 'Previous month',
    NEXT_MONTH: 'Next month',
    PREV_YEAR: 'Previous year',
    NEXT_YEAR: 'Next year',
    PREV_MULTIYEAR: 'Previous 24 years',
    NEXT_MULTIYEAR: 'Next 24 years',
    SWITCH_MONTH_VIEW: 'Switch to month view',
    SWITCH_MULTIYEAR_VIEW: 'Switch to year view',
    VALIDATION: {
      START_DATE_INVALID: 'Start date cannot be after end date',
      END_DATE_INVALID: 'End date cannot be before start date',
      DATE_PARSE: 'Invalid date format',
    },
  },
  DIALOG: { CLOSE: 'Close' },
  INPUT_WITH_LANGUAGE_OPTIONS: {
    LANGUAGE: 'Language',
    MISSING: 'Missing',
    MAX_LENGTH: 'characters used',
  },
  LINK: {
    EXTERNAL_LINK: '(opens in a new tab)',
  },
  SELECT: {
    DISABLED: 'Disabled',
    OPEN_DROPDOWN: 'Open dropdown',
    CLOSE_DROPDOWN: 'Close dropdown',
    MULTISELECT: {
      REMOVE_ITEM: 'Remove search filters',
    },
    AUTOCOMPLETE: {
      CLEAR: 'Clear filter',
      NO_RESULTS: 'No results found',
    },
  },
  IMAGE: {
    FUNIDATA_LOGO: 'Funidata homepage',
  },
  ICON: {
    ATTENTION: 'Attention',
  },
  LANGUAGE_BADGE: {
    ARIA_LABEL: {
      FI: 'Change translation to Finnish',
      SV: 'Change translation to Swedish',
      EN: 'Change translation to English',
      TRANSLATIONS: 'Translations',
      SELECTED: '(Selected)',
      MISSING_TRANSLATION: '(Missing translation)',
    },
  },
  TEXTAREA: {
    MAX_LENGTH: 'characters used',
  },
  TEXTINPUT: {
    MAX_LENGTH: 'characters used',
  },
  ALERT: {
    HEADING_LABEL: 'Notifications - Number of notifications',
  },
};

/**
 * Finnish translations
 */
export const fi: FudisTranslationConfig = {
  BREADCRUMBS: { PREFIX: 'Murupolku' },
  REQUIRED: 'Pakollinen',
  DATEPICKER: {
    CALENDAR: 'Kalenteri',
    CLOSE: 'Sulje kalenteri',
    OPEN: 'Avaa kalenteri',
    PREV_MONTH: 'Edellinen kuukausi',
    NEXT_MONTH: 'Seuraava kuukausi',
    PREV_YEAR: 'Edellinen vuosi',
    NEXT_YEAR: 'Seuraava vuosi',
    PREV_MULTIYEAR: 'Edelliset 24 vuotta',
    NEXT_MULTIYEAR: 'Seuraavat 24 vuotta',
    SWITCH_MONTH_VIEW: 'Vaihda kuukausinäkymään',
    SWITCH_MULTIYEAR_VIEW: 'Vaihda vuosinäkymään',
    VALIDATION: {
      START_DATE_INVALID: 'Alkamispäivän on oltava ennen päättymispäivää',
      END_DATE_INVALID: 'Päättymispäivän on oltava alkamispäivän jälkeen',
      DATE_PARSE: 'Virheellinen päivämääräformaatti.',
    },
  },
  DIALOG: { CLOSE: 'Sulje' },
  INPUT_WITH_LANGUAGE_OPTIONS: {
    LANGUAGE: 'Kieli',
    MISSING: 'Puuttuu',
    MAX_LENGTH: 'merkkiä käytetty',
  },
  LINK: {
    EXTERNAL_LINK: '(aukeaa uuteen välilehteen)',
  },
  SELECT: {
    DISABLED: 'Ei valittavissa',
    OPEN_DROPDOWN: 'Avaa pudostuvalikko',
    CLOSE_DROPDOWN: 'Sulje pudotusvalikko',
    MULTISELECT: {
      REMOVE_ITEM: 'Poista hakukriteerejä',
    },
    AUTOCOMPLETE: {
      CLEAR: 'Tyhjennä valinta',
      NO_RESULTS: 'Haku ei palauttanut yhtään tulosta',
    },
  },
  IMAGE: {
    FUNIDATA_LOGO: 'Funidatan kotisivut',
  },
  ICON: {
    ATTENTION: 'Huomio',
  },
  LANGUAGE_BADGE: {
    ARIA_LABEL: {
      FI: 'Vaihda käännöskieleksi Suomi',
      SV: 'Vaihda käännöskieleksi Ruotsi',
      EN: 'Vaihda käännöskieleksi Englanti',
      TRANSLATIONS: 'Käännöskielet',
      SELECTED: '(Valittuna)',
      MISSING_TRANSLATION: '(Käännös puuttuu)',
    },
  },
  TEXTAREA: {
    MAX_LENGTH: 'merkkiä käytetty',
  },
  TEXTINPUT: {
    MAX_LENGTH: 'merkkiä käytetty',
  },
  ALERT: {
    HEADING_LABEL: 'Ilmoitukset - Ilmoituksia yhteensä',
  },
};

/**
 * Swedish translations
 */
export const sv: FudisTranslationConfig = {
  BREADCRUMBS: { PREFIX: 'Länkstig' },
  REQUIRED: 'Obligatorisk',
  DATEPICKER: {
    CALENDAR: 'Kalender',
    CLOSE: 'Stäng kalender',
    OPEN: 'Öppna kalender',
    PREV_MONTH: 'Förra månaden',
    NEXT_MONTH: 'Nästa månad',
    PREV_YEAR: 'Förra året',
    NEXT_YEAR: 'Nästa år',
    PREV_MULTIYEAR: 'Tidigare 24 år',
    NEXT_MULTIYEAR: 'Nästa 24 år',
    SWITCH_MONTH_VIEW: 'Byta till månadsvy',
    SWITCH_MULTIYEAR_VIEW: 'Byta till årsvy',
    VALIDATION: {
      START_DATE_INVALID: 'Startdatumet måste vara före slutdatumet',
      END_DATE_INVALID: 'Slutdatumet måste vara efter startdatumet',
      DATE_PARSE: 'Datumet format är felaktigt',
    },
  },
  DIALOG: { CLOSE: 'Stäng' },
  INPUT_WITH_LANGUAGE_OPTIONS: {
    LANGUAGE: 'Språk',
    MISSING: 'Saknas',
    MAX_LENGTH: 'tecken använt',
  },
  SELECT: {
    DISABLED: 'Inaktiverad',
    OPEN_DROPDOWN: 'Öppna menyn',
    CLOSE_DROPDOWN: 'Stäng menyn',
    MULTISELECT: {
      REMOVE_ITEM: 'Radera filtrering',
    },
    AUTOCOMPLETE: {
      CLEAR: 'Radera val',
      NO_RESULTS: 'Inga sökresultat',
    },
  },
  IMAGE: {
    FUNIDATA_LOGO: 'Funidatas hemsida',
  },
  LINK: {
    EXTERNAL_LINK: '(öppnas i en ny flik)',
  },
  ICON: {
    ATTENTION: 'Observera',
  },
  LANGUAGE_BADGE: {
    ARIA_LABEL: {
      FI: 'Ändra översättning till Finska',
      SV: 'Ändra översättning till Svenska',
      EN: 'Ändra översättning till Engelska',
      TRANSLATIONS: 'Översättningar',
      SELECTED: 'Vald',
      MISSING_TRANSLATION: 'Saknad översättning',
    },
  },
  TEXTAREA: {
    MAX_LENGTH: 'tecken använt',
  },
  TEXTINPUT: {
    MAX_LENGTH: 'tecken använt',
  },
  ALERT: {
    HEADING_LABEL: 'Meddelanden - Totalt meddelanden',
  },
};
