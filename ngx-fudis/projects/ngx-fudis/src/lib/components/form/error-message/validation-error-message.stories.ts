import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { ValidationErrorMessageComponent } from './validation-error-message.component';
import { FudisValidators } from '../../../utilities/form/validators';
import readme from './readme.mdx';

@Component({
	selector: 'example-text-input-with-error-message',
	template: ` <form [formGroup]="mainFormGroup">
		<fudis-text-input [control]="mainFormGroup.controls['required']" [label]="'Required text input'">
		</fudis-text-input>
	</form>`,
})
class TextInputWithValidationErrorMessageComponent {
	constructor(private _formBuilder: FormBuilder) {}

	mainFormGroup: FormGroup = this._formBuilder.group({
		required: new FormControl('', FudisValidators.required('This is required field.')),
	});
}

export default {
	title: 'Components/Form/Error Messages/Validation Error Message',
	component: ValidationErrorMessageComponent,
	decorators: [
		moduleMetadata({
			declarations: [TextInputWithValidationErrorMessageComponent],
			imports: [ReactiveFormsModule, FormsModule],
		}),
	],
	parameters: {
		docs: {
			page: readme,
		},
		controls: {
			exclude: ['control'],
		},
	},
	argTypes: {},
} as Meta;

export const ValidationErrorMessageExample: StoryFn = () => ({
	template: `
	<example-text-input-with-error-message></example-text-input-with-error-message>
	`,
});
