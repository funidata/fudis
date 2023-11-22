import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { TextInputComponent } from './text-input.component';
import { FudisFormErrors } from '../../../types/forms';
import readme from './readme.mdx';
import { FudisFormControlValidators } from '../../../utilities/form/validators';

@Component({
	selector: 'example-text-input-with-form-control',
	template: `
		<form [formGroup]="mainFormGroup">
			<fudis-text-input
				[control]="mainFormGroup.controls['first']"
				[label]="'Basic text input'"
				[helpText]="'I do not have any validators.'" />
			<fudis-text-input
				[control]="mainFormGroup.controls['second']"
				[label]="'Required text input'"
				[tooltip]="'This is a tooltip text'"
				[tooltipPosition]="'right'"
				[tooltipToggle]="false"
				[helpText]="'Please add some content.'" />
			<fudis-text-input
				[control]="mainFormGroup.controls['third']"
				[minLength]="minLength"
				[maxLength]="maxLength"
				[label]="'Email'"
				[errorMsg]="validatorMessages"
				[type]="'email'"
				[helpText]="'This is an example email input with multiple validations.'" />
			<fudis-text-input
				[control]="mainFormGroup.controls['fourth']"
				[label]="'Number input'"
				[minNumber]="minNumber"
				[maxNumber]="maxNumber"
				[tooltip]="'You can choose any number between 1 and 99'"
				[tooltipPosition]="'left'"
				[tooltipToggle]="false"
				[type]="'number'"
				[size]="'sm'"
				[errorMsg]="validatorMessages"></fudis-text-input>
		</form>
	`,
})
class TextInputWithFormControlExampleComponent {
	constructor(private _formBuilder: FormBuilder) {}

	minLength = 5;

	maxLength = 20;

	minNumber = 1;

	maxNumber = 99;

	validatorsForThird = [
		Validators.minLength(this.minLength),
		Validators.maxLength(this.maxLength),
		FudisFormControlValidators.required('This is required field.'),
		Validators.email,
	];

	validatorsForFourth = [
		Validators.min(this.minNumber),
		Validators.max(this.maxNumber),
		FudisFormControlValidators.required('This is required field.'),
	];

	validatorMessages: FudisFormErrors = {
		email: 'Your input is not in email format.',
		minlength: `Too short email. Minimum length is ${this.minLength} and maximum length is ${this.maxLength}.`,
		maxlength: `Too long email. Minimum length is ${this.minLength} and maximum length is ${this.maxLength}.`,
		min: `Given number is not inside the allowed range ${this.minNumber} - ${this.maxNumber}.`,
		max: `Given number is not inside the allowed range ${this.minNumber} - ${this.maxNumber}.`,
	};

	mainFormGroup: FormGroup = this._formBuilder.group({
		first: new FormControl(''),
		second: new FormControl('', FudisFormControlValidators.required('This is required field.')),
		third: new FormControl('', this.validatorsForThird),
		fourth: new FormControl('', this.validatorsForFourth),
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
	control: new FormControl('moi', FudisFormControlValidators.required('This is required field.')),
	helpText: 'Example help text',
};

export const Examples: StoryFn = () => ({
	template: `
		<example-text-input-with-form-control></example-text-input-with-form-control>
	`,
});
