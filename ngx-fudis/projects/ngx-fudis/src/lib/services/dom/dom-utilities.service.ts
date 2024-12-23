import { DOCUMENT } from '@angular/common';
import { ElementRef, Inject, Injectable, signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, fromEvent } from 'rxjs';

@Injectable()
export class FudisDOMUtilitiesService {
  constructor(
    @Inject('componentType') componentType: 'dialog' | 'label' | 'labelPair',
    @Inject(DOCUMENT) private _document: Document,
    private _elementRef: ElementRef,
  ) {
    // Run needed checks on resize
    if (componentType === 'labelPair') {
      fromEvent(window, 'resize')
        .pipe(takeUntilDestroyed(), debounceTime(10))
        .subscribe(() => {
          if (this.labelPairHeightMatched()) {
            this.setLabelPairHeight();
          }
        });
    } else if (componentType === 'dialog') {
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
   * Is setting components' label heights to equal completed
   */
  public labelPairHeightMatched: WritableSignal<boolean | null> = signal(null);

  /**
   * Utility function to match two Fudis Labels height, if components are designed to be always side by side. E. g. LocalizedTextGroup and DateRange
   *
   * Height of components might vary if other one has tooltip and other one not, or if other one has longer label.
   */
  public setLabelPairHeight(delay: boolean = false): void {
    setTimeout(
      () => {
        const labels = (this._elementRef?.nativeElement as HTMLDivElement)?.querySelectorAll(
          '.fudis-label',
        );

        if (labels?.length === 2) {
          (labels[0] as HTMLLabelElement).style.height = 'initial';
          (labels[1] as HTMLLabelElement).style.height = 'initial';

          const labelOneHeigth = labels[0].clientHeight;
          const labelTwoHeigth = labels[1].clientHeight;

          const fontSize = Number(
            window
              .getComputedStyle(this._document.body)
              .getPropertyValue('font-size')
              .replace('px', ''),
          );

          if (labelOneHeigth > labelTwoHeigth) {
            (labels[1] as HTMLLabelElement).style.height = `${labelOneHeigth / fontSize}rem`;
          } else if (labelTwoHeigth > labelOneHeigth) {
            (labels[0] as HTMLLabelElement).style.height = `${labelTwoHeigth / fontSize}rem`;
          }
          this.labelPairHeightMatched.set(true);
        }
      },
      delay ? 100 : 0,
    );
  }

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
