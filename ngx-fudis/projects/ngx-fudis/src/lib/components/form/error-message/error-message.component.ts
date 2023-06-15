import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';

import { ErrorSummaryService } from '../error-summary/error-summary.service';
import { TFudisFormErrorSummaryItem } from '../../../types/forms';

@Component({
	selector: 'fudis-error-message',
	templateUrl: './error-message.component.html',
	styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent implements OnInit, OnChanges, OnDestroy {
	/*
	 * Error message to display
	 */
	@Input({ required: true }) message: string | undefined;

	/**
	 * Name of control this error is related to.
	 */
	@Input() controlName: string | undefined = undefined;

	/**
	 * Id of input this message is related to. Sent to Error Summary service.
	 */
	@Input({ required: true }) inputId: string;

	/**
	 * Label text of input this message is related to. Sent to Error Summary service.
	 */
	@Input({ required: true }) inputLabel: string;

	/**
	 * If error is visible or not.
	 */
	@Input() visible: boolean = false;

	/**
	 * Error type from different keys in e. g. control.errors such as 'required' and 'minlength'
	 */
	@Input({ required: true }) type: string;

	private _errorSent: boolean = false;

	private _currentMessage: string | undefined = undefined;

	private _currentLabel: string | undefined = undefined;

	constructor(private _errorSummaryService: ErrorSummaryService) {}

	ngOnInit(): void {
		this.createError();

		if (!this.message) {
			this.throwError();
		}
	}

	createError(): void {
		if (this.message && this.inputLabel) {
			this._currentMessage = this.message;
			this._currentLabel = this.inputLabel;

			const newError: TFudisFormErrorSummaryItem = {
				id: this.inputId,
				error: this._currentMessage,
				label: this._currentLabel,
				type: this.type,
				controlName: this.controlName,
			};
			this._errorSummaryService.addNewError(newError);
			this._errorSent = true;
		}
	}

	ngOnChanges(): void {
		if (this.message !== this._currentMessage || this.inputLabel !== this._currentLabel) {
			this.createError();
		}
	}

	ngOnDestroy(): void {
		if (this._errorSent) {
			this._errorSummaryService.removeError({
				id: this.inputId,
				type: this.type,
				controlName: this.controlName,
			});
		}
	}

	throwError(): void {
		if (this.controlName) {
			// eslint-disable-next-line no-console
			console.warn(
				`Fudis component with id of '${this.inputId}' and control name of '${this.controlName}' is missing error message for error type of: '${this.type}'`
			);
		} else {
			// eslint-disable-next-line no-console
			console.warn(
				`Fudis component with id of '${this.inputId}' is missing error message for error type of: '${this.type}'`
			);
		}
	}
}
