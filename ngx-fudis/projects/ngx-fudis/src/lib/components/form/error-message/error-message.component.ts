import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { FudisErrorSummaryService } from '../../../services/form/error-summary/error-summary.service';
import { FudisFormErrorSummaryItem } from '../../../types/forms';
import { FudisTranslationService } from '../../../services/translation/translation.service';

@Component({
	selector: 'fudis-error-message',
	templateUrl: './error-message.component.html',
	styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
	constructor(
		private _errorSummaryService: FudisErrorSummaryService,
		private _translationService: FudisTranslationService
	) {}

	/*
	 * Error message to display
	 */
	@Input({ required: true }) message: Observable<string> | string | undefined;

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
	 * Error message to include in error summary item
	 */
	protected _currentMessage: string;

	/**
	 * Has error been created and sent forward
	 */
	private _errorSent: boolean = false;

	/**
	 * Error label to include in error summary item
	 */
	private _currentLabel: string | undefined = undefined;

	private _subscribtion: Subscription;

	ngOnInit(): void {
		if (this.message && typeof this.message !== 'string') {
			this._subscribtion = this.message.subscribe((value: string) => {
				this._currentMessage = value;
				this.createError();
			});
		}
	}

	ngAfterViewInit(): void {
		setTimeout(() => {
			if (typeof this.message !== 'string' && !this.message) {
				this.throwError();
			}
		}, 1000);
	}

	createError(): void {
		if (typeof this.message === 'string') {
			this._currentMessage = this.message;
		}

		if (this.focusId) {
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
		this.createError();
	}

	ngOnDestroy(): void {
		if (this._errorSent) {
			this._errorSummaryService.removeError({
				id: this.focusId,
				type: this.type,
				controlName: this.controlName,
			});
		}

		if (this._subscribtion) {
			this._subscribtion.unsubscribe();
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
