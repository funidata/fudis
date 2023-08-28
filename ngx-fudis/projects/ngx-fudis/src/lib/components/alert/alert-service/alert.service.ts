import { Injectable, Signal, signal } from '@angular/core';
import { FudisAlert, FudisAlertElement } from '../../../types/miscellaneous';
import { FudisIdService } from '../../../utilities/id-service.service';

@Injectable({
	providedIn: 'root',
})
export class FudisAlertService {
	constructor(private _idService: FudisIdService) {}

	private _alerts = signal<FudisAlertElement[]>([]);

	public addAlert(newAlert: FudisAlert): void {
		const alertToAdd = newAlert;

		const htmlId = this._idService.getNewId('alert');

		const currentAlerts: FudisAlertElement[] = this._alerts();

		currentAlerts.push({ ...alertToAdd, htmlId, buttonId: `${htmlId}-button` });

		this._alerts.set(currentAlerts);
	}

	public dismissAlert(id: string): void {
		const currentAlerts: FudisAlertElement[] = this._alerts();

		const filteredAlerts = currentAlerts.filter((alert) => alert.id !== id);

		this._alerts.set(filteredAlerts);
	}

	public dismissAlertFromButton(id: string): void {
		const currentAlerts: FudisAlertElement[] = this._alerts();

		const filteredAlerts = currentAlerts.filter((alert) => alert.buttonId !== id);

		this._alerts.set(filteredAlerts);
	}

	public dismissAll(): void {
		this._alerts.set([]);
	}

	public getAlertsSignal(): Signal<FudisAlertElement[]> {
		return this._alerts.asReadonly();
	}
}
