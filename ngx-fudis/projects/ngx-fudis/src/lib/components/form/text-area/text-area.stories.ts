import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { TextAreaComponent } from './text-area.component';
import { IFudisErrorMessages } from '../../../types/forms';

@Component({
	selector: 'example-text-area-with-form-control',
	template: `
		<form [formGroup]="mainFormGroup">
			<fudis-text-area
				[control]="firstTextAreaControl"
				[id]="'unique-text-area-id-1'"
				requiredText="Required"
				[errorMsg]="{ required: 'Missing a value.' }"
				label="I am a required text input"
				helpText="Please add some values here above!"
				[tooltip]="'I am here to give you guidance'"
				[tooltipPosition]="'right'"
				[tooltipToggle]="false"></fudis-text-area>
			<fudis-text-area
				[control]="secondTextAreaControl"
				requiredText="Required"
				[minLength]="minLength"
				[maxLength]="maxLength"
				[id]="'unique-text-area-id-2'"
				[label]="'This is pretty long label to demonstrate how it aligns with other content surrounded around it.'"
				[errorMsg]="validatorMessages"
				helpText="This is an example text area with multiple validations. Actually this help text is also pretty long to demonstrate how for example character count is visible."></fudis-text-area>
		</form>
	`,
})
class TextAreaWithFormControlExampleComponent {
	minLength = 5;

	maxLength = 20;

	validatorsForSecondTextInput = [
		Validators.minLength(this.minLength),
		Validators.maxLength(this.maxLength),
		Validators.required,
	];
	/**
	 * Options for testing purposes
	 */

	validatorMessages: IFudisErrorMessages = {
		required: 'This is required field.',
		minlength: `Too short input. Minimum length is ${this.minLength} and maximum length is ${this.maxLength}.`,
		maxlength: `Too long input. Minimum length is ${this.minLength} and maximum length is ${this.maxLength}.`,
	};

	firstTextAreaControl: FormControl = new FormControl('', [Validators.required]);

	secondTextAreaControl: FormControl = new FormControl('', this.validatorsForSecondTextInput);

	mainFormGroup: FormGroup = this.formBuilder.group({
		firstTextAreaControl: this.firstTextAreaControl,
		secondTextareaControl: this.secondTextAreaControl,
	});

	constructor(private formBuilder: FormBuilder) {}
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
	argTypes: {},
} as Meta;

const Template: Story<TextAreaComponent> = (args: TextAreaComponent) => ({
	props: args,
});

export const TextArea = Template.bind({});
TextArea.args = {
	label: 'This is the label',
	control: new FormControl(''),
	id: 'example-id-for-text-input',
	helpText: 'Example help text',
};

export const WithMultipleTextArea: Story = () => ({
	template: `
		<example-text-area-with-form-control></example-text-area-with-form-control>
	`,
});
