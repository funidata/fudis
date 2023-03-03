/* eslint-disable class-methods-use-this */
import { Injectable } from '@angular/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

@Injectable()
export class DatepickerCustomDateAdapter extends MomentDateAdapter {
	/**
	 * Change the calendar starting day of the week from default 0 (Sunday) to 1 (Monday)
	 */
	override getFirstDayOfWeek(): number {
		return 1;
	}
}
