import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { IFudisErrorMessages, IFudisErrorSummaryItem } from '../../../types/forms';

@Component({
	selector: 'fudis-datepicker',
	templateUrl: './datepicker.component.html',
	styleUrls: ['./datepicker.component.scss'],
})
export class DatepickerComponent {
	/**
	 * FormControl for the datepicker
	 */
	@Input() control: UntypedFormControl;

	/*
	 * Error message shown below the datepicker
	 */
	@Input() errorMsg: IFudisErrorMessages;

	/**
	 * Label for the datepicker
	 */
	@Input() label: string;

	/**
	 * Unique datepicker id
	 */
	@Input() id: string;

	/**
	 * Available sizes for the datepicker - defaults to medium.
	 */
	@Input() size?: 's' | 'm' | 'l' = 'm';

	/**
	 * Help text, aligned underneath the datepicker
	 */
	@Input() helpText?: string;

	/**
	 * Text to indicate that date is required, shown above the datepicker with asterisk
	 */
	@Input() requiredText: string;

	@Output() errorOutput: EventEmitter<IFudisErrorSummaryItem> = new EventEmitter<IFudisErrorSummaryItem>();

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
