import {
  Component,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy,
  signal,
} from '@angular/core';
import { FudisDialogService } from '../../services/dialog/dialog.service';
import { FudisIdService } from '../../services/id/id.service';
import { FudisTranslationService } from '../../services/translation/translation.service';
import { FudisDialogSize } from '../../types/miscellaneous';

@Component({
  selector: 'fudis-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent implements OnDestroy, OnInit {
  constructor(
    protected _translateService: FudisTranslationService,
    private _dialogService: FudisDialogService,
    private _idService: FudisIdService,
  ) {
    this._id = _idService.getNewId('dialog');

    _dialogService.setDialogOpenStatus(true);
  }

  /**
   * Dialog size
   */
  @Input() size: FudisDialogSize = 'md';

  /**
   * Dialog's close button has to have absolute positioning when used inside fudis-form
   */
  public closeButtonPositionAbsolute = signal<boolean>(false);

  /**
   * Id generated from FudisIdService
   */
  protected _id: string;

  /**
   * To track "order number" of this dialog, if multiple dialogs are open
   */
  private _orderNumber: number;

  ngOnInit(): void {
    this._orderNumber = this._dialogService.dialogsOpen().length;
  }

  ngOnDestroy(): void {
    if (this._orderNumber === 1 || this._orderNumber === 0) {
      this._dialogService.setDialogOpenStatus(false);
    }
  }

  @HostListener('window:keyup.escape', ['$event'])
  private _handleEscapePress() {
    if (this._dialogService.dialogsOpen().length === this._orderNumber) {
      this._dialogService.close();
    }
  }
}
