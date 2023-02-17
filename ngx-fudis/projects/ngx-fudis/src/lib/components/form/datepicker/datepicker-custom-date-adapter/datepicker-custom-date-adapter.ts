import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';

@Injectable()
export class DatepickerCustomDateAdapter extends NativeDateAdapter {
	// eslint-disable-next-line class-methods-use-this
	override getFirstDayOfWeek(): number {
		return 1;
	}
}
