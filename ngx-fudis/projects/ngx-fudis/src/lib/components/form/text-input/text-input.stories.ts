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

@Component({
	selector: 'example-text-input-with-form-control',
	template: `
		<form [formGroup]="mainFormGroup">
			<fudis-text-input
				[control]="firstTextInputControl"
				id="unique-text-input-id-1"
				label="Minä olen label, se on selvää!"
				helpText="Mikä minun nimi on? Guidance? Help text?"></fudis-text-input>
			<fudis-text-input
				[control]="secondTextInputControl"
				id="unique-text-input-id-2"
				label="Second input"></fudis-text-input>
		</form>
	`,
})
class TextInputWithFormControlExampleComponent {
	/**
	 * Options for testing purposes
	 */

	firstTextInputControl: UntypedFormControl = new UntypedFormControl('', [Validators.required]);

	secondTextInputControl: UntypedFormControl = new UntypedFormControl('');

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

const Template: Story<TextInputComponent> = (args: TextInputComponent) => ({
	props: args,
});

export const TextInput = Template.bind({});
TextInput.args = {
	label: 'This is the label',
};

export const TextInputWithFormControl: Story = () => ({
	template: `
		<example-text-input-with-form-control></example-text-input-with-form-control>
	`,
});
