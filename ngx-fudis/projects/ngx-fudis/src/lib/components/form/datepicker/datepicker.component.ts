/* eslint-disable no-underscore-dangle */
import { Component, DoCheck, Inject, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
	MatDateFormats,
	MAT_NATIVE_DATE_FORMATS,
	MAT_DATE_FORMATS,
	DateAdapter,
	MAT_DATE_LOCALE,
} from '@angular/material/core';

import { DOCUMENT } from '@angular/common';

import { DatepickerCustomDateAdapter, FudisDateInputFormat } from './datepicker-custom-date-adapter';
import { InputBaseDirective } from '../../../directives/form/input-base/input-base.directive';

export const FUDIS_DATE_FORMATS: MatDateFormats = {
	...MAT_NATIVE_DATE_FORMATS,
	parse: {
		dateInput: 'DD.MM.YYYY',
	},
	display: {
		...MAT_NATIVE_DATE_FORMATS.display,
		dateInput: FudisDateInputFormat as Intl.DateTimeFormatOptions,
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
export class DatepickerComponent extends InputBaseDirective implements OnInit, DoCheck {
	constructor(private readonly adapter: DateAdapter<Date>, @Inject(DOCUMENT) private document: Document) {
		super();
	}

	/**
	 * Datepicker FormControl
	 */
	@Input() control: FormControl;

	/**
	 * Available sizes for the datepicker - defaults to medium.
	 */
	@Input() size?: 's' | 'm' | 'l' = 'm';

	/**
	 * Allowed range for minimun date
	 */
	@Input() minDate: Date;

	/**
	 * Allowed range for maximum date
	 */
	@Input() maxDate: Date;

	required: boolean = false;

	currentHtmlLang: string;

	ngOnInit(): void {
		if (this.control.hasValidator(Validators.required)) {
			this.required = true;
		}

		this.currentHtmlLang = this.document.documentElement.lang;
		this.adapter.setLocale(this.updateLocale());
	}

	ngDoCheck(): void {
		if (this.document.documentElement.lang !== this.currentHtmlLang) {
			this.adapter.setLocale(this.updateLocale());
			this.currentHtmlLang = this.document.documentElement.lang;
		}
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
