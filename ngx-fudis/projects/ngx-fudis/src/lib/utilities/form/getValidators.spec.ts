import { FormControl, FormGroup, Validators } from '@angular/forms';

import { FudisValidators } from './validators';
import {
  getMaxDateFromValidator,
  getMinDateFromValidator,
  getMaxFromValidator,
  getMaxLengthFromValidator,
  getMinFromValidator,
  getMinLengthFromValidator,
  hasRequiredValidator,
  hasAtLeastOneRequiredOrMinValidator,
} from './getValidators';
import {
  FudisCheckboxGroupFormGroup,
  FudisInputWithLanguageOptionsFormGroup,
} from '../../types/forms';
import { FudisGroupValidators } from './groupValidators';

describe('getValidators utility function', () => {
  describe('hasRequiredValidator', () => {
    it('should return true with Fudis Validators', () => {
      const fudisControl = new FormControl('', FudisValidators.required('This is required'));
      const fudisRequired = hasRequiredValidator(fudisControl);

      expect(fudisRequired).toEqual(true);
    });

    it('should return true with Angular Validators', () => {
      const nativeControl = new FormControl('', Validators.required);
      const nativeRequired = hasRequiredValidator(nativeControl);

      expect(nativeRequired).toEqual(true);
    });
  });

  describe('hasAtLeastOneRequiredOrMinValidator', () => {
    it('should return true with atLeastOneRequired validator group with checkbox group', () => {
      const testFormGroup = new FormGroup<FudisCheckboxGroupFormGroup<object>>(
        {
          apple: new FormControl<boolean | null | undefined>(null),
          fairTradeBanana: new FormControl<boolean | null | undefined>(false),
          pear: new FormControl<boolean | null | undefined>(true),
        },
        [FudisGroupValidators.atLeastOneRequired('No fruit picked! :(')],
      );

      const isRequired = hasAtLeastOneRequiredOrMinValidator(testFormGroup);

      expect(isRequired).toEqual(true);
    });

    it('should return true with atLeastOneRequired validator group with InputWithLanguageOptionsFormGroup', () => {
      const testFormGroup = new FormGroup<FudisInputWithLanguageOptionsFormGroup>(
        {
          finnish: new FormControl<string | null>(null),
          swedish: new FormControl<string | null>(''),
          english: new FormControl<string | null>('Hello there!'),
        },
        [FudisGroupValidators.atLeastOneRequired('One must have some value!')],
      );

      const isRequired = hasAtLeastOneRequiredOrMinValidator(testFormGroup);

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

      const isRequired = hasAtLeastOneRequiredOrMinValidator(testFormGroup);

      expect(isRequired).toEqual(true);
    });

    it('should return false when atLeastOneRequired validator is provided or min validator value is 0', () => {
      const testFormGroup = new FormGroup<FudisCheckboxGroupFormGroup<object>>(
        {
          apple: new FormControl<boolean | null | undefined>(null),
          fairTradeBanana: new FormControl<boolean | null | undefined>(false),
          pear: new FormControl<boolean | null | undefined>(true),
        },
        [FudisGroupValidators.min({ value: 0, message: 'No need to select any actually' })],
      );

      const isRequired = hasAtLeastOneRequiredOrMinValidator(testFormGroup);

      expect(isRequired).toEqual(false);
    });
  });

  describe('getMaxLengthFromValidator', () => {
    const fudisControl = new FormControl('', FudisValidators.maxLength(42, 'You cannot exceed 42'));

    it('should return correct value with Fudis Validator', () => {
      const fudisMaxLength = getMaxLengthFromValidator(fudisControl);

      expect(fudisMaxLength).toEqual(42);
    });

    it('should return correct value with Angular Validators', () => {
      const nativeControl = new FormControl('', Validators.maxLength(42));
      const nativeMaxLength = getMaxLengthFromValidator(nativeControl);

      expect(nativeMaxLength).toEqual(42);
    });
  });

  describe('getMinLengthFromValidator', () => {
    const fudisControl = new FormControl('', FudisValidators.minLength(66, 'Minimum of 66'));

    it('should return correct value with Fudis Validator', () => {
      const fudisMinLength = getMinLengthFromValidator(fudisControl);

      expect(fudisMinLength).toEqual(66);
    });

    it('should return correct value with Angular Validators', () => {
      const nativeControl = new FormControl('', Validators.minLength(66));
      const nativeMinLength = getMinLengthFromValidator(nativeControl);

      expect(nativeMinLength).toEqual(66);
    });
  });

  describe('getMaxFromValidator', () => {
    const fudisControl = new FormControl('', FudisValidators.max(9000, 'Maximum number is 9000'));

    it('should return correct value with Fudis Validator', () => {
      const fudisMax = getMaxFromValidator(fudisControl);

      expect(fudisMax).toEqual(9000);
    });

    it('should return correct value with Angular Validators', () => {
      const nativeControl = new FormControl('', Validators.max(9000));
      const nativeMax = getMaxFromValidator(nativeControl);

      expect(nativeMax).toEqual(9000);
    });
  });

  describe('getMinFromValidator', () => {
    const fudisControl = new FormControl('', FudisValidators.min(5555, 'Minimum number is 5555'));

    it('should return correct value with Fudis Validator', () => {
      const fudisMin = getMinFromValidator(fudisControl);

      expect(fudisMin).toEqual(5555);
    });

    it('should return correct value with Angular Validators', () => {
      const nativeControl = new FormControl('', Validators.min(5555));
      const nativeMin = getMinFromValidator(nativeControl);

      expect(nativeMin).toEqual(5555);
    });
  });

  describe('getMaxDateFromValidator', () => {
    it('should return correct value with YYYY-MM-DD format string date', () => {
      const fudisControl = new FormControl(
        null,
        FudisValidators.datepickerMax({
          value: new Date('2024-01-12'),
          message: 'Trying date as string 12.1.2024',
        }),
      );
      const fudisDate = getMaxDateFromValidator(fudisControl)?.toJSON();

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
      const fudisDate = getMaxDateFromValidator(fudisControl)?.toJSON();

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
      const fudisDate = getMaxDateFromValidator(fudisControl)?.toJSON();

      expect(fudisDate).toEqual('2024-01-12T00:00:00.000Z');
    });
  });

  describe('getMinDateFromValidator', () => {
    it('should return correct value with YYYY-MM-DD format string date', () => {
      const fudisControl = new FormControl(
        null,
        FudisValidators.datepickerMin({
          value: new Date('2024-01-12'),
          message: 'Trying date as string 12.1.2024',
        }),
      );
      const fudisDate = getMinDateFromValidator(fudisControl)?.toJSON();

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
      const fudisDate = getMinDateFromValidator(fudisControl)?.toJSON();

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
      const fudisDate = getMinDateFromValidator(fudisControl)?.toJSON();

      expect(fudisDate).toEqual('2024-01-12T00:00:00.000Z');
    });
  });

  describe('with no validators in control', () => {
    it('should not return true', () => {
      const control = new FormControl('');

      const zeroTrue =
        hasRequiredValidator(control) ||
        getMaxLengthFromValidator(control) ||
        getMinLengthFromValidator(control) ||
        getMaxFromValidator(control) ||
        getMinFromValidator(control) ||
        getMaxDateFromValidator(control) ||
        getMinDateFromValidator(control);

      expect(zeroTrue).toBeUndefined();
    });
  });
});
