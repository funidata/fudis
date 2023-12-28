import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

export type FudisValidatorMessage = Observable<string> | string;

export interface FudisValidationErrors extends ValidationErrors {
	[key: string]: { message: FudisValidatorMessage; value?: any } | null;
}

export interface FudisGroupValidatorsMinMaxSettings {
	value: number;
	message: Observable<string> | string;
}

export interface FudisValidatorFn extends ValidatorFn {
	(control: AbstractControl): FudisValidationErrors | null;
}

/**
 * Form Control Validators
 */
export module FudisValidators {
	/**
	 * Fudis version of Validators.required
	 */
	export function required(message: FudisValidatorMessage): FudisValidatorFn {
		return (control: AbstractControl) => {
			if (!Validators.required(control)) {
				return null;
			}
			return { required: { message } };
		};
	}

	/**
	 * Fudis version of Validators.email
	 */
	export function email(message: FudisValidatorMessage): FudisValidatorFn {
		return (control: AbstractControl) => {
			if (!Validators.email(control)) {
				return null;
			}
			return { email: { message } };
		};
	}

	/**
	 * Fudis version of Validators.maxLength
	 */
	export function maxLength(length: number, message: FudisValidatorMessage): FudisValidatorFn {
		return (control: AbstractControl) => {
			if (!Validators.maxLength(length)(control) || length < 1) {
				return null;
			}
			return { maxlength: { message, requiredLength: length } };
		};
	}

	/**
	 * Fudis version of Validators.minLength
	 */
	export function minLength(length: number, message: FudisValidatorMessage): FudisValidatorFn {
		return (control: AbstractControl) => {
			if (!Validators.minLength(length)(control) || length < 1) {
				return null;
			}
			return {
				minlength: {
					message,
					requiredLength: length,
				},
			};
		};
	}

	/**
	 * Fudis version of Validators.min
	 */
	export function min(minValue: number, message: FudisValidatorMessage): FudisValidatorFn {
		return (control: AbstractControl) => {
			if (!Validators.min(minValue)(control)) {
				return null;
			}
			return {
				min: {
					message,
					min: minValue,
				},
			};
		};
	}

	/**
	 * Fudis version of Validators.max
	 */
	export function max(maxValue: number, message: FudisValidatorMessage): FudisValidatorFn {
		return (control: AbstractControl) => {
			if (!Validators.max(maxValue)(control)) {
				return null;
			}
			return {
				max: {
					message,
					max: maxValue,
				},
			};
		};
	}

	/**
	 * Fudis version of Validators.pattern
	 */
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
 * Form Group Validators for Checkbox Group and Input With Language Options
 */
export module FudisGroupValidators {
	/**
	 * NOTE: Input has to be set as required when using this validator
	 */
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

	/**
	 * Minimum selected options of a group
	 */
	export function min(settings: FudisGroupValidatorsMinMaxSettings): FudisValidatorFn {
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

	/**
	 * Maximum selected options of a group
	 */
	export function max(settings: FudisGroupValidatorsMinMaxSettings): FudisValidatorFn {
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
