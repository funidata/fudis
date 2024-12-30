import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

/**
 * All of these functions are used to check if component's control has different validators.
 * The return value of these functions is usually assigned for internal variable to sort out wanted logic.
 */
/**
 * All of these functions are used to check if component's control has different validators.
 * The return value of these functions is usually assigned for internal variable to sort out wanted logic.
 */
export const FudisValidatorUtilities = {
  required,
  oneRequiredOrMin,
  maxLength,
  minLength,
  max,
  min,
  minDate,
  maxDate,
};

/**
 *
 * @param control
 * @returns if provided FormControl has 'required' validator
 */
function required(control: AbstractControl): boolean {
  const nativeRequired = control.hasValidator(Validators.required);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fudisRequired = !!control.validator?.('' as any as AbstractControl);

  if (nativeRequired || fudisRequired) {
    return true;
  }
  return false;
}

/**
 *
 * @param group FormGroup
 * @returns if provided FormGroup has oneRequired or min validator
 */
function oneRequiredOrMin(group: FormGroup): boolean {
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

  const hasProperErrors: boolean = !!(errors?.['oneRequired'] || errors?.['min'].value > 0);

  return hasProperErrors;
}
/**
 *
 * @param control
 * @returns if provided FormControl has max length value binded to its validators
 */
function maxLength(control: AbstractControl): number | null {
  const validatorFn = control.validator;

  if (validatorFn === null) {
    return null;
  }

  const errors = validatorFn(new FormControl({ length: Infinity }));

  return errors?.['maxlength']?.requiredLength;
}

/**
 *
 * @param control
 * @returns if provided FormControl has min length value binded to its validators
 */
function minLength(control: AbstractControl): number | null {
  const validatorFn = control.validator;

  if (validatorFn === null) {
    return null;
  }

  const errors = validatorFn(new FormControl({ length: -Infinity }));

  return errors?.['minlength']?.requiredLength;
}

/**
 *
 * @param control
 * @returns if provided FormControl has max value binded to its validators
 */
function max(control: AbstractControl): number | null {
  const validatorFn = control.validator;

  if (validatorFn === null) {
    return null;
  }

  const errors = validatorFn(new FormControl(Infinity)) ?? {};
  return errors?.['max']?.max;
}

/**
 *
 * @param control
 * @returns if provided FormControl has min value binded to its validators
 */
function min(control: AbstractControl): number | null {
  const validatorFn = control.validator;

  if (validatorFn === null) {
    return null;
  }

  const errors = validatorFn(new FormControl(-Infinity)) ?? {};
  return errors?.['min']?.min;
}

/**
 *
 * @param control
 * @returns if provided FormControl has datepickerMin value binded to its validators
 */
function minDate(control: AbstractControl): Date | undefined {
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
}

/**
 *
 * @param control
 * @returns if provided FormControl has datepickerMax value binded to its validators
 */
function maxDate(control: AbstractControl): Date | undefined {
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
}
