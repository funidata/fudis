import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

export type FudisValidatorMessage = Observable<string> | string;

export interface FudisValidationErrors extends ValidationErrors {
  [key: string]: { message: FudisValidatorMessage; value?: unknown } | null;
}

export interface FudisValidatorFn extends ValidatorFn {
  (control: AbstractControl): FudisValidationErrors | null;
}

export interface FudisValidatorsDatepickerSettings {
  value: Date;
  message: FudisValidatorMessage;
}

/**
 * Form Control Validators
 */

export const FudisValidators = {
  required,
  email,
  maxLength,
  minLength,
  max,
  min,
  pattern,
  datepickerMin,
  datepickerMax,
};

/**
 * Fudis version of Validators.required
 */
function required(message: FudisValidatorMessage): FudisValidatorFn {
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
function email(message: FudisValidatorMessage): FudisValidatorFn {
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
function maxLength(length: number, message: FudisValidatorMessage): FudisValidatorFn {
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
function minLength(length: number, message: FudisValidatorMessage): FudisValidatorFn {
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
function min(minValue: number, message: FudisValidatorMessage): FudisValidatorFn {
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
function max(maxValue: number, message: FudisValidatorMessage): FudisValidatorFn {
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
function pattern(regex: string | RegExp, message: FudisValidatorMessage): FudisValidatorFn {
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

/**
 * Min date validator for Datepicker
 */
function datepickerMin(settings: FudisValidatorsDatepickerSettings) {
  return (control: AbstractControl) => {
    const simplifiedMinDate = settings.value.setHours(0, 0, 0, 0);
    const simplifiedControlDate = control.value?.setHours(0, 0, 0, 0);

    if (simplifiedMinDate > simplifiedControlDate) {
      return {
        datepickerMin: {
          value: settings.value,
          message: settings.message,
        },
      };
    }

    return null;
  };
}

/**
 * Max date validator for Datepicker
 */
function datepickerMax(settings: FudisValidatorsDatepickerSettings) {
  return (control: AbstractControl) => {
    const simplifiedMaxDate = settings.value.setHours(0, 0, 0, 0);
    const simplifiedControlDate = control.value?.setHours(0, 0, 0, 0);

    if (simplifiedMaxDate < simplifiedControlDate) {
      return {
        datepickerMax: {
          value: settings.value,
          message: settings.message,
        },
      };
    }

    return null;
  };
}
