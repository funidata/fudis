import { NativeDateAdapter } from '@angular/material/core';

export class DatepickerCustomDateAdapter extends NativeDateAdapter {
	// eslint-disable-next-line class-methods-use-this
	override getFirstDayOfWeek(): number {
		return 1;
	}
}
