import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { TextAreaComponent } from './text-area.component';
import { FudisFormErrors } from '../../../types/forms';
import readme from './readme.mdx';

@Component({
	selector: 'example-text-area-with-form-control',
	template: `
		<form [formGroup]="mainFormGroup">
			<fudis-text-area
				[control]="firstTextAreaControl"
				[errorMsg]="{ required: 'Missing a value.' }"
				[label]="'Basic required Text Area'"
				[helpText]="'Add some text to the Text Area.'"
				[tooltip]="'I am here to give you additional guidance'"
				[tooltipPosition]="'right'"
				[tooltipToggle]="false">
			</fudis-text-area>
			<fudis-text-area
				[control]="secondTextAreaControl"
				[minLength]="minLength"
				[maxLength]="maxLength"
				[label]="'Required Text Area with max and min character length'"
				[errorMsg]="validatorMessages"
				[helpText]="'This is an example Text Area with multiple validations.'">
			</fudis-text-area>
		</form>
	`,
})
class TextAreaWithFormControlExampleComponent {
	constructor(private _formBuilder: FormBuilder) {}

	minLength = 5;

	maxLength = 20;

	validatorsForSecondTextInput = [
		Validators.minLength(this.minLength),
		Validators.maxLength(this.maxLength),
		Validators.required,
	];

	validatorMessages: FudisFormErrors = {
		required: 'This is required field.',
		minlength: `Too short input. Minimum length is ${this.minLength} and maximum length is ${this.maxLength}.`,
	};

	firstTextAreaControl: FormControl = new FormControl('', [Validators.required]);

	secondTextAreaControl: FormControl = new FormControl('', this.validatorsForSecondTextInput);

	mainFormGroup: FormGroup = this._formBuilder.group({
		firstTextAreaControl: this.firstTextAreaControl,
		secondTextareaControl: this.secondTextAreaControl,
	});
}

export default {
	title: 'Components/Form/Text Area',
	component: TextAreaComponent,
	decorators: [
		moduleMetadata({
			declarations: [TextAreaWithFormControlExampleComponent],
			imports: [ReactiveFormsModule, FormsModule],
		}),
	],
	parameters: {
		docs: {
			page: readme,
		},
		controls: {
			exclude: [
				'ariaLabel',
				'disabled',
				'id',
				'_id',
				'_required',
				'_requiredText',
				'_translations',
				'ngOnChanges',
				'ngOnInit',
				'onBlur',
				'handleBlur',
			],
		},
	},
	argTypes: {},
} as Meta;

const Template: StoryFn<TextAreaComponent> = (args: TextAreaComponent) => ({
	props: args,
});

export const TextArea = Template.bind({});
TextArea.args = {
	label: 'Text Area label example',
	control: new FormControl(''),
	helpText: 'Example help text',
};

export const Examples: StoryFn = () => ({
	template: `
		<example-text-area-with-form-control></example-text-area-with-form-control>
	`,
});
