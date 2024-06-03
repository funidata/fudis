import { Component, Input, OnDestroy, OnInit, effect } from '@angular/core';
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
export class DialogComponent implements OnInit, OnDestroy {
  constructor(
    private _dialogService: FudisDialogService,
    private _idService: FudisIdService,
    private _translateService: FudisTranslationService,
  ) {
    effect(() => {
      this._closeLabel.next(this._translateService.getTranslations()().DIALOG.CLOSE);
    });
    this._id = _idService.getNewId('dialog');
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

  ngOnInit(): void {
    this._dialogService.setDialogOpenSignal(true);
  }

  ngOnDestroy(): void {
    this._dialogService.setDialogOpenSignal(false);
  }
}
