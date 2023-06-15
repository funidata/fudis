import { AfterContentInit, Component, DoCheck, Inject, Input, OnInit, ViewEncapsulation } from '@angular/core';
import {
	MatDateFormats,
	MAT_NATIVE_DATE_FORMATS,
	MAT_DATE_FORMATS,
	DateAdapter,
	MAT_DATE_LOCALE,
} from '@angular/material/core';

import { DOCUMENT } from '@angular/common';

import { FormControl } from '@angular/forms';
import { DatepickerCustomDateAdapter, FudisDateInputFormat } from './datepicker-custom-date-adapter';
import { InputBaseDirective } from '../../../directives/form/input-base/input-base.directive';
import { checkRequiredAttributes } from '../../../utilities/form/errorsAndWarnings';

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
	encapsulation: ViewEncapsulation.None,
	providers: [
		{
			provide: DateAdapter,
			useClass: DatepickerCustomDateAdapter,
			deps: [MAT_DATE_LOCALE],
		},
		{ provide: MAT_DATE_FORMATS, useValue: FUDIS_DATE_FORMATS },
	],
})
export class DatepickerComponent extends InputBaseDirective implements DoCheck, AfterContentInit, OnInit {
	constructor(private readonly _adapter: DateAdapter<Date>, @Inject(DOCUMENT) private _document: Document) {
		super();
	}

	/**
	 * FormControl for the input.
	 */
	@Input() control: FormControl<Date | null>;

	/**
	 * Available sizes for the datepicker - defaults to medium.
	 */
	@Input() size?: 's' | 'm' | 'l' = 'm';

	/**
	 * Allowed range for minimun date
	 */
	@Input() minDate: Date | null;

	/**
	 * Allowed range for maximum date
	 */
	@Input() maxDate: Date | null;

	private _currentHtmlLang: string;

	ngOnInit(): void {
		checkRequiredAttributes(this.id, this.requiredText, this.control, undefined, this.ignoreRequiredCheck);
	}

	ngAfterContentInit(): void {
		this._currentHtmlLang = this._document.documentElement.lang;
		this._adapter.setLocale(this.updateLocale());
	}

	ngDoCheck(): void {
		if (this._document.documentElement.lang !== this._currentHtmlLang) {
			this._adapter.setLocale(this.updateLocale());
			this._currentHtmlLang = this._document.documentElement.lang;
		}
	}

	updateLocale(): string {
		switch (this._document.documentElement.lang) {
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
