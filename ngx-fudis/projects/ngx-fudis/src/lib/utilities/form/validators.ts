import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

interface FudisValidationErrors extends ValidationErrors {
	[key: string]: { message: Observable<string>; value?: any } | null;
}

interface FudisGroupValidatorMinMaxSettings {
	value: number;
	message: Observable<string>;
}

interface FudisValidatorFn extends ValidatorFn {
	(control: AbstractControl): FudisValidationErrors | null;
}

/**
 * Form Control Validators
 */

/**
 * Fudis version of Validators.required
 */
export module FudisFormControlValidators {
	export function required(message: Observable<string>): FudisValidatorFn {
		return (control: AbstractControl) => {
			if (Validators.required(control) === null || Validators.required(control) === undefined) {
				return { required: null };
			}
			return { required: { message } };
		};
	}

	export function email(message: Observable<string>): FudisValidatorFn {
		return (control: AbstractControl) => {
			if (Validators.email(control) === null || Validators.email(control) === undefined) {
				return null;
			}
			return { email: { message } };
		};
	}
}

/**
 * Form Group Validators
 */

export module FudisGroupValidator {
	export function atLeastOneRequired(message: Observable<string>): FudisValidatorFn {
		return (controlGroup: any): FudisValidationErrors | null => {
			const { controls } = controlGroup;

			if (controls) {
				const theOne = Object.keys(controls).find(
					(key) =>
						controls[key].value !== null &&
						controls[key].value !== '' &&
						controls[key].value !== false &&
						controls[key].value !== undefined
				);

				if (!theOne) {
					return {
						atLeastOneRequired: { message },
					};
				}
			}
			return null;
		};
	}

	export function min(settings: FudisGroupValidatorMinMaxSettings): FudisValidatorFn {
		return (controlGroup: any): FudisValidationErrors | null => {
			const { controls } = controlGroup;
			let amountOfSelected = 0;

			if (controls) {
				Object.keys(controls).forEach((key) => {
					if (controls[key].value) {
						amountOfSelected += 1;
					}
				});

				if (amountOfSelected < settings.value) {
					return {
						min: { message: settings.message, value: settings.value },
					};
				}
			}
			return null;
		};
	}

	export function max(settings: FudisGroupValidatorMinMaxSettings): FudisValidatorFn {
		return (controlGroup: any): FudisValidationErrors | null => {
			const { controls } = controlGroup;
			let amountOfSelected = 0;

			if (controls) {
				Object.keys(controls).forEach((key) => {
					if (controls[key].value) {
						amountOfSelected += 1;
					}
				});

				if (amountOfSelected > settings.value) {
					return {
						max: { message: settings.message, value: settings.value },
					};
				}
			}
			return null;
		};
	}
}
