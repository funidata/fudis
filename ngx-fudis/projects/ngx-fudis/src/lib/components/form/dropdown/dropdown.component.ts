import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { IFudisErrorMessages, IFudisDropdownOption } from '../../../types/forms';

type Error = {
	id: string;
	message: string;
};

@Component({
	selector: 'fudis-dropdown',
	templateUrl: './dropdown.component.html',
	styleUrls: ['./dropdown.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class DropdownComponent {
	/**
	 * Options for testing purposes
	 */

	@Input() options: IFudisDropdownOption[];

	@Input() control: UntypedFormControl;

	/*
	 * Error message shown below the input
	 */
	@Input() errorMsg: IFudisErrorMessages;

	/**
	 * If true, user can choose multiple checkbox options from dropdown
	 */
	@Input() multipleOption = false;

	@Input() label: string;

	/**
	 * Input id
	 */
	@Input() id: string;

	/**
	 * Custom placeholder text to show when no selection has been made. Defaults to 'Valitse'
	 */
	@Input() placeholder: string;

	/**
	 *	Helper or info text for the input, aligned underneath the input
	 */
	@Input() helpText?: string;

	/**
	 * Text to indicate that input is required, shown above the input with asterisk
	 */
	@Input() requiredText: string;

	/**
	 * Available sizes for the input - defaults to large.
	 */
	@Input() size?: 's' | 'm' | 'l' = 'l';

	@Output() errorOutput: EventEmitter<Error> = new EventEmitter<Error>();

	showError: boolean = false;

	errorMsgToShow: string[] = [];

	checkErrors(): void {
		this.errorMsgToShow = [];
		if (this.control.touched && this.control.errors) {
			this.showError = true;

			Object.keys(this.control.errors).forEach((item) => {
				const message = this.errorMsg[item as keyof IFudisErrorMessages];

				if (message) {
					this.errorMsgToShow.push(message);
					this.getErrorOutput(this.id, message);
				}
			});
		} else {
			this.showError = false;
		}
	}

	getErrorOutput(id: string, error: string) {
		this.errorOutput.emit({ id, message: error });
	}

	isRequired(): boolean {
		if (this.control.hasValidator(Validators.required)) {
			return true;
		}
		return false;
	}
}
