import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { TextInputComponent } from './text-input.component';

import readme from './readme.mdx';
import { FudisValidators } from '../../../utilities/form/validators';

@Component({
	selector: 'example-text-input-with-form-control',
	template: `
		<form [formGroup]="mainFormGroup">
			<fudis-text-input
				[control]="mainFormGroup.controls['basic']"
				[label]="'Basic text input'"
				[helpText]="'I do not have any validators.'" />
			<fudis-text-input
				[control]="mainFormGroup.controls['required']"
				[label]="'Required text input'"
				[tooltip]="'This is a tooltip text'"
				[tooltipPosition]="'right'"
				[tooltipToggle]="false"
				[helpText]="'Please add some content.'">
				<fudis-error-message
					[message]="'Backend threw an error, it is not totally fault of this component'"
					[visible]="true" />
			</fudis-text-input>
			<fudis-text-input
				[control]="mainFormGroup.controls['email']"
				[label]="'Email'"
				[type]="'email'"
				[helpText]="'This is an example email input with multiple validations.'" />
			<fudis-text-input
				[control]="mainFormGroup.controls['pattern']"
				[label]="'Pattern'"
				[helpText]="'Do not use low case letters!'" />
			<fudis-text-input
				[control]="mainFormGroup.controls['number']"
				[label]="'Number input'"
				[tooltip]="'You can choose any number between 1 and 5'"
				[tooltipPosition]="'left'"
				[tooltipToggle]="false"
				[type]="'number'"
				[size]="'sm'" />
		</form>
	`,
})
class TextInputWithFormControlExampleComponent {
	constructor(private _formBuilder: FormBuilder) {}

	minLength = 5;

	maxLength = 20;

	minNumber = 1;

	maxNumber = 5;

	validatorsForEmail = [
		FudisValidators.minLength(
			this.minLength,
			`Too short email. Minimum length is ${this.minLength} and maximum length is ${this.maxLength}.`
		),
		FudisValidators.maxLength(this.maxLength, `Too long email.`),
	];

	validatorsForNumber = [
		Validators.min(1),
		FudisValidators.max(
			this.maxNumber,
			`Given number is not inside the allowed range ${this.minNumber} - ${this.maxNumber}.`
		),
		FudisValidators.required('This is required field.'),
	];

	mainFormGroup: FormGroup = this._formBuilder.group({
		basic: new FormControl(''),
		required: new FormControl('', FudisValidators.required('This is required field.')),
		email: new FormControl('', this.validatorsForEmail),
		number: new FormControl('', this.validatorsForNumber),
		pattern: new FormControl(null, FudisValidators.pattern(/^[A-Z \d\W]+$/, 'YOU USED LOW CAPS! SHAME ON YOU!')),
	});
}

export default {
	title: 'Components/Form/Text Input',
	component: TextInputComponent,
	decorators: [
		moduleMetadata({
			declarations: [TextInputWithFormControlExampleComponent],
			imports: [ReactiveFormsModule, FormsModule],
		}),
	],
	parameters: {
		docs: {
			page: readme,
		},
		controls: {
			exclude: [
				'classes',
				'_id',
				'_required',
				'_requiredText',
				'_translations',
				'onBlur',
				'handleBlur',
				'ngOnChanges',
				'ngOnInit',
				'ariaLabel',
				'disabled',
				'id',
				'errorMsg',
				'invalidState',
			],
		},
	},
	argTypes: {},
} as Meta;

const Template: StoryFn<TextInputComponent> = (args: TextInputComponent) => ({
	props: args,
});

export const TextInput = Template.bind({});
TextInput.args = {
	label: 'Text-input label example',
	control: new FormControl('', FudisValidators.required('This is required field.')),
	helpText: 'Example help text',
};

export const Examples: StoryFn = () => ({
	template: `
		<example-text-input-with-form-control></example-text-input-with-form-control>
	`,
});
