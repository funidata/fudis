import { FormControl, FormGroup, Validators } from '@angular/forms';

import { FudisValidators } from './validators';
import { FudisValidatorUtilities } from './validator-utilities';
import { FudisCheckboxGroupFormGroup, FudisLocalizedTextGroup } from '../../types/forms';
import { FudisGroupValidators } from './groupValidators';

describe('getValidators utility function', () => {
  describe('FudisValidatorUtilities.required', () => {
    it('should return true with Fudis Validators', () => {
      const fudisControl = new FormControl('', FudisValidators.required('This is required'));
      const fudisRequired = FudisValidatorUtilities.required(fudisControl);

      expect(fudisRequired).toEqual(true);
    });

    it('should return true with Angular Validators', () => {
      const nativeControl = new FormControl('', Validators.required);
      const nativeRequired = FudisValidatorUtilities.required(nativeControl);

      expect(nativeRequired).toEqual(true);
    });
  });

  describe('oneRequiredOrMin', () => {
    it('should return true with oneRequired validator group with checkbox group', () => {
      const testFormGroup = new FormGroup<FudisCheckboxGroupFormGroup<object>>(
        {
          apple: new FormControl<boolean | null | undefined>(null),
          fairTradeBanana: new FormControl<boolean | null | undefined>(false),
          pear: new FormControl<boolean | null | undefined>(true),
        },
        [FudisGroupValidators.oneRequired('No fruit picked! :(')],
      );

      const isRequired = FudisValidatorUtilities.oneRequiredOrMin(testFormGroup);

      expect(isRequired).toEqual(true);
    });

    it('should return true with oneRequired validator group with LocalizedTextGroup', () => {
      const testFormGroup = new FormGroup<FudisLocalizedTextGroup<object>>(
        {
          fi: new FormControl<string | null>(null),
          sv: new FormControl<string | null>(''),
          en: new FormControl<string | null>('Hello there!'),
        },
        [FudisGroupValidators.oneRequired('One must have some value!')],
      );

      const isRequired = FudisValidatorUtilities.oneRequiredOrMin(testFormGroup);

      expect(isRequired).toEqual(true);
    });

    it('should return true with min validator group ', () => {
      const testFormGroup = new FormGroup<FudisCheckboxGroupFormGroup<object>>(
        {
          apple: new FormControl<boolean | null | undefined>(null),
          fairTradeBanana: new FormControl<boolean | null | undefined>(false),
          pear: new FormControl<boolean | null | undefined>(true),
        },
        [FudisGroupValidators.min({ value: 1, message: 'Pick one!' })],
      );

      const isRequired = FudisValidatorUtilities.oneRequiredOrMin(testFormGroup);

      expect(isRequired).toEqual(true);
    });

    it('should return false when oneRequired validator is provided or min validator value is 0', () => {
      const testFormGroup = new FormGroup<FudisCheckboxGroupFormGroup<object>>(
        {
          apple: new FormControl<boolean | null | undefined>(null),
          fairTradeBanana: new FormControl<boolean | null | undefined>(false),
          pear: new FormControl<boolean | null | undefined>(true),
        },
        [FudisGroupValidators.min({ value: 0, message: 'No need to select any actually' })],
      );

      const isRequired = FudisValidatorUtilities.oneRequiredOrMin(testFormGroup);

      expect(isRequired).toEqual(false);
    });
  });

  describe('getmaxLength', () => {
    const fudisControl = new FormControl('', FudisValidators.maxLength(42, 'You cannot exceed 42'));

    it('should return correct value with Fudis Validator', () => {
      const fudisMaxLength = FudisValidatorUtilities.maxLength(fudisControl);

      expect(fudisMaxLength).toEqual(42);
    });

    it('should return correct value with Angular Validators', () => {
      const nativeControl = new FormControl('', Validators.maxLength(42));
      const nativeMaxLength = FudisValidatorUtilities.maxLength(nativeControl);

      expect(nativeMaxLength).toEqual(42);
    });
  });

  describe('getminLength', () => {
    const fudisControl = new FormControl('', FudisValidators.minLength(66, 'Minimum of 66'));

    it('should return correct value with Fudis Validator', () => {
      const fudisMinLength = FudisValidatorUtilities.minLength(fudisControl);

      expect(fudisMinLength).toEqual(66);
    });

    it('should return correct value with Angular Validators', () => {
      const nativeControl = new FormControl('', Validators.minLength(66));
      const nativeMinLength = FudisValidatorUtilities.minLength(nativeControl);

      expect(nativeMinLength).toEqual(66);
    });
  });

  describe('getmax', () => {
    const fudisControl = new FormControl('', FudisValidators.max(9000, 'Maximum number is 9000'));

    it('should return correct value with Fudis Validator', () => {
      const fudisMax = FudisValidatorUtilities.max(fudisControl);

      expect(fudisMax).toEqual(9000);
    });

    it('should return correct value with Angular Validators', () => {
      const nativeControl = new FormControl('', Validators.max(9000));
      const nativeMax = FudisValidatorUtilities.max(nativeControl);

      expect(nativeMax).toEqual(9000);
    });
  });

  describe('getmin', () => {
    const fudisControl = new FormControl('', FudisValidators.min(5555, 'Minimum number is 5555'));

    it('should return correct value with Fudis Validator', () => {
      const fudisMin = FudisValidatorUtilities.min(fudisControl);

      expect(fudisMin).toEqual(5555);
    });

    it('should return correct value with Angular Validators', () => {
      const nativeControl = new FormControl('', Validators.min(5555));
      const nativeMin = FudisValidatorUtilities.min(nativeControl);

      expect(nativeMin).toEqual(5555);
    });
  });

  describe('getmaxDate', () => {
    it('should return correct value with YYYY-MM-DD format string date', () => {
      const fudisControl = new FormControl(
        null,
        FudisValidators.datepickerMax({
          value: new Date('2024-01-12'),
          message: 'Trying date as string 12.1.2024',
        }),
      );
      const fudisDate = FudisValidatorUtilities.maxDate(fudisControl)?.toJSON();

      expect(fudisDate).toEqual('2024-01-12T00:00:00.000Z');
    });

    it('should return correct value with YYYY-M-D format string date', () => {
      const fudisControl = new FormControl(
        null,
        FudisValidators.datepickerMax({
          value: new Date('2024-1-2'),
          message: 'Trying date as string 2.1.2024',
        }),
      );
      const fudisDate = FudisValidatorUtilities.maxDate(fudisControl)?.toJSON();

      expect(fudisDate).toEqual('2024-01-02T00:00:00.000Z');
    });

    it('should return correct value with standard date', () => {
      const fudisControl = new FormControl(
        null,
        FudisValidators.datepickerMax({
          value: new Date(2024, 0, 12),
          message: 'Trying date as string 12.1.2024',
        }),
      );
      const fudisDate = FudisValidatorUtilities.maxDate(fudisControl)?.toJSON();

      expect(fudisDate).toEqual('2024-01-12T00:00:00.000Z');
    });
  });

  describe('getminDate', () => {
    it('should return correct value with YYYY-MM-DD format string date', () => {
      const fudisControl = new FormControl(
        null,
        FudisValidators.datepickerMin({
          value: new Date('2024-01-12'),
          message: 'Trying date as string 12.1.2024',
        }),
      );
      const fudisDate = FudisValidatorUtilities.minDate(fudisControl)?.toJSON();

      expect(fudisDate).toEqual('2024-01-12T00:00:00.000Z');
    });

    it('should return correct value with YYYY-M-D format string date', () => {
      const fudisControl = new FormControl(
        null,
        FudisValidators.datepickerMin({
          value: new Date('2024-1-2'),
          message: 'Trying date as string 2.1.2024',
        }),
      );
      const fudisDate = FudisValidatorUtilities.minDate(fudisControl)?.toJSON();

      expect(fudisDate).toEqual('2024-01-02T00:00:00.000Z');
    });

    it('should return correct value with standard date', () => {
      const fudisControl = new FormControl(
        null,
        FudisValidators.datepickerMin({
          value: new Date(2024, 0, 12),
          message: 'Trying date as string 12.1.2024',
        }),
      );
      const fudisDate = FudisValidatorUtilities.minDate(fudisControl)?.toJSON();

      expect(fudisDate).toEqual('2024-01-12T00:00:00.000Z');
    });
  });

  describe('with no validators in control', () => {
    it('should not return true', () => {
      const control = new FormControl('');

      const zeroTrue =
        FudisValidatorUtilities.required(control) ||
        FudisValidatorUtilities.maxLength(control) ||
        FudisValidatorUtilities.minLength(control) ||
        FudisValidatorUtilities.max(control) ||
        FudisValidatorUtilities.min(control) ||
        FudisValidatorUtilities.maxDate(control) ||
        FudisValidatorUtilities.minDate(control);

      expect(zeroTrue).toBeUndefined();
    });
  });
});
