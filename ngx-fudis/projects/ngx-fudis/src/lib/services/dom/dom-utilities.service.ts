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
      });
  }

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
}
