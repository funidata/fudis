import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TextInputComponent } from './text-input.component';
import { IFudisErrorMessages } from '../../../types/forms';

@Component({
	selector: 'example-text-input-with-form-control',
	template: `
		<form [formGroup]="mainFormGroup">
			<fudis-text-input
				[control]="mainFormGroup.controls['first']"
				[id]="'unique-text-input-id-1'"
				label="I am a basic text input."
				helpText="I don't have any validators."></fudis-text-input>
			<fudis-text-input
				[control]="mainFormGroup.controls['second']"
				[id]="'unique-text-input-id-2'"
				requiredText="Required"
				[errorMsg]="{ required: 'Missing a value.' }"
				label="I am a required text input"
				helpText="Please add some values here above!"></fudis-text-input>
			<fudis-text-input
				[control]="mainFormGroup.controls['third']"
				requiredText="Required"
				[minLength]="minLength"
				[maxLength]="maxLength"
				[id]="'unique-text-input-id-3'"
				label="Email"
				[errorMsg]="validatorMessages"
				type="email"
				helpText="This is an example email input with multiple validations."></fudis-text-input>
			<fudis-text-input
				[control]="mainFormGroup.controls['fourth']"
				[id]="'unique-text-input-id-4'"
				label="Number input"
				requiredText="Required"
				[minNumber]="minNumber"
				[maxNumber]="maxNumber"
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

	validatorsForThird = [
		Validators.minLength(this.minLength),
		Validators.maxLength(this.maxLength),
		Validators.required,
		Validators.email,
	];

	validatorsForFourth = [Validators.min(this.minNumber), Validators.max(this.maxNumber), Validators.required];

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

	mainFormGroup: FormGroup = this.formBuilder.group({
		first: new FormControl(''),
		second: new FormControl('', Validators.required),
		third: new FormControl('', this.validatorsForThird),
		fourth: new FormControl('', this.validatorsForFourth),
	});

	constructor(private formBuilder: FormBuilder) {}
}

export default {
	title: 'Components/Form/Text Input',
	component: TextInputComponent,
	decorators: [
		moduleMetadata({
			declarations: [TextInputWithFormControlExampleComponent],
			imports: [ReactiveFormsModule, FormsModule, MatTooltipModule],
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
