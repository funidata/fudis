import { OnInit, AfterViewInit, Directive, ElementRef, OnChanges, Input } from '@angular/core';
import { LinkApiDirective } from './link-api/link-api.directive';
import { FudisComponentChanges } from '../../types/miscellaneous';

@Directive({
  selector: '[fudisLink]',
})
export class LinkDirective extends LinkApiDirective implements OnInit, OnChanges, AfterViewInit {
  constructor(protected _bindedElement: ElementRef<HTMLAnchorElement>) {
    super();
  }

  /**
   * CSS classes for link element
   */
  @Input() classes: string[] = [];

  /**
   * Helper counter for setting link focus
   */
  private _focusTryCounter: number = 0;

  ngAfterViewInit(): void {
    if (this.initialFocus) {
      this._focusToLink();
    }
  }

  ngOnInit(): void {
    this._setCssClasses();
  }

  ngOnChanges(changes: FudisComponentChanges<LinkDirective>): void {
    if (changes.color || changes.size || changes.classes) {
      this._setCssClasses();
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

  /**
   * Set CSS classes
   */
  private _setCssClasses(): void {
    const classList = [
      'fudis-link',
      `fudis-link__size__${this.size}`,
      `fudis-link__color__${this.color}`,
    ];

    const arrayToString = this.classes
      .concat(classList)
      .filter((item) => {
        return !!item;
      })
      .sort()
      .join(' ');

    (this._bindedElement.nativeElement as HTMLElement).classList.value = arrayToString;
  }
}
