/* eslint-disable class-methods-use-this */
import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';

@Injectable()
export class DatepickerCustomDateAdapter extends NativeDateAdapter {
	// Original file: https://github.com/angular/components/blob/main/src/material/core/datetime/native-date-adapter.ts

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

	/**
	 * Change the calendar starting day of the week from default 0 (Sunday) to 1 (Monday)
	 */
	override getFirstDayOfWeek(): number {
		return 1;
	}
}
