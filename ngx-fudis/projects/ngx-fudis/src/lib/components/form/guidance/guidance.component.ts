import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TFudisInputErrorMessages, TFudisFormErrorSummaryItem, TFudisGroupErrorMessages } from '../../../types/forms';
import { ErrorSummaryService } from '../error-summary/error-summary.service';

@Component({
	selector: 'fudis-guidance',
	templateUrl: './guidance.component.html',
	styleUrls: ['./guidance.component.scss'],
})
export class GuidanceComponent implements AfterViewInit {
	@Input() inputId: string;

	@Input() inputLabel: string;

	@Input() control: FormControl;

	@Input() formGroup: FormGroup;

	@Input() helpText: string | undefined;

	@Input() maxLength: number | undefined;

	@Input() ariaLive: 'off' | 'polite' | 'assertive' = 'off';

	/**
	 * Assistive text of max character count for screen readers
	 */
	@Input() maxLengthText: string;

	@Input() groupErrorMsg: TFudisGroupErrorMessages;

	@Input() errorMsg: TFudisInputErrorMessages;

	@Output() errorOutput: EventEmitter<TFudisFormErrorSummaryItem> = new EventEmitter<TFudisFormErrorSummaryItem>();

	// eslint-disable-next-line class-methods-use-this
	asErrorkey(errorKey: any): keyof TFudisInputErrorMessages {
		return errorKey;
	}

	errorSummaryMessages: string[] = [];

	constructor(private errorSummaryService: ErrorSummaryService) {}

	ngAfterViewInit(): void {
		this.errorSummaryService.reloadWatcher().subscribe(() => {
			this.checkErrors();
		});
	}

	checkErrors(): void {
		this.errorSummaryMessages = [];

		if (!this.control && this.formGroup && this.groupErrorMsg) {
			this.checkControlGroupErrors(this.formGroup, this.groupErrorMsg);
		} else if (this.control && this.errorMsg) {
			this.checkControlErrors(this.control, this.errorMsg);
		}

		this.getErrorOutput({ id: this.inputId, errors: this.errorSummaryMessages, label: this.inputLabel });
	}

	checkControlGroupErrors(group: FormGroup, errors: TFudisGroupErrorMessages): void {
		if (group.touched && group.invalid) {
			if (group.errors) {
				this.checkFormGroupErrors(group.errors);
			} else {
				Object.keys(group.controls).forEach((control) => {
					if (errors[control]) {
						const currentControl = group.controls?.[control];
						this.checkControlErrors(currentControl, errors[control]);
					}
				});
			}
		}
	}

	checkFormGroupErrors(errors: object): void {
		Object.keys(errors).forEach((error) => {
			const message = this.groupErrorMsg[error as keyof TFudisGroupErrorMessages];
			if (message) {
				this.errorSummaryMessages.push(message);
			}
		});
	}

	checkControlErrors(control: FormControl | any, errors: TFudisInputErrorMessages): void {
		if (control.touched && control.errors) {
			Object.keys(control.errors).forEach((item) => {
				const message = errors[item as keyof TFudisInputErrorMessages];
				if (message) {
					this.errorSummaryMessages.push(message);
				}
			});
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

	getErrorOutput(error: TFudisFormErrorSummaryItem) {
		this.errorSummaryService.updateErrorList(error);
	}
}
