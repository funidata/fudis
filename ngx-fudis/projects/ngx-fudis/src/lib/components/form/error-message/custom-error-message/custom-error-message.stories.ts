import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { CustomErrorMessageComponent } from './custom-error-message.component';
import { FudisValidators } from '../../../../utilities/form/validators';
import readme from './readme.mdx';

@Component({
	selector: 'example-text-input-with-custom-error-message',
	template: ` <form [formGroup]="mainFormGroup">
		<fudis-text-input [control]="mainFormGroup.controls['required']" [label]="'Required text input'">
			<fudis-custom-error-message
				[message]="'This is a custom error message that has been added with content projection'"
				[type]="'required'"
				[visible]="true" />
		</fudis-text-input>
	</form>`,
})
class TextInputWithCustomErrorMessageComponent {
	constructor(private _formBuilder: FormBuilder) {}

	mainFormGroup: FormGroup = this._formBuilder.group({
		required: new FormControl('', FudisValidators.required('This is a regular error message')),
	});
}

export default {
	title: 'Components/Form/Error Messages/Custom Error Message',
	component: CustomErrorMessageComponent,
	decorators: [
		moduleMetadata({
			declarations: [TextInputWithCustomErrorMessageComponent],
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

export const CustomErrorMessageExample: StoryFn = () => ({
	template: `
	<example-text-input-with-custom-error-message></example-text-input-with-custom-error-message>
	`,
});
