import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TFudisFormErrorMessages, IFudisFormErrorSummaryItem } from '../../../types/forms';

@Component({
	selector: 'fudis-guidance',
	templateUrl: './guidance.component.html',
	styleUrls: ['./guidance.component.scss'],
})
export class GuidanceComponent {
	@Input() id: string;

	@Input() control: FormControl;

	@Input() helpText: string | undefined;

	@Input() maxLength: number | undefined;

	/**
	 * Assistive text of max character count for screen readers
	 */
	@Input() maxLengthText: string;

	@Input() errorMsg: TFudisFormErrorMessages;

	@Output() errorOutput: EventEmitter<IFudisFormErrorSummaryItem> = new EventEmitter<IFudisFormErrorSummaryItem>();

	errorsVisible: boolean = false;

	errorsToShow: string[] = [];

	checkErrors(): void {
		this.errorsToShow = [];
		if (this.control.touched && this.control.errors) {
			this.errorsVisible = true;

			Object.keys(this.control.errors).forEach((item) => {
				const message = this.errorMsg[item as keyof TFudisFormErrorMessages];
				if (message) {
					this.errorsToShow.push(item);
					this.getErrorOutput(this.id, message);
				}
			});
		} else {
			this.errorsVisible = false;
		}
	}

	alertMaxLength(): boolean {
		if (this.maxLength && this.control.value?.length) {
			const charactersRemaining = this.maxLength - this.control.value.length;

			if ((charactersRemaining === 5 && this.maxLength >= 5) || charactersRemaining === 0) {
				return true;
			}
		}

		return false;
	}

	getErrorOutput(id: string, error: string) {
		this.errorOutput.emit({ id, message: error });
	}
}
