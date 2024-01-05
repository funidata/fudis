import { Directive, ElementRef, HostBinding, Input, ViewChild } from '@angular/core';
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
   * Id for Dropdown Menu. Generated with FudisIdService
   */
  public id: string;

  /**
   * Determine dropdown max-width
   */
  protected _maxWidth: string = 'initial';
}
