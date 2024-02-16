import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';
import { FudisDateInputFormat } from '../../../../types/forms';
import { parseDate } from './utilities';

// TODO: Write tests and add more internal documentation to this file if necessary
@Injectable()
export class DatepickerCustomDateAdapter extends NativeDateAdapter {
  /**
   * Original file:
   * https://github.com/angular/components/blob/main/src/material/core/datetime/native-date-adapter.ts
   */

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  override parse(value: any): Date | null {
    return parseDate(value);
  }

  override format(date: Date, displayFormat: object): string {
    if (!this.isValid(date)) {
      throw Error('NativeDateAdapter: Cannot format invalid date.');
    }

    const dtf = new Intl.DateTimeFormat(this.selectLanguage(displayFormat), {
      ...displayFormat,
      timeZone: 'utc',
    });

    return this._formatInputToDate(dtf, date);
  }

  /**
   * Change the calendar starting day of the week from default 0 (Sunday) to 1 (Monday)
   */
  override getFirstDayOfWeek(): number {
    return 1;
  }

  /**
   * Determines from displayFormat value if the Date value is coming from the input field or from the datepicker calendar.
   * This ensures, that visible input value is always in Finnish DD.MM.YYYY format, but calendar uses HTML lang in other context.
   */
  selectLanguage(displayFormat: object): string {
    if (Object.prototype.valueOf.call(displayFormat) === FudisDateInputFormat) {
      return 'fi-FI';
    }
    return this.locale;
  }

  private _formatInputToDate(dtf: Intl.DateTimeFormat, date: Date) {
    // Passing the year to the constructor causes year numbers <100 to be converted to 19xx.
    // To work around this we use `setUTCFullYear` and `setUTCHours` instead.
    const d = new Date();
    d.setUTCFullYear(date.getFullYear(), date.getMonth(), date.getDate());
    d.setUTCHours(date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());

    return dtf.format(d);
  }
}
