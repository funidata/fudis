import { Injectable, Signal, signal } from '@angular/core';
import { FudisIdService } from '../id/id.service';
import { FudisAlert, FudisAlertElement } from '../../types/miscellaneous';

// TODO: discuss how much this needs to be improved to be usable for client application
@Injectable({
  providedIn: 'root',
})
export class FudisAlertService {
  constructor(private _idService: FudisIdService) {}

  private _alerts = signal<FudisAlertElement[]>([]);

  /**
   * To add new alert, which will be rendered then by Alert Group component. Note 'id' doesn't necessarily need to be unique. It could also e. g. 'error-in-form-add-new-user', so all these error could be dismissed with dismissAlert() using this 'id'.
   */
  public addAlert(newAlert: FudisAlert): void {
    const alertToAdd = newAlert;

    const htmlId = this._idService.getNewId('alert');

    const currentAlerts: FudisAlertElement[] = this._alerts();

    currentAlerts.push({ ...alertToAdd, htmlId, buttonId: `${htmlId}-button`, initialFocus: true });

    this._alerts.set(currentAlerts);
  }

  /**
   * To dismiss alert by 'id' provided in 'addAlert()'. It will dismiss all alerts matching the 'id'.
   */
  public dismissAlert(id: string): void {
    const currentAlerts: FudisAlertElement[] = this._alerts();

    const filteredAlerts = currentAlerts.filter((alert) => alert.id !== id);

    this._alerts.set(filteredAlerts);
  }

  /**
   * Dismisses only one alert from alert's close button click in the UI
   */
  public dismissAlertFromButton(id: string): void {
    const currentAlerts: FudisAlertElement[] = this._alerts();

    const filteredAlerts = currentAlerts.filter((alert) => alert.buttonId !== id);

    this._alerts.set(filteredAlerts);
  }

  /**
   * Dismiss all alerts
   */
  public dismissAll(): void {
    this._alerts.set([]);
  }

  /**
   * Get Signal containing alerts array
   */
  public getAlertsSignal(): Signal<FudisAlertElement[]> {
    return this._alerts.asReadonly();
  }

  /**
   * Set 'initialFocus' attribute of alert to false, so that if same alert with link is rendered again, the initial focus will not jump there anymore.
   */
  public updateAlertLinkFocusState(htmlId: string): void {
    const currentAlerts: FudisAlertElement[] = this._alerts();

    const index = currentAlerts.findIndex((alert) => alert.htmlId === htmlId);

    if (index !== -1) {
      currentAlerts[index] = { ...currentAlerts[index], initialFocus: false };

      this._alerts.set(currentAlerts);
    }
  }
}
