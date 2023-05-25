import { FormControl } from '@angular/forms';

export interface IFudisRadioButtonOption {
	/** Unique id for single radio button option */
	id: string;
	/** Name for the group of radio buttons */
	name: string;
	/** Underlying value of the option */
	value: string | boolean;
	/** Value that is shown in the UI */
	viewValue: string;
	/** Is option disabled in the dropdown */
	disabled?: boolean;
	/** If option is selected or not */
	checked?: boolean;
}

export type TFudisInputErrorMessages = {
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

export type TFudisGroupErrorMessages = {
	atLeastOneRequired?: string;
	[key: string]: TFudisInputErrorMessages | any;
};

export interface IFudisDropdownOption {
	/** Underlying value of the option */
	value: any;
	/** Value that is shown in the UI */
	viewValue: string;
	/** Is option disabled in the dropdown */
	disabled?: boolean;
	/** To store additional data */
	[key: string]: any;
}

export type TFudisDropdownLanguageOption =
	| { value: 'finnish'; viewValue: 'FI' }
	| { value: 'swedish'; viewValue: 'SV' }
	| { value: 'english'; viewValue: 'EN' };

export type TFudisDropdownLanguageOptionArray = TFudisDropdownLanguageOption[];

export type TFudisFormErrorSummaryItem = {
	id: string;
	label: string;
	error: string;
	type: string;
	controlName: string | undefined;
};

export type TFudisFormErrorSummaryObject = {
	[id: string]: {
		id: string;
		errors: TFudisFormErrorSummaryObjectItemErrors;
		label: string;
	};
};

export type TFudisFormErrorSummaryObjectItemErrors = {
	[errorType: string]: string;
};

export type FudisDatepickerType = Date | null;

export type TempFudisDropdownType = IFudisDropdownOption | null;

export type FudisRadioButtonType = boolean | null;

export type FudisTextInputType = string | null;

export interface FudisInputWithLanguageOptionsFormGroup {
	[language: string]: FormControl<FudisTextInputType>;
}
