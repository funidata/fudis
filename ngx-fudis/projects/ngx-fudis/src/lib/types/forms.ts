export interface RadioButtonOption {
	label: string;
	id: string;
	name: string;
	value: string;
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
