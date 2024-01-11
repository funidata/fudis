import { AbstractControl, FormControl, Validators } from '@angular/forms';

export const hasRequiredValidator = (control: AbstractControl): boolean => {
  const nativeRequired = control.hasValidator(Validators.required);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export const getMinDateFromValidator = (control: AbstractControl): Date | undefined => {
  const validatorFn = control.validator;

  if (validatorFn === null) {
    return undefined;
  }

  const errors = validatorFn(new FormControl(new Date('1337-01-01')));
  const value = errors?.['datepickerMin']?.value;

  if (value) {
    const timezone = value.getTimezoneOffset() * 60000;

    const returnValue = new Date(value.getTime() - timezone);
    return returnValue;
  }
  return undefined;
};

export const getMaxDateFromValidator = (control: AbstractControl): Date | undefined => {
  const validatorFn = control.validator;

  if (validatorFn === null) {
    return undefined;
  }

  const errors = validatorFn(new FormControl(new Date('4242-01-01')));
  const value = errors?.['datepickerMax']?.value;

  if (value) {
    const timezone = value.getTimezoneOffset() * 60000;

    const returnValue = new Date(value.getTime() - timezone);
    return returnValue;
  }
  return undefined;
};
