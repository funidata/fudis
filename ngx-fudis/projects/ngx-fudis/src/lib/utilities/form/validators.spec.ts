import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { FudisGroupValidators, FudisValidators } from './validators';

describe('Fudis Validators', () => {
	describe('Required Validator', () => {
		const requiredControl = new FormControl('', FudisValidators.required('This is required'));

		it('should return required error if control value is null', () => {
			requiredControl.patchValue(null);

			expect(requiredControl.errors).toEqual({ required: { message: 'This is required' } });
			expect(requiredControl.valid).toBeFalse();
		});

		it('should not return required error if control value is valid', () => {
			requiredControl.patchValue('I am enough!');

			expect(requiredControl.errors).toEqual(null);
			expect(requiredControl.valid).toBeTrue();
		});
	});

	describe('Email Validator', () => {
		const emailControl = new FormControl<string | null>(null, FudisValidators.email('This should be email format'));

		it('should return email error if control value is not email', () => {
			emailControl.patchValue('non-email');

			expect(emailControl.errors).toEqual({ email: { message: 'This should be email format' } });
			expect(emailControl.valid).toBeFalse();
		});

		it('should not return email error if control value is email format', () => {
			emailControl.patchValue('test@validemail.com');

			expect(emailControl.errors).toEqual(null);
			expect(emailControl.valid).toBeTrue();
		});

		it('should not return email error if control value is empty string', () => {
			emailControl.patchValue('');

			expect(emailControl.errors).toEqual(null);
			expect(emailControl.valid).toBeTrue();
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

			expect(maxLenghtControl.valid).toBeFalse();
		});

		it('should not return maxlength error if control value is short enough', () => {
			maxLenghtControl.patchValue('Ok');

			expect(maxLenghtControl.errors).toEqual(null);
			expect(maxLenghtControl.valid).toBeTrue();
		});

		it('should not return maxlength error if control value is null', () => {
			maxLenghtControl.patchValue(null);

			expect(maxLenghtControl.errors).toEqual(null);
			expect(maxLenghtControl.valid).toBeTrue();
		});
	});

	describe('MinLength Validator', () => {
		const minLengthValidator = FudisValidators.minLength(15, 'Text should be at least 15 characters long');
		const minLenghtControl = new FormControl<string | null>(null, minLengthValidator);

		it('should return minlength error if control has minLength validator', () => {
			minLenghtControl.patchValue('Short value');

			expect(minLenghtControl.errors).toEqual({
				minlength: { message: 'Text should be at least 15 characters long', requiredLength: 15 },
			});

			expect(minLenghtControl.valid).toBeFalse();
		});

		it('should not return minlength error if control value is long enough', () => {
			minLenghtControl.patchValue('This is very long text to test as valid content.');

			expect(minLenghtControl.errors).toEqual(null);
			expect(minLenghtControl.valid).toBeTrue();
		});

		it('should not return minlength error if control value is empty', () => {
			minLenghtControl.patchValue('');

			expect(minLenghtControl.errors).toEqual(null);
			expect(minLenghtControl.valid).toBeTrue();
		});
	});

	describe('Min Validator', () => {
		const minValidator = FudisValidators.min(2, 'Chosen value is too small');
		const minControl = new FormControl<string | null>(null, minValidator);

		it('should return min error if control has min validator', () => {
			minControl.patchValue('-10');

			expect(minControl.errors).toEqual({ min: { message: 'Chosen value is too small', min: 2 } });
			expect(minControl.valid).toBeFalse();
		});

		it('should not return min error if control value is big enough', () => {
			minControl.patchValue('3');

			expect(minControl.errors).toEqual(null);
			expect(minControl.valid).toBeTrue();
		});

		it('should not return min error if control value is null', () => {
			minControl.patchValue(null);

			expect(minControl.errors).toEqual(null);
			expect(minControl.valid).toBeTrue();
		});
	});

	describe('Max Validator', () => {
		const maxValidator = FudisValidators.max(99, 'Chosen value is too big');
		const maxControl = new FormControl<string | null>(null, maxValidator);

		it('should return max error if control has max validator', () => {
			maxControl.patchValue('100');

			expect(maxControl.errors).toEqual({ max: { message: 'Chosen value is too big', max: 99 } });
		});

		it('should not return max error if control value is small enough', () => {
			maxControl.patchValue('50');

			expect(maxControl.errors).toEqual(null);
			expect(maxControl.valid).toBeTrue();
		});

		it('should not return max error if control value is null', () => {
			maxControl.patchValue(null);

			expect(maxControl.errors).toEqual(null);
			expect(maxControl.valid).toBeTrue();
		});
	});

	describe('Pattern Validator', () => {
		const patternValidator = FudisValidators.pattern(/[\d]/, 'Text should include at least one digit');
		const patternControl = new FormControl<string | null>(null, patternValidator);

		it('should return pattern error if control has pattern validator', () => {
			patternControl.patchValue('Text without digits');

			expect(patternControl.errors).toEqual({ pattern: { message: 'Text should include at least one digit' } });
		});

		it('should not return pattern error if control value contains wanted pattern', () => {
			patternControl.patchValue('This is text with number 99');

			expect(patternControl.errors).toEqual(null);
			expect(patternControl.valid).toBeTrue();
		});

		it('should not return pattern error if control value is null', () => {
			patternControl.patchValue(null);

			expect(patternControl.errors).toEqual(null);
			expect(patternControl.valid).toBeTrue();
		});
	});

	describe('Fudis Group Validators', () => {
		describe('AtLeastOneRequired Validator', () => {
			let formGroup: FormGroup;
			const translation = new BehaviorSubject<string>('Choose at least one option');

			beforeEach(() => {
				formGroup = new FormGroup(
					{
						strawberry: new FormControl<boolean | null | undefined>(null),
						cloudberry: new FormControl<boolean | null | undefined>(null),
						raspberry: new FormControl<boolean | null | undefined>(null),
					},
					FudisGroupValidators.atLeastOneRequired(translation)
				);
			});

			it('should return atLeastOneRequired error if FormGroup has atLeastOneRequired validator', () => {
				expect(formGroup.errors?.['atLeastOneRequired'].message._value).toEqual(translation.value);
				expect(formGroup.valid).toBeFalse();
			});

			it('should not return atLeastOneRequired error if at least one option is selected', () => {
				formGroup.controls['strawberry'].setValue(true);

				expect(formGroup.errors).toEqual(null);
				expect(formGroup.valid).toBeTrue();
			});
		});

		describe('Min Group Validator', () => {
			let formGroup: FormGroup;
			const translation = new BehaviorSubject<string>('Choose at least two options');
			const settings = { value: 2, message: translation };

			beforeEach(() => {
				formGroup = new FormGroup(
					{
						strawberry: new FormControl<boolean | null | undefined>(true),
						cloudberry: new FormControl<boolean | null | undefined>(null),
						raspberry: new FormControl<boolean | null | undefined>(null),
					},
					FudisGroupValidators.min(settings)
				);
			});

			it('should return min group error if FormGroup has min validator', () => {
				expect(formGroup.errors?.['min'].message._value).toEqual(translation.value);
				expect(formGroup.valid).toBeFalse();
			});

			it('should not return min group error if enough options are selected', () => {
				formGroup.controls['strawberry'].setValue(true);
				formGroup.controls['cloudberry'].setValue(true);

				expect(formGroup.errors).toEqual(null);
				expect(formGroup.valid).toBeTrue();
			});
		});

		describe('Max Group Validator', () => {
			let formGroup: FormGroup;
			const translation = new BehaviorSubject<string>('Too many options selected');
			const settings = { value: 3, message: translation };

			beforeEach(() => {
				formGroup = new FormGroup(
					{
						strawberry: new FormControl<boolean | null | undefined>(true),
						cloudberry: new FormControl<boolean | null | undefined>(true),
						raspberry: new FormControl<boolean | null | undefined>(true),
						blueberry: new FormControl<boolean | null | undefined>(true),
					},
					FudisGroupValidators.max(settings)
				);
			});

			it('should return max group error if FormGroup has max validator', () => {
				expect(formGroup.errors?.['max'].message._value).toEqual(translation.value);
				expect(formGroup.valid).toBeFalse();
			});

			it('should not return max group error if there is not too many options selected', () => {
				formGroup.controls['strawberry'].setValue(false);

				expect(formGroup.errors).toEqual(null);
				expect(formGroup.valid).toBeTrue();
			});
		});
	});
});
