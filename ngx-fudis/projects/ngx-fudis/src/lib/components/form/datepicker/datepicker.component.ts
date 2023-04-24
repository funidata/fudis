/* eslint-disable no-underscore-dangle */
import { Component, DoCheck, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
	MatDateFormats,
	MAT_NATIVE_DATE_FORMATS,
	MAT_DATE_FORMATS,
	DateAdapter,
	MAT_DATE_LOCALE,
} from '@angular/material/core';

import { DOCUMENT } from '@angular/common';
import { TFudisFormErrorMessages, IFudisFormErrorSummaryItem } from '../../../types/forms';
import { GuidanceComponent } from '../guidance/guidance.component';
import { TooltipApiDirective } from '../../../directives/tooltip/tooltip-api.directive';
import { DatepickerCustomDateAdapter } from './datepicker-custom-date-adapter';

export const FUDIS_DATE_FORMATS: MatDateFormats = {
	...MAT_NATIVE_DATE_FORMATS,
	parse: {
		dateInput: 'DD.MM.YYYY',
	},
	display: {
		...MAT_NATIVE_DATE_FORMATS.display,
		dateInput: {
			dateInput: 'DD.MM.YYYY',
			monthYearLabel: 'MMM YYYY',
		} as Intl.DateTimeFormatOptions,
	},
};

@Component({
	selector: 'fudis-datepicker[id][label]',
	templateUrl: './datepicker.component.html',
	styleUrls: ['./datepicker.component.scss'],
	providers: [
		{
			provide: DateAdapter,
			useClass: DatepickerCustomDateAdapter,
			deps: [MAT_DATE_LOCALE],
		},
		{ provide: MAT_DATE_FORMATS, useValue: FUDIS_DATE_FORMATS },
	],
})
export class DatepickerComponent extends TooltipApiDirective implements OnInit, DoCheck {
	constructor(private readonly adapter: DateAdapter<Date>, @Inject(DOCUMENT) private document: Document) {
		super();
	}

	@ViewChild(GuidanceComponent, { static: true }) guidanceToUpdate: GuidanceComponent;

	/**
	 * Datepicker FormControl
	 */
	@Input() control: FormControl;

	/*
	 * Error message shown below the datepicker
	 */
	@Input() errorMsg: TFudisFormErrorMessages;

	/**
	 * Datepicker label
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

	@Input() locale: string = 'en-GB';

	@Output() errorOutput: EventEmitter<IFudisFormErrorSummaryItem> = new EventEmitter<IFudisFormErrorSummaryItem>();

	required: boolean = false;

	currentHtmlLang: string;

	ngOnInit(): void {
		if (this.control.hasValidator(Validators.required)) {
			this.required = true;
		}

		this.currentHtmlLang = this.document.documentElement.lang;
		this.adapter.setLocale(this.updateLocale());
		// this.adapter.setLocale('en-Gb');
	}

	ngDoCheck(): void {
		if (this.document.documentElement.lang !== this.currentHtmlLang) {
			this.adapter.setLocale(this.updateLocale());
			this.currentHtmlLang = this.document.documentElement.lang;
		}
	}

	handleBlur(): void {
		this.guidanceToUpdate.checkErrors();
	}

	handleSelectionChange(): void {
		this.guidanceToUpdate.checkErrors();
	}

	updateLocale(): string {
		switch (this.document.documentElement.lang) {
			case 'en':
				return 'en-GB';
			case 'fi':
				return 'fi-FI';
			case 'sv':
				return 'sv-SE';
			default:
				return 'en-GB';
		}
	}
}
