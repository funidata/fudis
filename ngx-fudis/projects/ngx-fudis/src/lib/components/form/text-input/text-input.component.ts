// eslint-disable-next-line max-classes-per-file
import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { IFudisErrorMessages } from '../../../types/forms';

type Error = {
	id: string;
	message: string;
};

@Component({
	selector: 'fudis-text-input[id][label]',
	templateUrl: './text-input.component.html',
	styleUrls: ['./text-input.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextInputComponent {
	@ViewChild('fudisTextInput') input: ElementRef<HTMLInputElement>;

	/**
	 * FormControl for the input
	 */
	@Input() control: UntypedFormControl;

	/**
	 * Error message shown below the input
	 */
	@Input() errorMsg: IFudisErrorMessages;

	/**
	 * Input label
	 */
	@Input() label: string;

	/**
	 * Unique input id
	 */
	@Input() id: string;

	/**
	 * Available sizes for the input - defaults to large. Recommended size for number input is small.
	 */
	@Input() size?: 's' | 'm' | 'l' = 'l';

	/**
	 * Help text shown below the input
	 */
	@Input() helpText?: string;

	/**
	 * Text to indicate that input is required, shown above the input with asterisk
	 */
	@Input() requiredText: string;

	/**
	 * Type of the input - defaults to 'text'
	 */
	@Input() type: 'email' | 'number' | 'password' | 'tel' | 'text' | 'url' = 'text';

	/**
	 * Minimium number of characters allowed by minLength
	 */
	@Input() minLength: number;

	/**
	 * Maximum number of characters allowed by maxLength
	 */
	@Input() maxLength: number;

	/**
	 * Minimum number allowed by number input's minNumber
	 */
	@Input() minNumber: number;

	/**
	 * Maximum number allowed by number input's maxNumber
	 */
	@Input() maxNumber: number;

	@Output() errorOutput: EventEmitter<Error> = new EventEmitter<Error>();

	showError: boolean = false;

	requiredValidator = Validators.required;

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
}
