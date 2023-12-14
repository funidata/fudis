import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { ErrorMessageComponent } from './error-message.component';
import { FudisValidators } from '../../../../utilities/form/validators';
import readme from './readme.mdx';

@Component({
	selector: 'example-text-input-with-error-message',
	template: ` <form [formGroup]="mainFormGroup">
		<fudis-text-input [control]="mainFormGroup.controls['required']" [label]="'Required text input'">
			<fudis-error-message
				*ngIf="mainFormGroup.controls['required'].touched"
				[message]="'This is a custom error message that has been added with content projection'"
				[visible]="mainFormGroup.controls['required'].touched" />
		</fudis-text-input>
	</form>`,
})
class TextInputWithErrorMessageComponent {
	constructor(private _formBuilder: FormBuilder) {}

	mainFormGroup: FormGroup = this._formBuilder.group({
		required: new FormControl('', FudisValidators.required('This is a regular error message')),
	});
}

export default {
	title: 'Components/Form/Error Message',
	component: ErrorMessageComponent,
	decorators: [
		moduleMetadata({
			declarations: [TextInputWithErrorMessageComponent],
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

export const ErrorMessageExample: StoryFn = () => ({
	template: `
	<example-text-input-with-error-message></example-text-input-with-error-message>
	`,
});
