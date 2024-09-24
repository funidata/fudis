import { AbstractControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { FudisValidationErrors, FudisValidatorFn, FudisValidatorMessage } from './validators';

export interface FudisGroupValidatorsMinMaxSettings {
  value: number;
  message: Observable<string> | string;
}

/**
 * Form Group Validators
 */
export const FudisGroupValidators = {
  oneRequired,
  min,
  max,
};

/**
 * At least one option must be selected from a group
 */
function oneRequired(message: FudisValidatorMessage): FudisValidatorFn {
  return (controlGroup: AbstractControl): FudisValidationErrors | null => {
    const { controls } = controlGroup as FormGroup;

    if (controls) {
      const theOne = Object.keys(controls).find(
        (key) =>
          controls[key].value !== null &&
          controls[key].value !== '' &&
          controls[key].value !== false &&
          controls[key].value !== undefined,
      );

      if (!theOne) {
        return {
          oneRequired: { message },
        };
      }
    }
    return null;
  };
}

/**
 * Minimum selected options of a group
 */
function min(settings: FudisGroupValidatorsMinMaxSettings): FudisValidatorFn {
  return (controlGroup: AbstractControl): FudisValidationErrors | null => {
    const { controls } = controlGroup as FormGroup;
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
function max(settings: FudisGroupValidatorsMinMaxSettings): FudisValidatorFn {
  return (controlGroup: AbstractControl): FudisValidationErrors | null => {
    const { controls } = controlGroup as FormGroup;
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
