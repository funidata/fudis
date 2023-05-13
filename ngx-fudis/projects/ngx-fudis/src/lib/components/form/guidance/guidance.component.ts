import { Component, Input, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TFudisInputErrorMessages, TFudisFormErrorSummaryItem, TFudisGroupErrorMessages } from '../../../types/forms';
import { ErrorSummaryService } from '../error-summary/error-summary.service';

@Component({
	selector: 'fudis-guidance',
	templateUrl: './guidance.component.html',
	styleUrls: ['./guidance.component.scss'],
})
export class GuidanceComponent implements AfterViewInit {
	/**
	 * Id of input, fieldset or similar which Guidance is related to. Used in aria attributes and in emit information for Error Summary Service
	 */
	@Input() for: string;

	/**
	 * Label text of input, fieldset or similar Guidance is related to. Used in emit information for Error Summary service.
	 */
	@Input() inputLabel: string;

	/**
	 * FormControl of related input.
	 */
	@Input() control: FormControl;

	/**
	 * FormGroup of related FormGroup
	 */
	@Input() formGroup: FormGroup;

	/**
	 * Text displayed as guidance help text.
	 */
	@Input() helpText: string | undefined;

	/**
	 * If there is no Fudis FieldSet and Error Summary associated with this input and its Guidance, 'polite' can be considered so that screen reader will get notified if there are new errors related to the input.
	 */
	@Input() ariaLive: 'off' | 'polite' | 'assertive' = 'off';

	/**
	 * When set displays also a character count indicator.
	 */
	@Input() maxLength: number | undefined;

	/**
	 * Assistive text of max character count for screen readers. E. g. "5/20 characters used" where "characters used" is "maxLengthText"
	 */
	@Input() maxLengthText: string;

	/**
	 * Used if FormGroup is associated with Guidance
	 */
	@Input() groupErrorMsg: TFudisGroupErrorMessages;

	/**
	 * Used if FormControl is associated with Guidance
	 */
	@Input() errorMsg: TFudisInputErrorMessages;

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

		this.getErrorOutput({ id: this.for, errors: this.errorSummaryMessages, label: this.inputLabel });
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
