/* eslint-disable no-underscore-dangle */
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { IFudisErrorMessages, IFudisErrorSummaryItem } from '../../../types/forms';
import isRequired from '../../../utilities/errors/errors.utility';
import { GuidanceComponent } from '../guidance/guidance.component';

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
	selector: 'fudis-datepicker',
	templateUrl: './datepicker.component.html',
	styleUrls: ['./datepicker.component.scss'],
})
export class DatepickerComponent implements OnInit {
	@ViewChild(GuidanceComponent, { static: true }) guidanceToUpdate: GuidanceComponent;

	/**
	 * Datepicker FormControl
	 */
	@Input() control: FormControl;

	/*
	 * Error message shown below the datepicker
	 */
	@Input() errorMsg: IFudisErrorMessages;

	/**
	 * Datepicker label
	 */
	@isRequired
	@Input()
	label: string;

	/**
	 * Unique datepicker id
	 */
	@isRequired
	@Input()
	id: string;

	/**
	 * Available sizes for the datepicker - defaults to medium.
	 */
	@Input() size: 's' | 'm' | 'l' = 'm';

	/**
	 * Help text, aligned underneath the datepicker
	 */
	@Input() helpText: string;

	/**
	 * Option for disabling the datepicker input and calendar dialog
	 */
	@Input() disabled: boolean = false;

	/**
	 * Text to indicate that date is required, shown above the datepicker input
	 */
	@Input() requiredText: string;

	/**
	 * Allowed range for minimun date
	 */
	@Input() minDate: Date;

	/**
	 * Allowed range for maximum date
	 */
	@Input() maxDate: Date;

	@Output() errorOutput: EventEmitter<IFudisErrorSummaryItem> = new EventEmitter<IFudisErrorSummaryItem>();

	required: boolean = false;

	ngOnInit(): void {
		if (this.control.hasValidator(Validators.required)) {
			this.required = true;
		}
	}

	handleBlur(): void {
		this.guidanceToUpdate.checkErrors();
	}

	handleSelectionChange(): void {
		this.guidanceToUpdate.checkErrors();
	}
}
