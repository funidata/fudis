import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

type FudisValidatorMessage = Observable<string> | string;
interface FudisValidationErrors extends ValidationErrors {
	[key: string]: { message: FudisValidatorMessage; value?: any } | null;
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
export module FudisValidators {
	export function required(message: FudisValidatorMessage): FudisValidatorFn {
		return (control: AbstractControl) => {
			if (!Validators.required(control)) {
				return null;
			}
			return { required: { message } };
		};
	}

	export function email(message: FudisValidatorMessage): FudisValidatorFn {
		return (control: AbstractControl) => {
			if (!Validators.email(control)) {
				return null;
			}
			return { email: { message } };
		};
	}

	export function maxLength(length: number, message: FudisValidatorMessage): FudisValidatorFn {
		return (control: AbstractControl) => {
			if (!Validators.maxLength(length)(control) || length < 1) {
				return null;
			}
			return { maxLength: { message } };
		};
	}

	export function minLength(length: number, message: FudisValidatorMessage): FudisValidatorFn {
		return (control: AbstractControl) => {
			if (!Validators.minLength(length)(control) || length < 1) {
				return null;
			}
			return {
				minLength: {
					message,
				},
			};
		};
	}

	export function min(minValue: number, message: FudisValidatorMessage): FudisValidatorFn {
		return (control: AbstractControl) => {
			if (!Validators.min(minValue)(control)) {
				return null;
			}
			return {
				min: {
					message,
				},
			};
		};
	}

	export function max(maxValue: number, message: FudisValidatorMessage): FudisValidatorFn {
		return (control: AbstractControl) => {
			if (!Validators.max(maxValue)(control)) {
				return null;
			}
			return {
				max: {
					message,
				},
			};
		};
	}

	export function pattern(regex: string | RegExp, message: FudisValidatorMessage): FudisValidatorFn {
		return (control: AbstractControl) => {
			if (!Validators.pattern(regex)(control)) {
				return null;
			}
			return {
				pattern: {
					message,
				},
			};
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
