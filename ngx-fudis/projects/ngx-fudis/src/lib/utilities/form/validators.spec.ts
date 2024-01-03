import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { FudisGroupValidators, FudisValidators } from './validators';

describe('Fudis Validators', () => {
	describe('Required Validator', () => {
		const requiredControl = new FormControl('', FudisValidators.required('This is required'));

		it('should return required message if control value is invalid', () => {
			requiredControl.patchValue(null);

			expect(requiredControl.errors).toEqual({ required: { message: 'This is required' } });
			expect(requiredControl.valid).toBeFalse();
		});

		it('should not return required message if control value is valid', () => {
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

		it('should not return email message if control has email property', () => {
			emailControl.patchValue('test@validemail.com');

			expect(emailControl.errors).toEqual(null);
			expect(emailControl.valid).toBeTrue();
		});

		it('should not return email message if control value is empty string', () => {
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

		it('should return minLength error if control has minlength validator', () => {
			minLenghtControl.patchValue('Short value');

			expect(minLenghtControl.errors).toEqual({
				minlength: { message: 'Text should be at least 15 characters long', requiredLength: 15 },
			});

			expect(minLenghtControl.valid).toBeFalse();
		});

		it('should not return minLength error if control value is long enough', () => {
			minLenghtControl.patchValue('This is very long text to test as valid content.');

			expect(minLenghtControl.errors).toEqual(null);

			expect(minLenghtControl.valid).toBeTrue();
		});

		it('should not return minLength error if control value is empty', () => {
			minLenghtControl.patchValue('');

			expect(minLenghtControl.errors).toEqual(null);

			expect(minLenghtControl.valid).toBeTrue();
		});
	});

	describe('Min Validator', () => {
		const minValidator = FudisValidators.min(2, 'Chosen value is too small');
		const minControl = new FormControl('-10');

		it('should return min message if control has min property', () => {
			expect(minValidator(minControl)).toEqual(
				jasmine.objectContaining({
					min: { message: 'Chosen value is too small', min: 2 },
				})
			);
		});
	});

	describe('Max Validator', () => {
		const maxValidator = FudisValidators.max(99, 'Chosen value is too big');
		const maxControl = new FormControl('100');

		it('should return max message if control has max property', () => {
			expect(maxValidator(maxControl)).toEqual(
				jasmine.objectContaining({
					max: { message: 'Chosen value is too big', max: 99 },
				})
			);
		});
	});

	describe('Pattern Validator', () => {
		const patternValidator = FudisValidators.pattern(/[\d]/, 'Text should include at least one digit');
		const patternControl = new FormControl('Text without digits');

		it('should return pattern message if control has pattern property', () => {
			expect(patternValidator(patternControl)).toEqual(
				jasmine.objectContaining({
					pattern: { message: 'Text should include at least one digit' },
				})
			);
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

			it('should return atLeastOneRequired message if FormGroup controls have atLeastOneRequired property', () => {
				formGroup.markAllAsTouched();

				expect(formGroup.errors?.['atLeastOneRequired'].message._value).toEqual(translation.value);
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

			it('should return min group message if FormGroup controls have min property', () => {
				formGroup.markAllAsTouched();

				expect(formGroup.errors?.['min'].message._value).toEqual(translation.value);
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

			it('should return max group message if FormGroup controls have max property', () => {
				formGroup.markAllAsTouched();

				expect(formGroup.errors?.['max'].message._value).toEqual(translation.value);
			});
		});
	});
});
