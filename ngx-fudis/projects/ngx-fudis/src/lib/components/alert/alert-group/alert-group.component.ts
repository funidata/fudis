import { Component, Signal, effect } from '@angular/core';
import { FudisAlertService } from '../alert-service/alert.service';
import { FudisAlertElement } from '../../../types/miscellaneous';

@Component({
	selector: 'fudis-alert-group',
	templateUrl: './alert-group.component.html',
	styleUrls: ['./alert-group.component.scss'],
})
export class AlertGroupComponent {
	constructor(private _alertService: FudisAlertService) {
		effect(() => {
			this._alertList = this._alertService.getAlertsSignal();
		});
	}

	protected _alertList: Signal<FudisAlertElement[]>;
}
