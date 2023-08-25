import { Injectable, Signal, signal } from '@angular/core';
import { FudisAlert } from '../../../types/miscellaneous';
import { FudisIdService } from '../../../utilities/id-service.service';

@Injectable({
	providedIn: 'root',
})
export class FudisAlertService {
	constructor(private _idService: FudisIdService) {}

	private _alerts = signal<FudisAlert[]>([]);

	public addAlert(newAlert: FudisAlert): void {
		const alertToAdd = newAlert;

		const currentAlerts: FudisAlert[] = this._alerts();

		currentAlerts.push(alertToAdd);

		this._alerts.set(currentAlerts);

		console.log(alertToAdd);
	}

	public dismissAlert(id: string): void {
		const currentAlerts: FudisAlert[] = this._alerts();

		const filteredAlerts = currentAlerts.filter((alert) => alert.id !== id);

		this._alerts.set(filteredAlerts);
	}

	public dismissAll(): void {
		this._alerts.set([]);
	}

	public getAlerts(): Signal<FudisAlert[]> {
		return this._alerts.asReadonly();
	}
}
