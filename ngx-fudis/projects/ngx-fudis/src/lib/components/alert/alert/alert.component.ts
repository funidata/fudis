import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
  effect,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { FudisNotification } from '../../../types/miscellaneous';
import { FudisFocusService } from '../../../services/focus/focus.service';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import { FudisAlertService } from '../../../services/alert/alert.service';
import { FudisDialogService } from '../../../services/dialog/dialog.service';

@Component({
  selector: 'fudis-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent {
  constructor(
    @Inject(DOCUMENT) private _document: Document,
    private _alertService: FudisAlertService,
    private _focusService: FudisFocusService,
    private _translateService: FudisTranslationService,
    private _dialogService: FudisDialogService,
  ) {
    effect(() => {
      this._closeLabel.next(this._translateService.getTranslations()().DIALOG.CLOSE);
    });
  }

  /**
   * Visible alert message
   */
  @Input({ required: true }) message: Observable<string>;

  /**
   * Id to be set on the whole alert element
   */
  @Input({ required: true }) htmlId: string;

  /**
   * Id to be set on the close button
   */
  @Input({ required: true }) buttonId: string;

  /**
   * Variant of Alert. Same names and colors as in Notification Component.
   */
  @Input() variant: FudisNotification = 'info';

  /**
   * Output for close button click
   */
  @Output() handleClose = new EventEmitter<Event>();

  /**
   * Internal translated aria-label for close button
   */
  protected _closeLabel = new Subject<string>();

  /**
   * Handler for close button. Dismisses alert from service and sets focus to last alert in the list or to previously focused element stored with _handleFocus().
   */
  protected _handleCloseClick(event: Event): void {
    this._alertService.dismissAlertFromButton(this.buttonId);

    const alerts = this._alertService.alerts.getValue();

    if (alerts.length !== 0) {
      const targetId = alerts[alerts.length - 1].buttonId;
      this._document.getElementById(targetId)?.focus();
    } else {
      const target: HTMLElement = this._focusService.getFocusTarget();
      target?.focus();
    }

    this.handleClose.emit(event);
  }

  /**
   * Focus handler for close Button inside alert. Saves the element focus originated from, to restore focus there when there are no alerts left.
   */
  protected _handleFocus(focusEvent: FocusEvent): void {
    const relatedTarget = focusEvent?.relatedTarget as HTMLElement;

    const isDialogOpen = this._dialogService.getDialogOpenStatus().value;

    /**
     * First if: when keyboard tabbing through ngMaterial dialog, focus goes through its hidden focus-trap helper element which focuses on either first alert on the list or dialog close. So we store the dialog close as focus target.
     * Else if: Store source of focus event unless it originated inside Alert
     */

    if (
      isDialogOpen &&
      relatedTarget &&
      relatedTarget.classList?.contains('cdk-focus-trap-anchor')
    ) {
      const dialogCloseButton = this._document.querySelector(
        '.cdk-focus-trap-anchor + mat-dialog-container .fudis-dialog__close .fudis-button',
      ) as HTMLElement;
      if (dialogCloseButton) {
        this._focusService.setFocusTarget(dialogCloseButton);
      }
    } else if (relatedTarget && !relatedTarget.closest('.fudis-alert')) {
      this._focusService.setFocusTarget(relatedTarget);
    }
  }
}
