import { DOCUMENT } from '@angular/common';
import { ElementRef, Inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, debounceTime, fromEvent } from 'rxjs';

@Injectable()
export class FudisDOMUtilitiesService {
  constructor(
    @Inject(DOCUMENT) private _document: Document,
    private _elementRef: ElementRef,
  ) {
    // Check label heights also when screen in resized
    fromEvent(window, 'resize')
      .pipe(takeUntilDestroyed(), debounceTime(10))
      .subscribe(() => {
        if (this.labelHeightMatched.value) {
          this.setLabelHeight();
        }
        if (this.dialogScrollableContent.value) {
          this.isDialogScrollable();
        }
      });
  }

  /**
   * 
   */
  public dialogScrollableContent: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * Is setting components' label heights to equal completed
   */
  public labelHeightMatched: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * Utility function to match two Fudis Labels height, if components are designed to be always side by side. E. g. LocalizedTextGroup and DateRange
   *
   * Height of components might vary if other one has tooltip and other one not, or if other one has longer label.
   */
  public setLabelHeight(delay: boolean = false): void {
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
          this.labelHeightMatched.next(true);
        }
      },
      delay ? 100 : 0,
    );
  }

    /**
     * From: https://phuoc.ng/collection/html-dom/check-if-an-element-is-scrollable/
     */
      isDialogScrollable(): void {

        const dialogContent = (this._elementRef?.nativeElement as HTMLDivElement)?.querySelectorAll(
          '.fudis-dialog-content',
        );

        // Compare the height to see if the element has scrollable content
        const hasScrollableContent =
          this._elementRef.nativeElement.scrollHeight > this._elementRef.nativeElement.clientHeight;
    
        // It's not enough because the element's `overflow-y` style can be set as
        // * `hidden`
        // * `hidden !important`
        // In those cases, the scrollbar isn't shown
        const overflowYStyle = window.getComputedStyle(this._elementRef.nativeElement).overflowY;
        const isOverflowHidden = overflowYStyle.indexOf('hidden') !== -1;
    
        if (hasScrollableContent && !isOverflowHidden){
          this.dialogScrollableContent.next(true);
        }
      }
}
