import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  Signal,
} from '@angular/core';
import { FudisLinkColor, FudisTranslationConfig } from '../../types/miscellaneous';

@Directive({
  selector: '[fudisLink]',
})
export class LinkDirective implements AfterViewInit, OnChanges {
  constructor(protected _linkElement: ElementRef) {
    this._element = _linkElement.nativeElement;
  }

  /**
   * Internal reference for the Link element
   */
  private _element: HTMLElement;

  /**
   * Link size. By default link will inherit its parent's font-size. If link is not inside e.g. <fudis-heading> or <fudis-body-text> its size can be defined either 'md' (14px) or 'lg' (16px).
   */
  @Input() size: 'inherit' | 'md' | 'lg' = 'inherit';

  /**
   * Link color
   */
  @Input() color: FudisLinkColor = 'primary-dark';

  /**
   * Set browser focus to link on the first load.
   */
  @Input() initialFocus: boolean = false;

  /**
   * Focus event output
   */
  @Output() handleFocus = new EventEmitter<FocusEvent>();

  /**
   * Blur event output
   */
  @Output() handleBlur = new EventEmitter<FocusEvent>();

  /**
   * Fudis translations
   */
  protected _translations: Signal<FudisTranslationConfig>;

  /**
   * Helper counter for setting link focus
   */
  private _focusTryCounter: number = 0;

  ngAfterViewInit(): void {
    if (this.initialFocus) {
      this._focusToLink();
    }
  }

  ngOnChanges(): void {
    this._parseExternalLinkTitle();
  }

  /**
   * Handle Link Component focus event
   */
  protected _handleFocus(event: FocusEvent): void {
    this.handleFocus.emit(event);
  }

  /**
   * Handle Link Component blur event
   */
  protected _handleBlur(event: FocusEvent): void {
    this.handleBlur.emit(event);
  }

  /**
   * Set visible focus to the link
   */
  private _focusToLink(): void {
    if (this._element) {
      this._element.focus();
      this._focusTryCounter = 0;
    } else if (this._focusTryCounter < 100) {
      setTimeout(() => {
        this._focusTryCounter += 1;
        this._focusToLink();
      }, 100);
    }
  }
}
