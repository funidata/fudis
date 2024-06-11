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
  @ViewChild('dropdownElement') dropdownElement: ElementRef<HTMLElement>;

  /**
   * Binding public variable for querying variant type
   */
  @HostBinding('class') classes = 'fudis-dropdown-menu-host';

  /**
   * Assign dropdown as single-select or multiselect (with checkboxes)
   */
  @Input() multiselect: boolean = false;

  /**
   * Set dropdown size (should follow the given input element size)
   */
  @Input() size: FudisInputSize | 'xs' = 'lg';

  /**
   * Set dropdown open
   */
  @Input() open: boolean = false;

  /**
   * Id of parent component
   */
  @Input() parentId: string;

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
