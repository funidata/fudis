import { Component, Inject, Input, effect } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FudisNotification } from '../../../types/miscellaneous';
import { FudisFocusService } from '../../../services/focus/focus.service';
import { FudisTranslationService } from '../../../utilities/translation/translation.service';
import { FudisAlertService } from '../../../services/alert/alert.service';
import { FudisDialogService } from '../../../services/dialog/dialog.service';

@Component({
	selector: 'fudis-alert',
	templateUrl: './alert.component.html',
	styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
	constructor(
		@Inject(DOCUMENT) private _document: Document,
		private _alertService: FudisAlertService,
		private _focusService: FudisFocusService,
		private _translateService: FudisTranslationService,
		private _dialogService: FudisDialogService
	) {
		effect(() => {
			this._closeLabel = this._translateService.getTranslations()().DIALOG.CLOSE;
		});
	}

	@Input() variant: FudisNotification = 'info';

	@Input({ required: true }) message: string;

	@Input() routerLinkUrl: string | any[] | null | undefined;

	@Input({ required: true }) id: string;

	@Input() linkTitle: string | undefined;

	@Input({ required: true }) htmlId: string;

	@Input({ required: true }) buttonId: string;

	@Input() initialFocus: boolean = false;

	protected _closeLabel: string;

	protected _handleCloseClick(): void {
		this._alertService.dismissAlertFromButton(this.buttonId);

		const alerts = this._alertService.getAlertsSignal()();

		if (alerts.length !== 0) {
			const targetId = alerts[alerts.length - 1].buttonId;
			this._document.getElementById(targetId)?.focus();
		} else {
			const target: HTMLElement = this._focusService.getFocusTarget();
			target?.focus();
		}
	}

	protected _handleFocus(focusEvent: FocusEvent): void {
		const relatedTarget = focusEvent?.relatedTarget as HTMLElement;

		const isDialogOpen = this._dialogService.getDialogOpenSignal()();

		/**
		 * First if: when keyboard Tabbing through ngMaterial dialog, focus goes through their hidden focus-trap helper element which focuses on either first alert on the list or dialog close. So we store the dialog close as focus target.
		 * Else if: Store source of focus event unless it originated inside Alert
		 */

		if (isDialogOpen && relatedTarget && relatedTarget.classList?.contains('cdk-focus-trap-anchor')) {
			const closeButton = this._document.querySelector(
				'.cdk-focus-trap-anchor + mat-dialog-container .fudis-dialog__close .fudis-button'
			) as HTMLElement;
			if (closeButton) {
				this._focusService.setFocusTarget(closeButton);
			}
		} else if (relatedTarget && !relatedTarget.closest('.fudis-alert')) {
			this._focusService.setFocusTarget(relatedTarget);
		}
	}

	protected _handleBlur(event: FocusEvent): void {
		const nextElement = event.relatedTarget as HTMLElement;

		if (this.initialFocus && nextElement?.classList?.contains('fudis-alert__close') && nextElement?.id) {
			this._alertService.updateAlertLinkFocusState(this.htmlId);
			this._focusService.focusToElementById(nextElement.id);
		}
	}
}
