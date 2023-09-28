import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

interface FudisValidationErrors extends ValidationErrors {
	atLeastOneRequired?: boolean;
  lessThanRequiredRange?: boolean;
  moreThanRequiredRange?: boolean;
}

interface FudisGroupValidatorFn extends ValidatorFn {
	(controlGroup: FormGroup): FudisValidationErrors | null;
}

export module FudisFormGroupValidators {
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

  export function outOfRequiredRange(min?: number, max?: number): FudisGroupValidatorFn {
    return (controlGroup: any): FudisValidationErrors | null => {
      const { controls } = controlGroup;
      let amountOfSelected = 0;

      if (controls) {
        Object.keys(controls).forEach((key) => {
          if(!!controls[key].value) {
            amountOfSelected = ++amountOfSelected;
          }
        });

        if (!!min && amountOfSelected < min) {
          return {
            lessThanRequiredRange: true,
          };
        }

        if (!!max && amountOfSelected > max) {
          return {
            moreThanRequiredRange: true
          };
        }
      }
      return null;
    };
  }
}
