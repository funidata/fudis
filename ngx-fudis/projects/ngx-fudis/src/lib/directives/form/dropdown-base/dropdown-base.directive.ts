import {
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FudisInputSize } from '../../../types/forms';

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
  @HostBinding('class') hostClass = 'fudis-dropdown-menu-host';

  /**
   * Assign Select dropdown as single-select or multiselect (with checkboxes)
   */
  @Input() multiselect: boolean = false;

  /**
   * Set dropdown open status
   */
  @Input() open: boolean = false;

  /**
   * Id of parent component
   */
  @Input() parentId: string;

  /**
   * Set dropdown size (should follow the given input element size)
   */
  @Input() size: FudisInputSize | 'xs' = 'lg';

  /**
   * Calculate Dropdown Menu's max width
   */
  @Input() maxWidth: string = 'initial';

  /**
   * HTML role, menu is for Dropdown Menu Component, listbox is for Select and Multiselect Components
   */
  @Input() role: 'menu' | 'listbox' = 'listbox';

  /**
   * Dropdown-menu is aligned to open left side of the button by default but can be aligned to open right side if necessary
   */
  @Input() align: 'left' | 'right' | 'center' = 'left';

  /**
   * CSS classes, needed to separate Dropdown Menu and Select Dropdown classes
   */
  @Input() classes: string[] = [];

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
