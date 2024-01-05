/**
 * Form Group Validators for Checkbox Group and Input With Language Options
 */

import {
  FudisGroupValidatorsMinMaxSettings,
  FudisValidationErrors,
  FudisValidatorFn,
  FudisValidatorMessage,
} from './validators';

export const FudisGroupValidators = {
  atLeastOneRequired,
  min,
  max,
};

/**
 * NOTE: Input has to be set as required when using this validator
 */
export function atLeastOneRequired(message: FudisValidatorMessage): FudisValidatorFn {
  return (controlGroup: any): FudisValidationErrors | null => {
    const { controls } = controlGroup;

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
