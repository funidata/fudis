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
	// Bind input field
	@ViewChild('fudisTextInput') input: ElementRef<HTMLInputElement>;

	@Output() errorOutput: EventEmitter<Error> = new EventEmitter<Error>();

	@Input() errorMsg: IFudisErrorMessages;

	/**
	 *	Label is mandatory for every input
	 */
	@Input() label: string;

	@Input() id: string;

	@Input() size?: 's' | 'm' | 'l' = 'l';

	/**
	 *	Helper or info text for the input, aligned underneath the input
	 */
	@Input() helpText?: string;

	@Input() requiredText: string;

	@Input() characterLimitIndicatorValue?: number;

	@Input() control: UntypedFormControl;

	/**
	 *	Type of the input
	 */
	@Input() type: 'email' | 'number' | 'password' | 'tel' | 'text' | 'url' = 'text';

	@Input() minLength: number;

	@Input() maxLength: number;

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
