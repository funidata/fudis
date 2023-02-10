export interface IFudisRadioButtonOption {
	id: string;
	name: string;
	value: string;
	label: string;
	disabled?: boolean;
	checked?: boolean;
}

export interface IFudisErrorMessages {
	required?: string;
	minlength?: string;
	maxlength?: string;
	min?: string;
	max?: string;
	email?: string;
	pattern?: string;
}

export interface IFudisDropdownOption {
	/** Underlying value of the option */
	value: any;
	/** Value that is shown in the UI */
	viewValue: string;
	/** Is option disabled in the dropdown */
	disabled?: boolean;
}
