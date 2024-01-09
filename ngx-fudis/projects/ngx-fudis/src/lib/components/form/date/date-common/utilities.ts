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
