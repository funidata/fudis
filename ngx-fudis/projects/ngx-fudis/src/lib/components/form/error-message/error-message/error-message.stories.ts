import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';
import { FormControl, ReactiveFormsModule, FormsModule, FormControlOptions } from '@angular/forms';
import { Component } from '@angular/core';
import { ErrorMessageComponent } from './error-message.component';
import readme from './readme.mdx';

@Component({
	selector: 'example-text-input-with-error-message',
	template: `
		<fudis-text-input [control]="control" [label]="'Required text input'">
			<fudis-error-message
				*ngIf="_errorExists"
				[message]="'This is a custom error message that has been added with content projection'" />
		</fudis-text-input>
		<fudis-button (click)="toggleCustomError()" [label]="'Toggle custom error'" />
	`,
})
class TextInputWithErrorMessageComponent {
	constructor() {
		this.control = new FormControl('');
	}

	customErrorExists: FormControlOptions;

	control: FormControl<string | null>;

	protected _errorExists: boolean = true;

	toggleCustomError(): void {
		// this._errorExists = !this._errorExists;

		setTimeout(() => {
			console.log(this.control);
		}, 1000);
	}
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
	<example-text-input-with-error-message/>
	`,
});
