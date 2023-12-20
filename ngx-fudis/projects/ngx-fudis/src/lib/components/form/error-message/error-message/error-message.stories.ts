import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';
import { FormControl, ReactiveFormsModule, FormsModule, FormControlOptions } from '@angular/forms';
import { Component } from '@angular/core';

import { BehaviorSubject, Subject } from 'rxjs';
import { ErrorMessageComponent } from './error-message.component';
import readme from './readme.mdx';
import { FudisValidators } from '../../../../utilities/form/validators';

@Component({
	selector: 'example-text-input-with-error-message',
	template: `
		<fudis-text-input [control]="control" [label]="'Required text input'">
			<fudis-error-message [visible]="_errorExists" [message]="message" />
		</fudis-text-input>
		<fudis-button (click)="toggleCustomError()" [label]="'Toggle custom error'" />
		<fudis-button (click)="switchErrorMessage()" [label]="'Switch custom message content'" />
	`,
})
class TextInputWithErrorMessageComponent {
	constructor() {
		this.control = new FormControl('', FudisValidators.required('This field is required.'));
	}

	message: Subject<string> = new BehaviorSubject<string>(
		'This is a custom error message coming from fudis-error-message element'
	);

	customErrorExists: FormControlOptions;

	originalMessage: boolean = true;

	control: FormControl<string | null>;

	protected _errorExists: boolean = true;

	toggleCustomError(): void {
		this._errorExists = !this._errorExists;
	}

	switchErrorMessage(): void {
		if (this.originalMessage) {
			this.message.next('Observable value changed, so now this is me!');
		} else {
			this.message.next('Custom message can be any string or observable string');
		}

		this.originalMessage = !this.originalMessage;
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
