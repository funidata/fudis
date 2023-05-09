import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TFudisInputErrorMessages, IFudisFormErrorSummaryItem } from '../../../types/forms';
import { ErrorSummaryService } from '../error-summary/error-summary.service';

@Component({
	selector: 'fudis-guidance',
	templateUrl: './guidance.component.html',
	styleUrls: ['./guidance.component.scss'],
})
export class GuidanceComponent implements AfterViewInit {
	@Input() inputId: string;

	@Input() control: FormControl;

	@Input() helpText: string | undefined;

	@Input() maxLength: number | undefined;

	@Input() ariaLive: 'off' | 'polite' | 'assertive' = 'off';

	/**
	 * Assistive text of max character count for screen readers
	 */
	@Input() maxLengthText: string;

	@Input() errorMsg: TFudisInputErrorMessages;

	@Output() errorOutput: EventEmitter<IFudisFormErrorSummaryItem> = new EventEmitter<IFudisFormErrorSummaryItem>();

	errorsVisible: boolean = false;

	errorsToShow: string[] = [];

	constructor(private errorSummaryService: ErrorSummaryService) {}

	ngAfterViewInit(): void {
		this.errorSummaryService.reloadWatcher().subscribe(() => {
			this.checkErrors();
		});
	}

	checkErrors(): void {
		this.errorsToShow = [];
		const errorSummaryMessages: string[] = [];
		if (this.control.touched && this.control.errors) {
			this.errorsVisible = true;

			Object.keys(this.control.errors).forEach((item) => {
				const message = this.errorMsg[item as keyof TFudisInputErrorMessages];
				if (message) {
					errorSummaryMessages.push(message);
					this.errorsToShow.push(item);
				}
			});
		} else {
			this.errorsVisible = false;
		}

		this.getErrorOutput({ id: this.inputId, errors: errorSummaryMessages });
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

	getErrorOutput(error: IFudisFormErrorSummaryItem) {
		// this.errorOutput.emit({ id, message: error });
		this.errorSummaryService.updateErrorList(error);
	}
}
