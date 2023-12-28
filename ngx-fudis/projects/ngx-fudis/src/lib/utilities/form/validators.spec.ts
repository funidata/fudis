import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { FudisGroupValidators, FudisValidators } from './validators';

describe('Fudis Validators', () => {
	describe('Required Validator', () => {
		const requiredValidator = FudisValidators.required('This is required');
		const requiredControl = new FormControl('');
		requiredControl.markAsTouched();

		it('should return required message if control has required property', () => {
			expect(requiredValidator(requiredControl)).toEqual({ required: { message: 'This is required' } });
		});
	});

	describe('Email Validator', () => {
		const emailValidator = FudisValidators.email('This should be email format');
		const emailControl = new FormControl('invalidemailformat');

		it('should return email message if control has email property', () => {
			expect(emailValidator(emailControl)).toEqual({ email: { message: 'This should be email format' } });
		});
	});

	describe('MaxLength Validator', () => {
		const maxLengthValidator = FudisValidators.maxLength(5, 'Text should not exceed 5 characters');
		const maxLenghtControl = new FormControl('Too long text');

		it('should return maxLength message if control has maxlength property', () => {
			expect(maxLengthValidator(maxLenghtControl)).toEqual(
				jasmine.objectContaining({
					maxlength: { message: 'Text should not exceed 5 characters', requiredLength: 5 },
				})
			);
		});
	});

	describe('MinLength Validator', () => {
		const minLengthValidator = FudisValidators.minLength(15, 'Text should be at least 15 characters long');
		const minLenghtControl = new FormControl('Short text');

		it('should return minLength message if control has minlength property', () => {
			expect(minLengthValidator(minLenghtControl)).toEqual(
				jasmine.objectContaining({
					minlength: { message: 'Text should be at least 15 characters long', requiredLength: 15 },
				})
			);
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
