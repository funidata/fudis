import { Directive, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FudisFormErrorSummaryItem } from '../../../../types/forms';
import { FudisTranslationService } from '../../../../services/translation/translation.service';
import { FudisIdService } from '../../../../services/id/id.service';
import { FudisInternalErrorSummaryService } from '../../../../services/form/error-summary/internal-error-summary.service';

@Directive({
	selector: '[fudisErrorMessageBase]',
})
export class ErrorMessageBaseDirective {
	constructor(
		protected _errorSummaryService: FudisInternalErrorSummaryService,
		protected _translationService: FudisTranslationService,
		protected _idService: FudisIdService
	) {}

	/*
	 * Error message to display
	 */
	@Input({ required: true }) message: Observable<string> | string | undefined;

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
	 * Temporary warning as Form Error Message is been refactored from 'errorMsg' to be binded with FudisValidators and FudisFormGroupValidators
	 */
	@Input() deprecationWarning: boolean = false;

	/**
	 * Error message to include in error summary item
	 */
	protected _currentMessage: string;

	protected _id: string;

	/**
	 * Has error been created and sent forward
	 */
	protected _errorSent: boolean = false;

	protected _subscribtion: Subscription;

	protected _createError(error: FudisFormErrorSummaryItem): void {
		if (typeof this.message === 'string') {
			this._currentMessage = this.message;
		}

		if (error.id && this._currentMessage) {
			this._errorSummaryService.addNewError(error);
			this._errorSent = true;
		}
	}
}
