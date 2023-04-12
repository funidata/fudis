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

	@Input() errorMsg: TFudisFormErrorMessages;

	@Output() errorOutput: EventEmitter<IFudisFormErrorSummaryItem> = new EventEmitter<IFudisFormErrorSummaryItem>();

	showError: boolean = false;

	errorsToShow: string[] = [];

	checkErrors(): void {
		this.errorsToShow = [];
		if (this.control.touched && this.control.errors) {
			this.showError = true;

			Object.keys(this.control.errors).forEach((item) => {
				const message = this.errorMsg[item as keyof TFudisFormErrorMessages];
				if (message) {
					this.errorsToShow.push(item);
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
