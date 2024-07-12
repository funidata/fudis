import { Directive, ElementRef, EventEmitter, HostBinding, Output, ViewChild } from '@angular/core';

@Directive({
  selector: '[fudisDropdownBase]',
})
export class DropdownBaseDirective {
  /**
   * Template reference for the dropdown div element
   */
  @ViewChild('dropdownElement') public dropdownElement: ElementRef<HTMLElement>;

  /**
   * Binding host CSS class to component wrapper
   */
  @HostBinding('class') public hostClass = 'fudis-dropdown-menu-host';

  /**
   * Output emitter for focus event
   */
  @Output() handleFocus = new EventEmitter<FocusEvent>();

  /**
   * Output emitter for blur event
   */
  @Output() handleBlur = new EventEmitter<FocusEvent>();

  /**
   * Id for Dropdown Menu. Generated with FudisIdService
   */
  public id: string;

  /**
   * When dropdown is focused, happens e. g. with Firefox
   */
  protected _dropdownFocus(event: FocusEvent): void {
    this.handleFocus.emit(event);
  }

  /**
   * When dropdown is blurred, happens e. g. with Firefox
   */
  protected _dropdownBlur(event: FocusEvent): void {
    this.handleBlur.emit(event);
  }
}
