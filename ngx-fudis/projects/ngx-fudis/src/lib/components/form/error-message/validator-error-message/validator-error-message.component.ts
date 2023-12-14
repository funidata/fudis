import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FudisInternalErrorSummaryService } from '../../../../services/form/error-summary/internal-error-summary.service';
import { FudisTranslationService } from '../../../../services/translation/translation.service';
import { FudisIdService } from '../../../../services/id/id.service';
import { ErrorMessageBaseDirective } from '../error-message-base/error-message-base.directive';
import { FudisFormErrorSummaryItem } from '../../../../types/forms';

@Component({
	selector: 'fudis-validator-error-message',
	templateUrl: './validator-error-message.component.html',
	styleUrls: ['../error-message/error-message.component.scss'],
})
export class ValidatorErrorMessageComponent
	extends ErrorMessageBaseDirective
	implements OnInit, OnChanges, OnDestroy, AfterViewInit
{
	constructor(
		_errorSummaryService: FudisInternalErrorSummaryService,
		_translationService: FudisTranslationService,
		_idService: FudisIdService
	) {
		super(_errorSummaryService, _translationService, _idService);
		this._id = _idService.getNewId('validator-error-message');
	}

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

	ngOnInit(): void {
		if (this.message && typeof this.message !== 'string') {
			this._subscribtion = this.message.subscribe((value: string) => {
				this._currentMessage = value;

				const newError: FudisFormErrorSummaryItem = {
					id: this.focusId,
					error: this._currentMessage,
					label: this.label,
					type: this.type,
					controlName: this.controlName,
					language: this._translationService.getLanguage(),
				};

				this._createError(newError);
			});
		}

		if (this.deprecationWarning) {
			// eslint-disable-next-line no-console
			console.warn(
				`Component with id of '${this.focusId}' and label of '${this.label}' received form error messages from 'errorMsg' input. This will be removed in version Fudis v1.0.0, as error message logic will be binded straight with FudisValidators and FudisFormGroupValidators.`
			);
		}
	}

	ngAfterViewInit(): void {
		setTimeout(() => {
			if (typeof this.message !== 'string' && !this.message) {
				this.throwError();
			}
		}, 1000);
	}

	ngOnChanges(): void {
		if (typeof this.message === 'string') {
			this._currentMessage = this.message;
		}

		const newError: FudisFormErrorSummaryItem = {
			id: this.focusId,
			error: this._currentMessage,
			label: this.label,
			type: this.type,
			controlName: this.controlName,
			language: this._translationService.getLanguage(),
		};

		this._createError(newError);
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
