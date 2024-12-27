import { DOCUMENT } from '@angular/common';
import { ElementRef, Inject, Injectable, signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, fromEvent } from 'rxjs';

@Injectable()
export class FudisDOMUtilitiesService {
  constructor(
    @Inject('componentType') componentType: 'dialog',
    @Inject(DOCUMENT) private _document: Document,
    private _elementRef: ElementRef,
  ) {
    if (componentType === 'dialog') {
      fromEvent(window, 'resize')
        .pipe(takeUntilDestroyed(), debounceTime(10))
        .subscribe(() => {
          if (componentType === 'dialog' && this.dialogScrollable() !== null) {
            this.isDialogScrollable();
          }
        });
    }
  }

  /**
   * Does Dialog have scrollable content
   */
  public dialogScrollable: WritableSignal<boolean | null> = signal(null);

  /**
   * From: https://phuoc.ng/collection/html-dom/check-if-an-element-is-scrollable/
   */
  public isDialogScrollable(): void {
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
      this.dialogScrollable.set(true);
    } else {
      this.dialogScrollable.set(false);
    }
  }
}
