import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IFudisErrorMessages, IFudisErrorSummaryItem } from '../../../types/forms';

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

	@Input() errorMsg: IFudisErrorMessages;

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

	checkCharacterCount(): string {
		if (this.maxLength && this.control.value.length) {
			const charactersRemaining = this.maxLength - this.control.value.length;

			if (charactersRemaining < 3) {
				return 'polite';
			}
			return 'off';
		}
		return 'off';
	}

	getErrorOutput(id: string, error: string) {
		this.errorOutput.emit({ id, message: error });
	}
}
