import { Component, Input, AfterViewInit, effect } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FudisAlertElement } from '../../../types/miscellaneous';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import { FudisAlertService } from '../../../services/alert/alert.service';
import { FudisDialogService } from '../../../services/dialog/dialog.service';

@Component({
  selector: 'fudis-alert-group',
  templateUrl: './alert-group.component.html',
  styleUrls: ['./alert-group.component.scss'],
})
export class AlertGroupComponent implements AfterViewInit {
  constructor(
    private _alertService: FudisAlertService,
    private _translationService: FudisTranslationService,
    private _dialogService: FudisDialogService,
  ) {
    /**
     * Subscribe to current visible alerts
     */
    _alertService.allAlertsObservable.pipe(takeUntilDestroyed()).subscribe((value) => {
      this._alertList.next(value);
    });

    effect(() => {
      this._alertGroupLabel.next(this._translationService.getTranslations()().ALERT.HEADING_LABEL);

      this._dialogStatus = this._dialogService.getDialogOpenSignal()();

      this._setVisibility();
    });
  }

  /**
   * CSS position of alerts
   */
  @Input() position: 'fixed' | 'absolute' | 'static' = 'fixed';

  /**
   * Boolean to determine if Alert Group is used inside Fudis Dialog Component
   */
  @Input() insideDialog: boolean = false;

  /**
   * List of Alerts fetched from Alert Service
   */
  protected _alertList = new BehaviorSubject<FudisAlertElement[]>([]);

  /**
   * Label for section element containing alerts
   */
  protected _alertGroupLabel = new BehaviorSubject<string>('');

  /**
   * Boolean to determine if Alert group is visible. Used with _dialogStatus boolean
   */
  protected _visible: boolean = false;

  /**
   * Boolean from Dialog Service to determine if Fudis Dialog is open
   */
  private _dialogStatus: boolean;

  ngAfterViewInit(): void {
    this._setVisibility();
  }

  /**
   * Getter for visible status
   */
  public getVisibleStatus(): boolean {
    return this._visible;
  }

  /**
   * Set visibility when Fudis Dialog is opened and closed
   */
  private _setVisibility(): void {
    if ((this._dialogStatus && this.insideDialog) || (!this._dialogStatus && !this.insideDialog)) {
      this._visible = true;
    } else {
      this._visible = false;
    }
  }
}
