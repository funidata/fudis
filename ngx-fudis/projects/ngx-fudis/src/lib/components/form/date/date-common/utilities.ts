import { MatDatepickerIntl } from '@angular/material/datepicker';
import { FudisTranslationConfig } from '../../../../types/miscellaneous';

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

// TODO: write test
export const parseDate = (value: string | null | undefined): Date | null => {
  // Split input value by non number values. E. g. 25/5/1977 or 25.5.1977 --> [25,5,1977]
  const valueAsArray = value ? value.split(/[^\d+]+/).filter(Number) : null;

  // Parse input and return new Date(YYYY-MM-DD)
  if (valueAsArray?.length === 3) {
    return new Date(`${valueAsArray[2]}-${valueAsArray[1]}-${valueAsArray[0]}`);
  }

  // If no year is provided, assume it is current year
  if (valueAsArray?.length === 2) {
    const currentYear = new Date().getFullYear();
    return new Date(`${valueAsArray[1]}-${valueAsArray[0]}-${currentYear}`);
  }

  if (typeof valueAsArray?.[0] === 'number') {
    return new Date(valueAsArray[0]);
  }

  return null;
};
