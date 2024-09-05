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
   * Is setting Datepicker label heights to equal completed
   */
  public labelHeightMatched: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * Height of Datepickers might vary if other one has tooltip and other one not, or if other one has longer label. This function sets their label height equal, so they should remain aligned.
   */
  public setLabelHeight(recheck?: boolean): void {
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

      // Recheck when Datepickers are initialized
      if (recheck) {
        setTimeout(() => {
          this.setLabelHeight();
        }, 100);
      } else {
        this.labelHeightMatched.next(true);
      }
    }
  }
}
