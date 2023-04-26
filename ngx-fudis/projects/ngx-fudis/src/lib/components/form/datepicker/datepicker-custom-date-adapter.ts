/* eslint-disable class-methods-use-this */
import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';

export const FudisDateInputFormat = {
	dateInput: 'DD.MM.YYYY',
	monthYearLabel: 'MMM YYYY',
};

@Injectable()
export class DatepickerCustomDateAdapter extends NativeDateAdapter {
	/**
	 * Original file:
	 * https://github.com/angular/components/blob/main/src/material/core/datetime/native-date-adapter.ts
	 */

	override parse(value: any): Date | null {
		// Split input value by non number values. E. g. 23/5/2023 --> [23,5,2023]
		const valueAsArray = value.split(/[^\d+]+/).filter(Number);

		// Switch position of first two items. As en-US format is MM/DD/YYYY, so we want to parse the input as DD/MM/YYYY
		if (valueAsArray.length > 1) {
			[valueAsArray[0], valueAsArray[1]] = [valueAsArray[1], valueAsArray[0]];
		}
		const joinedArray = valueAsArray.join('.');

		if (typeof joinedArray === 'number') {
			return new Date(joinedArray);
		}

		const returnValue = joinedArray ? new Date(Date.parse(joinedArray)) : null;

		return returnValue;
	}

	override format(date: Date, displayFormat: Object): string {
		if (!this.isValid(date)) {
			throw Error('NativeDateAdapter: Cannot format invalid date.');
		}

		const dtf = new Intl.DateTimeFormat(this.selectLanguage(displayFormat), { ...displayFormat, timeZone: 'utc' });

		return this.formatInputToDate(dtf, date);
	}

	/**
	 * Determines from displayFormat value if the Date value
	 * is coming from the input field or from the date picker calendar.
	 * This ensures, that visible input value is always in Finnish DD.MM.YYYY
	 * format, but calendar uses HTML lang in other context.
	 */

	selectLanguage(displayFormat: Object): string {
		if (Object.prototype.valueOf.call(displayFormat) === FudisDateInputFormat) {
			return 'fi-FI';
		}
		return this.locale;
	}

	private formatInputToDate(dtf: Intl.DateTimeFormat, date: Date) {
		// Passing the year to the constructor causes year numbers <100 to be converted to 19xx.
		// To work around this we use `setUTCFullYear` and `setUTCHours` instead.
		const d = new Date();
		d.setUTCFullYear(date.getFullYear(), date.getMonth(), date.getDate());
		d.setUTCHours(date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());

		return dtf.format(d);
	}

	/**
	 * Change the calendar starting day of the week from default 0 (Sunday) to 1 (Monday)
	 */
	override getFirstDayOfWeek(): number {
		return 1;
	}
}
