import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

interface FudisValidationErrors extends ValidationErrors {
	atLeastOneRequired: boolean;
}

interface FudisGroupValidatorFn extends ValidatorFn {
	(controlGroup: FormGroup): FudisValidationErrors | null;
}

export module FormGroupValidators {
	export function atLeastOneRequired(): FudisGroupValidatorFn {
		return (controlGroup: any): FudisValidationErrors | null => {
			const { controls } = controlGroup;

			if (controls) {
				const theOne = Object.keys(controls).find((key) => controls[key].value !== null && controls[key].value !== '');

				if (!theOne) {
					return {
						atLeastOneRequired: true,
					};
				}
			}
			return null;
		};
	}
}
