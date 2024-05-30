import { Component, EventEmitter, Inject, Input, Output, effect } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FudisNotification } from '../../../types/miscellaneous';
import { FudisFocusService } from '../../../services/focus/focus.service';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import { FudisAlertService } from '../../../services/alert/alert.service';
import { FudisDialogService } from '../../../services/dialog/dialog.service';

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
    private _translateService: FudisTranslationService,
    private _dialogService: FudisDialogService,
  ) {
    effect(() => {
      // TODO: To Observable
      this._closeLabel = this._translateService.getTranslations()().DIALOG.CLOSE;
    });
  }

  /**
   * Visible message
   */
  // TODO: add observable message
  @Input({ required: true }) message: string;

  /**
   * Id to be set on the whole alert element
   */
  @Input({ required: true }) htmlId: string;

  /**
   * Id to be set on the close alert button
   */
  @Input({ required: true }) buttonId: string;

  /**
   * Variant of alert. Same names and colors as in Notification component.
   */
  @Input() variant: FudisNotification = 'info';

  /**
   * Conditional routerLink for Alert. If used, provide also linkTitle.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() link: string | any[] | null | undefined;

  /**
   * Title of url used with routerLinkUrl
   */
  @Input() linkTitle: string | undefined;

  /**
   * Used with links in alert, to force focus to the link on the first load.
   */
  @Input() initialFocus: boolean = false;

  /**
   * Output for when Close button is clicked
   */
  @Output() handleClose = new EventEmitter<Event>();

  // TODO: add output for possible callback event when clicking link in alert

  /**
   * Label for close button, fetched from FudisTranslationService
   */
  protected _closeLabel: string;

  /**
   * Handler for close button. Dismisses alert from service and sets focus to last alert in the list or to previously focused element stored with _handleFocus().
   */
  protected _handleCloseClick(event: Event): void {
    this._alertService.dismissAlertFromButton(this.buttonId);

    const alerts = this._alertService.getAlertsSignal()();

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
   * Focus handler for both link and close button inside alert. Saves the element focus originated from to restore focus there when there are no alerts left.
   */
  protected _handleFocus(focusEvent: FocusEvent): void {
    const relatedTarget = focusEvent?.relatedTarget as HTMLElement;

    const isDialogOpen = this._dialogService.getDialogOpenSignal()();

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

  /**
   * When blurring from link inside alert, initialFocus is set to false. (So that in e. g. opening dialog doesn't re-focus to link). Because this makes alert to render again, the focus may be lost, so this blurring makes sure the next focus target is logical.
   */
  protected _handleBlur(event: FocusEvent): void {
    const nextElement = event.relatedTarget as HTMLElement;

    if (
      this.initialFocus &&
      nextElement?.classList?.contains('fudis-alert__close') &&
      nextElement?.id
    ) {
      this._alertService.updateAlertLinkFocusState(this.htmlId);
      this._focusService.focusToElementById(nextElement.id);
    }
  }
}
