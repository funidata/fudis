import {
  Component,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy,
  signal,
  OnChanges,
  AfterViewInit,
  WritableSignal,
  ElementRef,
} from '@angular/core';
import { FudisDialogService } from '../../services/dialog/dialog.service';
import { FudisIdService } from '../../services/id/id.service';
import { FudisTranslationService } from '../../services/translation/translation.service';
import { FudisComponentChanges, FudisDialogSize } from '../../types/miscellaneous';
import { throttle } from '../../utilities/resizeThrottle';
import { debounceTime, fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'fudis-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class DialogComponent implements OnDestroy, OnInit, OnChanges, AfterViewInit {
  constructor(
    protected _translateService: FudisTranslationService,
    private _dialogService: FudisDialogService,
    private _idService: FudisIdService,
    private _elementRef: ElementRef,
  ) {
    this._id = _idService.getNewId('dialog');

    _dialogService.setDialogOpenStatus(true);

    this._resizeObserver = new ResizeObserver(
      throttle(() => {
        if (this._dialogScrollable() !== null) {
          this._isDialogScrollable();
        }
      }, 10),
    );

    fromEvent(window, 'resize')
      .pipe(takeUntilDestroyed(), debounceTime(10))
      .subscribe(() => {
        if (this._dialogScrollable() !== null) {
          this._isDialogScrollable();
        }
      });
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

  /**
   * Does Dialog have scrollable content
   */
  protected _dialogScrollable: WritableSignal<boolean | null> = signal(null);

  /**
   * To observe size changes of this Label and trigger height calculation as needed
   */
  private _resizeObserver: ResizeObserver;

  ngOnChanges(changes: FudisComponentChanges<DialogComponent>): void {
    if (changes.size?.currentValue !== changes.size?.previousValue) {
      this._isDialogScrollable();
    }
  }

  ngOnInit(): void {
    this._orderNumber = this._dialogService.dialogsOpen().length;
  }

  ngAfterViewInit(): void {
    this._isDialogScrollable();
  }

  ngOnDestroy(): void {
    if (this._orderNumber === 1 || this._orderNumber === 0) {
      this._dialogService.setDialogOpenStatus(false);
    }

    this._resizeObserver.disconnect();
  }

  /**
   * From: https://phuoc.ng/collection/html-dom/check-if-an-element-is-scrollable/
   */
  private _isDialogScrollable(): void {
    const dialogContentElement = (this._elementRef?.nativeElement as HTMLDivElement)?.querySelector(
      '.fudis-dialog-content',
    );

    const dialogContentVisible = dialogContentElement?.clientHeight;
    const dialogContentScrollable = dialogContentElement?.scrollHeight;

    const formContent = (this._elementRef?.nativeElement as HTMLDivElement)?.querySelector(
      '.fudis-form-content',
    )?.clientHeight;

    const formScrollableContent = (
      this._elementRef?.nativeElement as HTMLDivElement
    )?.querySelector('.fudis-form__content-wrapper')?.clientHeight;

    // Compare the height to see if the element has scrollable content
    const hasScrollableContent =
      (formScrollableContent && formContent && formContent > formScrollableContent) ||
      (dialogContentScrollable &&
        dialogContentVisible &&
        dialogContentScrollable > dialogContentVisible);
    // It's not enough because the element's `overflow-y` style can be set as
    // * `hidden`
    // * `hidden !important`
    // In those cases, the scrollbar isn't shown
    const overflowYStyle = window.getComputedStyle(this._elementRef.nativeElement).overflowY;
    const isOverflowHidden = overflowYStyle.indexOf('hidden') !== -1;

    if (hasScrollableContent && !isOverflowHidden) {
      this._dialogScrollable.set(true);
    } else {
      this._dialogScrollable.set(false);
    }
  }

  @HostListener('window:keyup.escape', ['$event'])
  private _handleEscapePress() {
    if (this._dialogService.dialogsOpen().length === this._orderNumber) {
      this._dialogService.close();
    }
  }
}
