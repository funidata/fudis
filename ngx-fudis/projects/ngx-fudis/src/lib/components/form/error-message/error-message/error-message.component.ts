import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FudisFormErrorSummaryItem } from '../../../../types/forms';
import { FudisIdService } from '../../../../services/id/id.service';
import { FudisTranslationService } from '../../../../services/translation/translation.service';
import { FudisErrorSummaryService } from '../../../../services/form/error-summary/error-summary.service';
import { ErrorMessageBaseDirective } from '../error-message-base/error-message-base.directive';

@Component({
	selector: 'fudis-error-message',
	templateUrl: './error-message.component.html',
	styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent extends ErrorMessageBaseDirective implements OnInit, OnChanges, OnDestroy {
	constructor(
		_errorSummaryService: FudisErrorSummaryService,
		_translationService: FudisTranslationService,
		_idService: FudisIdService
	) {
		super(_errorSummaryService, _translationService, _idService);
		this._id = _idService.getNewId('error-message');
	}

	@Input() parentLabel: string;

	@Input() parentId: string;

	ngOnInit(): void {
		if (this.message && typeof this.message !== 'string') {
			this._subscribtion = this.message.subscribe((value: string) => {
				this._currentMessage = value;

				this._createCustomError();
			});
		} else if (this.message) {
			this._currentMessage = this.message;
			this._createCustomError();
		}
	}

	ngOnChanges(): void {
		if (typeof this.message === 'string') {
			this._currentMessage = this.message;
			this._createCustomError();
		}
	}

	ngOnDestroy(): void {
		if (this._subscribtion) {
			this._subscribtion.unsubscribe();
		}
	}

	public setParentProperties(id: string, label: string) {
		this.parentId = id;

		if (label !== this.parentLabel) {
			this.parentLabel = label;
			this._createCustomError();
		}
	}

	private _createCustomError(): void {
		if (this._currentMessage && this.parentId && this.parentLabel && this.visible) {
			const newError: FudisFormErrorSummaryItem = {
				id: this.parentId,
				error: this._currentMessage,
				label: this.parentLabel,
				type: this._id,
				controlName: this.controlName,
				language: this._translationService.getLanguage(),
			};
			this._createError(newError);
		} else if (this._errorSent && !this.visible && this.parentId) {
			this._errorSummaryService.removeError({
				id: this.parentId,
				type: this._id,
				controlName: this.controlName,
			});

			this._errorSent = false;
		}
	}
}
