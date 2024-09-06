import { Injectable } from '@angular/core';
import { FudisIdService } from '../id/id.service';
import { FudisAlert, FudisAlertElement } from '../../types/miscellaneous';
import { BehaviorSubject, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FudisAlertService {
  constructor(private _idService: FudisIdService) {}

  /**
   * Current alerts
   */
  private _alerts = new BehaviorSubject<FudisAlertElement[]>([]);

  /**
   * To add new alert, which will be rendered by Alert Group component.
   * Note that 'id' doesn't necessarily need to be unique. All errors with the same 'id' can be dismissed with dismissAlert() using that particular 'id'.
   */
  public addAlert(newAlert: FudisAlert): void {
    const htmlId = this._idService.getNewId('alert');

    this._alerts.next([
      ...this._alerts.getValue(),
      { ...newAlert, htmlId, buttonId: `${htmlId}-button`, initialFocus: true },
    ]);
  }

  /**
   * To dismiss alert by 'id' provided in 'addAlert()'. It will dismiss all alerts matching the 'id'.
   */
  public dismissAlert(id: string): void {
    this._alerts
      .pipe(
        take(1),
        map((alerts) => alerts.filter((alert) => alert.id !== id)),
      )
      .subscribe((result) => this._alerts.next(result));
  }

  /**
   * Dismisses only one alert from alert's close button click in the UI
   */
  public dismissAlertFromButton(id: string): void {
    this._alerts
      .pipe(
        take(1),
        map((alerts) => alerts.filter((alert) => alert.buttonId !== id)),
      )
      .subscribe((result) => this._alerts.next(result));
  }

  /**
   * Dismiss all alerts
   */
  public dismissAll(): void {
    this._alerts.next([]);
  }

  /**
   * Get alerts as an Observable
   */
  get allAlertsObservable(): BehaviorSubject<FudisAlertElement[]> {
    return this._alerts;
  }

  /**
   * Set 'initialFocus' attribute of alert to false, so that if same alert with link is rendered again, the initial focus will not jump there anymore.
   */
  public updateAlertLinkFocusState(htmlId: string): void {
    let alertIndex: number;

    this._alerts.value.forEach((value, index) => {
      if (value.htmlId === htmlId) {
        alertIndex = index;
      }

      if (alertIndex !== -1) {
        this._alerts.value[index].initialFocus = false;
      }
    });
  }
}
