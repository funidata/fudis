import {
  Component,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy,
  signal,
  OnChanges,
} from '@angular/core';
import { FudisDialogService } from '../../services/dialog/dialog.service';
import { FudisIdService } from '../../services/id/id.service';
import { FudisTranslationService } from '../../services/translation/translation.service';
import { FudisComponentChanges, FudisDialogSize } from '../../types/miscellaneous';
import { FudisDOMUtilitiesService } from '../../services/dom/dom-utilities.service';

@Component({
  selector: 'fudis-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent implements OnDestroy, OnInit, OnChanges {
  constructor(
    protected _translateService: FudisTranslationService,
    private _dialogService: FudisDialogService,
    private _idService: FudisIdService,
    protected _DOMUtilitiesService: FudisDOMUtilitiesService,
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

  ngOnChanges(changes: FudisComponentChanges<DialogComponent>): void {
    if(changes.size?.currentValue !== changes.size?.previousValue) {
      this._DOMUtilitiesService.isDialogScrollable();
    }
  }

  @HostListener('window:keyup.escape', ['$event'])
  private _handleEscapePress() {
    if (this._dialogService.dialogsOpen().length === this._orderNumber) {
      this._dialogService.close();
    }
  }
}
