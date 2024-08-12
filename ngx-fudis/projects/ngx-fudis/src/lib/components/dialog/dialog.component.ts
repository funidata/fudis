import { Component, HostListener, Input, OnDestroy, effect, OnInit } from '@angular/core';
import { FudisDialogService } from '../../services/dialog/dialog.service';
import { FudisIdService } from '../../services/id/id.service';
import { FudisTranslationService } from '../../services/translation/translation.service';
import { FudisDialogSize } from '../../types/miscellaneous';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'fudis-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnDestroy, OnInit {
  constructor(
    private _dialogService: FudisDialogService,
    private _idService: FudisIdService,
    private _translateService: FudisTranslationService,
  ) {
    effect(() => {
      this._closeLabel.next(this._translateService.getTranslations()().DIALOG.CLOSE);
    });
    this._id = _idService.getNewId('dialog');

    _dialogService.setDialogOpenSignal(true);
  }

  /**
   * Dialog size
   */
  @Input() size: FudisDialogSize = 'md';

  /**
   * Dialog's close button has to have absolute positioning when used inside fudis-form
   */
  public closeButtonPositionAbsolute: boolean = false;

  /**
   * Id generated from FudisIdService
   */
  protected _id: string;

  /**
   * Internal translated aria-label for top right close button
   */
  protected _closeLabel = new BehaviorSubject<string>('');

  /**
   * To track "order number" of this dialog, if multiple dialogs are open
   */
  private _orderNumber: number;

  ngOnInit(): void {
    this._orderNumber = this._dialogService.dialogsOpen();
  }

  ngOnDestroy(): void {
    if (this._orderNumber === 1) {
      this._dialogService.setDialogOpenSignal(false);
    }
  }

  @HostListener('window:keyup.escape', ['$event'])
  private _handleEscapePress() {
    if (this._dialogService.dialogsOpen() === this._orderNumber) {
      this._dialogService.close();
    }
  }
}
