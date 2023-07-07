import { FormControl } from '@angular/forms';
import { MatDateFormats, MAT_NATIVE_DATE_FORMATS } from '@angular/material/core';

import { Observable } from 'rxjs';

export type FudisInputWidth = 'sm' | 'md' | 'lg';

export interface FudisRadioButtonOption {
	/** Unique id for single radio button option */
	id: string;
	/** Name for the group of radio buttons */
	name: string;
	/** Underlying value of the option */
	value: string | boolean | null;
	/** Value that is shown in the UI */
	viewValue: string;
	/** Is option disabled in the dropdown */
	disabled?: boolean;
	/** If option is selected or not */
	checked?: boolean;
}

export type FudisFormErrors = {
	required?: string;
	minlength?: string;
	maxlength?: string;
	min?: string;
	max?: string;
	email?: string;
	pattern?: string;
	matDatepickerMin?: string;
	matDatepickerMax?: string;
	matDatepickerParse?: string;
	[key: string]: string | undefined;
};

export type FudisFormGroupErrors = {
	atLeastOneRequired?: string;
	[key: string]: FudisFormErrors | any;
};

export interface FudisDropdownOption {
	/** Underlying value of the option */
	value: any;
	/** Value that is shown in the UI */
	viewValue: string;
	/** Is option disabled in the dropdown */
	disabled?: boolean;
	/** To store additional data */
	[key: string]: any;
}

export type FudisFormErrorSummaryItem = {
	id: string;
	label: string;
	error: string;
	type: string;
	controlName: string | undefined;
};

export type FudisFormErrorSummaryObject = {
	[id: string]: {
		id: string;
		errors: FudisFormErrorSummaryObjectItemErrors;
		label: string;
	};
};

export type FudisFormErrorSummarySection = {
	id: string;
	title: string;
};

export type FudisFormErrorSummaryList = {
	id: string;
	message: string;
};

export type FudisFormErrorSummaryObjectItemErrors = {
	[errorType: string]: string;
};

export type FudisDropdownLanguageOption =
	| { value: 'finnish'; viewValue: 'FI' }
	| { value: 'swedish'; viewValue: 'SV' }
	| { value: 'english'; viewValue: 'EN' }
	| { value: string; viewValue: string };

export interface FudisInputWithLanguageOptionsFormGroup {
	[language: string]: FormControl<string | null>;
}

export interface FudisTranslationConfig {
	// Shown with form inputs
	required: Observable<string>;
	// Used in e. g. to define Date picker language
	appLanguage: 'en' | 'fi' | 'sv' | string;
	datepicker: {
		// Label for close button
		closeLabel: Observable<string>;
	};
	dialog: {
		// Label for close button
		closeLabel?: Observable<string>;
	};
	inputWithLanguageOptions: {
		// Label for language selection dropdown
		languageLabel: Observable<string>;
		// Text shown in dropdown options if input for a language is missing
		missingLanguage: Observable<string>;
	};
	// Clear filter button label for screen readers
	autoComplete: {
		clearFilter: Observable<string>;
	};
	icon: {
		// Alternative text for screen readers. Used in e. g. Error Summary
		attention: Observable<string>;
	};
}

export interface FudisDateRangeItem {
	control: FormControl<Date | null>;
	label: string;
	helpText?: string;
	errorMsg?: FudisFormErrors;
	minDate?: Date | null;
	maxDate?: Date | null;
	tooltip?: string;
}

export const FudisDateInputFormat = {
	dateInput: 'DD.MM.YYYY',
	monthYearLabel: 'MMM YYYY',
};

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

export type FudisFormErrorSummaryLink = 'router' | 'href';
