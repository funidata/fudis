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
  @HostBinding('class') public hostClass = 'fudis-dropdown-menu-host';

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
   * Set dropdown size
   */
  @Input() size: FudisInputSize | 'xs' = 'lg';

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
   * Determine dropdown max-width
   */
  protected _maxWidth: string = 'initial';

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

  /**
   * Get defined dropdown css max-width attribute
   */
  get maxWidth(): string {
    return this._maxWidth;
  }
}
