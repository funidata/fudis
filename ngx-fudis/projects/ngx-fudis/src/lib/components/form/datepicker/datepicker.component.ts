import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { IFudisErrorMessages, IFudisErrorSummaryItem } from '../../../types/forms';
import { GuidanceComponent } from '../guidance/guidance.component';
import { DatepickerCustomHeaderComponent } from './datepicker-custom-header/datepicker-custom-header.component';

/**
 * See more display and parse format options from moment.js
 * https://momentjs.com/docs/#/displaying/format/
 * https://momentjs.com/docs/#/parsing/string-format/
 */
export const FUDIS_DATE_FORMATS = {
	parse: {
		dateInput: 'DD.MM.YYYY',
	},
	display: {
		dateInput: 'DD.MM.YYYY',
		monthYearLabel: 'MMM YYYY',
	},
};

@Component({
	selector: 'fudis-datepicker[id][label]',
	templateUrl: './datepicker.component.html',
	styleUrls: ['./datepicker.component.scss'],
})
export class DatepickerComponent {
	customHeader = DatepickerCustomHeaderComponent;

	@ViewChild(GuidanceComponent, { static: true }) guidanceToUpdate: GuidanceComponent;

	/**
	 * FormControl for the datepicker
	 */
	@Input() control: FormControl;

	/*
	 * Error message shown below the datepicker
	 */
	@Input() errorMsg: IFudisErrorMessages;

	/**
	 * Label for the datepicker
	 */
	@Input() label: string;

	/**
	 * Unique datepicker id
	 */
	@Input() id: string;

	/**
	 * Available sizes for the datepicker - defaults to medium.
	 */
	@Input() size?: 's' | 'm' | 'l' = 'm';

	/**
	 * Help text, aligned underneath the datepicker
	 */
	@Input() helpText?: string;

	/**
	 * Text to indicate that date is required, shown above the datepicker with asterisk
	 */
	@Input() requiredText: string;

	@Input() minDate: Date;

	@Input() maxDate: Date;

	@Output() errorOutput: EventEmitter<IFudisErrorSummaryItem> = new EventEmitter<IFudisErrorSummaryItem>();

	requiredValidator = Validators.required;

	handleBlur(): void {
		this.guidanceToUpdate.checkErrors();
	}

	handleSelectionChange(): void {
		this.guidanceToUpdate.checkErrors();
	}
}
