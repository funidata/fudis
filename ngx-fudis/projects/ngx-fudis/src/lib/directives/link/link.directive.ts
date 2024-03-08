import { AfterViewInit, Directive, ElementRef } from '@angular/core';
import { LinkApiDirective } from './link-api.directive';

@Directive({
  selector: '[fudisLink]',
})
export class LinkDirective extends LinkApiDirective implements AfterViewInit {
  constructor(protected _bindedElement: ElementRef<HTMLAnchorElement>) {
    super();
  }

  /**
   * Helper counter for setting link focus
   */
  private _focusTryCounter: number = 0;

  ngAfterViewInit(): void {
    if (this.initialFocus) {
      this._focusToLink();
    }
  }

  /**
   * Set visible focus to the link
   */
  protected _focusToLink(): void {
    if (this._bindedElement?.nativeElement) {
      (this._bindedElement.nativeElement as HTMLAnchorElement).focus();
      this._focusTryCounter = 0;
    } else if (this._focusTryCounter < 100) {
      setTimeout(() => {
        this._focusTryCounter += 1;
        this._focusToLink();
      }, 100);
    }
  }
}
