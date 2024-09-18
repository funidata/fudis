import { FormControl, FormGroup } from '@angular/forms';
import { FudisGroupValidators } from './groupValidators';
import { FudisValidators } from './validators';

describe('Fudis Validators', () => {
  describe('Required Validator', () => {
    const requiredControl = new FormControl('', FudisValidators.required('This is required'));

    it('should return required error if control value is null', () => {
      requiredControl.patchValue(null);

      expect(requiredControl.errors).toEqual({ required: { message: 'This is required' } });
      expect(requiredControl.valid).toEqual(false);
    });

    it('should not return required error if control value is valid', () => {
      requiredControl.patchValue('I am enough!');

      expect(requiredControl.errors).toEqual(null);
      expect(requiredControl.valid).toEqual(true);
    });
  });

  describe('Email Validator', () => {
    const emailControl = new FormControl<string | null>(
      null,
      FudisValidators.email('This should be email format'),
    );

    it('should return email error if control value is not email', () => {
      emailControl.patchValue('non-email');

      expect(emailControl.errors).toEqual({ email: { message: 'This should be email format' } });
      expect(emailControl.valid).toEqual(false);
    });

    it('should not return email error if control value is email format', () => {
      emailControl.patchValue('test@validemail.com');

      expect(emailControl.errors).toEqual(null);
      expect(emailControl.valid).toEqual(true);
    });

    it('should not return email error if control value is empty string', () => {
      emailControl.patchValue('');

      expect(emailControl.errors).toEqual(null);
      expect(emailControl.valid).toEqual(true);
    });
  });

  describe('MaxLength Validator', () => {
    const maxLengthValidator = FudisValidators.maxLength(5, 'Text should not exceed 5 characters');
    const maxLenghtControl = new FormControl<string | null>(null, maxLengthValidator);

    it('should return maxlength error if control has maxLength validator', () => {
      maxLenghtControl.patchValue('Too long text');

      expect(maxLenghtControl.errors).toEqual({
        maxlength: { message: 'Text should not exceed 5 characters', requiredLength: 5 },
      });

      expect(maxLenghtControl.valid).toEqual(false);
    });

    it('should not return maxlength error if control value is short enough', () => {
      maxLenghtControl.patchValue('Ok');

      expect(maxLenghtControl.errors).toEqual(null);
      expect(maxLenghtControl.valid).toEqual(true);
    });

    it('should not return maxlength error if control value is null', () => {
      maxLenghtControl.patchValue(null);

      expect(maxLenghtControl.errors).toEqual(null);
      expect(maxLenghtControl.valid).toEqual(true);
    });
  });

  describe('MinLength Validator', () => {
    const minLengthValidator = FudisValidators.minLength(
      15,
      'Text should be at least 15 characters long',
      true,
    );

    const minLengthValidatorNullIgnored = FudisValidators.minLength(
      15,
      'Text should be at least 15 characters long',
      false,
    );

    const minLenghtControl = new FormControl<string | null>(null, minLengthValidator);

    const minLengthNullIgnoredControl = new FormControl<string | null>(
      null,
      minLengthValidatorNullIgnored,
    );

    it('should return minlength error if control has minLength validator', () => {
      minLenghtControl.patchValue('Short value');

      minLengthNullIgnoredControl.patchValue('Short value');

      expect(minLenghtControl.errors).toEqual({
        minlength: { message: 'Text should be at least 15 characters long', requiredLength: 15 },
      });

      expect(minLenghtControl.valid).toEqual(false);

      expect(minLengthNullIgnoredControl.errors).toEqual({
        minlength: { message: 'Text should be at least 15 characters long', requiredLength: 15 },
      });

      expect(minLengthNullIgnoredControl.valid).toEqual(false);
    });

    it('should not return minlength error if control value is long enough', () => {
      minLenghtControl.patchValue('This is very long text to test as valid content.');

      expect(minLenghtControl.errors).toEqual(null);
      expect(minLenghtControl.valid).toEqual(true);

      minLengthNullIgnoredControl.patchValue('This is very long text to test as valid content.');

      expect(minLengthNullIgnoredControl.errors).toEqual(null);
      expect(minLengthNullIgnoredControl.valid).toEqual(true);
    });

    it('should not return minlength error if control value is empty or null', () => {
      minLengthNullIgnoredControl.patchValue('');

      expect(minLengthNullIgnoredControl.errors).toBeNull();
      expect(minLengthNullIgnoredControl.valid).toEqual(true);

      minLengthNullIgnoredControl.patchValue(null);

      expect(minLengthNullIgnoredControl.errors).toBeNull();
      expect(minLengthNullIgnoredControl.valid).toEqual(true);
    });

    it('should return minlength error if control value is empty', () => {
      minLenghtControl.patchValue('');

      expect(minLenghtControl.errors).toEqual({
        minlength: { message: 'Text should be at least 15 characters long', requiredLength: 15 },
      });
      expect(minLenghtControl.valid).toEqual(false);
    });
  });

  describe('Min Validator', () => {
    const minValidator = FudisValidators.min(2, 'Chosen value is too small');
    const minControl = new FormControl<number | null>(null, minValidator);

    it('should return min error if control has min validator', () => {
      minControl.patchValue(-10);

      expect(minControl.errors).toEqual({ min: { message: 'Chosen value is too small', min: 2 } });
      expect(minControl.valid).toEqual(false);
    });

    it('should not return min error if control value is big enough', () => {
      minControl.patchValue(3);

      expect(minControl.errors).toEqual(null);
      expect(minControl.valid).toEqual(true);
    });

    it('should not return min error if control value is null', () => {
      minControl.patchValue(null);

      expect(minControl.errors).toEqual(null);
      expect(minControl.valid).toEqual(true);
    });
  });

  describe('Max Validator', () => {
    const maxValidator = FudisValidators.max(99, 'Chosen value is too big');
    const maxControl = new FormControl<number | null>(null, maxValidator);

    it('should return max error if control has max validator', () => {
      maxControl.patchValue(100);

      expect(maxControl.errors).toEqual({ max: { message: 'Chosen value is too big', max: 99 } });
    });

    it('should not return max error if control value is small enough', () => {
      maxControl.patchValue(50);

      expect(maxControl.errors).toEqual(null);
      expect(maxControl.valid).toEqual(true);
    });

    it('should not return max error if control value is null', () => {
      maxControl.patchValue(null);

      expect(maxControl.errors).toEqual(null);
      expect(maxControl.valid).toEqual(true);
    });
  });

  describe('Pattern Validator', () => {
    const patternValidator = FudisValidators.pattern(
      /[\d]/,
      'Text should include at least one digit',
    );
    const patternControl = new FormControl<string | null>(null, patternValidator);

    it('should return pattern error if control has pattern validator', () => {
      patternControl.patchValue('Text without digits');

      expect(patternControl.errors).toEqual({
        pattern: { message: 'Text should include at least one digit' },
      });
    });

    it('should not return pattern error if control value contains wanted pattern', () => {
      patternControl.patchValue('This is text with number 99');

      expect(patternControl.errors).toEqual(null);
      expect(patternControl.valid).toEqual(true);
    });

    it('should not return pattern error if control value is null', () => {
      patternControl.patchValue(null);

      expect(patternControl.errors).toEqual(null);
      expect(patternControl.valid).toEqual(true);
    });
  });

  describe('Datepicker Min Validator', () => {
    const minDateValidator = FudisValidators.datepickerMin({
      value: new Date(2024, 0, 16),
      message: 'Date cannot be earlier than 16.1.2024',
    });
    const minDateControl = new FormControl<Date | null>(null, minDateValidator);

    it('should return datepickerMin error if control has datepickerMin validator', () => {
      minDateControl.patchValue(new Date(2024, 0, 15));

      expect(minDateControl.errors).toEqual({
        datepickerMin: {
          message: 'Date cannot be earlier than 16.1.2024',
          value: new Date(2024, 0, 16),
        },
      });
    });

    it('should not return datepickerMin error if control value is correct', () => {
      minDateControl.patchValue(new Date(2024, 0, 16));

      expect(minDateControl.errors).toEqual(null);
      expect(minDateControl.valid).toEqual(true);
    });

    it('should not return datepickerMin error if control value is null', () => {
      minDateControl.patchValue(null);

      expect(minDateControl.errors).toEqual(null);
      expect(minDateControl.valid).toEqual(true);
    });
  });

  describe('Datepicker Max Validator', () => {
    const maxDateValidator = FudisValidators.datepickerMax({
      value: new Date(2024, 0, 16),
      message: 'Date cannot be later than 16.1.2024',
    });
    const maxDateControl = new FormControl<Date | null>(null, maxDateValidator);

    it('should return datepickerMax error if control has datepickerMax validator', () => {
      maxDateControl.patchValue(new Date(2024, 0, 17));

      expect(maxDateControl.errors).toEqual({
        datepickerMax: {
          message: 'Date cannot be later than 16.1.2024',
          value: new Date(2024, 0, 16),
        },
      });
    });

    it('should not return datepickerMax error if control value is correct', () => {
      maxDateControl.patchValue(new Date(2024, 0, 16));

      expect(maxDateControl.errors).toEqual(null);
      expect(maxDateControl.valid).toEqual(true);
    });

    it('should not return datepickerMax error if control value is null', () => {
      maxDateControl.patchValue(null);

      expect(maxDateControl.errors).toEqual(null);
      expect(maxDateControl.valid).toEqual(true);
    });
  });

  describe('Fudis Group Validators', () => {
    describe('OneRequired Validator', () => {
      let formGroup: FormGroup;
      const translation = 'Choose at least one option';

      beforeEach(() => {
        formGroup = new FormGroup(
          {
            strawberry: new FormControl<boolean | null | undefined>(null),
            cloudberry: new FormControl<boolean | null | undefined>(null),
            raspberry: new FormControl<boolean | null | undefined>(null),
          },
          FudisGroupValidators.oneRequired('Choose at least one option'),
        );
      });

      it('should return oneRequired error if FormGroup has oneRequired validator', () => {
        expect(formGroup.errors?.['oneRequired']).toEqual({ message: translation });
        expect(formGroup.valid).toEqual(false);
      });

      it('should not return oneRequired error if at least one option is selected', () => {
        formGroup.controls['strawberry'].setValue(true);

        expect(formGroup.errors).toEqual(null);
        expect(formGroup.valid).toEqual(true);
      });
    });

    describe('Min Group Validator', () => {
      let formGroup: FormGroup;

      const settings = { value: 2, message: 'Choose at least two options' };

      beforeEach(() => {
        formGroup = new FormGroup(
          {
            strawberry: new FormControl<boolean | null | undefined>(true),
            cloudberry: new FormControl<boolean | null | undefined>(null),
            raspberry: new FormControl<boolean | null | undefined>(null),
          },
          FudisGroupValidators.min(settings),
        );
      });

      it('should return min group error if FormGroup has min validator', () => {
        expect(formGroup.errors?.['min']).toEqual(settings);
        expect(formGroup.valid).toEqual(false);
      });

      it('should not return min group error if enough options are selected', () => {
        formGroup.controls['strawberry'].setValue(true);
        formGroup.controls['cloudberry'].setValue(true);

        expect(formGroup.errors).toEqual(null);
        expect(formGroup.valid).toEqual(true);
      });
    });

    describe('Max Group Validator', () => {
      let formGroup: FormGroup;

      const settings = { value: 3, message: 'Too many options selected' };

      beforeEach(() => {
        formGroup = new FormGroup(
          {
            strawberry: new FormControl<boolean | null | undefined>(true),
            cloudberry: new FormControl<boolean | null | undefined>(true),
            raspberry: new FormControl<boolean | null | undefined>(true),
            blueberry: new FormControl<boolean | null | undefined>(true),
          },
          FudisGroupValidators.max(settings),
        );
      });

      it('should return max group error if FormGroup has max validator', () => {
        expect(formGroup.errors?.['max']).toEqual(settings);
        expect(formGroup.valid).toEqual(false);
      });

      it('should not return max group error if there is not too many options selected', () => {
        formGroup.controls['strawberry'].setValue(false);

        expect(formGroup.errors).toEqual(null);
        expect(formGroup.valid).toEqual(true);
      });
    });
  });
});
