import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy } from '@angular/core';

import { FudisErrorSummaryService } from '../error-summary/error-summary.service';
import { FudisFormErrorSummaryItem } from '../../../types/forms';

@Component({
	selector: 'fudis-error-message',
	templateUrl: './error-message.component.html',
	styleUrls: ['./error-message.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorMessageComponent implements OnChanges, OnDestroy, AfterViewInit {
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
	@Input({ required: true }) focusId: string;

	/**
	 * Label text of input this message is related to. Sent to Error Summary service.
	 */
	@Input({ required: true }) label: string;

	/**
	 * If error is visible or not.
	 */
	@Input() visible: boolean = false;

	/**
	 * Error type from different keys in e. g. control.errors such as 'required' and 'minlength'
	 */
	@Input({ required: true }) type: string;

	/**
	 * Visual variant of error message
	 */
	@Input() variant: 'body-text' | 'form-error' = 'form-error';

	private _errorSent: boolean = false;

	private _currentMessage: string;

	private _currentLabel: string | undefined = undefined;

	constructor(private _errorSummaryService: FudisErrorSummaryService) {}

	ngAfterViewInit(): void {
		if (!this.message) {
			this.throwError();
		}
	}

	createError(): void {
		if (this.message !== undefined && this.focusId) {
			this._currentMessage = this.message;
			this._currentLabel = this.label;

			const newError: FudisFormErrorSummaryItem = {
				id: this.focusId,
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
		if (this.message !== this._currentMessage || this.label !== this._currentLabel) {
			this.createError();
		}
	}

	ngOnDestroy(): void {
		if (this._errorSent) {
			this._errorSummaryService.removeError({
				id: this.focusId,
				type: this.type,
				controlName: this.controlName,
			});
		}
	}

	throwError(): void {
		if (this.controlName) {
			// eslint-disable-next-line no-console
			console.warn(
				`Fudis component with id of '${this.focusId}' and control name of '${this.controlName}' is missing error message for error type of: '${this.type}'`
			);
		} else {
			// eslint-disable-next-line no-console
			console.warn(
				`Fudis component with id of '${this.focusId}' is missing error message for error type of: '${this.type}'`
			);
		}
	}
}
