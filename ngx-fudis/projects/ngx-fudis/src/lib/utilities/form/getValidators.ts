import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

// TODO: Write internal documentation for these functions (individual or univesal description what these do)

export const hasRequiredValidator = (control: AbstractControl): boolean => {
  const nativeRequired = control.hasValidator(Validators.required);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fudisRequired = !!control.validator?.('' as any as AbstractControl);

  if (nativeRequired || fudisRequired) {
    return true;
  }
  return false;
};

export const hasAtLeastOneRequiredOrMinValidator = (group: FormGroup): boolean => {
  const validatorFn = group.validator;

  if (validatorFn === null) {
    return false;
  }

  const errors = validatorFn(
    new FormGroup({
      controlAsNull: new FormControl<boolean | null | undefined>(null),
      controlAsFalse: new FormControl<boolean | null | undefined>(false),
      controlAsEmptyString: new FormControl<string | null | undefined>(''),
    }),
  );

  const hasProperErrors: boolean = !!(errors?.['atLeastOneRequired'] || errors?.['min']);

  return hasProperErrors;
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

  const errors = validatorFn(new FormControl(new Date(1337, 0, 1)));
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

  const errors = validatorFn(new FormControl(new Date(4242, 0, 1)));
  const value = errors?.['datepickerMax']?.value;

  if (value) {
    const timezone = value.getTimezoneOffset() * 60000;

    const returnValue = new Date(value.getTime() - timezone);
    return returnValue;
  }
  return undefined;
};
