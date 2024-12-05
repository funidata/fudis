import { MatDatepickerIntl } from '@angular/material/datepicker';
import { FudisTranslationConfig } from '../../../../services/translation/translationKeys';

/**
 * Update locale for Fudis translations in Datepicker
 * @param value Language Signal string value
 * @returns locale code
 */
export const updateLocale = (value: string): string => {
  switch (value) {
    case 'en':
      return 'en-GB';
    case 'fi':
      return 'fi-FI';
    case 'sv':
      return 'sv-SE';
    default:
      return 'en-GB';
  }
};

/**
 * Assign Fudis translation keys for Datepicker
 */
export const updateMatDatePickerTranslations = (
  translations: FudisTranslationConfig,
  datepickerIntl: MatDatepickerIntl,
): MatDatepickerIntl => {
  const matDatePickerIntlToReturn = datepickerIntl;

  matDatePickerIntlToReturn.calendarLabel = translations.DATEPICKER.CALENDAR;
  matDatePickerIntlToReturn.closeCalendarLabel = translations.DATEPICKER.CLOSE;
  matDatePickerIntlToReturn.openCalendarLabel = translations.DATEPICKER.OPEN;
  matDatePickerIntlToReturn.prevMonthLabel = translations.DATEPICKER.PREV_MONTH;
  matDatePickerIntlToReturn.nextMonthLabel = translations.DATEPICKER.NEXT_MONTH;
  matDatePickerIntlToReturn.prevYearLabel = translations.DATEPICKER.PREV_YEAR;
  matDatePickerIntlToReturn.nextYearLabel = translations.DATEPICKER.NEXT_YEAR;
  matDatePickerIntlToReturn.prevMultiYearLabel = translations.DATEPICKER.PREV_MULTIYEAR;
  matDatePickerIntlToReturn.nextMultiYearLabel = translations.DATEPICKER.NEXT_MULTIYEAR;
  matDatePickerIntlToReturn.switchToMonthViewLabel = translations.DATEPICKER.SWITCH_MONTH_VIEW;
  matDatePickerIntlToReturn.switchToMultiYearViewLabel =
    translations.DATEPICKER.SWITCH_MULTIYEAR_VIEW;

  return matDatePickerIntlToReturn;
};

/**
 * Parse date input to number array
 * @returns new Date(year, monthIndex, day) or null
 */
export const parseDate = (value: string | null | undefined): Date | null => {
  // Split input value by non number values, e.g. 25/5/1977 or 25.5.1977 --> [25,5,1977]
  const numberArray: number[] | null = value
    ? value
        .split(/[^\d+]+/)
        .filter(Number)
        .map(Number)
    : null;

  // If day, month and year are provided
  if (numberArray?.length === 3) {
    const newDate = new Date(numberArray[2], numberArray[1] - 1, numberArray[0]);

    const dayUnchanged = newDate.getDate() === numberArray[0];
    const monthUnchanged = newDate.getMonth() + 1 === numberArray[1];
    const yearUnChanged = newDate.getFullYear() === numberArray[2];

    if (dayUnchanged && monthUnchanged && yearUnChanged) {
      return newDate;
    } else {
      return null;
    }
  }
  // If no year is provided, assume it is current year
  if (numberArray?.length === 2) {
    const currentYear: number = new Date().getFullYear();

    const newDate = new Date(currentYear, numberArray[1] - 1, numberArray[0]);

    const dayUnchanged = newDate.getDate() === numberArray[0];
    const monthUnchanged = newDate.getMonth() + 1 === numberArray[1];

    if (dayUnchanged && monthUnchanged) {
      return newDate;
    } else {
      return null;
    }
  }

  // If input value is not parseable to Date object, return null
  return null;
};
