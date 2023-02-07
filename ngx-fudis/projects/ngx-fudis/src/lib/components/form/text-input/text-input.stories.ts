import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import {
	FormsModule,
	ReactiveFormsModule,
	UntypedFormBuilder,
	UntypedFormControl,
	UntypedFormGroup,
	Validators,
} from '@angular/forms';
import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TextInputComponent } from './text-input.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { IFudisErrorMessages } from '../../../types/forms';

@Component({
	selector: 'example-text-input-with-form-control',
	template: `
		<form [formGroup]="mainFormGroup">
			<fudis-text-input
				[control]="firstTextInputControl"
				id="unique-text-input-id-1"
				requiredText="Required"
				[errorMsg]="{ required: 'Missing a value.' }"
				label="I am a required text input"
				helpText="Please add some values here above!"></fudis-text-input>
			<fudis-text-input
				[control]="secondTextInputControl"
				requiredText="Required"
				[minLength]="minLength"
				[maxLength]="maxLength"
				id="unique-text-input-id-2"
				label="Email"
				[errorMsg]="validatorMessages"
				type="email"
				helpText="This is an example email input with multiple validations."></fudis-text-input>
			<fudis-text-input
				[control]="thirdTextInputControl"
				id="unique-text-input-id-3"
				label="Number input"
				requiredText="Required"
				[min]="minNumber"
				[max]="maxNumber"
				type="number"
				size="s"
				[errorMsg]="validatorMessages"></fudis-text-input>
		</form>
	`,
})
class TextInputWithFormControlExampleComponent {
	minLength = 5;

	maxLength = 20;

	minNumber = 1;

	maxNumber = 99;

	validatorsForSecondTextInput = [
		Validators.minLength(this.minLength),
		Validators.maxLength(this.maxLength),
		Validators.required,
		Validators.email,
	];

	validatorsForThirdTextInput = [Validators.min(this.minNumber), Validators.max(this.maxNumber), Validators.required];

	/**
	 * Options for testing purposes
	 */

	validatorMessages: IFudisErrorMessages = {
		required: 'This is required field.',
		email: 'Your input is not in email format.',
		minlength: `Too short email. Minimum length is ${this.minLength} and maximum length is ${this.maxLength}.`,
		maxlength: `Too long email. Minimum length is ${this.minLength} and maximum length is ${this.maxLength}.`,
		min: `Given number is not inside the allowed range ${this.minNumber} - ${this.maxNumber}.`,
		max: `Given number is not inside the allowed range ${this.minNumber} - ${this.maxNumber}.`,
	};

	firstTextInputControl: UntypedFormControl = new UntypedFormControl('', [Validators.required]);

	secondTextInputControl: UntypedFormControl = new UntypedFormControl('', this.validatorsForSecondTextInput);

	thirdTextInputControl: UntypedFormControl = new UntypedFormControl('', this.validatorsForThirdTextInput);

	mainFormGroup: UntypedFormGroup = this.formBuilder.group({
		firstTextInputControl: this.firstTextInputControl,
		secondTextInputControl: this.secondTextInputControl,
	});

	constructor(private formBuilder: UntypedFormBuilder) {}
}

export default {
	title: 'Components/Form/Text Input',
	component: TextInputComponent,
	decorators: [
		moduleMetadata({
			imports: [BrowserAnimationsModule, ReactiveFormsModule, FormsModule],
			declarations: [ErrorMessageComponent, TextInputWithFormControlExampleComponent],
		}),
	],
	argTypes: {},
	parameters: {
		controls: {
			exclude: ['control'],
		},
	},
} as Meta;

export const TextInput: Story = () => ({
	template: `
		<example-text-input-with-form-control></example-text-input-with-form-control>
	`,
});
