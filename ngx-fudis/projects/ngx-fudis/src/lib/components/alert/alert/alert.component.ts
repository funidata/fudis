import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  effect,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { FudisComponentChanges, FudisNotification } from '../../../types/miscellaneous';
import { FudisFocusService } from '../../../services/focus/focus.service';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import { FudisAlertService } from '../../../services/alert/alert.service';
import { FudisDialogService } from '../../../services/dialog/dialog.service';

@Component({
  selector: 'fudis-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit, OnChanges, OnDestroy {
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
  @Input({ required: true }) message: Observable<string> | string;

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
   * RouterLink applied to link inside Alert. If used, provide also linkTitle.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() link: string | any[] | null | undefined;

  /**
   * Title of URL, used with routerLinkUrl
   */
  @Input() linkTitle: string | undefined;

  /**
   * Force focus to the link on first load
   */
  @Input() initialFocus: boolean = false;

  /**
   * Output for close button click
   */
  @Output() handleClose = new EventEmitter<Event>();

  /**
   * Output for link element click
   */
  @Output() handleClick = new EventEmitter<Event>();

  /**
   * Alert message to include in the Alert object
   */
  protected _currentMessage: string;

  /**
   * Internal translated aria-label for close button
   */
  protected _closeLabel = new BehaviorSubject<string>('');

  /**
   * Disposable object for preserving message as Observable string
   */
  private _subscription: Subscription;

  /**
   * Handler for close button. Dismisses alert from service and sets focus to last alert in the list or to previously focused element stored with _handleFocus().
   */
  protected _handleCloseClick(event: Event): void {
    this._alertService.dismissAlertFromButton(this.buttonId);

    const alerts = this._alertService.allAlertsObservable.getValue();

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

  ngOnInit(): void {
    if (this.message && typeof this.message !== 'string') {
      this._subscription = this.message.subscribe((value: string) => {
        this._currentMessage = value;
      });
    }
  }

  ngOnChanges(changes: FudisComponentChanges<AlertComponent>): void {
    if (changes.message) {
      if (typeof this.message === 'string') {
        this._currentMessage = this.message;
      }
    }
  }

  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }
}
