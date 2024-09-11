import { Component, Input, effect, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  FudisAlertElement,
  FudisAlertPosition,
  FudisComponentChanges,
} from '../../../types/miscellaneous';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import { FudisAlertService } from '../../../services/alert/alert.service';
import { FudisDialogService } from '../../../services/dialog/dialog.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'fudis-alert-group',
  templateUrl: './alert-group.component.html',
  styleUrls: ['./alert-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertGroupComponent implements OnChanges {
  constructor(
    protected _alertService: FudisAlertService,
    private _translationService: FudisTranslationService,
    private _dialogService: FudisDialogService,
  ) {
    this._dialogService
      .getDialogOpenStatus()
      .pipe(takeUntilDestroyed())
      .subscribe((value) => {
        this._setVisibility(value);
      });

    effect(() => {
      this._alertGroupLabel.next(this._translationService.getTranslations()().ALERT.HEADING_LABEL);
    });
  }

  /**
   * CSS position of alerts
   */
  @Input() position: FudisAlertPosition = 'fixed';

  /**
   * Boolean to determine if Alert Group is used inside Fudis Dialog Component
   */
  @Input() insideDialog: boolean;

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
  protected _visible = new BehaviorSubject<boolean>(false);

  /**
   * Boolean from Dialog Service to determine if Fudis Dialog is open
   */
  private _dialogStatus: boolean;

  ngOnChanges(changes: FudisComponentChanges<AlertGroupComponent>): void {
    if (changes.insideDialog?.currentValue !== changes.insideDialog?.previousValue) {
      this._setVisibility(this._dialogService.getDialogOpenStatus().value);
    }
  }

  /**
   * Getter for visible status
   */
  public getVisibleStatus(): boolean {
    return this._visible.value;
  }

  /**
   * Set visibility when Fudis Dialog is opened and closed
   */
  private _setVisibility(dialogStatus: boolean): void {
    if ((dialogStatus && this.insideDialog) || (!dialogStatus && !this.insideDialog)) {
      this._visible.next(true);
    } else {
      this._visible.next(false);
    }
  }
}
