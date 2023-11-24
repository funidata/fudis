import { AbstractControl, FormControl, Validators } from '@angular/forms';

export const hasRequiredValidator = (control: AbstractControl<any>): boolean => {
	const nativeRequired = control.hasValidator(Validators.required);

	const fudisRequired = !!control.validator?.('' as any as AbstractControl);

	if (nativeRequired || fudisRequired) {
		return true;
	}
	return false;
};

export const getMaxLengthFromValidator = (control: AbstractControl): number | undefined => {
	const validatorFn = control.validator;

	if (validatorFn === null) {
		return undefined;
	}

	const errors = validatorFn(new FormControl({ length: Infinity }));

	return errors?.['maxlength']?.requiredLength;
};

export const getMinLengthFromValidator = (control: AbstractControl): number | undefined => {
	const validatorFn = control.validator;

	if (validatorFn === null) {
		return undefined;
	}

	const errors = validatorFn(new FormControl({ length: -Infinity }));

	return errors?.['minlength']?.requiredLength;
};

export const getMaxFromValidator = (control: AbstractControl): number | undefined => {
	const validatorFn = control.validator;

	if (validatorFn === null) {
		return undefined;
	}

	const errors = validatorFn(new FormControl(Infinity)) ?? {};
	return errors?.['max']?.max;
};

export const getMinFromValidator = (control: AbstractControl): number | undefined => {
	const validatorFn = control.validator;

	if (validatorFn === null) {
		return undefined;
	}

	const errors = validatorFn(new FormControl(-Infinity)) ?? {};
	return errors?.['min']?.min;
};
