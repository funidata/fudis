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
   * Checked state for dropdown-menu-item with checkbox
   */
  @Input() checked: boolean = false;

  /**
   * Optional click handler
   */
  @Output() handleClick = new EventEmitter<Event>();

  /**
   * Output for handling checked state in dropdown-menu-item with checkbox
   */
  @Output() handleChecked = new EventEmitter<boolean>();

  /**
   * Output for blur event in dropdown-menu-item with checkbox
   */
  @Output() handleBlur = new EventEmitter<FocusEvent>();

  /**
   * Id generated with FudisIdService
   */
  protected _id: string;

  /**
   * Trigger focus based on keyboard interaction. Used to focus on next / previous dropdown item element
   */
  // eslint-disable-next-line class-methods-use-this
  protected _baseHandleKeyDown(
    event: KeyboardEvent,
    element: ElementRef,
    cssClassSelector: string,
  ) {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      const focusElement = this._document.querySelector(':focus');

      const siblingElements = element.nativeElement
        .closest('.fudis-select-dropdown')
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

  /**
   * Function which tries to check if UI focus has moved away from the list of dropdown items
   */
  // eslint-disable-next-line class-methods-use-this
  protected _focusedOutFromComponent(
    event: FocusEvent,
    element: ElementRef,
    selector: string,
    multiselect?: boolean,
  ): boolean {
    if (!event.relatedTarget) {
      setTimeout(() => {
        if (!document.activeElement?.classList.contains(selector)) {
          return false;
        }
        const menuButton = element.nativeElement
          .closest('fudis-button')
          ?.querySelector('.fudis-button');

        if (
          !(event.relatedTarget as HTMLElement)?.classList?.contains(selector) &&
          (event.relatedTarget as HTMLElement) !== menuButton
        ) {
          return true;
        }
        return false;
      }, 100);
    } else {
      let parentSelect;
      if (!multiselect) {
        parentSelect = element.nativeElement.closest('fudis-multiselect');
      } else {
        parentSelect = element.nativeElement.closest('fudis-select');
      }

      const menuButton = element.nativeElement
        .closest('fudis-button')
        ?.querySelector('.fudis-button');

      const selectInput = parentSelect?.querySelector('.fudis-select__input');

      const autocompleteChevronButton = parentSelect?.querySelector(
        '.fudis-select__input-wrapper__icon-button button',
      );

      if (
        !(event.relatedTarget as HTMLElement)?.classList?.contains(selector) &&
        (event.relatedTarget as HTMLElement) !== selectInput &&
        (event.relatedTarget as HTMLElement) !== menuButton &&
        (event.relatedTarget as HTMLElement) !== autocompleteChevronButton
      ) {
        return true;
      }
    }

    return false;
  }
}
