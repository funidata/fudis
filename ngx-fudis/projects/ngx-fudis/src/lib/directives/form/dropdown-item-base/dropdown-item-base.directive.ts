import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, EventEmitter, Inject, Input, Output } from '@angular/core';

@Directive({
  selector: '[fudisDropdownItemBase]',
})
export class DropdownItemBaseDirective {
  constructor(@Inject(DOCUMENT) protected _document: Document) {}

  /**
   * Option for closing or leaving dropdown open after clicking an item. Closes by default.
   */
  @Input() close: boolean = true;

  /**
   * Checked state for multiselect checkbox
   */
  @Input() checked: boolean = false;

  /**
   * Ouput for click event
   */
  @Output() handleClick = new EventEmitter<Event>();

  /**
   * Output for checked state in multiselect
   */
  @Output() handleChecked = new EventEmitter<boolean>();

  /**
   * Output for blur event in select option
   */
  @Output() handleBlur = new EventEmitter<FocusEvent>();

  /**
   * Id generated with FudisIdService
   */
  protected _id: string;

  /**
   * Trigger focus based on keyboard interaction. Used to focus on next / previous dropdown item element
   */

  protected _baseHandleKeyDown(
    event: KeyboardEvent,
    element: ElementRef,
    cssClassSelector: string,
  ) {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      const focusElement = this._document.querySelector(':focus');

      const siblingElements = element.nativeElement
        .closest('.fudis-select-dropdown, .fudis-dropdown-menu')
        .querySelectorAll(cssClassSelector);

      const siblingElementsCount = siblingElements.length - 1;
      event.preventDefault();

      const focusIndex = Array.prototype.indexOf.call(siblingElements, focusElement);

      let elementToFocus = element.nativeElement;
      if (event.key === 'ArrowUp') {
        elementToFocus = siblingElements[focusIndex > 0 ? focusIndex - 1 : siblingElementsCount];
      }
      if (event.key === 'ArrowDown') {
        elementToFocus = siblingElements[focusIndex < siblingElementsCount ? focusIndex + 1 : 0];
      }
      elementToFocus.focus();
    }
  }
}
