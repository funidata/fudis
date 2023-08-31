import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy } from '@angular/core';

import { FudisErrorSummaryService } from '../../../services/form/error-summary/error-summary.service';
import { FudisFormErrorSummaryItem } from '../../../types/forms';
import { FudisTranslationService } from '../../../utilities/translation/translation.service';

@Component({
	selector: 'fudis-error-message',
	templateUrl: './error-message.component.html',
	styleUrls: ['./error-message.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorMessageComponent implements OnChanges, OnDestroy, AfterViewInit {
	constructor(
		private _errorSummaryService: FudisErrorSummaryService,
		private _translationService: FudisTranslationService
	) {}

	/*
	 * Error message to display
	 */
	@Input({ required: true }) message: string | undefined;

	/**
	 * Id of input this message is related to. Sent to Error Summary service.
	 */
	@Input({ required: true }) focusId: string;

	/**
	 * Label text of input this message is related to. Sent to Error Summary service.
	 */
	@Input({ required: true }) label: string;

	/**
	 * Error type from different keys in e. g. control.errors such as 'required' and 'minlength'
	 */
	@Input({ required: true }) type: string;

	/**
	 * Name of control this error is related to.
	 */
	@Input() controlName: string | undefined = undefined;

	/**
	 * If error is visible or not.
	 */
	@Input() visible: boolean = false;

	/**
	 * Visual variant of error message
	 */
	@Input() variant: 'body-text' | 'form-error' = 'form-error';

	/**
	 * Has error been created and sent forward
	 */
	private _errorSent: boolean = false;

	/**
	 * Error message to include in error summary item
	 */
	private _currentMessage: string;

	/**
	 * Error label to include in error summary item
	 */
	private _currentLabel: string | undefined = undefined;

	ngAfterViewInit(): void {
		setTimeout(() => {
			if (!this.message) {
				this.throwError();
			}
		}, 1000);
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
				language: this._translationService.getLanguage(),
			};
			this._errorSummaryService.addNewError(newError);
			this._errorSent = true;
		}
	}

	ngOnChanges(): void {
		if (this.message !== this._currentMessage && this.label !== this._currentLabel) {
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
