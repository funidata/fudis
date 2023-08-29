import { Component, Inject, Input, effect } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FudisNotification } from '../../../types/miscellaneous';
import { FudisAlertService } from '../alert-service/alert.service';
import { FudisFocusService } from '../../../services/focus/focus.service';
import { FudisTranslationService } from '../../../utilities/translation/translation.service';

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
		private _translateService: FudisTranslationService
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

	protected _closeLabel: string;

	private _targetOnClose: HTMLElement | null;

	protected _handleCloseClick(): void {
		this._alertService.dismissAlertFromButton(this.buttonId);

		const alerts = this._alertService.getAlertsSignal()();

		if (alerts.length !== 0) {
			const targetId = alerts[alerts.length - 1].buttonId;
			this._document.getElementById(targetId)?.focus();
		} else {
			this._targetOnClose = this._focusService.getFocusTarget();
		}

		this._targetOnClose?.focus();
	}

	protected _handleFocus(focusEvent: FocusEvent): void {
		const relatedTarget = focusEvent?.relatedTarget as HTMLElement;

		/**
		 * Store source of focus event unless it originated from a link inside Alert.
		 */
		if (!relatedTarget?.closest('.fudis-alert') && !relatedTarget?.classList?.contains('fudis-link__anchor')) {
			this._focusService.setFocusTarget(focusEvent.relatedTarget);
		}
	}
}
