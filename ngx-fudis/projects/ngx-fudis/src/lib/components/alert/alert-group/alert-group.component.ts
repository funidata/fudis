import { Component, Signal, effect } from '@angular/core';
import { FudisAlertService } from '../alert-service/alert.service';
import { FudisAlertElement } from '../../../types/miscellaneous';
import { FudisTranslationService } from '../../../utilities/translation/translation.service';

@Component({
	selector: 'fudis-alert-group',
	templateUrl: './alert-group.component.html',
	styleUrls: ['./alert-group.component.scss'],
})
export class AlertGroupComponent {
	constructor(
		private _alertService: FudisAlertService,
		private _translationService: FudisTranslationService
	) {
		effect(() => {
			this._alertList = this._alertService.getAlertsSignal();
			this._alertGroupLabel = `${this._translationService.getTranslations()().ALERT.HEADING_LABEL}: ${
				this._alertList().length
			}`;
		});
	}

	protected _alertList: Signal<FudisAlertElement[]>;

	protected _alertGroupLabel: string;
}
