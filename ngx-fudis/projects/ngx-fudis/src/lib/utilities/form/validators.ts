import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';

interface FudisValidationErrors extends ValidationErrors {
	[key: string]: { message: Observable<string>; value?: number };
}

interface FudisValidatorMinMaxSetting {
	value: number;
	message: Observable<string>;
}

interface FudisGroupValidatorFn extends ValidatorFn {
	(controlGroup: FormGroup): FudisValidationErrors | null;
}

export module FudisGroupValidator {
	export function atLeastOneRequired(message: Observable<string>): FudisGroupValidatorFn {
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

	export function min(settings: FudisValidatorMinMaxSetting): FudisGroupValidatorFn {
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

	export function max(settings: FudisValidatorMinMaxSetting): FudisGroupValidatorFn {
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
